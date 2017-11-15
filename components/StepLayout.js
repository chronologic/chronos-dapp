import React from 'react';
import { inject, observer } from 'mobx-react';

import { NAVIGATION_STEPS } from '../lib/consts';
import StepNavigation from './StepNavigation';

@inject('store')
@observer
export default class StepLayout extends React.Component {
  render() {
    const { props: { activeStepKey, onNext, nextTitle } } = this;
    const {
      title,
      description,
      className,
    } = NAVIGATION_STEPS[activeStepKey];
    return (
      <section className="steps">
        <StepNavigation activeStep={activeStepKey} />
        <div className={`steps-content container ${className}`}>
          <div className="about-step">
            <p className="title">{title}</p>
            <p className="description">
              {description}
            </p>
          </div>
          {this.props.children}
        </div>
        <div className="button-container">
          <button className="button button_fill" onClick={onNext}>
            {nextTitle || 'Continue'}
          </button>
        </div>
      </section>
    );
  }
}
