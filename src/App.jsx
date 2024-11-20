import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Countries from './components/SelectCountries';
import CountryDetails from './components/CountryDetails'

export default function App() {
  return (
    <Router>
      <div className='main'>
        {/* Landing Page */}
        <img
          className='globe'
          src='https://upload.wikimedia.org/wikipedia/commons/7/7f/Rotating_earth_animated_transparent.gif?20201022124448'
        />
        <h1>Find Your Next Vacation Destination</h1>
        {/* Routes */}
        <Routes>
          <Route path="/" element={<Countries />} />
          <Route path="/countries" element={<Countries />}>
            <Route path=":cca2" element={<CountryDetails />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}