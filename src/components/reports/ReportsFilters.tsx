
import React from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search } from 'lucide-react';

interface ReportsFiltersProps {
  search: string;
  setSearch: (value: string) => void;
  selectedCategory: string;
  setSelectedCategory: (value: string) => void;
  selectedPeriod: string;
  setSelectedPeriod: (value: string) => void;
  selectedForklift: string;
  setSelectedForklift: (value: string) => void;
}

const ReportsFilters: React.FC<ReportsFiltersProps> = ({
  search,
  setSearch,
  selectedCategory,
  setSelectedCategory,
  selectedPeriod,
  setSelectedPeriod,
  selectedForklift,
  setSelectedForklift
}) => {
  return (
    <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4">
      <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
        {/* Search */}
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
          <Input 
            type="text" 
            placeholder="Search intelligent reports..." 
            className="pl-10 bg-slate-900/50 border-slate-600/50 text-slate-100 placeholder:text-slate-400 focus:border-blue-500/50 focus:ring-blue-500/20"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Category Filter */}
        <div className="w-full lg:w-auto min-w-[160px]">
          <Select
            value={selectedCategory || 'all'}
            onValueChange={(value) => setSelectedCategory(value === 'all' ? '' : value)}
          >
            <SelectTrigger className="bg-slate-900/50 border-slate-600/50 text-slate-100 hover:bg-slate-800/70 transition-colors">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-600">
              <SelectItem value="all" className="text-slate-100 hover:bg-slate-700 focus:bg-slate-700">All Categories</SelectItem>
              <SelectItem value="operacoes" className="text-slate-100 hover:bg-slate-700 focus:bg-slate-700">Operations</SelectItem>
              <SelectItem value="manutencao" className="text-slate-100 hover:bg-slate-700 focus:bg-slate-700">Maintenance</SelectItem>
              <SelectItem value="abastecimento" className="text-slate-100 hover:bg-slate-700 focus:bg-slate-700">Fuel Supply</SelectItem>
              <SelectItem value="operadores" className="text-slate-100 hover:bg-slate-700 focus:bg-slate-700">Operators</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Period Filter */}
        <div className="w-full lg:w-auto min-w-[160px]">
          <Select
            value={selectedPeriod || 'all'}
            onValueChange={(value) => setSelectedPeriod(value === 'all' ? '' : value)}
          >
            <SelectTrigger className="bg-slate-900/50 border-slate-600/50 text-slate-100 hover:bg-slate-800/70 transition-colors">
              <SelectValue placeholder="All Periods" />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-600">
              <SelectItem value="all" className="text-slate-100 hover:bg-slate-700 focus:bg-slate-700">All Periods</SelectItem>
              <SelectItem value="hoje" className="text-slate-100 hover:bg-slate-700 focus:bg-slate-700">Today</SelectItem>
              <SelectItem value="semana" className="text-slate-100 hover:bg-slate-700 focus:bg-slate-700">This Week</SelectItem>
              <SelectItem value="mes" className="text-slate-100 hover:bg-slate-700 focus:bg-slate-700">This Month</SelectItem>
              <SelectItem value="trimestre" className="text-slate-100 hover:bg-slate-700 focus:bg-slate-700">Quarter</SelectItem>
              <SelectItem value="ano" className="text-slate-100 hover:bg-slate-700 focus:bg-slate-700">This Year</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Algorithm Filter */}
        <div className="w-full lg:w-auto min-w-[160px]">
          <Select
            value={selectedForklift || 'all'}
            onValueChange={(value) => setSelectedForklift(value === 'all' ? '' : value)}
          >
            <SelectTrigger className="bg-slate-900/50 border-slate-600/50 text-slate-100 hover:bg-slate-800/70 transition-colors">
              <SelectValue placeholder="All Algorithms" />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-600">
              <SelectItem value="all" className="text-slate-100 hover:bg-slate-700 focus:bg-slate-700">All Algorithms</SelectItem>
              <SelectItem value="emp-001" className="text-slate-100 hover:bg-slate-700 focus:bg-slate-700">ALG-001</SelectItem>
              <SelectItem value="emp-002" className="text-slate-100 hover:bg-slate-700 focus:bg-slate-700">ALG-002</SelectItem>
              <SelectItem value="emp-003" className="text-slate-100 hover:bg-slate-700 focus:bg-slate-700">ALG-003</SelectItem>
              <SelectItem value="emp-004" className="text-slate-100 hover:bg-slate-700 focus:bg-slate-700">ALG-004</SelectItem>
              <SelectItem value="emp-005" className="text-slate-100 hover:bg-slate-700 focus:bg-slate-700">ALG-005</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default ReportsFilters;
