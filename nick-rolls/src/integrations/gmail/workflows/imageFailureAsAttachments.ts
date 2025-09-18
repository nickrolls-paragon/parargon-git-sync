import {
  ConditionalStep,
  IntegrationEnabledStep,
  RequestStep,
  Workflow,
} from '@useparagon/core';
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
 * image failure as attachments Workflow implementation
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
    const triggerStep = new IntegrationEnabledStep();

    const ifelseStep = new ConditionalStep({
      if: undefined,
      description: 'description',
    });

    const actionStep = integration.actions.sendEmail(
      {
        toRecipients: `"${triggerStep.output.request.body.toRecipeints}"`,
        from: `nick.rolls@useparagon.com`,
        subject: `${triggerStep.output.request.body.subject}`,
        messageContent: `${triggerStep.output.request.body.content}`,
        attachments: `[${triggerStep.output.request.body['paragon-file']}, ${triggerStep.output.request.body['paragon-file2']}]`,
        additionalHeaders: ``,
      },
      {
        autoRetry: false,
        continueWorkflowOnError: false,
        description: 'description',
      },
    );

    const ifelseStep1 = new ConditionalStep({
      if: undefined,
      description: 'description',
    });

    const requestStep = new RequestStep({
      autoRetry: false,
      continueWorkflowOnError: false,
      description: 'description',
      url: `https://webhook.site/1940e21f-249a-40a1-be6f-1a56330bed6e?=`,
      method: 'POST',
      params: {},
      headers: { '': `` },
      body: ``,
      bodyType: 'raw',
    });

    const ifelseStep2 = new ConditionalStep({
      if: undefined,
      description: 'description',
    });

    triggerStep
      .nextStep(
        ifelseStep
          .whenTrue(actionStep.nextStep(ifelseStep1))
          .whenFalse(requestStep),
      )
      .nextStep(ifelseStep2);

    /**
     * Pass all steps used in the workflow to the `.register()`
     * function. The keys used in this function must remain stable.
     */
    return this.register({
      triggerStep,
      ifelseStep,
      actionStep,
      ifelseStep1,
      requestStep,
      ifelseStep2,
    });
  }

  /**
   * The name of the workflow, used in the Dashboard and Connect Portal.
   */
  name: string = 'image failure as attachments';

  /**
   * A user-facing description of the workflow shown in the Connect Portal.
   */
  description: string = 'Is this a description that works?';

  /**
   * Define workflow-level User Settings. For integration-level User
   * Settings, see ../config.ts.
   * https://docs.useparagon.com/connect-portal/workflow-user-settings
   */
  inputs = createInputs({
    tell_us_how_you_feel: {
      id: '352b8734-2741-42e6-a995-7ab6f3101ced',
      title: 'Tell us how you feel',
      tooltip: '',
      required: false,
      type: 'text',
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
  readonly id: string = 'e8804981-06dd-47d7-9cbb-3d0c952cadc1';
}
