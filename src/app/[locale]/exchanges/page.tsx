'use client'

import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ExchangeNavbar } from "@/components/ExchangeNavbar";
import { Search } from "lucide-react";
import Footer from "@/components/Footer";
import { Chart } from "@/components/Chart";
import { Button } from "@/components/ui/button";
import { Select, SelectItem, SelectTrigger, SelectValue, SelectContent } from "@/components/ui/select";
import { Table, TableRow, TableCell, TableHead, TableBody, TableHeader } from "@/components/ui/table";
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { MenuLinkTexts } from "@/config/contents";
import { LinkItemType } from "@/types";
import { ChevronRight, ChevronLeft } from "lucide-react";

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

const Cryptocurrencies = () => {
	const [coinData, setCoinData] = useState<CoinData[]>([])
	const [loadNum, setLoadNum] = useState('10');
	const [page, setPage] = useState(0)

	const Prev = () => {
		setPage(Math.max(page - 1, 0));
	}
	const Next = () => {
		setPage(Math.min(page + 1, 25))
		console.log(page);

	}
	const handleSelectChange = (value: string) => {
		setLoadNum(value);
	};
	const fetchCoinData = async () => {
		try {
			const res = await fetch(`/api/coinData?&limit=${loadNum}&page=${page}`);
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
		fetchCoinData()
	}, [loadNum, page])
	return (
		<div className="text-white">
			<ExchangeNavbar />
			<div className="lg:mx-36 md:mx-12 mx-3">
				<div className="mt-28 md:text-start text-center">
					<p className="md:text-3xl text-xl font-semibold">Top Cryptocurrency Spot
						<span className="bg-gradient-to-t from-blue via-blue to-lightblue text-transparent bg-clip-text ml-3">Exchanges</span>
					</p>
					<p className="text-description md:text-md text-sm">
						Infinity ranks and scores exchanges based on traffic, liquidity, trading volumes, and confidence in the legitimacy of trading volumes reported
					</p>
				</div>
				<div className="rounded-lg py-8">
					<div className="flex flex-col sm:flex-row justify-between my-3">
						<NavigationMenu>
							<NavigationMenuList>
								{MenuLinkTexts.exchange.map((item: LinkItemType, index: number) =>
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
						<div className="flex gap-2 items-center border-2 border-description md:px-3 md:py-2 p-1 rounded-lg">
							<Search className="text-description" width={20} />
							<input type="text" placeholder="search" className="bg-bodybackgroundcolor outline-none" />
						</div>
					</div>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>#</TableHead>
								<TableHead>Exchange</TableHead>
								<TableHead>Score</TableHead>
								<TableHead>Trading volume(24h)</TableHead>
								<TableHead>Avg. Liquidity	</TableHead>
								<TableHead>Weekly Visits</TableHead>
								<TableHead># Markets </TableHead>
								<TableHead># Coins</TableHead>
								<TableHead>Fiat Supported</TableHead>
								<TableHead>Volume Graph (7d)</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{coinData && coinData.map((coin) => (
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
									<TableCell><div className="w-24 h-10">123456</div></TableCell>
									<TableCell><div className="w-24 h-10">234567</div></TableCell>
									<TableCell><div className="w-24 h-10"><Chart data={chartData} /></div></TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</div>
				<div className="flex justify-end text-sm py-3 px-2">
					<div className="md:flex grid grid-cols-2 items-center gap-5">
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
						<p>{page == 0 ? 0 : Number(loadNum) * page} -{page == 0 ? loadNum : Number(loadNum) * (page + 1)} <span>of 2690</span></p>
						<div className="flex gap-5">
							{page == 0 ?
								<ChevronLeft className="text-description" /> :
								<ChevronLeft onClick={() => Prev()} />
							}
							<ChevronRight onClick={() => Next()} />
						</div>
					</div>
				</div>
				<div className="flex justify-center">
					<Button size={"loadmore"} className="bg-[#1D212F] hover:bg-description text-sm" onClick={() => Next()}>Load More</Button>
				</div>
			</div>
			<Footer />
		</div>
	)
}

export default Cryptocurrencies;