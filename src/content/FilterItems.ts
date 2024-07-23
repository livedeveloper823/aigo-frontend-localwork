import { FilterItem } from "@/types";

export const FilterItems: FilterItem = {
  CheckFilter: [
    {
      content: "> = + 100%",
      limit: {
        min: 0,
        max: 100,
      },
    },
    {
      content: "+30% to +100%",
      limit: {
        min: 30,
        max: 100,
      },
    },
    {
      content: "+5% to +30%",
      limit: {
        min: 5,
        max: 30,
      },
    },
    {
      content: "-5% to -15%",
      limit: {
        min: -15,
        max: -5,
      },
    },
    {
      content: "-30% to -100%",
      limit: {
        min: -100,
        max: -30,
      },
    },
  ],
  RadioFilter: {
    MarketCap: [
      { title: "Market Cap" },
      {
        content: "> = $1b",
        value: "0 1000000000",
      },
      {
        content: "$100m to $1b",
        value: "100000000 1000000000",
      },
      {
        content: "$10m to $100m",
        value: "10000000 100000000",
      },
      {
        content: "< = $10m",
        value: "10000000 0",
      },
    ],
    InTheMoney: [
      { title: "In The Money" },
      {
        content: "> = 95%",
        value: "0 95",
      },
      {
        content: "75% to 100%",
        value: "75 100",
      },
      {
        content: "25% to 75%",
        value: "25 75",
      },
      {
        content: "< = 25%",
        value: "25 0",
      },
    ],
    LargeTxs: [
      { title: "Large Txs Volume" },
      {
        content: "> = $1b",
        value: "0 1000000000",
      },
      {
        content: "$100m to $1b",
        value: "100000000 1000000000",
      },
      {
        content: "$10m to $100m",
        value: "10000000 100000000",
      },
      {
        content: "< = $10m",
        value: "10000000 0",
      },
    ],
    DailyActive: [
      { title: "Daily Active Addresses" },
      {
        content: "> = 100k",
        value: "0 100000",
      },
      {
        content: "$10k to $100k",
        value: "10000 100000",
      },
      {
        content: "$1k to $10k",
        value: "1000 10000",
      },
      {
        content: "< = $1k",
        value: "1000 0",
      },
    ],
    Ownership: [
      { title: "Ownership Distribution" },
      {
        content: "Whales > Investors",
        value: "Whales > Investors",
      },
      {
        content: "Investors > Whales",
        value: "Investors > Whales",
      },
      {
        content: "Retailers > Investors",
        value: "Retailers > Investors",
      },
    ],
    Hodlers: [
      { title: "Hodlers Balance" },
      {
        content: "> = $1b",
        value: "0 1000000000",
      },
      {
        content: "$100m to $1b",
        value: "100000000 1000000000",
      },
      {
        content: "$10m to $100m",
        value: "10000000 100000000",
      },
      {
        content: "< = $10m",
        value: "10000000 0",
      },
    ],
    Twitter: [
      { title: "Twitter Sentiment" },
      {
        content: "Position",
        value: "Position",
      },
      {
        content: "Neutral",
        value: "Neutral",
      },
      {
        content: "Negative",
        value: "Negative",
      },
    ],
    Exchanges: [
      { title: "Exchanges Netflows" },
      {
        content: "> = $10m",
        value: "0 10000",
      },
      {
        content: "$1m to $10m",
        value: "1000 10000",
      },
      {
        content: "-$1m to -$10m",
        value: "-10000 -1000",
      },
      {
        content: "< = $10m",
        value: "10000 0",
      },
    ],
    Signals: [
      { title: "Signals" },
      {
        content: "Bullish",
        value: "Bullish",
      },
      {
        content: "Neutral",
        value: "Neutral",
      },
      {
        content: "Bearish",
        value: "Bearish",
      },
    ],
  },
};
