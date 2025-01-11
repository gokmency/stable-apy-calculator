import React, { useState, useCallback } from 'react';
import { Calculator, ExternalLink } from 'lucide-react';

interface StableCoin {
  name: string;
  symbol: string;
  averageApy: number;
  logo: string;
}

const stablecoins: StableCoin[] = [
  { 
    name: 'USD Coin',
    symbol: 'USDC',
    averageApy: 8.2,
    logo: 'https://cryptologos.cc/logos/usd-coin-usdc-logo.png'
  },
  { 
    name: 'Tether',
    symbol: 'USDT',
    averageApy: 7.8,
    logo: 'https://cryptologos.cc/logos/tether-usdt-logo.png'
  },
  { 
    name: 'DAI',
    symbol: 'DAI',
    averageApy: 4.3,
    logo: 'https://cryptologos.cc/logos/multi-collateral-dai-dai-logo.png'
  },
  { 
    name: 'First Digital USD',
    symbol: 'FDUSD',
    averageApy: 4.1,
    logo: 'https://cryptologos.cc/logos/first-digital-usd-fdusd-logo.png'
  }
];

function App() {
  const [amount, setAmount] = useState<string>('1000');
  const [apy, setApy] = useState<string>('4.5');

  const calculateReturns = useCallback((days: number) => {
    const principal = parseFloat(amount) || 0;
    const rate = (parseFloat(apy) || 0) / 100;
    const years = days / 365;
    
    const earnings = principal * Math.pow(1 + rate, years) - principal;
    return {
      earnings: earnings.toFixed(2),
      total: (principal + earnings).toFixed(2)
    };
  }, [amount, apy]);

  const dailyReturns = calculateReturns(1);
  const monthlyReturns = calculateReturns(30);
  const yearlyReturns = calculateReturns(365);

  return (
    <div className="min-h-screen bg-[#12161C] text-white flex flex-col">
      <div className="container mx-auto px-4 py-12 flex-grow">
        <div className="flex flex-col items-center mb-12">
          <Calculator className="w-12 h-12 text-[#F3BA2F] mb-4" />
          <h1 className="text-4xl font-bold mb-2">Stablecoin Staking Calculator</h1>
          <p className="text-gray-400 text-center max-w-2xl">
            Calculate your potential earnings from staking stablecoins across different time periods.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <div className="bg-[#1A1F26] p-8 rounded-xl">
            <h2 className="text-2xl font-semibold mb-6">Calculate Returns</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Staking Amount (USD)</label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full bg-[#12161C] border border-gray-700 rounded-lg py-3 px-4 focus:outline-none focus:border-[#F3BA2F]"
                  placeholder="Enter amount"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">APY Rate (%)</label>
                <input
                  type="number"
                  value={apy}
                  onChange={(e) => setApy(e.target.value)}
                  className="w-full bg-[#12161C] border border-gray-700 rounded-lg py-3 px-4 focus:outline-none focus:border-[#F3BA2F]"
                  placeholder="Enter APY"
                  step="0.1"
                />
              </div>
            </div>

            <div className="mt-8 space-y-4">
              <div className="p-6 bg-[#12161C] rounded-lg">
                <h3 className="text-lg font-semibold mb-4">Daily Returns</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-400 text-sm">Earnings</p>
                    <p className="text-[#F3BA2F] text-xl font-bold">${dailyReturns.earnings}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Total Value</p>
                    <p className="text-white text-xl font-bold">${dailyReturns.total}</p>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-[#12161C] rounded-lg">
                <h3 className="text-lg font-semibold mb-4">Monthly Returns</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-400 text-sm">Earnings</p>
                    <p className="text-[#F3BA2F] text-xl font-bold">${monthlyReturns.earnings}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Total Value</p>
                    <p className="text-white text-xl font-bold">${monthlyReturns.total}</p>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-[#12161C] rounded-lg">
                <h3 className="text-lg font-semibold mb-4">Yearly Returns</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-400 text-sm">Earnings</p>
                    <p className="text-[#F3BA2F] text-xl font-bold">${yearlyReturns.earnings}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Total Value</p>
                    <p className="text-white text-xl font-bold">${yearlyReturns.total}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#1A1F26] p-8 rounded-xl">
            <h2 className="text-2xl font-semibold mb-6">Popular Stablecoins</h2>
            
            <div className="space-y-4">
              {stablecoins.map((coin) => (
                <div
                  key={coin.symbol}
                  className="flex items-center justify-between p-4 bg-[#12161C] rounded-lg hover:bg-opacity-80 transition-colors cursor-pointer"
                  onClick={() => setApy(coin.averageApy.toString())}
                >
                  <div className="flex items-center gap-3">
                    <img 
                      src={coin.logo} 
                      alt={coin.name} 
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <h3 className="font-semibold">{coin.name}</h3>
                      <p className="text-sm text-gray-400">{coin.symbol}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[#F3BA2F] font-semibold">{coin.averageApy}% APY</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 p-6 bg-[#12161C] rounded-lg">
              <h3 className="text-lg font-semibold mb-3">What are Stablecoins?</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Stablecoins are cryptocurrencies designed to maintain a stable value by pegging to a reserve asset like the US dollar. 
                They combine the stability of traditional currencies with the digital advantages of cryptocurrencies, making them ideal 
                for staking, trading, and earning passive income. Each stablecoin is typically backed 1:1 with its reserve asset, 
                providing users with a secure way to participate in crypto markets while minimizing volatility risks.
              </p>
            </div>
          </div>
        </div>

       {/* Banner Space */}
<div className="max-w-6xl mx-auto mt-12">
  <div className="bg-[#1A1F26] p-4 rounded-lg">
    <div className="aspect-[21/3] relative overflow-hidden rounded">
      <a 
        href="https://grainz.xyz" 
        target="_blank" 
        rel="noopener noreferrer"
        className="block w-full h-full"
      >
        <img 
          src="https://grainz.xyz/image/l5/jpg/background-01.png"
          alt="Banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#12161C]/80 to-transparent flex items-center p-8">
          <div>
            <h3 className="text-2xl font-bold text-white mb-2">REKLAM banner</h3>
            <p className="text-gray-200">ref linki
            </p>
          </div>
        </div>
      </a>
    </div>
  </div>
</div>
      </div>

      <footer className="bg-[#1A1F26] py-4 mt-8">
        <div className="container mx-auto px-4 text-center">
          <a 
            href="https://grainz.xyz" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[#F3BA2F] hover:text-[#F3BA2F]/80 transition-colors"
          >
            Powered by GRAINZ STUDIO
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </footer>
    </div>
  );
}

export default App;