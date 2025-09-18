import { IIntegrationConfig } from '@useparagon/core/integration';

import { default as CreateNotesTest } from './workflows/createNotesTest';

/**
 * configuration for a zendesk
 */
const config: IIntegrationConfig = {
  description: 'Sync records with Zendesk Support',
  overviewText: `This is a beautiful and elaborate description.

- Cool stuff
- More cool stuff
- Wow so much cool`,
  showWatermark: true,
  workflowDisplayOrder: [CreateNotesTest],
};

export default config;
