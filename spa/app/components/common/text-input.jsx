import React from 'react';

const TextInput = ({ className = '', value, onChange }) => (
  <input
    className={`pa2 br3 ba b--light-gray outline-0 ${className}`}
    type="text"
    value={value}
    onChange={event => onChange(event.target.value)}
  />
);

export default TextInput;
