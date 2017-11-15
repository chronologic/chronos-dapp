
export const getStepClass = (step, activeStep) => (step === activeStep ? 'step-navigation step-navigation_active' : 'step-navigation');

export default {
  getStepClass,
};
