import React, { Component } from 'react';
import c3 from 'c3';
import styles from './area-spline.scss';

class AreaSplineXY extends Component {
  componentDidMount() {
    c3.generate({
      bindto: this.ref,
      data: {
        x: 'prices',
        columns: [['prices', ...this.props.prices], ['quantity', ...this.props.quantity]],
        types: {
          quantity: 'area-spline',
        },
      },
      axis: {
        x: {
          show: false,
        },
        y: {
          show: false,
          min: Math.min(...this.props.quantity),
          max: Math.max(...this.props.quantity),
        },
      },
      legend: { show: false },
      tooltip: { show: true },
      point: { show: false },
    });
  }
  render() {
    const { className } = this.props;
    return (
      <div
        className={`${className} ${styles.orderBook}`}
        ref={ref => {
          this.ref = ref;
        }}
      />
    );
  }
}

export default AreaSplineXY;
