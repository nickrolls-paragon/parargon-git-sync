import {
  EndpointStep,
  IntegrationRequestStep,
  Workflow,
} from '@useparagon/core';
import { IContext } from '@useparagon/core/execution';
import { IPersona } from '@useparagon/core/persona';
import { ConditionalInput } from '@useparagon/core/steps/library/conditional';
import { IConnectUser, IPermissionContext } from '@useparagon/core/user';
import {
  createInputs,
  IMarketoIntegration,
  InputResultMap,
} from '@useparagon/integrations/marketo';

import personaMeta from '../../../persona.meta';

/**
 * Audyence troubleshooting Workflow implementation
 */
export default class extends Workflow<
  IMarketoIntegration,
  IPersona<typeof personaMeta>,
  InputResultMap
> {
  /**
   * Define workflow steps and orchestration.
   */
  define(
    integration: IMarketoIntegration,
    context: IContext<InputResultMap>,
    connectUser: IConnectUser<IPersona<typeof personaMeta>>,
  ) {
    const triggerStep = new EndpointStep({
      allowArbitraryPayload: true,
    });

    const actionStep = integration.actions.createOrUpdateLead(
      {
        email: `nick.rolls3@useparagon.com`,
        firstName: `${triggerStep.output.request.body.firstName}`,
        lastName: `${triggerStep.output.request.body.lastName}`,
        company: ``,
        additionalFields: `{
    "publisher": "Paragon",
    "company": "Field testing?"
}`,
      },
      {
        autoRetry: false,
        continueWorkflowOnError: false,
        description: 'Create or Update Lead',
      },
    );

    const customObjectStep = integration.actions.createCustomObject(
      {
        customObjectName: `audyence_object_c`,
        recordFields: `{
  "industry": "Staffing And Recruiting",
  "lastName": "Rolls",
  "publisher": "Paragon",
  "firstName": "Rick",
  "email": "nick.rolls+2@useparagon.com",
  "campaignID": "Data Analytics Solutions for Mid-Sized to Enterprise Businesses",
  "companyWebsite": "https://www.useparagon.com/",
  "optInDate": "1/13/2025",
  "asset": "gated content 1",
  "approvalDate": "1/13/2025",
  "companyLinkedIn": "linkedin.com/company/google",
  "personalLinkedIn": ""
}`,
      },
      {
        autoRetry: false,
        continueWorkflowOnError: false,
        description: 'Custom Object?',
      },
    );

    const integrationRequestStep = new IntegrationRequestStep({
      autoRetry: false,
      continueWorkflowOnError: false,
      description: 'description',
      method: 'GET',
      url: `customobjects/schema/linkableObjects.json?`,
      params: {},
      headers: {},
    });

    triggerStep
      .nextStep(actionStep)
      .nextStep(customObjectStep)
      .nextStep(integrationRequestStep);

    /**
     * Pass all steps used in the workflow to the `.register()`
     * function. The keys used in this function must remain stable.
     */
    return this.register({
      triggerStep,
      actionStep,
      customObjectStep,
      integrationRequestStep,
    });
  }

  /**
   * The name of the workflow, used in the Dashboard and Connect Portal.
   */
  name: string = 'Audyence troubleshooting';

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
  readonly id: string = '587e7f7c-7f70-4c2f-8009-c546838f91ee';
}
