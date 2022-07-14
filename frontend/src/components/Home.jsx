import React, { Fragment, useEffect } from "react";
import Loader from './layout/Loader';
import MetaData from "./layout/MetaData";

import Product from './product/Product';

import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../actions/productActions';

const Home = () => {

  const alert = useAlert();
 
  const dispatch = useDispatch();
  
  const {loading, products, error, productsCount} = useSelector(state => state.products)

  useEffect(() => {
    if (error) {
      // alert.success("success");
          return alert.error(error)  
        }
        dispatch(getProducts()); 

  }, [dispatch , alert , error])  
  
  return ( 
    <Fragment>
      <MetaData title={"Bye Best Product"} />
   
      {loading ? <h1><Loader/></h1> : (
        
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
    </Fragment>
  );
};

export default Home;
