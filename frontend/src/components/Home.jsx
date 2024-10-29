import React from 'react';
import { Link } from 'react-router-dom';
import Fridge from './Fridge';

function Home() {
    return (
      <>
        <div>
          <h1>Welcome to the fridge management system!</h1>
        </div>
        <div className="card">
          <button><Link to="/fridge">Enter the fridge</Link>
          </button>
        </div>
      </>
    )
  }
  
  export default Home;
  