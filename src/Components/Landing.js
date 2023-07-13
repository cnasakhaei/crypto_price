import React, { useEffect, useState } from 'react';
import { getCoin } from '../Services/api';
import Loader from './Loader';
import Coin from './Coin';
import styles from  './Landing.module.css';

const Landing = () => {
    const [coins, setCoins] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        // Fetch coins initially
        fetchCoins();

        // Refresh the page every 3 seconds
        const interval = setInterval(() => {
            window.location.reload();
        }, 30000);

        // Cleanup the interval on unmount
        return () => clearInterval(interval);
    }, []);

    const fetchCoins = async () => {
        const data = await getCoin();
        setCoins(data);
    };

    const searchHandler = (event) => {
        setSearch(event.target.value);
    };

    const searchCoins = coins.filter(coin =>
        coin.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <>
            {coins.length ? (
                <div className={styles.coinContainer}>
                    <input
                        className={styles.input}
                        type="text"
                        placeholder="Search"
                        value={search}
                        onChange={searchHandler}
                    />
                    {searchCoins.map(coin => (
                        <Coin
                            key={coin.id}
                            name={coin.name}
                            image={coin.image}
                            symbol={coin.symbol}
                            price={coin.current_price}
                            marketCap={coin.market_cap}
                            priceChange={coin.price_change_percentage_24h}
                        />
                    ))}
                </div>
            ) : (
                <Loader />
            )}
        </>
    );
};

export default Landing;
