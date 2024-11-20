import React from "react";
import { useLocation } from "react-router-dom";

const CountryDetails = () => {
  const { state } = useLocation();

  if (!state || !state.country) {
    return <p>No country data available. Please select a country from the dropdown.</p>;
  }

  const { name, region, capital, currency, flag } = state.country;

  return (
    <div className="country-details-container">
         <h2 className="country-name">{name}</h2>
        <div className="country-details">
            <img src={flag} alt={`Flag of ${name}`} style={{ width: "20rem", height: "auto" }} />
            <div>
                <p><strong>Region:</strong> {region}</p>
                <p><strong>Capital:</strong> {capital}</p>
                <p><strong>Currency:</strong> {currency}</p>
            </div>
        </div>

    </div>
  );
};

export default CountryDetails;
