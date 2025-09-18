
    import { IContext } from "@useparagon/core/execution";
import { Workflow,CronStep,DelayStep,EventStep,FunctionStep,ConditionalStep,FanOutStep,ResponseStep,RequestStep,IntegrationEnabledStep,UnselectedStep,EndpointStep,IntegrationRequestStep,ICustomIntegration,CustomTriggerStep } from "@useparagon/core";
import { IPersona } from '@useparagon/core/persona';
import * as Operators from "@useparagon/core/operator";
import { ConditionalInput } from '@useparagon/core/steps/library/conditional';
import { IConnectUser, IPermissionContext } from '@useparagon/core/user';
import { createInputs, InputResultMap, ISalesforceIntegration } from '@useparagon/integrations/salesforce';

import personaMeta from '../../../persona.meta';
import sharedInputs from '../inputs'

    /**
     * Data chunk example (Array) Workflow implementation
     */
    export default class extends Workflow<
        ISalesforceIntegration, 
        IPersona<typeof personaMeta>, 
        InputResultMap
        >{
        /**
         * Define workflow steps and orchestration.
         */
        define(
          integration: ISalesforceIntegration, 
          context: IContext<InputResultMap>, 
          connectUser: IConnectUser<IPersona<typeof personaMeta>>
        ) {
          
        const triggerStep = new EndpointStep({
          allowArbitraryPayload: true,
          
        });
      

        const chunkFuncStep = new FunctionStep({
          autoRetry: false,
          description: 'Chunk Func',
          code: function chunkFunc(parameters, libraries) {
  const records = parameters.arrayOfRecords
  const lodash = libraries.lodash

  if (records.length <= 99) {
    return lodash.chunk(records, 5)
  } else if (records.length >= 100) {
    return {
        lodash.chunk(records, 25)
    }
  } else {
     throw new Error("The array has a different number of records.");

  }
  
},
          parameters: {'arrayOfRecords' : triggerStep.output.request.body.records,},
        });
      

      const mapStep = new FanOutStep({
        description: 'Group of Arrays',
        iterator: chunkFuncStep.output.result,
      });
    

      const eachArrayStep = new FanOutStep({
        description: 'Each Array',
        iterator: mapStep.output.instance,
      });
    

        const requestStep = new RequestStep({
          autoRetry: false,
          continueWorkflowOnError: false,
          description: 'description',
          url: `https://example.com?=`,
          method: 'POST',
          params: {},
          headers: {},
          body: {'' : ``,},
          bodyType: "json"
        });
      

        const functionStep = new FunctionStep({
          autoRetry: false,
          description: 'Make random number',
          code: function getRandomNumber() {
  return Math.floor(Math.random() * 10) + 1;
},
          parameters: {},
        });
      

        const delayStep = new DelayStep({
          unit: 'SECONDS',
          value: functionStep.output.result,
          description: 'description',
        });
      

        const requestStep1 = new RequestStep({
          autoRetry: false,
          continueWorkflowOnError: false,
          description: 'Each instance in Array',
          url: `https://webhook.site/cc04b3e0-7bdb-4d50-bb8b-2fcd4085669c`,
          method: 'POST',
          params: {},
          headers: {},
          body: {'data' : `${eachArrayStep.output.instance}`,},
          bodyType: "json"
        });
      

          
            triggerStep.nextStep(chunkFuncStep).nextStep(
              mapStep.branch(
            
              eachArrayStep.branch(
            requestStep.nextStep(functionStep).nextStep(delayStep).nextStep(requestStep1)
            
          )
            
            
          )
            )
            
          

          /**
           * Pass all steps used in the workflow to the `.register()`
           * function. The keys used in this function must remain stable.
           */
          return this.register({ triggerStep, chunkFuncStep, mapStep, eachArrayStep, requestStep, functionStep, delayStep, requestStep1 });
        }

        /**
         * The name of the workflow, used in the Dashboard and Connect Portal.
         */
        name: string = 'Data chunk example (Array)';

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
        definePermissions(connectUser: IPermissionContext<IPersona<typeof personaMeta>>): ConditionalInput | undefined {
          return undefined
        }

        /**
         * This property is maintained by Paragon. Do not edit this property.
         */
        readonly id: string = '5be9409c-5be3-40c6-b5f4-912c3bf08d53'; 
    }
