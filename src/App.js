import './App.css';
import React from 'react';
import Product from './components/product';
import { PackProvider } from './components/contexProvider';


function App() {
  return (
  <PackProvider>
    <Product/>
  </PackProvider>
  
  
  );
}

export default App;
