import React, { Component } from 'react';
import c3 from 'c3';
import styles from './area-spline.scss';

class AreaSpline extends Component {
  componentDidMount() {
    c3.generate({
      bindto: this.ref,
      data: {
        columns: [['data', ...this.props.data]],
        type: 'area-spline',
      },
      axis: {
        x: {
          show: false,
        },
        y: {
          show: false,
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

export default AreaSpline;
