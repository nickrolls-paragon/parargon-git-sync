import { IIntegrationConfig } from '@useparagon/core/integration';

import { default as AppEventCredentialidTesting } from './workflows/appEventCredentialidTesting';
import { default as CrewaiNewEmailTrigger } from './workflows/crewaiNewEmailTrigger';
import { default as EmptyWorkflow } from './workflows/emptyWorkflow';
import { default as ImageFailureAsAttachments } from './workflows/imageFailureAsAttachments';
import { default as IntegrationEnabledMultiAuthTesting } from './workflows/integrationEnabledMultiAuthTesting';
import { default as InternalResourceTesting } from './workflows/internalResourceTesting';
import { default as PostToInternalApiUpdatd } from './workflows/postToInternalApiUpdatd';
import { default as RequestTriggerAttachmentAndFunctionFileCreate } from './workflows/requestTriggerAttachmentAndFunctionFileCreate';
import { default as ResponseStepTesting } from './workflows/responseStepTesting';
import { default as ThrowErrorFunction } from './workflows/throwErrorFunction';
import { default as XmlParseJwtGeneration } from './workflows/xmlParse &JwtGeneration';

/**
 * configuration for a gmail
 */
const config: IIntegrationConfig = {
  description: 'Send email with Gmail',
  overviewText: `Connect to your Gmail account to manage your emails and drafts in Gmail. Increase your team’s productivity by keeping your Gmail account up to date - without manual data entry. 
                
Our Gmail integration enables you to:  
          
• Send email and drafts from your Gmail account
• Read and extract data from incoming emails in your Gmail account inbox
• Receive notifications upon receiving mail in your Gmail account inbox`,
  showWatermark: true,
  workflowDisplayOrder: [
    ThrowErrorFunction,
    ImageFailureAsAttachments,
    XmlParseJwtGeneration,
    RequestTriggerAttachmentAndFunctionFileCreate,
    PostToInternalApiUpdatd,
    IntegrationEnabledMultiAuthTesting,
    ResponseStepTesting,
    AppEventCredentialidTesting,
    CrewaiNewEmailTrigger,
    EmptyWorkflow,
    InternalResourceTesting,
  ],
};

export default config;
