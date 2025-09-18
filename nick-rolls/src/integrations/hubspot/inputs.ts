import { createInputs } from '@useparagon/integrations/hubspot';

/**
 * define inputs here which can be used across workflows
 */
const integrationInputs = createInputs({
  field_maps: {
    id: '268802f0-4750-48e8-8454-b6d89530672e',
    title: 'Field Maps',
    tooltip: '',
    required: true,
    type: 'field_mapping',
    useDynamicMapper: false,
    fieldMappings: [
      {
        label: 'fname',
      },
      {
        label: 'lname',
      },
      {
        label: 'email_address',
      },
      {
        label: 'job',
      },
    ],
  },
  select_stage_for_updated_deals: {
    id: 'f1d8965e-3c31-4629-a518-289c61b42f31',
    title: 'Select Stage for updated deals',
    tooltip: '',
    required: false,
    type: 'deal_stage',
    fieldMappings: [],
  },
  stage_mapping: {
    id: '5a48995f-9e7a-4911-8d25-38d2083cd730',
    title: 'stage mapping',
    tooltip: '',
    required: false,
    type: 'field_mapping',
    useDynamicMapper: true,
    dynamicObjectName: 'stage mapping',
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
