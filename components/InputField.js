import React from 'react';

const errorStyle = {
  color: 'red',
  fontWeight: 'bold',
  fontSize: '12px',
  width: '100%',
  height: '10px',
};

export default class InputField extends React.Component {
  render() {
    const {
      defaultValue,
      description,
      info,
      disabled,
      errorMessage,
      onBlur,
      onChange,
      side,
      title,
      type,
      valid,
      value,
    } = this.props;

    const error = !valid ? errorMessage : '';
    let attrs = [];
    attrs["disabled"] = disabled;
    attrs["type"] = type;
    attrs["onBlur"] = onBlur;
    attrs["defaultValue"] = defaultValue;
    attrs["onChange"] = onChange;
    attrs["className"] = type=='checkbox'?"input left_checkbox":"input";
    attrs["value"] = value;
    return (
      <div className={side}>
        <label className="label">{title}
          {info &&
            <a className="label_info" data-tip={info}/> }
        </label>
        <input
          {...attrs}
        />
        { description ? <p className="description">{description}</p> : null }
        <p style={errorStyle}>{error}</p>
      </div>
    );
  }
}
