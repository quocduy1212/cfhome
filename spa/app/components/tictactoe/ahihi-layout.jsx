import React, { Component } from 'react';
import { connect } from 'react-redux';
import TopMenu from 'app-comps/top-menu';
import { me } from 'app-actions/users';
import { TextInput, LoadingEllipsis } from 'app-comps/common';

class AhihiLayout extends Component {
  state = {
    token: '',
  };
  render() {
    const { className = '', isLoading, validated, name, error } = this.props;
    return (
      <main className={className}>
        <TopMenu className="mv3" />
        <div className="ph2 ph7-ns ph4-m">
          <TextInput value={this.state.token} onChange={value => this.setState({ token: value })} />
          <span className="dib ml2 pointer" onClick={() => this.props.me(this.state.token)}>
            load
          </span>
          {isLoading && <LoadingEllipsis className="mt4" text="Loading user details" />}
          {validated && <div className="ba br2 b--green pv2 ph3 f6 mt4 green">{name} loaded</div>}
          {!!error && <div className="ba br2 b--red pv2 ph3 f6 mt4 red">{error}</div>}
        </div>
      </main>
    );
  }
}

const mapStateToProps = state => ({
  ...state.users,
});

export default connect(mapStateToProps, {
  me,
})(AhihiLayout);
