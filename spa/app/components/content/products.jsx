import React from 'react';
import products from 'app-constants/products';
import Product from '../../components/common/product.jsx';

const Content = () => (
  <div className="ph2 tc">
    {products.map(p => <Product className="w-two-thirds-ns w-100-m w-100 ph4-ns dib mt3" key={p.code} {...p} />)}
  </div>
);

export default Content;
