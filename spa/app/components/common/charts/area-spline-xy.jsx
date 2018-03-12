import React, { Component } from 'react';
import c3 from 'c3';
import styles from './area-spline.scss';

class AreaSplineXY extends Component {
  componentDidMount() {
    const options = {
      bindto: this.ref,
      data: {
        x: 'prices',
        columns: [['prices', ...this.props.prices], [this.props.yname, ...this.props.quantity]],
        types: {},
      },
      color: {
        pattern: [this.props.color],
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
    };
    options.data.types[this.props.yname] = 'area';
    c3.generate(options);
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
