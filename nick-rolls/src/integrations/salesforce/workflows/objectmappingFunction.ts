import {
  FanOutStep,
  FunctionStep,
  IntegrationEnabledStep,
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
 * objectMapping Function Workflow implementation
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
    const triggerStep = new IntegrationEnabledStep();

    const actionStep = undefined;

    const actionStep1 = integration.actions.updateRecord(
      { recordType: 'Lead', recordId: `` },
      {
        autoRetry: false,
        continueWorkflowOnError: false,
        description: 'description',
      },
    );

    const mapStep = new FanOutStep({
      description: 'description',
      iterator: actionStep1.output.result.records,
    });

    const functionStep = new FunctionStep({
      autoRetry: false,
      description: 'Mapping Function',
      code: function integrationObjectToApplicationObject(
        parameters,
        libraries,
      ) {
        const { objectMapping, integrationObjects } = parameters;
        const { dynamicMappings, fieldMappings } = objectMapping;
        const resolvedFieldMappings =
          objectMapping.mappingType === 'DYNAMIC'
            ? Object.values(dynamicMappings || {})
            : Object.keys(fieldMappings || {}).map((applicationField) => ({
                applicationField,
                integrationField: fieldMappings?.[applicationField],
              }));

        const mapping = {
          objectType: objectMapping.objectMapping,
          fieldMappings:
            resolvedFieldMappings?.length > 0
              ? resolvedFieldMappings
              : undefined,
        };

        return integrationObjects.map((object) => {
          return (mapping.fieldMappings || []).reduce((acc, mapping) => {
            if (mapping.applicationField && mapping.integrationField) {
              return {
                ...acc,
                [mapping.applicationField]: object?.[mapping.integrationField],
              };
            }
            return acc;
          }, {});
        });
      },
      parameters: {
        objectMapping: '',
        integrationObjects: mapStep.output.instance,
      },
    });

    triggerStep
      .nextStep(actionStep)
      .nextStep(actionStep1)
      .nextStep(mapStep.branch(functionStep));

    /**
     * Pass all steps used in the workflow to the `.register()`
     * function. The keys used in this function must remain stable.
     */
    return this.register({
      triggerStep,
      actionStep,
      actionStep1,
      mapStep,
      functionStep,
    });
  }

  /**
   * The name of the workflow, used in the Dashboard and Connect Portal.
   */
  name: string = 'objectMapping Function';

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
  readonly id: string = '5ea15447-fcd1-4416-ba6c-67fceb237a87';
}
