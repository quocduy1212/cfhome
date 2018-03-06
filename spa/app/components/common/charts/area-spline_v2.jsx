import React, { Component } from 'react';
import c3 from 'c3';
import styles from './area-spline.scss';

class AreaSplineV2 extends Component {
  componentDidMount() {
    c3.generate({
      bindto: this.ref,
      data: {
        columns: [
          ['prices', ...this.props.prices],
          ['uppers', ...this.props.uppers],
          ['middles', ...this.props.middles],
          ['lowers', ...this.props.lowers],
        ],
        types: {
          prices: 'area-spline',
          uppers: 'spline',
          middles: 'spline',
          lowers: 'spline',
        },
      },
      axis: {
        x: {
          show: false,
        },
        y: {
          show: false,
          min: this.props.min,
          max: this.props.max,
        },
      },
      legend: { show: false },
      tooltip: { show: false },
      point: { show: false },
    });
  }
  render() {
    const { className } = this.props;
    return (
      <div
        className={`${className} ${styles.miniChart}`}
        ref={ref => {
          this.ref = ref;
        }}
      />
    );
  }
}

export default AreaSplineV2;
