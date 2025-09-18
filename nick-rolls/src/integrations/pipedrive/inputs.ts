import { createInputs } from '@useparagon/integrations/pipedrive';

/**
 * define inputs here which can be used across workflows
 */
const integrationInputs = createInputs({
  field_maps: {
    id: '6c17d74f-8c69-4cd9-8195-cad40d3f88e7',
    title: 'Field Maps',
    tooltip: '',
    required: false,
    type: 'custom_field_mapping',
    useDynamicMapper: false,
    fieldMappings: [
      {
        label: 'First Name',
      },
      {
        label: 'Last Name',
      },
    ],
  },
  lead_and_user_access: {
    id: '48c16a2d-106d-4f94-91d5-6451beb3343d',
    title: 'Lead and User Access',
    tooltip: 'Add an API key from your account to access Lead and User Objects',
    required: false,
    type: 'password',
  },
});

export default integrationInputs;
