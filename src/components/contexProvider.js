import React, { createContext, useState, useEffect } from "react";
export const PackContext = createContext();
export const PackProvider = ({ children }) => {
    const [products, stProduct]= useState([])

    useEffect(()=>{
       getProduct()
    },[])
    async function getProduct() {
       const response = await fetch("https://fakestoreapi.com/products");
       const products = await response.json();
       stProduct(products)
       console.log(products)
      
     }
    
    return (
      <PackContext.Provider
        value={{
        //   variable && function
        products,
        stProduct
         
        }}
      >
        {children}
      </PackContext.Provider>
    );
  };