import { EndpointStep, FunctionStep, Workflow } from '@useparagon/core';
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
 * Data chunk example (dates) Workflow implementation
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

    const functionStep = new FunctionStep({
      autoRetry: false,
      description: 'description',
      code: function getMonthlyDateRanges(parameters) {
        const startDate = parameters.startDate;

        const result = [];
        let current = new Date(startDate);
        const now = new Date();

        // Normalize to the start of the day
        current.setDate(1);
        current.setHours(0, 0, 0, 0);

        while (current <= now) {
          const startOfMonth = new Date(current);
          const endOfMonth = new Date(
            current.getFullYear(),
            current.getMonth() + 1,
            0,
          );

          // If endOfMonth is after now, cap it at today
          if (endOfMonth > now) {
            endOfMonth.setTime(now.getTime());
          }

          result.push({
            start: startOfMonth.toISOString().split('T')[0], // format as YYYY-MM-DD
            end: endOfMonth.toISOString().split('T')[0],
          });

          // Move to the first day of the next month
          current.setMonth(current.getMonth() + 1);
        }

        return result;
      },
      parameters: {
        startDate: context.getInput(this.inputs.historical_data_date),
      },
    });

    triggerStep.nextStep(functionStep);

    /**
     * Pass all steps used in the workflow to the `.register()`
     * function. The keys used in this function must remain stable.
     */
    return this.register({ triggerStep, functionStep });
  }

  /**
   * The name of the workflow, used in the Dashboard and Connect Portal.
   */
  name: string = 'Data chunk example (dates)';

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
    historical_data_date: {
      id: 'f6698052-948b-4111-83c4-37b07ff006c9',
      title: 'Historical Data Date',
      tooltip:
        'Specify a date in the past in YYYY-MM-DD format to get data from that point on',
      required: true,
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
  readonly id: string = 'b82bd998-bf75-41b7-b93a-cae59322ebb2';
}
