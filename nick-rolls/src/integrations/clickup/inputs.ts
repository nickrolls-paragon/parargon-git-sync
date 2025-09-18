import { createInputs } from '@useparagon/integrations/clickup';

/**
 * define inputs here which can be used across workflows
 */
const integrationInputs = createInputs({
  select_space: {
    id: 'd9c6777f-58c1-4f56-b571-3a3a76b98d2b',
    title: 'Select Space',
    tooltip: '',
    required: true,
    type: 'space',
  },
  select_list: {
    id: '8d73bc89-487c-4e9f-8dc6-1505ecfc9ebe',
    title: 'Select List',
    tooltip: '',
    required: true,
    type: 'list',
    fieldMappings: [],
  },
  select_status: {
    id: '2e9f6749-75ad-4f1f-8e7c-c1e1c517f9f2',
    title: 'Select Status',
    tooltip: '',
    required: true,
    type: 'status',
    fieldMappings: [],
  },
  select_folder: {
    id: '1e62a25c-ddeb-4417-be3d-ff3c49b58a7d',
    title: 'Select Folder',
    tooltip: '',
    required: true,
    type: 'folder',
    fieldMappings: [],
  },
  sdk_refreshing_data: {
    id: '66ecaf69-4391-4d02-b52e-ca08e57efa3d',
    title: 'SDK refreshing DATA',
    tooltip: '',
    required: true,
    type: 'text',
  },
});

export default integrationInputs;
