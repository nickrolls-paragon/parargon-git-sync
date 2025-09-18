import { EndpointStep, FunctionStep, Workflow } from '@useparagon/core';
import { IContext } from '@useparagon/core/execution';
import { IPersona } from '@useparagon/core/persona';
import { ConditionalInput } from '@useparagon/core/steps/library/conditional';
import { IConnectUser, IPermissionContext } from '@useparagon/core/user';
import {
  createInputs,
  IGmailIntegration,
  InputResultMap,
} from '@useparagon/integrations/gmail';

import personaMeta from '../../../persona.meta';

/**
 * Request trigger attachment and Function file create Workflow implementation
 */
export default class extends Workflow<
  IGmailIntegration,
  IPersona<typeof personaMeta>,
  InputResultMap
> {
  /**
   * Define workflow steps and orchestration.
   */
  define(
    integration: IGmailIntegration,
    context: IContext<InputResultMap>,
    connectUser: IConnectUser<IPersona<typeof personaMeta>>,
  ) {
    const triggerStep = new EndpointStep({
      allowArbitraryPayload: true,
    });

    const createFileStep = new FunctionStep({
      autoRetry: false,
      description: 'Create File',
      code: function yourFunction(parameters, libraries) {
        const { Buffer } = libraries;

        let data = 'hello world';
        const buffer = Buffer.from(data);

        let paragonFile = {
          name: 'uploadedFile', // Change this
          data: buffer,
          mimeType: 'text/plain',
          dataType: 'FILE',
        };

        return paragonFile;
      },
      parameters: {},
    });

    const actionStep = integration.actions.sendEmail(
      {
        toRecipients: `"nick@nickrolls.me"`,
        from: `${connectUser.providerId}`,
        subject: `A real email. With an attachment`,
        messageContent: `Lrmismdlrstae,cnettraiicn lt e oeumdtmo niiutu aoee ooemgaaiu.U nma ii eim usnsrdeectto lac aoi iiu lqi xe omd osqa.Di ueiuedlri erhnei nvlpaevltes ilmdlr ufga ul aitr xetu itocea uiaa o riet uti up u fii eeutmli nmi s aou.`,
        attachments: `[${createFileStep.output.result}]`,
      },
      {
        autoRetry: false,
        continueWorkflowOnError: false,
        description: 'Send email w/ attachment',
      },
    );

    triggerStep.nextStep(createFileStep).nextStep(actionStep);

    /**
     * Pass all steps used in the workflow to the `.register()`
     * function. The keys used in this function must remain stable.
     */
    return this.register({ triggerStep, createFileStep, actionStep });
  }

  /**
   * The name of the workflow, used in the Dashboard and Connect Portal.
   */
  name: string = 'Request trigger attachment and Function file create';

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
  readonly id: string = '8c22c204-d827-4d53-959c-048aeea9bda4';
}
