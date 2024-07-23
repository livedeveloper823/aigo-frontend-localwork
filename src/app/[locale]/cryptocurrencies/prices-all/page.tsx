"use client";

import { Navbar } from "@/components/navbar/Navbar";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  List,
  Search,
  X,
} from "lucide-react";
import Image from "next/image";
import { MenuLinkTexts, pricesALL } from "@/config/contents";
import { FilterItemType, PriceAllDropdown } from "@/types";
import { GeneralFilter, PriceDown, PriceRaise } from "@/components/icons/icons";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableCell,
  TableRow,
} from "@/components/ui/table";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Footer from "@/components/Footer";
import FilterSidebar from "@/components/FilterSidebar";
import { Chart } from "@/components/Chart";
import { CheckItem } from "@/types";

interface CoinData {
  id: number;
  symbol: string;
  name: string;
  price: number;
  price_btc: number;
  volatility: number;
  percent_change_1h: number;
  percent_change_24h: number;
  market_cap: number;
  volume_24h: number;
  logo: string;
  categories: string;
  market_cap_rank: number;
  // Add other properties as needed
}

const chartData: { time: string; price: number }[] = [
  { time: "January", price: 186 },
  { time: "June", price: 214 },
  { time: "February", price: 305 },
  { time: "March", price: 237 },
  { time: "June", price: 214 },
  { time: "April", price: 73 },
  { time: "May", price: 209 },
  { time: "June", price: 214 },
  { time: "June", price: 214 },
];

// Get Data via API
const PricesAll = () => {
  const [coinData, setCoinData] = useState<CoinData[]>([]);
  const [topGainers, setTopGainers] = useState<CoinData[]>([]);
  const [topLosers, setTopLosers] = useState<CoinData[]>([]);

  const [filter, setFilter] = useState("");
  const [search, setSearch] = useState("");

  const [loadNum, setLoadNum] = useState("10");
  const [page, setPage] = useState(0);

  // Params
  const url = new URL(window.location.href);
  const sort = url.searchParams.get("sort");
  const desc = url.searchParams.get("desc");
  // console.log(sort, desc);

  const Prev = () => {
    setPage(Math.max(page - 1, 0));
  };
  const Next = () => {
    setPage(Math.min(page + 1, 25));
    console.log(page);
  };
  const handleSelectChange = (value: string) => {
    setLoadNum(value);
  };

  const fetchTopGainers = async () => {
    try {
      const res = await fetch("/api/coinData?&sort=percent_change_24h&limit=5");
      if (!res.ok) {
        throw new Error("Failed to fetch TopGainers data");
      }
      const data = await res.json();
      setTopGainers(data.data);
    } catch (err) {
      console.log(err);
    }
  };
  const fetchTopLosers = async () => {
    try {
      const res = await fetch(
        "/api/coinData?&sort=percent_change_24h&limit=5&desc=1"
      );
      if (!res.ok) {
        throw new Error("Failed to fetch TopLosers data");
      }

      const data = await res.json();
      setTopLosers(data.data);
    } catch (err) {
      console.log(err);
    }
  };
  const fetchCoinData = async () => {
    try {
      const res = await fetch(
        `/api/coinData?&limit=${loadNum}&page=${page}&sort=${sort}&desc=${desc}`
      );
      if (!res.ok) {
        throw new Error("Failed to fetch coin data");
      }
      const data = await res.json();

      setCoinData(data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchCoinData();
    fetchTopGainers();
    fetchTopLosers();
  }, [loadNum, page]);

  const [checkedItems, setCheckedItems] = useState<CheckItem[]>([]);
  const [radioItem, setRadioItem] = useState({
    MarketCap: "",
    InTheMoney: "",
    LargeTxs: "",
    DailyActive: "",
    Ownership: "",
    Hodlers: "",
    Twitter: "",
    Exchanges: "",
    Signals: "",
  });

  useEffect(() => {
    const savedCheckItems = JSON.parse(
      localStorage.getItem("checkedItems") || "[]"
    );
    setCheckedItems(savedCheckItems);

    const savedRadioItem = JSON.parse(
      localStorage.getItem("radioItem") || "{}"
    );
    setRadioItem(savedRadioItem);
  }, []);

  console.log("CheckedItemsSave===>", checkedItems);
  console.log("RadioItemsSave===>", radioItem);
  console.log("coinData====>", coinData);

  return (
    <div>
      <Navbar />
      {/* Coin Market today */}
      <div className="xl:mx-36 xl:my-20 md:mx-10 mx-3 my-20 text-white">
        <div className="flex sm:flex-row flex-col text-center sm:text-start justify-between items-center mx-5 sm:gap-5 gap-3">
          <div>
            <p className="md:text-3xl text-xl font-semibold">
              Coin Market
              <span className="bg-gradient-to-t from-blue via-blue to-lightblue text-transparent bg-clip-text ml-3">
                Today
              </span>
            </p>
            <p className="text-description md:text-md text-sm">
              The global crypto market cap is $1.52T, a 5.06% decrease over the
              last day.{" "}
            </p>
          </div>
        </div>
        <div className="grid md:grid-cols-4 gap-3 my-8 px-2">
          <div className="bg-metricbasic text-white p-6 rounded-lg">
            <p className="md:text-lg text-md font-semibold">
              Market Capitalization
            </p>
            <div className="flex justify-between mt-5">
              <div>
                <p className="xl:text-2xl md:text-xl text-sm">$132.1B</p>
                <p className="text-green-500 md:text-lg text-xs">+4%</p>
              </div>
              <div className="w-32">
                <Chart data={chartData} />
              </div>
            </div>
          </div>
          <div className="bg-metricbasic text-white p-6 rounded-lg">
            <p className="md:text-lg text-md font-semibold">
              24h Trading Volume
            </p>
            <div className="flex justify-between mt-5">
              <div>
                <div>
                  <p className="xl:text-2xl md:text-xl text-sm">$132.1B</p>
                  <p className="text-green-500 md:text-lg text-xs">+4%</p>
                </div>
              </div>
              <div className="w-32">
                <Chart data={chartData} />
              </div>
            </div>
          </div>
          <div className="bg-metricbasic text-white p-6 rounded-lg">
            <p className="md:text-lg text-md font-semibold">Stablecoin Flows</p>
            <div className="flex justify-between mt-5">
              <div>
                <div>
                  <p className="xl:text-2xl md:text-xl text-sm">$132.1B</p>
                  <p className="text-green-500 md:text-lg text-xs">+4%</p>
                </div>
              </div>
              <div className="w-32">
                <Chart data={chartData} />
              </div>
            </div>
          </div>
          <div className="bg-metricbasic text-white p-6 rounded-lg">
            <p className="md:text-lg text-md font-semibold">Stablecoin Flows</p>
            <div className="flex justify-between mt-5">
              <div>
                <div>
                  <p className="xl:text-2xl md:text-xl text-sm">$132.1B</p>
                  <p className="text-green-500 md:text-lg text-xs">+4%</p>
                </div>
              </div>
              <div className="w-32">
                <Chart data={chartData} />
              </div>
            </div>
          </div>
        </div>
        {/* Top Gainers Coins */}
        <div className="grid md:grid-cols-3 gap-5">
          <div className="rounded-lg bg-metricbasic p-6">
            <div className="text-white flex justify-between items-center">
              <p className="sm:text-lg text-sm font-bold">Top Gainers</p>
              <div className="flex items-center gap-2 md:text-[13px] text-xs">
                View All
                <ChevronRight />
              </div>
            </div>
            {topGainers &&
              topGainers.map((coin) => (
                <div
                  key={coin.market_cap_rank}
                  className="flex justify-between py-4 mt-2 overflow-hidden"
                >
                  <div className="flex items-center gap-1">
                    <Image
                      src={`${coin.symbol.toLowerCase()}.png`}
                      alt=""
                      width={30}
                      height={30}
                    />
                    <div className="2xl:flex 2xl:items-center md:block flex">
                      <p className="2xl:text-sm text-xs text-white">
                        {coin.name}
                      </p>
                      <span className="bg-black text-xs text-blue px-1 rounded-sm ">
                        {coin.symbol}
                      </span>
                    </div>
                  </div>
                  <div className="2xl:flex md:block flex gap-1 items-center">
                    {coin.price < 0.00001 ? (
                      <p className="text-white">{coin.price.toFixed(9)}$</p>
                    ) : coin.price < 1 ? (
                      <p className="text-white">{coin.price.toFixed(5)}$</p>
                    ) : (
                      <p className="text-white">{coin.price.toFixed(2)}$</p>
                    )}
                    {coin.percent_change_24h < 0 ? (
                      <p className="flex items-center text-red-500">
                        {coin.percent_change_24h.toFixed(2)}%<PriceDown />
                      </p>
                    ) : (
                      <p className="flex items-center text-green-500">
                        {coin.percent_change_24h.toFixed(2)}%<PriceRaise />
                      </p>
                    )}
                  </div>
                </div>
              ))}
          </div>
          {/* Top Losers coins */}
          <div className="rounded-lg bg-metricbasic p-6 overflow-hidden">
            <div className="text-white flex justify-between items-center">
              <p className="sm:text-lg text-sm font-bold">Top Losers</p>
              <div className="flex items-center gap-2 md:text-[13px] text-xs">
                View All
                <ChevronRight />
              </div>
            </div>
            {topLosers &&
              topLosers.map((coin) => (
                <div
                  key={coin.market_cap_rank}
                  className="flex justify-between py-4 mt-2 overflow-hidden"
                >
                  <div className="flex items-center gap-1">
                    <Image
                      src={`${coin.symbol.toLowerCase()}.png`}
                      alt=""
                      width={30}
                      height={30}
                    />
                    <div className="2xl:flex 2xl:items-center md:block flex">
                      <p className="2xl:text-sm text-xs text-white">
                        {coin.name}
                      </p>
                      <span className="bg-black text-xs text-blue px-1 rounded-sm ">
                        {coin.symbol}
                      </span>
                    </div>
                  </div>
                  <div className="2xl:flex md:block flex gap-1 items-center">
                    {coin.price < 0.00001 ? (
                      <p className="text-white">{coin.price.toFixed(9)}$</p>
                    ) : coin.price < 1 ? (
                      <p className="text-white">{coin.price.toFixed(5)}$</p>
                    ) : (
                      <p className="text-white">{coin.price.toFixed(2)}$</p>
                    )}
                    {coin.percent_change_24h < 0 ? (
                      <p className="flex items-center text-red-500">
                        {coin.percent_change_24h.toFixed(2)}%<PriceDown />
                      </p>
                    ) : (
                      <p className="flex items-center text-green-500">
                        {coin.percent_change_24h.toFixed(2)}%<PriceRaise />
                      </p>
                    )}
                  </div>
                </div>
              ))}
          </div>
          {/* New Coins */}
          <div className="rounded-lg bg-metricbasic p-6">
            <div className="text-white flex justify-between items-center">
              <p className="sm:text-lg text-sm font-bold">New In the Market</p>
              <div className="flex items-center gap-2 md:text-[13px] text-xs overflow-hidden">
                View All
                <ChevronRight />
              </div>
            </div>
            {topGainers &&
              topGainers.map((coin) => (
                <div
                  key={coin.market_cap_rank}
                  className="flex justify-between py-4 mt-2 overflow-hidden"
                >
                  <div className="flex items-center gap-1">
                    <Image
                      src={`${coin.symbol.toLowerCase()}.png`}
                      alt=""
                      width={30}
                      height={30}
                    />
                    <div className="2xl:flex 2xl:items-center md:block flex">
                      <p className="2xl:text-sm text-xs text-white">
                        {coin.name}
                      </p>
                      <span className="bg-black text-xs text-blue px-1 rounded-sm ">
                        {coin.symbol}
                      </span>
                    </div>
                  </div>
                  <div className="2xl:flex md:block flex gap-1 items-center">
                    {coin.price < 0.00001 ? (
                      <p className="text-white">{coin.price.toFixed(9)}$</p>
                    ) : coin.price < 1 ? (
                      <p className="text-white">{coin.price.toFixed(5)}$</p>
                    ) : (
                      <p className="text-white">{coin.price.toFixed(2)}$</p>
                    )}
                    {coin.percent_change_24h < 0 ? (
                      <p className="flex items-center text-red-500">
                        {coin.percent_change_24h.toFixed(2)}%<PriceDown />
                      </p>
                    ) : (
                      <p className="flex items-center text-green-500">
                        {coin.percent_change_24h.toFixed(2)}%<PriceRaise />
                      </p>
                    )}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
      <div className="text-white xl:mx-36 md:mx-10 mx-3">
        <div className="mt-20">
          <p className="text-white md:text-3xl text-xl md:text-start text-center font-semibold">
            Cryptocurrency Prices{" "}
            <span className="bg-gradient-to-t from-blue via-blue to-lightblue text-transparent bg-clip-text">
              by Market Cap
            </span>
          </p>
          <p className="text-description md:text-sm text-xs md:text-start text-center">
            The global crypto market cap is $1.52T, a 5.06% decrease over the
            last day.{" "}
          </p>
        </div>
        <div className="2xl:flex justify-between">
          <div className="lg:flex grid sm:grid-cols-4 grid-cols-2 lg:gap-1 gap-3 my-3">
            {pricesALL.dropdown.map((item: PriceAllDropdown) => (
              <Button
                size={"filters"}
                key={item.value}
                value={item.value}
                className="bg-metricbasic flex justify-between hover:bg-description text-white"
              >
                {item.text}
                <ChevronDown />
              </Button>
            ))}
            {/* <DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button variant="outline">Open</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent className="w-56">
								<DropdownMenuLabel>Panel Position</DropdownMenuLabel>
								<DropdownMenuSeparator />
								<DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
									<DropdownMenuRadioItem value="top">Top</DropdownMenuRadioItem>
									<DropdownMenuRadioItem value="bottom">Bottom</DropdownMenuRadioItem>
									<DropdownMenuRadioItem value="right">Right</DropdownMenuRadioItem>
								</DropdownMenuRadioGroup>
							</DropdownMenuContent>
						</DropdownMenu> */}
          </div>
          <div className="flex justify-end items-center gap-5">
            <Drawer direction="right">
              <DrawerTrigger asChild>
                <Button size={"filters"}>
                  <GeneralFilter />
                  More Filters
                </Button>
              </DrawerTrigger>
              <DrawerContent>
                <DrawerHeader className="flex justify-between text-white border-b-[1px] border-description">
                  <DrawerTitle>Filters</DrawerTitle>
                  <DrawerClose>
                    <X />
                  </DrawerClose>
                </DrawerHeader>
                <FilterSidebar
                  checkedItems={checkedItems}
                  setCheckedItems={setCheckedItems}
                  radioItem={radioItem}
                  setRadioItem={setRadioItem}
                />
              </DrawerContent>
            </Drawer>
            <div className="flex items-center gap-1 border-2 border-description text-description rounded-md">
              <div className="hover:bg-description hover:text-white p-1 m-1 rounded-md">
                <List className="2xl:w-5 2xl:h-5 md:w-4 md:h-4" />
              </div>
              <div className="hover:bg-description hover:text-white p-1 m-1 rounded-md">
                <LayoutGrid className="2xl:w-5 2xl:h-5 md:w-4 md:h-4" />
              </div>
            </div>
          </div>
        </div>
        <div className="h-auto bg-metricbasic rounded-lg p-8 my-3">
          <div className="lg:flex justify-between">
            <div className="lg:flex lg:gap-2 grid sm:grid-cols-5 grid-cols-2">
              {MenuLinkTexts.landingcryptoleft.map(
                (item: FilterItemType, index: number) => (
                  <Button
                    size={"filters"}
                    key={index}
                    variant="filter"
                    value={item.value}
                    onClick={() => setFilter(item.value)}
                  >
                    {item.text}
                  </Button>
                )
              )}
            </div>
            <div className="flex gap-2 items-center border-2 border-description xl:px-3 xl:py-2 px-2 py-1 rounded-lg">
              <Search className="text-description" width={20} />
              <input
                type="text"
                placeholder="search"
                className="w-full bg-metricbasic outline-none"
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>#</TableHead>
                <TableHead>Assets</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>1h%</TableHead>
                <TableHead>24h%</TableHead>
                <TableHead>Market Cap</TableHead>
                <TableHead>24h Volume </TableHead>
                <TableHead>Last 7 Days</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {coinData &&
                coinData
                  .filter(
                    (coin) =>
                      coin.categories && coin.categories.includes(filter)
                  )
                  .filter(
                    (coin) =>
                      coin.name && coin.name.toLowerCase().includes(search)
                  )
                  .map((coin) => (
                    <TableRow
                      key={coin.market_cap_rank}
                      className="text-white text-sm"
                    >
                      <TableCell>{coin.market_cap_rank}</TableCell>
                      <TableCell className="flex items-center gap-2">
                        <Image
                          src={`${coin.symbol.toLowerCase()}.png`}
                          alt=""
                          width={30}
                          height={30}
                        />
                        <div className="flex flex-col text-start">
                          <p className="text-white">{coin.name}</p>
                          <div className="text-description">{coin.symbol}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        {coin.price < 0.00001 ? (
                          <p className="text-white">{coin.price.toFixed(9)}$</p>
                        ) : coin.price < 1 ? (
                          <p className="text-white">{coin.price.toFixed(5)}$</p>
                        ) : (
                          <p className="text-white">{coin.price.toFixed(2)}$</p>
                        )}
                      </TableCell>
                      <TableCell>
                        {coin.percent_change_1h < 0 ? (
                          <p className="text-red-500">
                            {coin.percent_change_1h.toFixed(2)}%
                          </p>
                        ) : (
                          <p className="text-green-500">
                            {coin.percent_change_1h.toFixed(2)}%
                          </p>
                        )}
                      </TableCell>
                      <TableCell>
                        {coin.percent_change_24h < 0 ? (
                          <p className="text-red-500">
                            {coin.percent_change_24h.toFixed(2)}%
                          </p>
                        ) : (
                          <p className="text-green-500">
                            {coin.percent_change_24h.toFixed(2)}%
                          </p>
                        )}
                      </TableCell>
                      <TableCell>
                        {coin.market_cap / 1_000_000_000 >= 1
                          ? `$${(coin.market_cap / 1_000_000_000).toFixed(2)}B`
                          : `$${(coin.market_cap / 1_000_000).toFixed(2)}M`}
                      </TableCell>
                      <TableCell>
                        {coin.volume_24h / 1_000_000_000 >= 1
                          ? `$${(coin.volume_24h / 1_000_000_000).toFixed(2)}B`
                          : `$${(coin.volume_24h / 1_000_000).toFixed(2)}M`}
                      </TableCell>
                      <TableCell>
                        <div className="w-24 h-10">
                          <Chart data={chartData} />
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
            </TableBody>
          </Table>
        </div>
        <div className="flex justify-end text-sm py-3 px-2">
          <div className="sm:flex grid grid-cols-2 items-center gap-5">
            Rows Per Page
            <Select onValueChange={handleSelectChange} value={loadNum}>
              <SelectTrigger className="w-24">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="50">50</SelectItem>
                <SelectItem value="100">100</SelectItem>
              </SelectContent>
            </Select>
            <p>
              {page == 0 ? 0 : Number(loadNum) * page} -
              {page == 0 ? loadNum : Number(loadNum) * (page + 1)}{" "}
              <span>of 2690</span>
            </p>
            <div className="flex gap-5">
              {page == 0 ? (
                <ChevronLeft className="text-description" />
              ) : (
                <ChevronLeft onClick={() => Prev()} />
              )}
              <ChevronRight onClick={() => Next()} />
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <Button
            size={"loadmore"}
            className="bg-[#1D212F] hover:bg-description text-sm"
            onClick={() => Next()}
          >
            Load More
          </Button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PricesAll;
