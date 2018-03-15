import React, { Component } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import { availableMarkets } from 'app-selectors/users';
import { loadMonitorIndicators } from 'app-actions/monitor';

class CryptoFilter extends Component {
  state = {
    selected: [],
  };

  onFiltering = () => this.props.loadMonitorIndicators(this.state.selected);

  render() {
    const { className, isProcessing, markets } = this.props;
    return (
      <header className={`${className} ph5 ph0-ns tc-ns`}>
        <Select
          name="form-field-name"
          className="db dib-ns tl w-100 w-third-ns f6"
          onChange={filterObj => this.setState({ selected: filterObj })}
          value={this.state.selected}
          options={markets}
          optionClassName="tl"
          multi
          clearable
          searchable
        />
        <span
          className={`db dib-ns ml4-ns mt4 mt0-ns ${isProcessing ? 'light-gray' : 'pointer'}`}
          onClick={() => !isProcessing && this.onFiltering()}
        >
          <i className="material-icons f2">play_arrow</i>
          <i className="material-icons f2 nl3">play_arrow</i>
        </span>
      </header>
    );
  }
}

const mapStateToProps = state => ({
  markets: availableMarkets(state),
});

export default connect(mapStateToProps, {
  loadMonitorIndicators,
})(CryptoFilter);
