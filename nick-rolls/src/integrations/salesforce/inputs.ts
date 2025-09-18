import { createInputs } from '@useparagon/integrations/salesforce';

/**
 * define inputs here which can be used across workflows
 */
const integrationInputs = createInputs({
  'top_level_field_map_-_search_criteria': {
    id: 'd0e6ae41-c2d6-4dfb-936f-9a1573c9e52b',
    title: 'Top Level Field Map - Search Criteria',
    tooltip: 'Coach users to do smart things',
    required: true,
    type: 'field_mapping',
    useDynamicMapper: true,
    dynamicObjectName: 'salesforceDynamicObject',
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
