import React from 'react';

const RenderField = ({ input, label, type, meta: { touched, error, warning } }) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} placeholder={label} type={type} />
      {touched &&
        ((error && <span className="error-span">{error}</span>) ||
          (warning && <span>{warning}</span>))}
    </div>
  </div>
)

export default RenderField;