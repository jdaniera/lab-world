import React, { useEffect, useState } from 'react';
import { useNavigate, Outlet } from "react-router-dom";

export default function Countries() {
    const [countries, setCountries] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await fetch("https://restcountries.com/v3.1/all");
                if (!response.ok) {
                    throw new Error("Failed to fetch data");
                }

                const data = await response.json();

                const transformedCountries = data.map((country) => ({
                    cca2: country.cca2,
                    name: country.name.common,
                    region: country.region,
                    capital: country.capital ? country.capital[0] : "N/A",
                    currency: country.currencies
                        ? Object.keys(country.currencies).map((key) => {
                            const currency = country.currencies[key];
                            return `${currency.name} (${currency.symbol || "N/A"})`;
                        }).join(", ")
                    : "N/A",
                    flag: country.flags.png,
                }));
                setCountries(transformedCountries);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchCountries();
    }, []);

    const handleCountryChange = (e) => {
        const selectedCca = e.target.value;
        const selectedCountry = countries.find((country) => country.cca2 === selectedCca);

        if (selectedCountry) {
            navigate(`/countries/${selectedCca}`, { state: { country: selectedCountry } });
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <div className='selector'>
                <p>Discover </p>
            <select className='dropdown' onChange={handleCountryChange} defaultValue="">
                <option value="" disabled>
                    Select a country
                </option>
                {countries.map((country) => (
                    <option key={country.cca2} value={country.cca2}>
                        {country.name}
                    </option>
                ))}
            </select>
            </div>
            
            <Outlet />
        </div>
    );
}
