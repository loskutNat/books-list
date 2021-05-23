import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import BookList from './components/BooksList';

import './App.css';

function App() {
  return (
    <div className="app">
      <Router>
        <BookList customClass="app__content" />
      </Router>
    </div>
  );
}

export default App;
