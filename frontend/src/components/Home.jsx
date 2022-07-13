import React, { Fragment, useEffect } from "react";
import Footer from "./layout/Footer";
import Header from "./layout/Header";
import Loder from './layout/Loder';
import MetaData from "./layout/MetaData";

import Product from './product/Product';

import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../actions/productActions';

const Home = () => {
 
  const dispatch = useDispatch();
  
  const {loading, products, error, productsCount} = useSelector(state => state.products)

  useEffect(()=>{
    dispatch(getProducts());
  }, [dispatch])
  
  return ( 
    <Fragment>
      <MetaData title={"Bye Best Product"} />
      <Header />
      
      {loading ? <h1><Loder/></h1> : (
        
      <div className="container container-fluid">
        <h1 id="products_heading">Latest Products</h1>

        <section id="products" className="container mt-5">
          <div className="row">

            {products && products.map(product => (
            <Product key={product._id} product={product} />
            ))}

          </div> 
        </section>
      </div>
      )}


      <Footer />
    </Fragment>
  );
};

export default Home;
