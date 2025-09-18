import {
  EndpointStep,
  FunctionStep,
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
 * XML Parse & JWT generation Workflow implementation
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

    const parseXmlStep = new FunctionStep({
      autoRetry: false,
      description: 'Parse XML',
      code: function convertXmlToJson(parameters, libraries) {
        const fastXmlParser = libraries['fast-xml-parser'];

        const options = {
          ignoreAttributes: true,
          attributeNamePrefix: '@',
        };

        const { xmlString } = parameters;

        const jsonObj = fastXmlParser.parse(xmlString, options);

        const items = ((((jsonObj['SOAP-ENV:Envelope'] || {})[
          'SOAP-ENV:Body'
        ] ||
          {} ||
          {})['ns1:wsdlGetUnitsAPIKeyV2Response'] || {})['return'] || {})[
          'item'
        ];

        const units = Array.isArray(items)
          ? items.reduce((acc, item) => {
              const name = item.extGroupId || item.extUnitId || item.name;
              acc[name] = {
                qnxId: parseInt(item.groupId, 10),
                groupId: parseInt(item.districtGroupId, 10),
                apiKey: item.API_key,
              };
              return acc;
            }, {})
          : {};

        const unitNames = Object.keys(units);

        return { units: units, unitNames: unitNames };
      },
      parameters: { xmlString: triggerStep.output.request.body.data },
    });

    const generateJwtStep = new FunctionStep({
      autoRetry: false,
      description: 'Generate JWT',
      code: function yourFunction(parameters, libraries) {
        const { signingKey, userId } = parameters;
        const { jsonwebtoken } = libraries;

        const key = signingKey.replaceAll('\\n', '\n');
        const currentTime = Math.floor(Date.now() / 1000);

        return jsonwebtoken.sign(
          {
            sub: userId,
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
        signingKey: context.getEnvironmentSecret('ParagonSigningKey'),
        userId: '858b131f-b803-4726-b285-72a97867cbe9',
      },
    });

    const requestStep = new RequestStep({
      autoRetry: false,
      continueWorkflowOnError: false,
      description: 'description',
      url: `https://webhook.site/1d380375-20c3-43ea-83c6-dbb01fc2d44b`,
      method: 'POST',
      params: {},
      headers: {},
      body: {
        data: `${parseXmlStep.output.result}`,
        JWT: `${generateJwtStep.output}`,
      },
      bodyType: 'json',
    });

    triggerStep
      .nextStep(parseXmlStep)
      .nextStep(generateJwtStep)
      .nextStep(requestStep);

    /**
     * Pass all steps used in the workflow to the `.register()`
     * function. The keys used in this function must remain stable.
     */
    return this.register({
      triggerStep,
      parseXmlStep,
      generateJwtStep,
      requestStep,
    });
  }

  /**
   * The name of the workflow, used in the Dashboard and Connect Portal.
   */
  name: string = 'XML Parse & JWT generation';

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
  readonly id: string = '7961ba16-12af-4fa3-b26f-4fd499cd9a90';
}
