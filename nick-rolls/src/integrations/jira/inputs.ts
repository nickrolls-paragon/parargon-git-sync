import { createInputs } from '@useparagon/integrations/jira';

/**
 * define inputs here which can be used across workflows
 */
const integrationInputs = createInputs({
  select_project: {
    id: '2d6c9f18-80cd-4e07-a847-6c65cab45b61',
    title: 'Select Project',
    tooltip: '',
    required: true,
    type: 'project',
  },
  issue_type: {
    id: '34cec3e4-7b86-4dbb-a215-bf8067330b8d',
    title: 'Issue Type',
    tooltip: '',
    required: true,
    type: 'issue_type',
    fieldMappings: [],
  },
});

export default integrationInputs;
