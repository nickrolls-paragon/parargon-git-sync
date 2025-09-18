import { createInputs } from '@useparagon/integrations/marketo';

/**
 * define inputs here which can be used across workflows
 */
const integrationInputs = createInputs({
  object_name: {
    id: '2b1b79b5-0039-4898-8a84-f614a2a15bcd',
    title: 'Object Name',
    tooltip: '',
    required: false,
    type: 'field_mapping',
    useDynamicMapper: true,
    dynamicObjectName: 'testobject',
    dynamicObjectOptions: [
      {
        label: 'Example Field 1',
        value: 'field1',
      },
      {
        label: 'Example Field 2',
        value: 'field2',
      },
    ],
  },
});

export default integrationInputs;
