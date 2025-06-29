
import React, { useState, useMemo } from 'react';
import PageHeader from '@/components/layout/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import ModernKpiCard from '@/components/dashboard/ModernKpiCard';
import { TrendingUp, TrendingDown, BarChart3, Activity } from 'lucide-react';
import StandardFilters from '@/components/common/StandardFilters';
import { useSearchParams } from 'react-router-dom';

interface MarketStock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  marketCap: string;
  sector: string;
}

const MarketData = () => {
  const [searchParams] = useSearchParams();
  const initialSearch = searchParams.get('search') || '';
  
  const [searchValue, setSearchValue] = useState(initialSearch);
  const [filterValues, setFilterValues] = useState<Record<string, string>>({});

  // Sample market data
  const marketData: MarketStock[] = [
    {
      symbol: 'AAPL',
      name: 'Apple Inc.',
      price: 173.50,
      change: 2.25,
      changePercent: 1.31,
      volume: 45234567,
      marketCap: '$2.8T',
      sector: 'Technology'
    },
    {
      symbol: 'GOOGL',
      name: 'Alphabet Inc.',
      price: 138.21,
      change: -1.15,
      changePercent: -0.82,
      volume: 32187654,
      marketCap: '$1.7T',
      sector: 'Technology'
    },
    {
      symbol: 'MSFT',
      name: 'Microsoft Corporation',
      price: 378.85,
      change: 4.12,
      changePercent: 1.10,
      volume: 28543210,
      marketCap: '$2.8T',
      sector: 'Technology'
    },
    {
      symbol: 'TSLA',
      name: 'Tesla Inc.',
      price: 208.98,
      change: -8.45,
      changePercent: -3.89,
      volume: 87654321,
      marketCap: '$665B',
      sector: 'Automotive'
    },
    {
      symbol: 'AMZN',
      name: 'Amazon.com Inc.',
      price: 151.94,
      change: 0.85,
      changePercent: 0.56,
      volume: 41234567,
      marketCap: '$1.6T',
      sector: 'E-commerce'
    },
    {
      symbol: 'NVDA',
      name: 'NVIDIA Corporation',
      price: 875.28,
      change: 12.45,
      changePercent: 1.44,
      volume: 29876543,
      marketCap: '$2.2T',
      sector: 'Technology'
    }
  ];

  const filterOptions = [
    {
      key: 'sector',
      label: 'Sector',
      type: 'select' as const,
      options: [
        { value: 'technology', label: 'Technology' },
        { value: 'automotive', label: 'Automotive' },
        { value: 'ecommerce', label: 'E-commerce' },
        { value: 'finance', label: 'Finance' },
        { value: 'healthcare', label: 'Healthcare' }
      ]
    },
    {
      key: 'performance',
      label: 'Performance',
      type: 'select' as const,
      options: [
        { value: 'gainers', label: 'Gainers' },
        { value: 'losers', label: 'Losers' },
        { value: 'neutral', label: 'Neutral' }
      ]
    }
  ];

  const filteredData = useMemo(() => {
    return marketData.filter(stock => {
      const matchesSearch = searchValue === '' || 
        stock.symbol.toLowerCase().includes(searchValue.toLowerCase()) ||
        stock.name.toLowerCase().includes(searchValue.toLowerCase());
      
      const matchesSector = !filterValues.sector || 
        stock.sector.toLowerCase() === filterValues.sector.toLowerCase();
      
      const matchesPerformance = !filterValues.performance || 
        (filterValues.performance === 'gainers' && stock.change > 0) ||
        (filterValues.performance === 'losers' && stock.change < 0) ||
        (filterValues.performance === 'neutral' && stock.change === 0);
      
      return matchesSearch && matchesSector && matchesPerformance;
    });
  }, [searchValue, filterValues]);

  const stats = {
    totalStocks: marketData.length,
    gainers: marketData.filter(s => s.change > 0).length,
    losers: marketData.filter(s => s.change < 0).length,
    avgChange: parseFloat((marketData.reduce((sum, s) => sum + s.changePercent, 0) / marketData.length).toFixed(2))
  };

  return (
    <div className="space-y-8">
      <PageHeader
        title="Market Data"
        description="Real-time stock market data and analytics"
      />

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <ModernKpiCard
          title="Total Stocks"
          value={stats.totalStocks}
          icon={Activity}
          variant="default"
        />
        
        <ModernKpiCard
          title="Gainers"
          value={stats.gainers}
          icon={TrendingUp}
          variant="success"
        />
        
        <ModernKpiCard
          title="Losers"
          value={stats.losers}
          icon={TrendingDown}
          variant="danger"
        />
        
        <ModernKpiCard
          title="Avg Change"
          value={stats.avgChange}
          icon={BarChart3}
          variant="info"
        />
      </div>

      {/* Filters */}
      <StandardFilters
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        searchPlaceholder="Search stocks by symbol or name..."
        filters={filterOptions}
        filterValues={filterValues}
        onFilterChange={(key, value) => setFilterValues(prev => ({ ...prev, [key]: value }))}
        onClearFilters={() => {
          setSearchValue('');
          setFilterValues({});
        }}
      />

      {/* Stock Data Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredData.map((stock) => (
          <Card key={stock.symbol} className="glass-card border-slate-200/60 dark:border-slate-700/60 hover:shadow-lg transition-all duration-300">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg font-bold text-slate-900 dark:text-slate-100">
                    {stock.symbol}
                  </CardTitle>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                    {stock.name}
                  </p>
                </div>
                <Badge variant="outline" className="text-xs">
                  {stock.sector}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                    ${stock.price.toFixed(2)}
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Market Cap: {stock.marketCap}
                  </p>
                </div>
                <div className="text-right">
                  <p className={`text-sm font-medium ${
                    stock.change >= 0 
                      ? 'text-green-600 dark:text-green-400' 
                      : 'text-red-600 dark:text-red-400'
                  }`}>
                    {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)}
                  </p>
                  <p className={`text-xs ${
                    stock.changePercent >= 0 
                      ? 'text-green-600 dark:text-green-400' 
                      : 'text-red-600 dark:text-red-400'
                  }`}>
                    {stock.changePercent >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%
                  </p>
                </div>
              </div>
              
              <div className="pt-3 border-t border-slate-200/60 dark:border-slate-700/60">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600 dark:text-slate-400">Volume:</span>
                  <span className="font-medium text-slate-900 dark:text-slate-100">
                    {stock.volume.toLocaleString()}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredData.length === 0 && (
        <Card className="glass-card border-slate-200/60 dark:border-slate-700/60">
          <CardContent className="py-12 text-center">
            <p className="text-slate-600 dark:text-slate-400">
              No stocks found matching your search criteria.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default MarketData;
