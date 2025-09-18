import {
  ConditionalStep,
  FunctionStep,
  RequestStep,
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
  ISalesforceIntegration,
} from '@useparagon/integrations/salesforce';

import personaMeta from '../../../persona.meta';

/**
 * Call workflow from workflow - Paragon JWT Workflow implementation
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
      recordType: 'Lead',
    });

    const checkThingsStep = new ConditionalStep({
      if: Operators.DateTimeBefore(
        triggerStep.output.result.LastModifiedDate,
        '2025-04-22T19:23:03.423Z',
      ),
      description: 'Check things',
    });

    const functionStep = new FunctionStep({
      autoRetry: false,
      description: 'Generate Paragon JWT',
      code: function yourFunction(parameters, libraries) {},
      parameters: {},
    });

    const requestStep = new RequestStep({
      autoRetry: false,
      continueWorkflowOnError: false,
      description: 'Request to Workflow 1',
      url: `LINK TO PARAGON TRIGGER URL `,
      method: 'POST',
      params: {},
      headers: {},
      body: {},
      bodyType: 'json',
    });

    const functionStep1 = new FunctionStep({
      autoRetry: false,
      description: 'Generate Paragon JWT',
      /**
       * A function that generates a Paragon user token.
       * Requires the Paragon signing key
       * (should be added as an environment secret) be passed in as a parameter.
       * https://docs.useparagon.com/getting-started/installing-the-connect-sdk#id-2.-generate-a-paragon-user-token
       */
      code: function generateJwt(parameters, libraries) {
        const { paragonSigningKey, paragonUserId } = parameters;
        const { jsonwebtoken } = libraries;

        const key = paragonSigningKey.replaceAll('\\n', '\n');
        const currentTime = Math.floor(Date.now() / 1000);

        return jsonwebtoken.sign(
          {
            sub: paragonUserId,
            iat: currentTime,
            exp: currentTime + 60 * 60,
          },
          key,
          {
            algorithm: 'RS256',
          },
        );
      },
      parameters: {
        paragonSigningKey: context.getEnvironmentSecret('ParagonSigningKey'),
        paragonUserId: '12345',
      },
    });

    const requestStep1 = new RequestStep({
      autoRetry: false,
      continueWorkflowOnError: false,
      description: 'Request to Workflow 2',
      url: `LINK TO PARAGON TRIGGER URL `,
      method: 'POST',
      params: {},
      headers: { '': `` },
      authorization: {
        type: 'bearer',
        token: `${functionStep1.output.result}`,
      },
      body: { 'SF data': `${triggerStep.output.result}` },
      bodyType: 'json',
    });

    const requestStep2 = new RequestStep({
      autoRetry: false,
      continueWorkflowOnError: false,
      description: 'description',
      url: `https://example.com?=`,
      method: 'GET',
      params: { '': `` },
      headers: {},
    });

    triggerStep
      .nextStep(
        checkThingsStep
          .whenTrue(functionStep.nextStep(requestStep))
          .whenFalse(functionStep1.nextStep(requestStep1)),
      )
      .nextStep(requestStep2);

    /**
     * Pass all steps used in the workflow to the `.register()`
     * function. The keys used in this function must remain stable.
     */
    return this.register({
      triggerStep,
      checkThingsStep,
      functionStep,
      requestStep,
      functionStep1,
      requestStep1,
      requestStep2,
    });
  }

  /**
   * The name of the workflow, used in the Dashboard and Connect Portal.
   */
  name: string = 'Call workflow from workflow - Paragon JWT';

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
  readonly id: string = '5e6259cd-18b0-44b3-aa7e-4811eb0022e1';
}
