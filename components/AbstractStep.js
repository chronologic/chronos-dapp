/* eslint-disable react/require-render-return */
import React from 'react';
import { action } from 'mobx';
import Router from 'next/router';

import { NAVIGATION_STEPS, PROPERTIES as ALL_PROPERTIES } from '../lib/consts';
import InputField from './InputField';

export default class AbstractStep extends React.Component {
  constructor(activeStepKey, props) {
    super(props);
    this.activeStepKey = activeStepKey;
    this.activeStep = NAVIGATION_STEPS[this.activeStepKey];
    if (!this.activeStep) {
      throw new Error('No steps with key', this.activeStepKey);
    }
    if (!this.activeStep.propertyKeys) {
      throw new Error('No propertyKeys for step', this.activeStep);
    }
    this.properties = ALL_PROPERTIES.reduce((result, value) => (
      this.activeStep.propertyKeys.includes(value.name) ?
        { ...result, [value.name]: value } :
        result
    ), {});
  }

  componentDidMount() {
    this.validatePrevState();
  }

  web3Disabled (web3Service){
    return !web3Service.connectedToMetaMask || !(typeof web3Service.accounts !== 'undefined' && web3Service.accounts.length > 0)
  }

  getValidations() {
    throw new Error('Implement me');
  }

  validatePrevState() {
    const prevProps = [];
    for (let idx = this.activeStep.idx - 1; idx > 0; idx -= 1) {
      const prevStep = Object.values(NAVIGATION_STEPS).find(step => step.idx === idx);
      if (prevStep) {
        prevProps.push(...ALL_PROPERTIES.reduce((result, value) => {
          if (prevStep.propertyKeys.includes(value.name)) {
            result.push({ name: value.name, validator: value.validator });
          }
          return result;
        }, []));
      }
    }
    const { props: { store = {} } } = this;
    if (prevProps.some(({ name, validator }) => !store[name] || !validator(store[name]))) {
      Router.push('/');
    }
  }

  @action
  change(property, event) {
    const { props: { store } } = this;
    const { value } = event.target;
    store[property] = value;
    this.validate(property);
  }

  @action
  validate(property) {
    const { props: { store } } = this;
    const validations = this.getValidations();
    const { validator } = this.properties[property];
    const value = store[property];
    validations[property] = validator(value);
    return validations[property];
  }

  goNext = (eventInst) => {
    var target = eventInst.target
    const {web3Service} = this.props;
    if(this.web3Disabled(web3Service) )
      return;
    target.disabled = true;
    const { props: { store } } = this;
    const validations = Object.keys(this.properties).map(property => this.validate(property));
    if (!validations.some(validation => !validation)) {
      const query = ALL_PROPERTIES.reduce((result, { name }) => {
        result[name] = store[name];
        return result;
      }, {});
      Router.push({
        pathname: this.activeStep.nextUrl,
        query,
      });
    }
    else
      target.disabled = false;
  };

  renderProperty(propertyData, otherProps = {}) {
    const { props: { store } } = this;
    const validations = this.getValidations();
    const {
      errorMessage,
      name,
      title,
    } = propertyData;
    return (
      <InputField
        type="text"
        errorMessage={errorMessage}
        valid={validations[name]}
        title={title}
        value={store[name]}
        onBlur={() => this.validate(name)}
        onChange={e => this.change(name, e)}
        {...otherProps}
      />
    );
  }

  render() {
    throw new Error('Override me');
  }
}
