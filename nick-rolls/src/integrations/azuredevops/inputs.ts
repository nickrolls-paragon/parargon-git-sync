import { createInputs } from '@useparagon/integrations/azuredevops';

/**
 * define inputs here which can be used across workflows
 */
const integrationInputs = createInputs({
  testing_paragraph_usage: {
    id: '62c37a34-056b-4d11-9dfc-0f9a8bf8cde8',
    title: 'Testing Paragraph usage',
    type: 'custom_field_mapping',
    objectName: 'paragraphFieldMapping',
    mockObjectTypes: [
      {
        label: 'Contacts',
        value: 'contacts',
      },
      {
        label: 'Leads',
        value: 'leads',
      },
    ],
    mockIntegrationFields: [
      {
        label: 'First Name',
        value: 'first_name',
      },
      {
        label: 'Last Name',
        value: 'last_name',
      },
      {
        label: 'Email',
        value: 'email',
      },
    ],
    tooltip: '',
    required: false,
  },
});

export default integrationInputs;
