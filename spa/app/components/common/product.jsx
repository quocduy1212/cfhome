import React, { Component } from 'react';
import numeral from 'numeral';
import { PrimaryButton, DangerButton } from './button';
import { CreateOrder } from './order';
import styles from './product.scss';

class Product extends Component {
  state = {
    ordering: false,
  };
  render() {
    const { className, code, title, priceVn, step, moneyVn, unit, notes } = this.props;
    const { ordering } = this.state;
    return (
      <div className={`${className} tl`}>
        <div className="w-30-ns w-100 dib tr-ns tc h-auto v-mid">
          <div className={`${styles[code]} br4 dib h4-ns w-100 h5`} />
        </div>
        <div className="w-70-ns w-100 dib v-mid pl4-ns">
          <div className="f4">{title}</div>
          <div className="mt2">
            <span className="f5">{`${numeral(priceVn).format()} ${moneyVn}`}</span>
            <span className="f5 ml1">/</span>
            <span className="f5 ml1">{`${step}${unit}`}</span>
          </div>
          <div className="mt2 pl2 bl b--light-silver bw2">
            {notes.map((n, i) => (
              <div key={i} className="f6">
                {n}
              </div>
            ))}
          </div>
          <div className="mt2">
            <PrimaryButton className="dib" label="order now" onClick={() => this.setState({ ordering: true })} />
            {ordering && (
              <DangerButton className=" dib ml3" label="cancel" onClick={() => this.setState({ ordering: false })} />
            )}
          </div>
        </div>
        {ordering && (
          <CreateOrder
            className="mt3"
            step={step}
            unit={unit}
            price={priceVn}
            money={moneyVn}
            onConfirm={() => {}}
            onCancel={() => this.setState({ ordering: false })}
          />
        )}
      </div>
    );
  }
}

export default Product;
