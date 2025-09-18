import { IIntegrationConfig } from '@useparagon/core/integration';

/**
 * configuration for a googlesheets
 */
const config: IIntegrationConfig = {
  description: 'Sync data with Google Sheets',
  overviewText: `Connect your Google account and sync data with your Google Sheets spreadsheets.  
         

Our Google Sheets integration enables you to:  
     

• Automatically create or update rows in Google Sheets 
• Sync spreadsheets from Google Sheets
• Receive updates when new rows are added to a spreadsheet in Google Sheets`,
  showWatermark: true,
  workflowDisplayOrder: [],
};

export default config;
