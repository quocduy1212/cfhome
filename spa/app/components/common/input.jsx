import React from 'react';
import styles from './input.scss';

const Input = ({ className = '', type, value, placeholder, onChange = () => {} }) => (
  <input
    type={type}
    className={`${styles.input} ${className}`}
    value={value}
    placeholder={placeholder}
    onChange={e => onChange(e.target.value)}
  />
);

const AreaInput = ({ className = '', rows = 3, value, placeholder, onChange = () => {} }) => (
  <textarea
    rows={rows}
    className={`${styles.input} ${className}`}
    value={value}
    placeholder={placeholder}
    onChange={e => onChange(e.target.value)}
  />
);

const NumberInput = ({ className = '', ...rest }) => <Input type="number" className={`tr ${className}`} {...rest} />;
const TextInput = ({ className = '', ...rest }) => <Input type="text" className={`${className}`} {...rest} />;
const TextAreaInput = ({ className = '', ...rest }) => <AreaInput className={`w-100 ${className}`} {...rest} />;

export { NumberInput, TextInput, TextAreaInput };
