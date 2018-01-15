import React from 'react';

import { getStepClass } from '../lib/utils';
import { NAVIGATION_STEPS } from '../lib/consts';

export default class StepNavigation extends React.Component {
  render() {
    const { activeStep, activeApp } = this.props;
    return (
      <div className="steps-navigation">
        <div className="container">
          {Object.entries(NAVIGATION_STEPS[activeApp]).map(([key, { title }]) => {
            const className = getStepClass(key, activeStep);
            return <div key={key} className={className}>{title}</div>;
          })}
        </div>
      </div>
    );
  }
}
