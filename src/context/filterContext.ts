import React, { createContext, useContext, useState } from "react";

const FilterContext = createContext({
    filters: {
        price: {
            min: 0,
            max: 0,
        },
        market_cap: {
            min: 0,
            max: 0,
        },
        money: {
            min: 0,
            max: 0,
        },
        txs_volume: {
            min: 0,
            max: 0,
        },
        daily_active_address: {
            min: 0,
            max: 0,
        },
        ownership: "",
        hodler_balance: {
            min: 0,
            max: 0,
        },
        twitter_sentment: "",
        exchange_netflows: {
            min: 0,
            max: 0,
        },
        signals: "",
    }
});

export default FilterContext