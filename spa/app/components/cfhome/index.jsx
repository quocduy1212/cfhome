import React from 'react';
import { connect } from 'react-redux';
import TopMenu from 'app-comps/top-menu';
import ProductsLayout from './products-layout';
import styles from './index.scss';

const General = ({ page, admin }) => (
  <div>
    <div className={`${styles.background} fixed bottom-0 right-0 z-999 w4-ns h4-ns`} />
    <TopMenu className="mv3" admin={admin} />
    {page === 'products' && <ProductsLayout />}
  </div>
);

const mapStateToProps = ({ settings }) => ({
  ...settings,
});

const CfHome = connect(mapStateToProps, null)(General);
const CfAdmin = () => <CfHome admin />;

export { CfHome, CfAdmin };
