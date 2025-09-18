import {
  DelayStep,
  EndpointStep,
  FunctionStep,
  ResponseStep,
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
 * Timeout Testing Workflow implementation
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

    const delayStep = new DelayStep({
      unit: 'SECONDS',
      value: 25,
      description: 'description',
    });

    const randomFuncStep = new FunctionStep({
      autoRetry: false,
      description: 'random func',
      code: function getDateTwoWeeksFromNow() {
        const now = new Date();
        now.setDate(now.getDate() + 14); // Add 14 days to the current date
        return now.toISOString(); // Convert to ISO 8601 format
      },
      parameters: {},
    });

    const randomFuncStep1 = new FunctionStep({
      autoRetry: false,
      description: 'random func',
      code: function getDateTwoWeeksFromNow() {
        const now = new Date();
        now.setDate(now.getDate() + 14); // Add 14 days to the current date
        return now.toISOString(); // Convert to ISO 8601 format
      },
      parameters: {},
    });

    const randomFuncStep2 = new FunctionStep({
      autoRetry: false,
      description: 'random func',
      code: function getDateTwoWeeksFromNow() {
        const now = new Date();
        now.setDate(now.getDate() + 14); // Add 14 days to the current date
        return now.toISOString(); // Convert to ISO 8601 format
      },
      parameters: {},
    });

    const randomFuncStep3 = new FunctionStep({
      autoRetry: false,
      description: 'random func',
      code: function getDateTwoWeeksFromNow() {
        const now = new Date();
        now.setDate(now.getDate() + 14); // Add 14 days to the current date
        return now.toISOString(); // Convert to ISO 8601 format
      },
      parameters: {},
    });

    const randomFuncStep4 = new FunctionStep({
      autoRetry: false,
      description: 'random func',
      code: function getDateTwoWeeksFromNow() {
        const now = new Date();
        now.setDate(now.getDate() + 14); // Add 14 days to the current date
        return now.toISOString(); // Convert to ISO 8601 format
      },
      parameters: {},
    });

    const randomFuncStep5 = new FunctionStep({
      autoRetry: false,
      description: 'random func',
      code: function getDateTwoWeeksFromNow() {
        const now = new Date();
        now.setDate(now.getDate() + 14); // Add 14 days to the current date
        return now.toISOString(); // Convert to ISO 8601 format
      },
      parameters: {},
    });

    const randomFuncStep6 = new FunctionStep({
      autoRetry: false,
      description: 'random func',
      code: function getDateTwoWeeksFromNow() {
        const now = new Date();
        now.setDate(now.getDate() + 14); // Add 14 days to the current date
        return now.toISOString(); // Convert to ISO 8601 format
      },
      parameters: {},
    });

    const actionStep = integration.actions.searchRecords(
      {
        recordType: 'Account',
        filterFormula: Operators.StringContains('Name', 'test'),
      },
      {
        autoRetry: false,
        continueWorkflowOnError: false,
        description: 'description',
      },
    );

    const responseStep = new ResponseStep({
      description: 'description',
      statusCode: 200,
      responseType: 'JSON',
      body: { data: `"nice work it's done` },
    });

    triggerStep
      .nextStep(delayStep)
      .nextStep(randomFuncStep)
      .nextStep(randomFuncStep1)
      .nextStep(randomFuncStep2)
      .nextStep(randomFuncStep3)
      .nextStep(randomFuncStep4)
      .nextStep(randomFuncStep5)
      .nextStep(randomFuncStep6)
      .nextStep(actionStep)
      .nextStep(responseStep);

    /**
     * Pass all steps used in the workflow to the `.register()`
     * function. The keys used in this function must remain stable.
     */
    return this.register({
      triggerStep,
      delayStep,
      randomFuncStep,
      randomFuncStep1,
      randomFuncStep2,
      randomFuncStep3,
      randomFuncStep4,
      randomFuncStep5,
      randomFuncStep6,
      actionStep,
      responseStep,
    });
  }

  /**
   * The name of the workflow, used in the Dashboard and Connect Portal.
   */
  name: string = 'Timeout Testing';

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
  readonly id: string = '6f940851-ddbd-4284-a555-a7dafe228a57';
}
