import { createInputs } from '@useparagon/integrations/microsoftTeams';

/**
 * define inputs here which can be used across workflows
 */
const integrationInputs = createInputs({
  channel_select: {
    id: '2a68694d-6ea9-43c2-89b6-ecbbd9c1a58d',
    title: 'Channel Select',
    tooltip: 'Select to send message in ',
    required: true,
    type: 'channel',
    fieldMappings: [],
  },
});

export default integrationInputs;
