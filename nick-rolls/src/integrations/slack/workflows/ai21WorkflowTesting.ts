import {
  ConditionalStep,
  EndpointStep,
  FanOutStep,
  FunctionStep,
  IntegrationRequestStep,
  Workflow,
} from '@useparagon/core';
import { IContext } from '@useparagon/core/execution';
import * as Operators from '@useparagon/core/operator';
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
 * ai21 workflow testing Workflow implementation
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
    const triggerStep = new EndpointStep({
      allowArbitraryPayload: false,
      paramValidations: [] as const,
      headerValidations: [] as const,
      bodyValidations: [
        {
          key: 'doEvent',
          dataType: 'STRING',
          required: true,
        },
        {
          key: 'specificChannels',
          dataType: 'STRING',
          required: false,
        },
      ] as const,
    });

    const integrationRequestStep = new IntegrationRequestStep({
      autoRetry: false,
      continueWorkflowOnError: false,
      description: 'GET all channels',
      method: 'GET',
      url: `/conversations.list`,
      params: {},
      headers: {},
    });

    const ifelseStep = new ConditionalStep({
      if: Operators.Exists(triggerStep.output.request.body),
      description: 'Check if specific channels requested',
    });

    const functionStep = new FunctionStep({
      autoRetry: false,
      description: 'Filter channels',
      code: function findChannels(parameters) {
        function filterByPartialName(array, searchTerm) {
          if (!Array.isArray(array)) {
            throw new Error('First argument must be an array');
          }
          if (typeof searchTerm !== 'string') {
            throw new Error('Search term must be a string');
          }

          // Convert searchTerm to lowercase for case-insensitive matching
          const lowerCaseSearchTerm = searchTerm.toLowerCase();

          // Filter the array
          return array.filter((item) =>
            item.name.includes(lowerCaseSearchTerm),
          );
        }
        const data = parameters.channels;
        const search = parameters.channelsFilter;

        return filterByPartialName(data, search);
      },

      parameters: {
        channels: integrationRequestStep.output.response.body.channels,
        channelsFilter: triggerStep.output.request.body.specificChannels,
      },
    });

    const mapStep = new FanOutStep({
      description: 'Iterate through filtered channels',
      iterator: functionStep.output.result,
    });

    const getMessagesStep = new IntegrationRequestStep({
      autoRetry: false,
      continueWorkflowOnError: false,
      description: 'Get messages',
      method: 'GET',
      url: `conversations.history?channel=${mapStep.output.instance.id}`,
      params: { channel: `${mapStep.output.instance.id}` },
      headers: {},
    });

    triggerStep
      .nextStep(integrationRequestStep)
      .nextStep(
        ifelseStep.whenTrue(
          functionStep.nextStep(mapStep.branch(getMessagesStep)),
        ),
      );

    /**
     * Pass all steps used in the workflow to the `.register()`
     * function. The keys used in this function must remain stable.
     */
    return this.register({
      triggerStep,
      integrationRequestStep,
      ifelseStep,
      functionStep,
      mapStep,
      getMessagesStep,
    });
  }

  /**
   * The name of the workflow, used in the Dashboard and Connect Portal.
   */
  name: string = 'ai21 workflow testing';

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
  readonly id: string = 'a253ffa5-563f-4695-b102-b519bb592bb7';
}
