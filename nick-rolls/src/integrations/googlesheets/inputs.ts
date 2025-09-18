import { createInputs } from '@useparagon/integrations/googlesheets';

/**
 * define inputs here which can be used across workflows
 */
const integrationInputs = createInputs({
  select_a_sheets: {
    id: '7091960d-cef3-4ade-bcf3-3b52a8798eae',
    title: 'Select a sheets',
    tooltip: '',
    required: false,
    type: 'spreadsheet',
  },
});

export default integrationInputs;
