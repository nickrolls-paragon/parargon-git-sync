import { createInputs } from '@useparagon/integrations/gmail';

/**
 * define inputs here which can be used across workflows
 */
const integrationInputs = createInputs({
  who_to_send_from: {
    id: '89f9c1b0-3885-4f17-a6a4-d8710573d2f7',
    title: 'Who to send from ',
    tooltip: '',
    required: false,
    type: 'email',
  },
});

export default integrationInputs;
