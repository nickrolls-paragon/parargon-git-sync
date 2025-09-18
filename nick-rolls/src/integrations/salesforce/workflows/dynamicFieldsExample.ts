import { FunctionStep, RequestStep, Workflow } from '@useparagon/core';
import { IContext } from '@useparagon/core/execution';
import { IPersona } from '@useparagon/core/persona';
import { ConditionalInput } from '@useparagon/core/steps/library/conditional';
import { IConnectUser, IPermissionContext } from '@useparagon/core/user';
import {
  createInputs,
  InputResultMap,
  ISalesforceIntegration,
} from '@useparagon/integrations/salesforce';

import personaMeta from '../../../persona.meta';
import sharedInputs from '../inputs';

/**
 * Dynamic Fields - Example Workflow implementation
 */
export default class extends Workflow<
  ISalesforceIntegration,
  IPersona<typeof personaMeta>,
  InputResultMap
> {
  /**
   * Define workflow steps and orchestration.
   */
  define(
    integration: ISalesforceIntegration,
    context: IContext<InputResultMap>,
    connectUser: IConnectUser<IPersona<typeof personaMeta>>,
  ) {
    const triggerStep = integration.triggers.recordCreated({
      recordsFilterFormula: undefined,
      recordType: 'Contact',
      objectMapping: `${context.getInput(sharedInputs['top_level_field_map_-_search_criteria']).record_type}`,
    });

    const requestStep = new RequestStep({
      autoRetry: false,
      continueWorkflowOnError: false,
      description: 'POST to somewhere',
      url: `https://webhook.site/cc04b3e0-7bdb-4d50-bb8b-2fcd4085669c`,
      method: 'POST',
      params: {},
      headers: {},
      body: { DATA: `${triggerStep.output.result}` },
      bodyType: 'json',
    });

    const actionStep = integration.actions.searchRecords(
      {
        recordType: '<specified by objectName property>',
        filterFormula: undefined,
        objectName: ``,
      },
      {
        autoRetry: false,
        continueWorkflowOnError: false,
        description: 'description',
      },
    );

    const functionStep = new FunctionStep({
      autoRetry: false,
      description: 'description',
      code: function yourFunction(parameters, libraries) {},
      parameters: {},
    });

    triggerStep
      .nextStep(requestStep)
      .nextStep(actionStep)
      .nextStep(functionStep);

    /**
     * Pass all steps used in the workflow to the `.register()`
     * function. The keys used in this function must remain stable.
     */
    return this.register({
      triggerStep,
      requestStep,
      actionStep,
      functionStep,
    });
  }

  /**
   * The name of the workflow, used in the Dashboard and Connect Portal.
   */
  name: string = 'Dynamic Fields - Example';

  /**
   * A user-facing description of the workflow shown in the Connect Portal.
   */
  description: string = 'Add a user-facing description of this workflow';

  /**
   * Define workflow-level User Settings. For integration-level User
   * Settings, see ../config.ts.
   * https://docs.useparagon.com/connect-portal/workflow-user-settings
   */
  inputs = createInputs({
    workflow_specific_mapping: {
      id: '754ba25c-6c33-43fc-b134-860ee89952ca',
      title: 'Workflow Specific Mapping',
      tooltip: '',
      required: true,
      type: 'field_mapping',
      useDynamicMapper: true,
      dynamicObjectName: 'workflowMapping',
      dynamicObjectOptions: [
        {
          label: 'Example Field 1',
          value: 'field1',
        },
        {
          label: 'Example Field 2',
          value: 'field2',
        },
      ],
    },
  });

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
  readonly id: string = '7569ee94-9d9f-4250-beaf-271bff67933e';
}
