import React from 'react';
import styles from './button.scss';

const Button = ({ className, label, onClick = () => {} }) => (
  <input type="button" className={className} value={label} onClick={onClick} />
);

const PrimaryButton = ({ className, ...rest }) => <Button className={`${styles.primary} ${className}`} {...rest} />;
const DangerButton = ({ className, ...rest }) => <Button className={`${styles.danger} ${className}`} {...rest} />;

const IconButton = ({ className = '', icon, onClick = () => {} }) => (
  <i className={`material-icons pointer ${className}`} onClick={onClick}>
    {icon}
  </i>
);

export { PrimaryButton, DangerButton, IconButton };
