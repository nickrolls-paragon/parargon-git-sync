import { IIntegrationConfig } from '@useparagon/core/integration';

import { default as CheckChildFiles } from './workflows/checkChildFiles';
import { default as FielCreateTest } from './workflows/fielCreateTest';
import { default as FileDeleteTest } from './workflows/fileDeleteTest';
import { default as FileUpdatedTest } from './workflows/fileUpdatedTest';
import { default as FileUpdatesFromGdrive } from './workflows/fileUpdatesFromGdrive';
import { default as UploadFile } from './workflows/uploadFile';

/**
 * configuration for a googledrive
 */
const config: IIntegrationConfig = {
  description: 'Save files to Google Drive',
  overviewText: `Connect your Google account and sync files from your Google Drive. 
        
Our Google Drive integration enables you to:
       
• Save files to your Google Drive
• Sync files from your Google Drive`,
  showWatermark: true,
  workflowDisplayOrder: [
    CheckChildFiles,
    FielCreateTest,
    FileDeleteTest,
    FileUpdatedTest,
    FileUpdatesFromGdrive,
    UploadFile,
  ],
};

export default config;
