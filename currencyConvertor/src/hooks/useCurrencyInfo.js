import { useEffect, useState } from 'react';

function useCurrencyInfo(currency) {
    const [data, setData] = useState({}); // State to store fetched exchange rate data

    useEffect(() => {
        const apiKey = '9e44308a45d52b602ad1b3ff1fae9931'; // Your API key
        const baseURL = 'http://api.exchangeratesapi.io/v1/latest'; // API endpoint

        // Construct the full URL with API key and currency symbol(s)
        const url = `${baseURL}?access_key=${apiKey}&symbols=${currency}`;

        // Fetch the exchange rate data
        fetch(url)
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Failed to fetch data');
                }
                return res.json();
            })
            .then((res) => {
                if (res.success) {
                    setData(res.rates); // Set the rates data for the requested currency
                } else {
                    console.error('Error with API request:', res.error);
                }
            })
            .catch((error) => {
                console.error('Fetch error:', error);
                setData({}); // Reset data in case of an error
            });
    }, [currency]); // Re-fetch data when `currency` changes

    console.log(data); // Debugging: Check the current data
    return data; // Return the fetched data
}

export default useCurrencyInfo;
