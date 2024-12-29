'use client'

import { FAQs } from "@/components/landingpage/FAQs";
import FeaturedTabs from "@/components/landingpage/FeatureTabs";
import FeaturesCard from "@/components/landingpage/FeaturesCard";
import { Navbar } from "@/components/navbar/Navbar";
import { AllDoneIcon, PriceDown, PriceRaise } from "@/components/icons/icons";
import { Button } from "@/components/ui/button"
import { MenuLinkTexts, siteContents } from "@/config/contents";
import { CoinsItem, ContentItemType, FeaturesCardContentType, FilterItemType, LinkItemType } from "@/types";
import { ChevronLeft, ChevronRight, MoveRightIcon } from "lucide-react";
import Image from 'next/image'
import Footer from "@/components/Footer";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import Link from "next/link";
import { useEffect, useState } from "react";
import ContinuousSwiper from "@/components/landingpage/ContinuousSwiper";
import { Chart } from "@/components/Chart";
import { useTranslations } from 'next-intl';
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
const chartData: { time: string, price: number }[] = [
  { time: "January", price: 186 },
  { time: "June", price: 214 },
  { time: "February", price: 305 },
  { time: "March", price: 237 },
  { time: "June", price: 214 },
  { time: "April", price: 73 },
  { time: "May", price: 209 },
  { time: "June", price: 214 },
  { time: "June", price: 214 },
]

// interface ChartData {
//   time: number, // Sun, 23 Jun 2024 18:00:00 GMT A unix timestamp (in seconds)
//   open: number, //Open price for the time period
//   close: number, //Close price for the time period
//   high: number, //Higest price fo rthe time period
//   low: number, //Lowest price for the time period
//   volume_24h: number, //Volume in USD for 24 hours up to this data point
//   market_cap: number, //Total dollar market value of all circulating supply or outstanding shares
//   circulating_supply: number, //Circulating Supply is the total number of coins or tokens that are actively available for trade and are being used in the market and in general public
//   galaxy_score: number, //A proprietary score based on technical indicators of price, average social sentiment, relative social activity, and a factor of how closely social indicators correlate with price and volume
//   alt_rank: number, //A proprietary score based on how an asset is performing relative to all other assets supported
//   market_dominance: number, //The percent of the total market cap that this asset represents
// }

export default function Home() {
  const [coinData, setCoinData] = useState<CoinData[]>([]);
  const [topGainers, setTopGainers] = useState<CoinData[]>([]);
  const [topLosers, setTopLosers] = useState<CoinData[]>([]);
  const [topMarket, setTopMarket] = useState<CoinData[]>([]);

  const [filter, setFilter] = useState("")
  const [page, setPage] = useState(0)
  // Translation
  const t = useTranslations('Home');

  // Pagination
  const Prev = () => {
    setPage(Math.max(page - 1, 0));
  }
  const Next = () => {
    setPage(Math.min(page + 1, 25))
  }

  // Get data 
  const fetchTopGainers = async () => {
    try {
      const res = await fetch('/api/coinData?&sort=percent_change_24h&limit=5');
      if (!res.ok) {
        throw new Error("Failed to fetch Top Gainers data");
      }
      const data = await res.json()
      setTopGainers(data.data)
    } catch (err) {
      console.log(err);
    }
  };
  const fetchTopLosers = async () => {
    try {
      const res = await fetch('/api/coinData?&sort=percent_change_24h&limit=5&desc=1');
      if (!res.ok) {
        throw new Error("Failed to fetch TopLosers data");
      }

      const data = await res.json()
      setTopLosers(data.data)
    } catch (err) {
      console.log(err);
    }
  };

  const fetchTopMarket = async () => {
    try {
      const res = await fetch('/api/coinData?&limit=20');
      if (!res.ok) {
        throw new Error("Failed to fetch TopMarket data");
      }

      const data = await res.json()
      setTopMarket(data.data)
    } catch (err) {
      console.log(err);
    }
  };
  const fetchCoinData = async () => {
    try {
      const res = await fetch(`/api/coinData?&limit=10&page=${page}`);
      if (!res.ok) {
        throw new Error('Failed to fetch coin data');
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
    fetchTopMarket();
  }, [page]);

  return (
    <main>
      {/* Navbar */}
      <Navbar />
      {/* Get Started */}
      <div className="xl:pl-48 lg:pl-36 md:pl-24 flex items-center xl:h-[625px] lg:py-36 py-24">
        <div className="flex flex-col md:items-start gap-6 items-center md:text-start text-center">
          <p className="xl:text-6xl lg:text-4xl text-2xl text-white font-bold">
            {t('explore')} <br /> With AiGo
          </p>
          <p className="text-gray-500 xl:text-lg lg:text-sm text-xs sm:px-0 px-5 md:w-[30vw]">
            {t('find')} opportunities. Quickly browse markets by category; top gainers and losers, top traded and newly listed. Display your favorite markets so they’re only one click away.
          </p>
          <div>
            <Button className="2xl:text-lg md:text-sm">Get Started<span className="ml-[10px]"><ChevronRight /></span></Button>
          </div>
        </div>
        <Image src="Frame 963010.png" width={625} height={625} alt="" className="lg:w-[32vw] lg:ml-[10vw] md:block w-[55vw] hidden" />
        <Image src="landingblacklogo.png" width={720} height={625} alt="" className="2xl:ml-[-22vw] xl:ml-[-26.5vw]  lg:ml-[-26vw] md:ml-[-36.5vw] w-[40vw] bg-cover md:block hidden" />
      </div>
      <div className="xl:text-xl py-5 flex justify-center items-center bg-[#161B26]">
        <ContinuousSwiper data={topMarket} />
      </div>
      <div className="xl:mt-16 flex flex-col text-center md:gap-14 gap-5">
        <div className="flex flex-col items-center md:gap-6 gap-3">
          <p className="xl:text-5xl md:text-4xl text-2xl text-white font-extrabold mt-5">Open the door to 210+ assets</p>
          <p className="md:text-lg text-md text-gray-500 md:w-[640px]">{t('trade')}, stake or invest across an ever-growing number of crypto assets, stablecoins and fiat currencies.</p>
        </div>
        <div>
          <Link href="/cryptocurrencies/prices-all">
            <Button className="md:text-lg text-xs">See All<span className="ml-12px"><MoveRightIcon /></span></Button>
          </Link>
        </div>
        <div className="grid xl:grid-cols-10 sm:grid-cols-5 grid-cols-2 justify-start items-start gap-5 2xl:mx-56 lg:mx-20 mb-14">
          {siteContents.coins.map((item: CoinsItem, index: number) =>
            <Button key={index} variant={"coin"} size={"coin"}><item.icon size={36} /><p className="sm:px-3 px-5">{item.name}</p></Button>)}
        </div>
      </div>

      {/* Features section 1 */}
      <div className="text-center flex flex-col gap-10 mt-14">
        <div className="flex flex-col gap-5">
          <div><Button variant={"features"}>Features</Button></div>
          <p className="text-white md:text-4xl text-2xl font-semibold">Coins2Go Meets AiGo<br /> <span className="bg-gradient-to-t from-blue via-blue to-lightblue text-transparent bg-clip-text">Doubling Your Crypto Convenience!</span></p>
        </div>
        <div className="flex justify-center">
          <p className="w-[768px] md:text-xl text-sm text-description">Get a deposit account, credit card, and spend management software—in one refreshingly easy solution. No fees or minimums.</p>
        </div>
      </div>
      <div className="flex justify-center mt-20">
        <Image src="Screen mockup (REPLACE FILL).png" width={1024} height={682} alt="" className="lg:w-auto md:w-[85vw] w-full" />
        <Image src="iPhone mockup.png" width={314} height={640} alt="" className="xl:ml-[-14vw] lg:ml-[-24vw] md:ml-[-20vw] md:block hidden" />
      </div>
      <div className="sm:flex justify-center mt-24 2xl:mx-56 lg:mx-20 lg:my-20 2xl:my-52 my-20">
        {siteContents.featuredTabs.map((item: ContentItemType, index: number) =>
          <FeaturedTabs key={index} title={item.title} text={item.text} />)}
      </div>

      {/* Features section 2 */}
      <div className="mt-24 2xl:mx-56 lg:mx-20 lg:my-20 2xl:my-52 my-20">
        {/* Description */}
        <div className="flex justify-center">
          <div className="text-center">
            <p className="text-white">Features</p>
            <p className="text-white md:text-4xl text-xl my-5">Analytics that feels like it’s from the future</p>
            <p className="text-description md:text-xl text-xs ">Powerful, self-serve product and growth analytics to help you convert, engage, and retain more users. Trusted by over 4,000 startups.</p>
          </div>
        </div>
        {/* Features */}
        <div className="flex justify-center">
          <div className="grid xl:grid-cols-3 sm:grid-cols-2 mt-20 gap-10">
            {siteContents.featuresCardsContent.map((item: FeaturesCardContentType, index: number) =>
              <FeaturesCard key={index} icon={item.icon} title={item.title} text={item.text} />)}
          </div>
        </div>
      </div>

      {/* Coin Market today */}
      <div className="2xl:mx-56 lg:mx-20 lg:my-20 2xl:my-52 my-20">
        <div className="flex sm:flex-row flex-col text-center sm:text-start justify-between items-center mx-5 sm:gap-5 gap-3">
          <div>
            <p className="text-white md:text-3xl text-xl font-semibold">Coin Market Today</p>
            <p className="text-description md:text-md text-xs">The global crypto market cap is $1.52T, a 5.06% decrease over the last day. </p>
          </div>
          <Link href="/cryptocurrencies/prices-all">
            <Button variant={"alldone"} size={"outline"}><AllDoneIcon /> All Coins Ranking<ChevronRight /></Button>
          </Link>
        </div>
        <div className="grid md:grid-cols-4 gap-3 my-8 px-2">
          <div className="bg-metricbasic text-white p-6 rounded-lg">
            <p className="md:text-lg text-md font-semibold">Market Capitalization</p>
            <div className="flex justify-between mt-5">
              <div>
                <p className="xl:text-2xl md:text-xl text-sm">$132.1B</p>
                <p className="text-green-500 md:text-lg text-xs">+4%</p>
              </div>
              <div className="w-32"><Chart data={chartData} /></div>
            </div>
          </div>
          <div className="bg-metricbasic text-white p-6 rounded-lg">
            <p className="md:text-lg text-md font-semibold">24h Trading Volume</p>
            <div className="flex justify-between mt-5">
              <div>
                <div>
                  <p className="xl:text-2xl md:text-xl text-sm">$132.1B</p>
                  <p className="text-green-500 md:text-lg text-xs">+4%</p>
                </div>
              </div>
              <div className="w-32"><Chart data={chartData} /></div>
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
              <div className="w-32"><Chart data={chartData} /></div>
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
              <div className="w-32"><Chart data={chartData} /></div>
            </div>
          </div>
        </div>
        {/* Top Gainers Coins */}
        <div className="grid md:grid-cols-3 gap-5">
          <div className="rounded-lg bg-metricbasic p-6">
            <div className="text-white flex justify-between items-center">
              <p className="sm:text-lg text-sm font-bold">Top Gainers</p>
              <Link href="/cryptocurrencies/prices-all?sort=percent_change_24h">
                <div className="flex items-center gap-2 md:text-[13px] text-xs">View All<ChevronRight /></div>
              </Link>
            </div>
            {topGainers && topGainers.map((coin) =>
              <div key={coin.market_cap_rank} className="flex justify-between py-4 mt-2 overflow-hidden">
                <Link href={`/coins/${coin.symbol.toLowerCase()}`}>
                  <div className="flex items-center gap-1">
                    <Image src={`${coin.symbol.toLowerCase()}.png`} alt="" width={30} height={30} />
                    <div className="2xl:flex 2xl:items-center md:block flex">
                      <p className="2xl:text-sm text-xs text-white">{coin.name}</p>
                      <span className="bg-black text-xs text-blue px-1 rounded-sm ">{coin.symbol}</span>
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
                    {(coin.percent_change_24h < 0) ?
                      <p className="flex items-center text-red-500">{coin.percent_change_24h.toFixed(2)}%<PriceDown /></p> :
                      <p className="flex items-center text-green-500">{coin.percent_change_24h.toFixed(2)}%<PriceRaise /></p>}
                  </div>
                </Link>
              </div>
            )}
          </div>
          {/* Top Losers coins */}
          <div className="rounded-lg bg-metricbasic p-6 overflow-hidden">
            <div className="text-white flex justify-between items-center">
              <p className="sm:text-lg text-sm font-bold">Top Losers</p>
              <Link href="/cryptocurrencies/prices-all?sort=percent_change_24h&desc=1">
                <div className="flex items-center gap-2 md:text-[13px] text-xs">View All<ChevronRight /></div>
              </Link>
            </div>
            {topLosers && topLosers.map((coin) =>
              <div key={coin.market_cap_rank} className="flex justify-between py-4 mt-2 overflow-hidden">
                <Link href={`/coins/${coin.symbol.toLowerCase()}`}>
                  <div className="flex items-center gap-1">
                    <Image src={`${coin.symbol.toLowerCase()}.png`} alt="" width={30} height={30} />
                    <div className="2xl:flex 2xl:items-center md:block flex">
                      <p className="2xl:text-sm text-xs text-white">{coin.name}</p>
                      <span className="bg-black text-xs text-blue px-1 rounded-sm ">{coin.symbol}</span>
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
                    {(coin.percent_change_24h < 0) ?
                      <p className="flex items-center text-red-500">{coin.percent_change_24h.toFixed(2)}%<PriceDown /></p> :
                      <p className="flex items-center text-green-500">{coin.percent_change_24h.toFixed(2)}%<PriceRaise /></p>}
                  </div>
                </Link>
              </div>
            )}
          </div>
          {/* New Coins */}
          <div className="rounded-lg bg-metricbasic p-6">
            <div className="text-white flex justify-between items-center">
              <p className="sm:text-lg text-sm font-bold">New In the Market</p>
              <Link href="/cryptocurrencies/prices-all?sort=new_market">
                <div className="flex items-center gap-2 md:text-[13px] text-xs overflow-hidden">View All<ChevronRight /></div>
              </Link>
            </div>
            {topGainers && topGainers.map((coin) =>
              <div key={coin.market_cap_rank} className="flex justify-between py-4 mt-2 overflow-hidden">
                <Link href={`/coins/${coin.symbol.toLowerCase()}`}>
                  <div className="flex items-center gap-1">
                    <Image src={`${coin.symbol.toLowerCase()}.png`} alt="" width={30} height={30} />
                    <div className="2xl:flex 2xl:items-center md:block flex">
                      <p className="2xl:text-sm text-xs text-white">{coin.name}</p>
                      <span className="bg-black text-xs text-blue px-1 rounded-sm ">{coin.symbol}</span>
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
                    {(coin.percent_change_24h < 0) ?
                      <p className="flex items-center text-red-500">{coin.percent_change_24h.toFixed(2)}%<PriceDown /></p> :
                      <p className="flex items-center text-green-500">{coin.percent_change_24h.toFixed(2)}%<PriceRaise /></p>}
                  </div>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Infrastructure */}
      <div className="md:flex flex flex-col md:flex-row justify-center items-center gap-20 bg-cover" style={{ backgroundImage: "url('abstract_background_1693333 1.png')" }}>
        <Image src="infrustructure.png" width={526} height={526} alt="" className="lg:my-40 md:my-28 my-10 md:w-96 lg:w-[526px]" />
        <div className="md:text-start text-center md:w-[35vw]">
          <p className="xl:text-[40px] md:text-4xl text-2xl text-white font-bold">High-Performance Software Infrastructure</p>
          <p className="text-white md:text-xl text-xs">Multi-server operation across several data centers ensuring fast data delivery and low latency. Redundant hosting for maximum reliability.</p>
        </div>
      </div>
      {/* Coins Data */}
      <div className="2xl:mx-56 lg:mx-20 lg:my-20 2xl:my-52 my-20">
        <div className="flex sm:flex-row flex-col sm:text-start text-center sm:gap-5 gap-3 justify-between items-center xl:mx-20">
          <div>
            <p className="text-white md:text-3xl text-xl font-semibold">Cryptocurrency Prices  <span className="bg-gradient-to-t from-blue via-blue to-lightblue text-transparent bg-clip-text">by Market Cap</span></p>
            <p className="text-description sm:text-md text-xs">The global crypto market cap is $1.52T, a 5.06% decrease over the last day. </p>
          </div>
          <Link href="/cryptocurrencies/prices-all">
            <Button variant={"alldone"} size={"outline"}><AllDoneIcon /> All Coins Ranking<ChevronRight /></Button>
          </Link>
        </div>
        <div className="xl:flex xl:justify-between md:block hidden mt-5">
          <div className="bg-metricbasic xl:w-full rounded-lg p-5">
            <div className="flex gap-2 px-5 py-2">
              {MenuLinkTexts.landingcryptoleft.map((item: FilterItemType, index: number) => (
                <Button
                  key={index}
                  size={"filters"}
                  variant="filter"
                  value={item.value}
                  onClick={() => setFilter(item.value)}
                >
                  {item.text}
                </Button>
              ))}
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
                {coinData && coinData.filter(coin => coin.categories && coin.categories.includes(filter)).map((coin) => (
                  <TableRow key={coin.market_cap_rank} className="text-white text-sm">
                    <TableCell>{coin.market_cap_rank}</TableCell>
                    <TableCell className="flex items-center gap-2">
                      <Image src={`${coin.symbol.toLowerCase()}.png`} alt="" width={30} height={30} />
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
                      {(coin.percent_change_1h < 0) ?
                        <p className="text-red-500">{coin.percent_change_1h.toFixed(2)}%</p> :
                        <p className="text-green-500">{coin.percent_change_1h.toFixed(2)}%</p>}
                    </TableCell>
                    <TableCell>
                      {(coin.percent_change_24h < 0) ?
                        <p className="text-red-500">{coin.percent_change_24h.toFixed(2)}%</p> :
                        <p className="text-green-500">{coin.percent_change_24h.toFixed(2)}%</p>}
                    </TableCell>
                    <TableCell>
                      {(coin.market_cap / 1_000_000_000) >= 1 ?
                        `$${(coin.market_cap / 1_000_000_000).toFixed(2)}B` :
                        `$${(coin.market_cap / 1_000_000).toFixed(2)}M`}
                    </TableCell>
                    <TableCell>
                      {(coin.volume_24h / 1_000_000_000) >= 1 ?
                        `$${(coin.volume_24h / 1_000_000_000).toFixed(2)}B` :
                        `$${(coin.volume_24h / 1_000_000).toFixed(2)}M`}
                    </TableCell>
                    <TableCell><div className="w-24 h-10"><Chart data={chartData} /></div></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="text-white flex justify-end gap-3">
              {page == 0 ? <ChevronLeft className="text-description" /> : <ChevronLeft onClick={() => Prev()} />}<ChevronRight onClick={() => Next()} />
            </div>
          </div>
          {/* <div className="bg-metricbasic rounded-lg p-8">
            <NavigationMenu>
              <NavigationMenuList>
                {MenuLinkTexts.landingcryptoright.map((item: LinkItemType, index: number) =>
                  <div key={index}>
                    <NavigationMenuItem>
                      <Link href={item.href} legacyBehavior passHref>
                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                          {item.text}
                        </NavigationMenuLink>
                      </Link>
                    </NavigationMenuItem>
                  </div>
                )}
              </NavigationMenuList>
            </NavigationMenu>
            {coinData && coinData.map((coin) =>
              <div key={coin.id} className="flex justify-between items-center mt-8 text-sm">
                <div className="flex gap-2 items-center">
                  <Image src={`${coin.symbol.toLowerCase()}.png`} alt="" width={30} height={30} />
                  <div className="flex flex-col justify-centeritems-center ">
                    <p className="text-white">{coin.name}</p>
                    <div className="text-description">{coin.symbol}</div>
                  </div>
                </div>
                <div className="flex gap-3 text-white">
                  {coin.price < 0.00001 ? (
                    <p className="text-white">{coin.price.toFixed(9)}$</p>
                  ) : coin.price < 1 ? (
                    <p className="text-white">{coin.price.toFixed(5)}$</p>
                  ) : (
                    <p className="text-white">{coin.price.toFixed(2)}$</p>
                  )}

                  {(coin.percent_change_1h < 0) ?
                    <p className="flex items-center text-red-500">{coin.percent_change_1h.toFixed(2)}%<PriceDown /></p> :
                    <div>
                      {(coin.percent_change_1h > 100) ?
                        <p className="flex items-center text-green-500">{">100%"}<PriceRaise /></p> :
                        <p className="flex items-center text-green-500">{coin.percent_change_1h.toFixed(2)}%<PriceRaise /></p>}
                    </div>}
                </div>
              </div>)}
            <div className="flex justify-center gap-3 text-white mt-10">
              {page1 == 0 ? <ChevronLeft className="text-description" /> : <ChevronLeft onClick={() => Prev1()} />}<ChevronRight onClick={() => Next1()} />
            </div>
          </div> */}
        </div>
      </div>

      {/* FAQs */}
      <div className="lg:p-56 sm:p-24 p-8 bg-contain" style={{ backgroundImage: "url('/faqbackground.png')" }}>
        <div className="flex flex-col gap-10 text-center">
          <p className="md:text-4xl text-2xl text-white font-semibold">Frequently asked questions</p>
          <p className="md:text-xl text-sm text-description">Everything you need to know about the product and billing.</p>
        </div>
        <div>
          <FAQs />
        </div>
      </div>
      <Footer />
    </main>
  );
}
