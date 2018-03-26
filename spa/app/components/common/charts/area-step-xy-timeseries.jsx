import React, { Component } from 'react';
import c3 from 'c3';
import styles from './area-spline.scss';

class AreaStepXYTimeseries extends Component {
  componentDidMount() {
    const options = {
      bindto: this.ref,
      data: {
        x: this.props.xname,
        xFormat: '%d-%m-%Y',
        columns: [[this.props.xname, ...this.props.xvalues], [this.props.yname, ...this.props.yvalues]],
        type: 'area-step',
      },
      axis: {
        x: {
          type: 'timeseries',
          tick: {
            format: '%d-%m-%Y',
          },
          show: false,
        },
        y: {
          show: false,
          min: Math.min(...this.props.yvalues),
          max: Math.max(...this.props.yvalues),
        },
      },
      legend: { show: false },
      tooltip: { show: true },
      point: { show: false },
    };
    c3.generate(options);
  }
  render() {
    const { className } = this.props;
    return (
      <div
        className={`${className} ${styles.volume}`}
        ref={ref => {
          this.ref = ref;
        }}
      />
    );
  }
}

export default AreaStepXYTimeseries;
