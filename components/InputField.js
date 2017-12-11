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
    console.log(description)

    const error = !valid ? errorMessage : '';
    return (
      <div className={side}>
        <label className="label">{title}
          {info &&
            <a className="label_info" data-tip={info}/> }
        </label>
        <input
          disabled={disabled}
          type={type}
          className="input"
          onBlur={onBlur}
          value={value}
          defaultValue={defaultValue}
          onChange={onChange}
        />
        { description ? <p className="description">{description}</p> : null }
        <p style={errorStyle}>{error}</p>
      </div>
    );
  }
}
