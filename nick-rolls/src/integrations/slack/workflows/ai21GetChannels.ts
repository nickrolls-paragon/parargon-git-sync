import {
  FunctionStep,
  IntegrationEnabledStep,
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
  ISlackIntegration,
} from '@useparagon/integrations/slack';

import personaMeta from '../../../persona.meta';

/**
 * ai21 GET channels Workflow implementation
 */
export default class extends Workflow<
  ISlackIntegration,
  IPersona<typeof personaMeta>,
  InputResultMap
> {
  /**
   * Define workflow steps and orchestration.
   */
  define(
    integration: ISlackIntegration,
    context: IContext<InputResultMap>,
    connectUser: IConnectUser<IPersona<typeof personaMeta>>,
  ) {
    const triggerStep = new IntegrationEnabledStep();

    const getChannelsStep = new IntegrationRequestStep({
      autoRetry: false,
      continueWorkflowOnError: false,
      description: 'Get Channels',
      method: 'GET',
      url: (pageToken: string) => `conversations.list?cursor=${pageToken}`,
      params: { cursor: (pageToken: string) => `${pageToken}` },
      headers: {},
      pagination: (currentStep) => ({
        pageToken: `${currentStep.output.response.body.response_metadata.next_cursor}`,
        outputPath: `${currentStep.output.response.body.channels}`,
        stopCondition: undefined,
      }),
    });

    const functionStep = new FunctionStep({
      autoRetry: false,
      description: 'description',
      code: function testFunction(parameters, libraries) {
        const channels = parameters.channels;
        const AWS = libraries['aws-sdk'];

        console.log(AWS);
      },

      parameters: { channels: getChannelsStep.output.response.body.channels },
    });

    const requestStep = new RequestStep({
      autoRetry: false,
      continueWorkflowOnError: false,
      description: 'Post to messages workflow',
      url: `https://zeus.useparagon.com/projects/858b131f-b803-4726-b285-72a97867cbe9/sdk/triggers/e1805f44-bf6e-47e0-8139-86226a4f1ce9`,
      method: 'POST',
      params: {},
      headers: { '': `` },
      authorization: {
        type: 'bearer',
        token: `eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxZjQ1ZTY5NC05NzdhLTQ3NGMtYjYzMC1kYTVjNzgzOWFkOTQiLCJpYXQiOjE3MzQ0NzYxNjUsImV4cCI6MTczNDU2MjU2NX0.e2i0DggIOMyUeUhJLp9Z6G4wYC4MG-ptyN-qKAhqYHNmfTlEnwfRK_VVw9rJasHWIP-NK8Uv3KOe0VnKiEUMg6NNeLfcU39C9fbo8KMN48Wo0ZDSM2r9wg2PVu3P8ngYzH62C1ggIsU7tnZOkt4WJjESLapvEmYUeRy93NtIi4WfhxnO2ezgk9UkmGQ0a_uKh2pZK4WrtAlL_UhuSRobR_bRYC-almtcmHr_1mE5zsIfkxMmykxIGJouqOpyYeS6_mSvlMO-hioI-Ggk4aQlMUzcL14zWRDc4w98WnRaa91Evcr8JnKIyZam-X9-Se43u2SoUxHKO4-ziDCyb6Jd0M6vQDDf5Qrzpxt-J-lD8VKxkW7sU9h-Vf0FM4y12iuMqaMCIhAM-8cRzv7J776BN4CjTHGDhYk2MjjNKGOWgsuEUcNkn0XbC3eAVxavKngHGCldpLJ_KCxaTesJb2dMiP19qiTaFHLcidpwUkJ-fu3NVZAUsEVcovdUH9ZEFt1NtqhAHXX6yKpdZk7M41X7Y567KACGFEE1KoaP1GiN-jw-JjRxYwbL96ppkWdhqwIHJ435iEH3d044oXPg2DAqQCLrvZSblFT5SY2cUjKMhHoctkzjnaIuyf_aByreG7cHEJFpJlQHC7EgdmSogYxkcA4Xes0dXejfrNrcc8JFhGE`,
      },
      body: { channel_id: `${functionStep.output.result}` },
      bodyType: 'json',
    });

    const actionStep = undefined;

    triggerStep
      .nextStep(getChannelsStep)
      .nextStep(functionStep)
      .nextStep(requestStep)
      .nextStep(actionStep);

    /**
     * Pass all steps used in the workflow to the `.register()`
     * function. The keys used in this function must remain stable.
     */
    return this.register({
      triggerStep,
      getChannelsStep,
      functionStep,
      requestStep,
      actionStep,
    });
  }

  /**
   * The name of the workflow, used in the Dashboard and Connect Portal.
   */
  name: string = 'ai21 GET channels';

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
  readonly id: string = '4b82c091-fdc7-4e2d-b3ff-dc27d75080e5';
}
