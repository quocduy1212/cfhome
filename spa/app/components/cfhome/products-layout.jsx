import React from 'react';
import Content from 'app-comps/content/products';

const ProductsLayout = ({ className = '' }) => (
  <main className={className}>
    <Content className="ph2" />
  </main>
);

export default ProductsLayout;
