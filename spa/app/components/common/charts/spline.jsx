import React, { Component } from 'react';
import c3 from 'c3';
import styles from './area-spline.scss';

class Spline extends Component {
  static defaultProps = {
    showX: false,
    showY: false,
    legend: false,
    tooltip: false,
    point: false,
    className: '',
  };

  componentDidMount() {
    const options = {
      bindto: this.ref,
      data: {
        columns: [['slow', ...this.props.slow], ['full', ...this.props.full]],
        type: 'spline',
        colors: {
          slow: 'green',
          full: 'red',
        },
      },
      axis: {
        x: { show: this.props.showX },
        y: { show: this.props.showY, min: 0, max: 100 },
      },
      legend: { show: this.props.legend },
      tooltip: { show: this.props.tooltip },
      point: { show: this.props.point },
      regions: [{ axis: 'y', start: 20, end: 80 }],
      // grid: {
      // y: {
      // lines: [{ value: 0 }, { value: 20 }, { value: 50 }, { value: 80 }, { value: 100 }],
      // },
      // },
    };
    c3.generate(options);
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

export default Spline;
