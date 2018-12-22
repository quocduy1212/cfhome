import React, { Component } from 'react';
import numeral from 'numeral';
import { IconButton, PrimaryButton, DangerButton } from './button';
import { NumberInput, TextInput, TextAreaInput } from './input';
import styles from './order.scss';

class CreateOrder extends Component {
  state = {
    phone: '',
    address: '',
    quanlity: 1,
  };

  onConfirm = () => {
    const { phone, address, quanlity, onConfirm } = this.state;
    const errors = [];
    if (!phone) {
      errors.push('Invalid phone number');
    }
    if (quanlity <= 0) {
      errors.push('Invalid quanlity number');
    }
    if (errors.length > 0) {
      this.setState({ errors });
      return;
    }
    onConfirm(quanlity, phone, address);
  };

  render() {
    const { className, step, money, unit, price, onCancel } = this.props;
    const { phone, address, quanlity } = this.state;
    return (
      <div className={`${className} tl`}>
        <div className="w-100">
          <div className="w-30-ns w-100 dib tr-ns tl v-mid">quanlity</div>
          <div className="w-70-ns w-100 dib  pl4-ns v-mid">
            <IconButton
              className={`${styles.minus} f2`}
              icon="remove"
              onClick={() => quanlity > 1 && this.setState({ quanlity: quanlity - 1 })}
            />
            <NumberInput
              className={`${styles.quantityInput} ml2 v-top w4`}
              value={quanlity}
              onChange={value => this.setState({ quanlity: parseInt(value, 10) })}
            />
            <IconButton
              className={`${styles.plus} f2 ml2`}
              icon="add"
              onClick={() => this.setState({ quanlity: quanlity + 1 })}
            />
            <div className="mt2">{`${quanlity * step}${unit} = ${numeral(quanlity * price).format()}${money}`}</div>
          </div>
        </div>
        <div className="w-100 mt3">
          <div className="w-30-ns w-100 dib tr-ns tl v-mid">phone number</div>
          <div className="w-70-ns w-100 dib  pl4-ns v-mid">
            <TextInput value={phone} onChange={value => this.setState({ phone: value })} />
          </div>
        </div>
        <div className="w-100 mt3">
          <div className="w-30-ns w-100 dib tr-ns tl v-mid">delivery address</div>
          <div className="w-70-ns w-100 dib  pl4-ns v-mid">
            <TextAreaInput value={address} onChange={value => this.setState({ address: value })} />
          </div>
        </div>
        <div className="w-100 mt3">
          <div className="w-30-ns w-100 dib tr-ns tl v-mid" />
          <div className="w-70-ns w-100 dib  pl4-ns v-mid">
            <PrimaryButton className="dib" label="confirm" onClick={this.onConfirm} />
            <DangerButton className=" dib ml3" label="cancel" onClick={onCancel} />
          </div>
        </div>
      </div>
    );
  }
}

export { CreateOrder };
