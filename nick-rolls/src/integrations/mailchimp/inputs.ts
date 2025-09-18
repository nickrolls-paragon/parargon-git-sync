import { createInputs } from '@useparagon/integrations/mailchimp';

/**
 * define inputs here which can be used across workflows
 */
const integrationInputs = createInputs({
  lists: {
    id: '8ba66a1c-ca31-4d91-b131-72a2efdf6d5f',
    title: 'lists',
    tooltip: '',
    required: false,
    type: 'list',
  },
});

export default integrationInputs;
