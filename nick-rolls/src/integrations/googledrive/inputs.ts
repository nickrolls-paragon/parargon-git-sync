import { createInputs } from '@useparagon/integrations/googledrive';

/**
 * define inputs here which can be used across workflows
 */
const integrationInputs = createInputs({
  folder: {
    id: '2e6da17f-3f4f-4fe2-b1bb-f0cf65a3a267',
    title: 'Folder',
    tooltip: '',
    required: false,
    type: 'folder',
  },
});

export default integrationInputs;
