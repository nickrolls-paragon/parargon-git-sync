import { createInputs } from '@useparagon/integrations/slack';

/**
 * define inputs here which can be used across workflows
 */
const integrationInputs = createInputs({
  person_to_message: {
    id: '38dbd572-7396-4186-b818-531dbbe63434',
    title: 'Person to message',
    tooltip: 'Use this field to send message to the specified user',
    required: true,
    type: 'workspace_member',
  },
  channel_select: {
    id: '2ccb90fa-cb7a-414e-9895-d93707372d9f',
    title: 'Channel Select',
    tooltip: '',
    required: false,
    type: 'channel',
  },
});

export default integrationInputs;
