import {
  IntegrationRequestStep,
  RequestStep,
  Workflow,
} from '@useparagon/core';
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

/**
 * Update or Create - Contact Workflow implementation
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
    const triggerStep = integration.triggers.recordUpdated({
      recordsFilterFormula: undefined,
      recordType: 'Contact',
    });

    const requestStep = new RequestStep({
      autoRetry: false,
      continueWorkflowOnError: false,
      description: 'description',
      url: `https://webhook.site/cc04b3e0-7bdb-4d50-bb8b-2fcd4085669c`,
      method: 'POST',
      params: {},
      headers: {},
      body: { data: `${triggerStep.output.result}`, workflow: `Update Record` },
      bodyType: 'json',
    });

    const integrationRequestStep = new IntegrationRequestStep({
      autoRetry: false,
      continueWorkflowOnError: false,
      description: 'description',
      method: 'GET',
      url: ``,
      params: {},
      headers: {},
    });

    triggerStep.nextStep(requestStep).nextStep(integrationRequestStep);

    /**
     * Pass all steps used in the workflow to the `.register()`
     * function. The keys used in this function must remain stable.
     */
    return this.register({ triggerStep, requestStep, integrationRequestStep });
  }

  /**
   * The name of the workflow, used in the Dashboard and Connect Portal.
   */
  name: string = 'Update or Create - Contact';

  /**
   * A user-facing description of the workflow shown in the Connect Portal.
   */
  description: string =
    'Use this workflow to create or update contacts in Salesforce';

  /**
   * Define workflow-level User Settings. For integration-level User
   * Settings, see ../config.ts.
   * https://docs.useparagon.com/connect-portal/workflow-user-settings
   */
  inputs = createInputs({
    search_field: {
      id: '76c71fed-6c68-43c5-b4e1-44f15c20daff',
      title: 'Search Field',
      tooltip:
        'Please specify the best field for searching contacts in your SF account',
      required: true,
      type: 'text',
    },
    search_field_2: {
      id: '8b747902-9dab-492c-92f4-203b84f0270f',
      title: 'Search Field 2',
      tooltip:
        'Please specify the best field for searching contacts in your SF account',
      required: true,
      type: 'custom_dropdown',
      key: 'search-field-2',
      customDropdownOptions: [
        {
          label: 'Email',
          value: 'field-1',
        },
        {
          label: 'First Name',
          value: 'field-2',
        },
        {
          label: 'EIN Number',
          value: 'field-2',
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
  readonly id: string = 'd06ac29f-eeb0-4f3d-9266-f3ff23657edd';
}
