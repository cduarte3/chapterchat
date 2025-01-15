import React from 'react';
import './index.css';
import Home from './components/Home';
import Footer from './components/Footer';


function App() {
  return (
    <div className="App">
      <Home />
      <div className="flex">
        <img
          src="/book-divider.svg"
          alt="Bookshelf"
          className="h-[40px] w-full -mb-[1px]"
        />
      </div>
      <Footer />
    </div>
  );
}

export default App;
