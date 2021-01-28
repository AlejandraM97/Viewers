const BUTTON_PROOF_ONE = {
  id: 'Prueba1',
  label: 'Prueba 1',
  icon: 'palette',
  commandName: 'mySampleFunction',
};

const BUTTON_PROOF_TWO = {
  id: 'Prueba2',
  label: 'Prueba 2',
  icon: 'database',
  commandName: 'mySampleFunction',
};

const BUTTON_PROOF_THREE = {
  id: 'Prueba3',
  label: 'Prueba 3',
  icon: 'dot-circle',
  commandName: 'mySampleFunction',
};

export const BUTTON_MYSAMPLE = {
  id: 'teleBivl2ab_mySampleID',
  label: 'My Sample Button',
  icon: 'search',
  buttons: [BUTTON_PROOF_ONE, BUTTON_PROOF_TWO, BUTTON_PROOF_THREE],
};

// Heart volume predict
export const BUTTON_HEART_VOLUME = {
  id: 'teleBivl2ab_predictHeartVolume',
  label: 'Predecir MRI',
  icon: 'soft-tissue',
  commandName: 'predictHeartVolume',
};

// Here you can view the different buttons allowed on ohif viewer
export default {
  definitions: [BUTTON_MYSAMPLE, BUTTON_HEART_VOLUME],
  defaultContext: 'VIEWER',
};
