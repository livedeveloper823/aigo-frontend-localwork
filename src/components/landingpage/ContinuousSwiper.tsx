import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/autoplay';
import Link from 'next/link';

interface CoinInfo {
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
  market_cap_rank: number;
  // Add other properties as needed
}

interface CoinData {
  data: CoinInfo[],
}

const ContinuousSwiper: React.FC<CoinData> = ({ data }) => {
  return (
    <Swiper
      modules={[Autoplay]}
      slidesPerView={5}
      loop={true}
      autoplay={{
        delay: 0,
        disableOnInteraction: false,
      }}
      speed={4000}
    >
      {data.map((coin) => (
        <SwiperSlide key={coin.market_cap_rank}>
          <Link href={`/coins/${coin.symbol.toLowerCase()}`}>
            <div className='flex items-center gap-2 justify-center'>
              <p className='text-white'>{coin.symbol}</p>
              {coin.price < 0.00001 ? (
                <p className="text-white">{coin.price.toFixed(9)}$</p>
              ) : coin.price < 1 ? (
                <p className="text-white">{coin.price.toFixed(5)}$</p>
              ) : (
                <p className="text-white">{coin.price.toFixed(2)}$</p>
              )}
              {coin.percent_change_1h < 0 ? (
                <p className="flex items-center text-red-500">{coin.percent_change_1h.toFixed(2)}%</p>
              ) : coin.percent_change_1h > 100 ? (
                <p className="text-green-500">{">100%"}</p>
              ) : (
                <p className="flex items-center text-green-500">{coin.percent_change_1h.toFixed(2)}%</p>
              )}
            </div>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ContinuousSwiper;
