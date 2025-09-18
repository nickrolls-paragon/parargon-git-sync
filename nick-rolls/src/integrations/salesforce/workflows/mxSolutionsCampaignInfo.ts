import {
  EndpointStep,
  FanOutStep,
  FunctionStep,
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
 * MX Solutions - Campaign Info Workflow implementation
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
    const triggerStep = new EndpointStep({
      allowArbitraryPayload: false,
      paramValidations: [] as const,
      headerValidations: [] as const,
      bodyValidations: [] as const,
    });

    const actionStep = integration.actions.writeSoqlQuery(
      {
        query: `SELECT Id, Name, Status, StartDate, EndDate, Type, OwnerId, wbsendit__Num_Clicks__c 
FROM Campaign 
WHERE OwnerId = '${connectUser.providerId}'`,
      },
      {
        autoRetry: false,
        continueWorkflowOnError: false,
        description: 'GET all Campaigns',
      },
    );

    const mapStep = new FanOutStep({
      description: 'description',
      iterator: actionStep.output.result.records,
    });

    const dataMappingStep = new FunctionStep({
      autoRetry: false,
      description: 'Data Mapping',
      code: function yourFunction(parameters, libraries) {
        const { name, attributes, Id, Status } = parameters.SfData;

        return { name, attributes, Id, Status };
      },

      parameters: { SfData: mapStep.output.instance },
    });

    const integrationRequestStep = new IntegrationRequestStep({
      autoRetry: false,
      continueWorkflowOnError: false,
      description: 'GET specific campaign',
      method: 'GET',
      url: `${connectUser.providerData.instanceUrl}/services/apexrest/shannongregg--useparagon/v1/campaign/campaigns?contentId=&ownerId=${connectUser.providerId}`,
      params: { contentId: ``, ownerId: `${connectUser.providerId}` },
      headers: {},
    });

    const integrationRequestStep1 = new IntegrationRequestStep({
      autoRetry: false,
      continueWorkflowOnError: false,
      description: 'description',
      method: 'GET',
      url: ``,
      params: { id: `ind.v_dev_t_get_campaign_664573.htm`, type: `5` },
      headers: {},
    });

    const requestStep = new RequestStep({
      autoRetry: false,
      continueWorkflowOnError: false,
      description: 'POST back to MX',
      url: `https://example.com`,
      method: 'GET',
      params: {},
      headers: {},
    });

    triggerStep
      .nextStep(actionStep)
      .nextStep(mapStep.branch(dataMappingStep))
      .nextStep(integrationRequestStep)
      .nextStep(integrationRequestStep1)
      .nextStep(requestStep);

    /**
     * Pass all steps used in the workflow to the `.register()`
     * function. The keys used in this function must remain stable.
     */
    return this.register({
      triggerStep,
      actionStep,
      mapStep,
      dataMappingStep,
      integrationRequestStep,
      integrationRequestStep1,
      requestStep,
    });
  }

  /**
   * The name of the workflow, used in the Dashboard and Connect Portal.
   */
  name: string = 'MX Solutions - Campaign Info';

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
    workflow_field_map: {
      id: 'c0fe4d05-f14b-4eb5-8826-b1eabf6c59ad',
      title: 'Workflow Field Map',
      tooltip: '',
      required: false,
      type: 'field_mapping',
      useDynamicMapper: false,
      fieldMappings: [
        {
          label: 'a real field',
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
  readonly id: string = '1a636079-430c-4c5e-bd7f-b9384473cb6a';
}
