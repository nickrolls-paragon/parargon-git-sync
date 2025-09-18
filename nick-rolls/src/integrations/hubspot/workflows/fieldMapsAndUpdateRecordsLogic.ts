import { ConditionalStep, EventStep, Workflow } from '@useparagon/core';
import { IContext } from '@useparagon/core/execution';
import * as Operators from '@useparagon/core/operator';
import { IPersona } from '@useparagon/core/persona';
import { ConditionalInput } from '@useparagon/core/steps/library/conditional';
import { IConnectUser, IPermissionContext } from '@useparagon/core/user';
import {
  createInputs,
  IHubspotIntegration,
  InputResultMap,
} from '@useparagon/integrations/hubspot';

import event from '../../../events/fieldMapTesting';
import personaMeta from '../../../persona.meta';
import sharedInputs from '../inputs';

/**
 * Field Maps and Update Records Logic Workflow implementation
 */
export default class extends Workflow<
  IHubspotIntegration,
  IPersona<typeof personaMeta>,
  InputResultMap
> {
  /**
   * Define workflow steps and orchestration.
   */
  define(
    integration: IHubspotIntegration,
    context: IContext<InputResultMap>,
    connectUser: IConnectUser<IPersona<typeof personaMeta>>,
  ) {
    const triggerStep = new EventStep(event, {
      objectMapping: `${context.getInput(sharedInputs.field_maps).custom_object_types}`,
    });

    const checkRecordStep = integration.actions.searchRecords(
      {
        recordType: 'contacts',
        filterFormula: Operators.StringExactlyMatches(
          'email',
          triggerStep.output.mappedIntegrationObject.fields.email,
        ),
      },
      {
        autoRetry: false,
        continueWorkflowOnError: false,
        description: 'Check Record',
      },
    );

    const existsStep = new ConditionalStep({
      if: Operators.And(
        Operators.NumberEquals(checkRecordStep.output.result.total, 1),
        Operators.IsNotNull(checkRecordStep.output.result.results['0'].id),
      ),
      description: 'Exists?',
    });

    const updateContactStep = integration.actions.updateRecord(
      {
        recordType: 'contacts',
        recordId: `${checkRecordStep.output.result.results['0'].id}`,
        'field-email': ``,
        additionalFieldsJSON: `${triggerStep.output.mappedIntegrationObject.fields}`,
      },
      {
        autoRetry: false,
        continueWorkflowOnError: false,
        description: 'Update Contact',
      },
    );

    const createContactStep = integration.actions.createRecord(
      {
        recordType: 'contacts',
        'field-email': ``,
        'field-firstname': ``,
        'field-lastname': ``,
        'field-jobtitle': ``,
        additionalFieldsJSON: ``,
      },
      {
        autoRetry: false,
        continueWorkflowOnError: false,
        description: 'Create Contact',
      },
    );

    triggerStep
      .nextStep(checkRecordStep)
      .nextStep(
        existsStep.whenTrue(updateContactStep).whenFalse(createContactStep),
      );

    /**
     * Pass all steps used in the workflow to the `.register()`
     * function. The keys used in this function must remain stable.
     */
    return this.register({
      triggerStep,
      checkRecordStep,
      existsStep,
      updateContactStep,
      createContactStep,
    });
  }

  /**
   * The name of the workflow, used in the Dashboard and Connect Portal.
   */
  name: string = 'Field Maps and Update Records Logic';

  /**
   * A user-facing description of the workflow shown in the Connect Portal.
   */
  description: string = 'Add a user-facing description of this workflow';

  /**
   * Define workflow-level User Settings. For integration-level User
   * Settings, see ../config.ts.
   * https://docs.useparagon.com/connect-portal/workflow-user-settings
   */
  inputs = createInputs({});

  /**
   * If set to true, the workflow will appear as enabled by default once
   * a user connects their account to the integration.
   * https://docs.useparagon.com/connect-portal/displaying-workflows#default-to-enabled
   */
  defaultEnabled: boolean = false;

  /**
   * If set to true, the workflow will be hidden from all users from the
   * Connect Portal.
   * https://docs.useparagon.com/connect-portal/displaying-workflows#hide-workflow-from-portal-for-all-users
   */
  hidden: boolean = false;

  /**
   * You can restrict the visibility of this workflow to specific users
   * with Workflow Permissions.
   * https://docs.useparagon.com/connect-portal/workflow-permissions
   */
  definePermissions(
    connectUser: IPermissionContext<IPersona<typeof personaMeta>>,
  ): ConditionalInput | undefined {
    return undefined;
  }

  /**
   * This property is maintained by Paragon. Do not edit this property.
   */
  readonly id: string = 'fd81da5f-7e30-463a-938c-18e532432f28';
}
