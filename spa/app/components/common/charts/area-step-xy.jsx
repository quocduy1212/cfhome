import React, { Component } from 'react';
import c3 from 'c3';
import { commaThousandSeparated } from 'app-utils';
import styles from './area-spline.scss';

class AreaStepXY extends Component {
  componentDidMount() {
    const options = {
      bindto: this.ref,
      data: {
        x: this.props.xname,
        columns: [[this.props.xname, ...this.props.prices], [this.props.yname, ...this.props.yvalues]],
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
          min: this.props.min,
          max: this.props.max,
        },
      },
      legend: { show: false },
      tooltip: {
        show: true,
        format: {
          value: value => `${commaThousandSeparated(value)}/${commaThousandSeparated(this.props.totalY)}`,
        },
      },
      point: { show: false },
    };
    options.data.types[this.props.yname] = 'area-step';
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

export default AreaStepXY;
