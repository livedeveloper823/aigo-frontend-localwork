import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from '@/components/ui/checkbox'

interface FiltersState {
	price: { min: number; max: number };
	market_cap: { min: number; max: number };
	money: { min: number; max: number };
	txs_volume: { min: number; max: number };
	daily_active_address: { min: number; max: number };
	ownership: string;
	hodler_balance: { min: number; max: number };
	twitter_sentiment: string;
	exchange_netflows: { min: number; max: number };
	signals: string;
}

const FilterSidebar = ({ filters, setFilters }) => {

	const handleChangeChecked = (minValue: number, maxValue: number) => {
		console.log({"min": minValue, "max": maxValue});
		
		const lastMinValue = filters.price.min;
		const lastMaxValue = filters.price.max;
		setFilters((prev) => ({
			...prev,
			price: {
				min: lastMinValue < minValue ? lastMinValue : minValue,
				max: lastMaxValue > maxValue ? lastMaxValue : maxValue
			}
		}));
		console.log(filters);		
	};

	return (
		<div className="flex flex-col gap-6 p-5 w-72 text-white">
			<div className="flex flex-col gap-2">
				<p className="font-semibold">Price Change</p>
				<div className="flex gap-2 items-center">
					<Checkbox id="check1" name="check1" checked={true} />
					<label htmlFor="check1">{'>'}= +100%</label>
				</div>
				<div className="flex gap-2 items-center">
					<Checkbox id="check2" name="check2" checked={true}  />
					<label htmlFor="check2">+30% to +100%</label>
				</div>
				<div className="flex gap-2 items-center">
					<Checkbox id="check3" name="check3" checked={true}  />
					<label htmlFor="check3">+5% to +30%</label>
				</div>
				<div className="flex gap-2 items-center">
					<Checkbox id="check4" name="check4" checked={true}  />
					<label htmlFor="check4">-5% to -15%</label>
				</div>
				<div className="flex gap-2 items-center">
					<Checkbox id="check5" name="check5" checked={true}  />
					<label htmlFor="check5">-30% to -100%</label>
				</div>
			</div>
			<div>
				<p className="font-semibold">Market Cap</p>
				<RadioGroup>
					<div className="flex items-center space-x-2">
						<RadioGroupItem value="cap1" id="cap1" />
						<label htmlFor="cap1">{'>'}= $1b</label>
					</div>
					<div className="flex items-center space-x-2">
						<RadioGroupItem value="cap2" id="cap2" />
						<label htmlFor="cap2">$100m to $1b</label>
					</div>
					<div className="flex items-center space-x-2">
						<RadioGroupItem value="cap3" id="cap3" />
						<label htmlFor="cap3">$10m to $100m</label>
					</div>
					<div className="flex items-center space-x-2">
						<RadioGroupItem value="cap4" id="cap4" />
						<label htmlFor="cap4">{'<'}= $10m</label>
					</div>
				</RadioGroup>
			</div>
			<div>
				<p className="font-semibold">In The Money</p>
				<RadioGroup>
					<div className="flex items-center space-x-2">
						<RadioGroupItem value="money1" id="money1" />
						<label htmlFor="money1">{'>'}= 95%</label>
					</div>
					<div className="flex items-center space-x-2">
						<RadioGroupItem value="money2" id="money2" />
						<label htmlFor="money2">75% to 100%</label>
					</div>
					<div className="flex items-center space-x-2">
						<RadioGroupItem value="money3" id="money3" />
						<label htmlFor="money3">25% to 75%</label>
					</div>
					<div className="flex items-center space-x-2">
						<RadioGroupItem value="money4" id="money4" />
						<label htmlFor="money4">{'<'}= 25%</label>
					</div>
				</RadioGroup>
			</div>
			<div>
				<p className="font-semibold">Large Txs Volume</p>
				<RadioGroup>
					<div className="flex items-center space-x-2">
						<RadioGroupItem value="txs1" id="txs1" />
						<label htmlFor="txs1">{'>'}= $1b</label>
					</div>
					<div className="flex items-center space-x-2">
						<RadioGroupItem value="txs2" id="txs2" />
						<label htmlFor="txs2">$100m to $1b</label>
					</div>
					<div className="flex items-center space-x-2">
						<RadioGroupItem value="txs3" id="txs3" />
						<label htmlFor="txs3">$10m to $100m</label>
					</div>
					<div className="flex items-center space-x-2">
						<RadioGroupItem value="txs4" id="txs4" />
						<label htmlFor="txs4">{'<'}= $10m</label>
					</div>
				</RadioGroup>
			</div>
			<div>
				<p className="font-semibold">Daily Active Addresses</p>
				<RadioGroup>
					<div className="flex items-center space-x-2">
						<RadioGroupItem value="addresses1" id="addresses1" />
						<label htmlFor="addresses1">{'>'}= 100k</label>
					</div>
					<div className="flex items-center space-x-2">
						<RadioGroupItem value="addresses2" id="addresses2" />
						<label htmlFor="addresses2">10k to 100k</label>
					</div>
					<div className="flex items-center space-x-2">
						<RadioGroupItem value="addresses3" id="addresses3" />
						<label htmlFor="addresses3">1k to 10k</label>
					</div>
					<div className="flex items-center space-x-2">
						<RadioGroupItem value="addresses4" id="addresses4" />
						<label htmlFor="addresses4">{'<'}= 1k</label>
					</div>
				</RadioGroup>
			</div>
			<div>
				<p className="font-semibold">Ownership Distribution</p>
				<RadioGroup>
					<div className="flex items-center space-x-2">
						<RadioGroupItem value="ownership1" id="ownership1" />
						<label htmlFor="ownership1">Whales {'>'} Investors</label>
					</div>
					<div className="flex items-center space-x-2">
						<RadioGroupItem value="ownership2" id="ownership2" />
						<label htmlFor="ownership2">Investors {'>'} Whales</label>
					</div>
					<div className="flex items-center space-x-2">
						<RadioGroupItem value="ownership3" id="ownership3" />
						<label htmlFor="ownership3">Retailers {'>'} Investors</label>
					</div>
				</RadioGroup>
			</div>
			<div>
				<p className="font-semibold">Hodlers Balance</p>
				<RadioGroup>
					<div className="flex items-center space-x-2">
						<RadioGroupItem value="hodlers1" id="hodlers1" />
						<label htmlFor="hodlers1">{'>'}= $1b</label>
					</div>
					<div className="flex items-center space-x-2">
						<RadioGroupItem value="hodlers2" id="hodlers2" />
						<label htmlFor="hodlers2">$100m to $1b</label>
					</div>
					<div className="flex items-center space-x-2">
						<RadioGroupItem value="hodlers3" id="hodlers3" />
						<label htmlFor="hodlers3">$10m to $100m</label>
					</div>
					<div className="flex items-center space-x-2">
						<RadioGroupItem value="hodlers4" id="hodlers4" />
						<label htmlFor="hodlers4">{'<'}= $10m</label>
					</div>
				</RadioGroup>
			</div>
			<div>
				<p className="font-semibold">Twitter Sentiment</p>
				<RadioGroup>
					<div className="flex items-center space-x-2">
						<RadioGroupItem value="Positive" id="Positive" />
						<label htmlFor="Positive">Positive</label>
					</div>
					<div className="flex items-center space-x-2">
						<RadioGroupItem value="Neutral" id="Neutral" />
						<label htmlFor="Neutral">Neutral</label>
					</div>
					<div className="flex items-center space-x-2">
						<RadioGroupItem value="Negative" id="Negative" />
						<label htmlFor="Negative">Negative</label>
					</div>
				</RadioGroup>
			</div>
			<div>
				<p className="font-semibold">Exchanges Netflows</p>
				<RadioGroup>
					<div className="flex items-center space-x-2">
						<RadioGroupItem value="netflows1" id="netflows1" />
						<label htmlFor="netflows1">{'>'}= $10m</label>
					</div>
					<div className="flex items-center space-x-2">
						<RadioGroupItem value="netflows2" id="netflows2" />
						<label htmlFor="netflows2">$1m to $10m</label>
					</div>
					<div className="flex items-center space-x-2">
						<RadioGroupItem value="netflows3" id="netflows3" />
						<label htmlFor="netflows3">-$1m to -$10m</label>
					</div>
					<div className="flex items-center space-x-2">
						<RadioGroupItem value="netflows4" id="netflows4" />
						<label htmlFor="netflows4">{'<'}= $10m</label>
					</div>
				</RadioGroup>
			</div>
			<div>
				<p className="font-semibold">Signals</p>
				<RadioGroup>
					<div className="flex items-center space-x-2">
						<RadioGroupItem value="Bullish" id="Bullish" />
						<label htmlFor="Bullish">Bullish</label>
					</div>
					<div className="flex items-center space-x-2">
						<RadioGroupItem value="Neutral" id="Neutral" />
						<label htmlFor="Neutral">Neutral</label>
					</div>
					<div className="flex items-center space-x-2">
						<RadioGroupItem value="Bearish" id="Bearish" />
						<label htmlFor="Bearish">Bearish</label>
					</div>
				</RadioGroup>
			</div>
		</div>
	)
}

export default FilterSidebar;