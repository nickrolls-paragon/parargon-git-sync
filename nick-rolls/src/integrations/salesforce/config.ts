import { IIntegrationConfig } from '@useparagon/core/integration';

import { default as CallWorkflowFromWorkflowParagonJwt } from './workflows/callWorkflowFromWorkflowParagonJwt';
import { default as CronTriggerWhenStart } from './workflows/cronTriggerWhenStart';
import { default as DataChunkExampleArray } from './workflows/dataChunkExample (array)';
import { default as DataChunkExampleDates } from './workflows/dataChunkExample (dates)';
import { default as DynamicFieldsExample } from './workflows/dynamicFieldsExample';
import { default as IntegrationEnabledFieldMapTest } from './workflows/integrationEnabledFieldMapTest';
import { default as MxSolutionsCampaignInfo } from './workflows/mxSolutionsCampaignInfo';
import { default as NewRecordContact } from './workflows/newRecordContact';
import { default as ObjectmappingFunction } from './workflows/objectmappingFunction';
import { default as TimeoutTesting } from './workflows/timeoutTesting';
import { default as UpdateOrCreateContact } from './workflows/updateOrCreateContact';

/**
 * configuration for a salesforce
 */
const config: IIntegrationConfig = {
  description: 'Sync records from Salesforce',
  overviewText: `Connect your Salesforce account and sync your Salesforce accounts, contacts, leads, or opportunities. Enable your sales team to close more deals by keeping your Salesforce CRM records up to date - without manual data entry.    
    
Our Salesforce integration enables you to:  
    
• Automatically create or update records in Salesforce  
• Sync records from Salesforce  
• Receive updates when a record in Salesforce is created or updated`,
  showWatermark: false,
  workflowDisplayOrder: [
    UpdateOrCreateContact,
    DynamicFieldsExample,
    DataChunkExampleDates,
    MxSolutionsCampaignInfo,
    ObjectmappingFunction,
    IntegrationEnabledFieldMapTest,
    CronTriggerWhenStart,
    CallWorkflowFromWorkflowParagonJwt,
    NewRecordContact,
    DataChunkExampleArray,
    TimeoutTesting,
  ],
  theme: 'match_system_theme',
};

export default config;
