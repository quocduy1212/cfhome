import React from 'react';
import PropTypes from 'prop-types';
import { ToastContainer } from 'react-toastify';

const App = ({ children }) => (
  <div>
    <ToastContainer autoClose={2000} />
    {children}
  </div>
);

App.propTypes = {
  children: PropTypes.object,
};

App.defaultProps = {
  children: null,
};

export default App;
