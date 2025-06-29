import React, { useState } from 'react';
import { Forklift, StatusEmpilhadeira, TipoEmpilhadeira } from '@/types';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Plus, Filter, Search, Grid, List, Download, Upload, Bot, CheckCircle, Wrench, AlertTriangle } from 'lucide-react';
import ForkliftList from '@/components/forklift/ForkliftList';
import ForkliftCard from '@/components/forklift/ForkliftCard';
import ForkliftDialog from '@/components/forklift/ForkliftDialog';
import ForkliftDetails from '@/components/forklift/ForkliftDetails';
import AdvancedFilters from '@/components/common/AdvancedFilters';
import PaginationControls from '@/components/common/PaginationControls';
import { useToast } from '@/hooks/use-toast';
import { usePagination } from '@/hooks/usePagination';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import PageHeader from '@/components/layout/PageHeader';
import ForkliftStatsCard from '@/components/forklift/ForkliftStatsCard';
import ForkliftDeleteDialog from '@/components/forklift/ForkliftDeleteDialog';
import { useAppStore } from '@/stores/useAppStore';

// Updated data for trading bots
const initialForklifts: Forklift[] = [
  {
    id: 'BOT001',
    modelo: 'Scalping Pro v2.1',
    marca: 'Hedron',
    tipo: TipoEmpilhadeira.GAS,
    status: StatusEmpilhadeira.OPERACIONAL,
    capacidade: 50000,
    anoFabricacao: 2024,
    dataAquisicao: '10/05/2024',
    numeroSerie: 'HED001',
    horimetro: 12583,
    ultimaManutencao: '15/09/2024',
    proximaManutencao: '15/12/2024',
    localizacaoAtual: 'NASDAQ',
    setor: 'Equities',
    custoHora: 145.50,
    eficiencia: 87.5,
    disponibilidade: 92.3,
    qrCode: 'QR001',
    model: 'Scalping Pro v2.1',
    type: TipoEmpilhadeira.GAS,
    capacity: '$50,000',
    acquisitionDate: '10/05/2024',
    lastMaintenance: '15/09/2024',
    hourMeter: 12583,
  },
  {
    id: 'BOT002',
    modelo: 'Swing Master v1.5',
    marca: 'Hedron',
    tipo: TipoEmpilhadeira.ELETRICA,
    status: StatusEmpilhadeira.OPERACIONAL,
    capacidade: 75000,
    anoFabricacao: 2023,
    dataAquisicao: '22/08/2023',
    numeroSerie: 'HED002',
    horimetro: 8452,
    ultimaManutencao: '30/10/2024',
    proximaManutencao: '30/01/2025',
    localizacaoAtual: 'FOREX',
    setor: 'Forex',
    custoHora: 138.75,
    eficiencia: 89.2,
    disponibilidade: 94.1,
    qrCode: 'QR002',
    model: 'Swing Master v1.5',
    type: TipoEmpilhadeira.ELETRICA,
    capacity: '$75,000',
    acquisitionDate: '22/08/2023',
    lastMaintenance: '30/10/2024',
    hourMeter: 8452,
  },
  {
    id: 'BOT003',
    modelo: 'Day Trader Elite v3',
    marca: 'Hedron',
    tipo: TipoEmpilhadeira.RETRATIL,
    status: StatusEmpilhadeira.EM_MANUTENCAO,
    capacidade: 25000,
    anoFabricacao: 2024,
    dataAquisicao: '04/03/2024',
    numeroSerie: 'HED003',
    horimetro: 10974,
    ultimaManutencao: '12/08/2024',
    proximaManutencao: '12/11/2024',
    localizacaoAtual: 'Optimization Queue',
    setor: 'Crypto',
    custoHora: 142.30,
    eficiencia: 85.1,
    disponibilidade: 88.7,
    qrCode: 'QR003',
    model: 'Day Trader Elite v3',
    type: TipoEmpilhadeira.RETRATIL,
    capacity: '$25,000',
    acquisitionDate: '04/03/2024',
    lastMaintenance: '12/08/2024',
    hourMeter: 10974,
  },
  {
    id: 'BOT004',
    modelo: 'Options Specialist v1',
    marca: 'Hedron',
    tipo: TipoEmpilhadeira.ELETRICA,
    status: StatusEmpilhadeira.OPERACIONAL,
    capacidade: 100000,
    anoFabricacao: 2023,
    dataAquisicao: '15/07/2024',
    numeroSerie: 'HED004',
    horimetro: 3245,
    ultimaManutencao: '20/11/2024',
    proximaManutencao: '20/02/2025',
    localizacaoAtual: 'Options Chain',
    setor: 'Options',
    custoHora: 141.20,
    eficiencia: 91.8,
    disponibilidade: 96.5,
    qrCode: 'QR004',
    model: 'Options Specialist v1',
    type: TipoEmpilhadeira.ELETRICA,
    capacity: '$100,000',
    acquisitionDate: '15/07/2024',
    lastMaintenance: '20/11/2024',
    hourMeter: 3245,
  },
  {
    id: 'BOT005',
    modelo: 'Trend Follower AI v2',
    marca: 'Hedron',
    tipo: TipoEmpilhadeira.GAS,
    status: StatusEmpilhadeira.PARADA,
    capacidade: 30000,
    anoFabricacao: 2022,
    dataAquisicao: '08/02/2022',
    numeroSerie: 'HED005',
    horimetro: 18567,
    ultimaManutencao: '05/12/2024',
    proximaManutencao: '05/03/2025',
    localizacaoAtual: 'Inactive',
    setor: 'Futures',
    custoHora: 148.90,
    eficiencia: 72.3,
    disponibilidade: 65.8,
    qrCode: 'QR005',
    model: 'Trend Follower AI v2',
    type: TipoEmpilhadeira.GAS,
    capacity: '$30,000',
    acquisitionDate: '08/02/2022',
    lastMaintenance: '05/12/2024',
    hourMeter: 18567,
  },
  {
    id: 'BOT006',
    modelo: 'Arbitrage Hunter v4',
    marca: 'Hedron',
    tipo: TipoEmpilhadeira.GAS,
    status: StatusEmpilhadeira.OPERACIONAL,
    capacidade: 60000,
    anoFabricacao: 2023,
    dataAquisicao: '12/09/2023',
    numeroSerie: 'HED006',
    horimetro: 9834,
    ultimaManutencao: '18/10/2024',
    proximaManutencao: '18/01/2025',
    localizacaoAtual: 'Global Markets',
    setor: 'Equities',
    custoHora: 144.75,
    eficiencia: 88.9,
    disponibilidade: 93.2,
    qrCode: 'QR006',
    model: 'Arbitrage Hunter v4',
    type: TipoEmpilhadeira.GAS,
    capacity: '$60,000',
    acquisitionDate: '12/09/2023',
    lastMaintenance: '18/10/2024',
    hourMeter: 9834,
  },
  {
    id: 'BOT007',
    modelo: 'Mean Reversion Pro',
    marca: 'Hedron',
    tipo: TipoEmpilhadeira.ELETRICA,
    status: StatusEmpilhadeira.EM_MANUTENCAO,
    capacidade: 40000,
    anoFabricacao: 2024,
    dataAquisicao: '25/04/2024',
    numeroSerie: 'HED007',
    horimetro: 1876,
    ultimaManutencao: '10/12/2024',
    proximaManutencao: '10/03/2025',
    localizacaoAtual: 'Optimization Queue',
    setor: 'Forex',
    custoHora: 139.60,
    eficiencia: 86.4,
    disponibilidade: 89.1,
    qrCode: 'QR007',
    model: 'Mean Reversion Pro',
    type: TipoEmpilhadeira.ELETRICA,
    capacity: '$40,000',
    acquisitionDate: '25/04/2024',
    lastMaintenance: '10/12/2024',
    hourMeter: 1876,
  },
  {
    id: 'BOT008',
    modelo: 'Breakout Scanner v5',
    marca: 'Hedron',
    tipo: TipoEmpilhadeira.GAS,
    status: StatusEmpilhadeira.OPERACIONAL,
    capacidade: 80000,
    anoFabricacao: 2023,
    dataAquisicao: '30/01/2023',
    numeroSerie: 'HED008',
    horimetro: 7629,
    ultimaManutencao: '02/11/2024',
    proximaManutencao: '02/02/2025',
    localizacaoAtual: 'Crypto Exchanges',
    setor: 'Crypto',
    custoHora: 143.85,
    eficiencia: 90.1,
    disponibilidade: 94.7,
    qrCode: 'QR008',
    model: 'Breakout Scanner v5',
    type: TipoEmpilhadeira.GAS,
    capacity: '$80,000',
    acquisitionDate: '30/01/2023',
    lastMaintenance: '02/11/2024',
    hourMeter: 7629,
  }
];

const TradingBotsPage = () => {
  const isMobile = useIsMobile();
  const { toast } = useToast();

  const forklifts = useAppStore((state) => state.empilhadeiras);
  const addEmpilhadeira = useAppStore((state) => state.addEmpilhadeira);
  const updateEmpilhadeira = useAppStore((state) => state.updateEmpilhadeira);
  const deleteEmpilhadeira = useAppStore((state) => state.deleteEmpilhadeira);

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [statusFilter, setStatusFilter] = useState<StatusEmpilhadeira | 'all'>('all');
  const [typeFilter, setTypeFilter] = useState<TipoEmpilhadeira | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [advancedFilters, setAdvancedFilters] = useState<Record<string, any>>({});
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const [selectedForklift, setSelectedForklift] = useState<Forklift | null>(null);

  // Advanced filter options for trading
  const filterOptions = [
    {
      key: 'capacidadeMin',
      label: 'Minimum Capital',
      type: 'number' as const,
    },
    {
      key: 'capacidadeMax',
      label: 'Maximum Capital',
      type: 'number' as const,
    },
    {
      key: 'anoFabricacao',
      label: 'Bot Version',
      type: 'select' as const,
      options: [
        { value: '2022', label: 'v1.0' },
        { value: '2023', label: 'v2.0' },
        { value: '2024', label: 'v2.1' },
      ],
    },
    {
      key: 'setor',
      label: 'Market',
      type: 'select' as const,
      options: [
        { value: 'Equities', label: 'Equities' },
        { value: 'Forex', label: 'Forex' },
        { value: 'Crypto', label: 'Crypto' },
        { value: 'Options', label: 'Options' },
      ],
    },
  ];

  // Filter trading bots based on all filters
  const filteredForklifts = forklifts.filter(forklift => {
    if (statusFilter !== 'all' && forklift.status !== statusFilter) {
      return false;
    }
    
    if (typeFilter !== 'all' && forklift.tipo !== typeFilter) {
      return false;
    }
    
    if (searchQuery && !forklift.id.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !forklift.modelo.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }

    if (advancedFilters.capacidadeMin && forklift.capacidade < parseInt(advancedFilters.capacidadeMin)) {
      return false;
    }
    if (advancedFilters.capacidadeMax && forklift.capacidade > parseInt(advancedFilters.capacidadeMax)) {
      return false;
    }
    if (advancedFilters.anoFabricacao && forklift.anoFabricacao.toString() !== advancedFilters.anoFabricacao) {
      return false;
    }
    if (advancedFilters.setor && forklift.setor !== advancedFilters.setor) {
      return false;
    }
    
    return true;
  });

  // Pagination hook
  const {
    currentPage,
    totalPages,
    paginatedData,
    goToPage,
    nextPage,
    previousPage,
    canGoNext,
    canGoPrevious,
    startIndex,
    endIndex,
    totalItems
  } = usePagination({
    data: filteredForklifts,
    itemsPerPage: viewMode === 'grid' ? 12 : 10
  });

  // Calculate summary statistics
  const stats = {
    total: forklifts.length,
    operational: forklifts.filter(f => f.status === StatusEmpilhadeira.OPERACIONAL).length,
    maintenance: forklifts.filter(f => f.status === StatusEmpilhadeira.EM_MANUTENCAO).length,
    stopped: forklifts.filter(f => f.status === StatusEmpilhadeira.PARADA).length,
  };

  // CRUD handlers
  const handleSaveForklift = (forkliftData: Forklift) => {
    if (editDialogOpen && selectedForklift) {
      updateEmpilhadeira(forkliftData.id, forkliftData);
      toast({
        title: "Bot updated",
        description: "The trading bot has been updated successfully."
      });
    } else {
      addEmpilhadeira(forkliftData);
      toast({
        title: "Bot deployed",
        description: "New trading bot has been deployed successfully."
      });
    }
  };

  const handleForkliftClick = (id: string) => {
    const forklift = forklifts.find(f => f.id === id);
    if (forklift) {
      setSelectedForklift(forklift);
      setDetailsDialogOpen(true);
    }
  };

  const handleEditFromDetails = () => {
    setDetailsDialogOpen(false);
    setEditDialogOpen(true);
  };

  const handleDeleteForklift = (id: string) => {
    const forklift = forklifts.find(f => f.id === id);
    if (forklift) {
      setSelectedForklift(forklift);
      setDeleteDialogOpen(true);
    }
  };

  const handleConfirmDelete = () => {
    if (selectedForklift) {
      deleteEmpilhadeira(selectedForklift.id);
      toast({
        title: "Bot deactivated",
        description: `The trading bot ${selectedForklift.id} has been deactivated successfully.`,
        variant: "destructive"
      });
      setSelectedForklift(null);
      setDeleteDialogOpen(false);
    }
  };

  const handleExportData = () => {
    toast({
      title: "Exporting data",
      description: "Export functionality will be implemented soon."
    });
  };

  const handleImportData = () => {
    toast({
      title: "Importing data",
      description: "Import functionality will be implemented soon."
    });
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <PageHeader 
        title="Trading Bot Management"
        subtitle="Control your AI trading fleet with intelligent monitoring"
        description="Real-time oversight of your automated trading strategies"
        icon={Bot}
      >
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" onClick={handleImportData}>
            <Upload className="w-4 h-4 mr-2" />
            Import Config
          </Button>
          <Button variant="outline" size="sm" onClick={handleExportData}>
            <Download className="w-4 h-4 mr-2" />
            Export Data
          </Button>
          <Button size="sm" onClick={() => {
            setSelectedForklift(null);
            setAddDialogOpen(true);
          }}>
            <Plus className="w-4 h-4 mr-2" />
            Deploy New Bot
          </Button>
        </div>
      </PageHeader>

      {/* Enhanced Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <ForkliftStatsCard
          title="Total Bots"
          value={stats.total}
          icon={Bot}
          info="Active Algorithms"
          variant="default"
        />
        
        <ForkliftStatsCard
          title="Trading Live"
          value={stats.operational}
          icon={CheckCircle}
          info="Making Trades"
          variant="success"
        />
        
        <ForkliftStatsCard
          title="Under Review"
          value={stats.maintenance}
          icon={Wrench}
          info="Being Optimized"
          variant="warning"
        />
        
        <ForkliftStatsCard
          title="Paused"
          value={stats.stopped}
          icon={AlertTriangle}
          info="Temporarily Stopped"
          variant="danger"
        />
      </div>
      
      {/* Compact Filters Section */}
      <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4 shadow-lg">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={16} />
              <input
                type="text"
                placeholder="Search by bot ID or strategy..."
                className="pl-9 h-9 w-full rounded-lg border border-slate-600/50 bg-slate-700/50 px-3 py-2 text-sm text-slate-200 placeholder:text-slate-400 focus:border-blue-500/50 focus:outline-none focus:ring-1 focus:ring-blue-500/25"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            {/* Status filter */}
            <select 
              className="h-9 w-full rounded-lg border border-slate-600/50 bg-slate-700/50 px-3 py-1 text-sm text-slate-200 focus:border-blue-500/50 focus:outline-none focus:ring-1 focus:ring-blue-500/25"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as StatusEmpilhadeira | 'all')}
            >
              <option value="all">All Statuses</option>
              <option value={StatusEmpilhadeira.OPERACIONAL}>Trading Live</option>
              <option value={StatusEmpilhadeira.EM_MANUTENCAO}>Under Review</option>
              <option value={StatusEmpilhadeira.PARADA}>Paused</option>
            </select>
            
            {/* Strategy filter */}
            <select 
              className="h-9 w-full rounded-lg border border-slate-600/50 bg-slate-700/50 px-3 py-1 text-sm text-slate-200 focus:border-blue-500/50 focus:outline-none focus:ring-1 focus:ring-blue-500/25"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value as TipoEmpilhadeira | 'all')}
            >
              <option value="all">All Strategies</option>
              <option value={TipoEmpilhadeira.GAS}>Scalping</option>
              <option value={TipoEmpilhadeira.ELETRICA}>Swing Trading</option>
              <option value={TipoEmpilhadeira.RETRATIL}>Day Trading</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <AdvancedFilters
              filters={filterOptions}
              values={advancedFilters}
              onFiltersChange={setAdvancedFilters}
              onClearFilters={() => setAdvancedFilters({})}
            />
            
            <div className="flex items-center bg-slate-700/30 rounded-lg p-1 border border-slate-600/30">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className="h-7 px-2"
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
                className="h-7 px-2"
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Results */}
      <Card className="bg-slate-800/20 border-slate-700/50 shadow-xl">
        <CardHeader className="pb-4">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg text-slate-200">
              Trading Bots ({filteredForklifts.length} of {forklifts.length})
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 animate-fade-in">
              {paginatedData.map((forklift, index) => (
                <div 
                  key={forklift.id}
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <ForkliftCard
                    forklift={forklift}
                    onClick={() => handleForkliftClick(forklift.id)}
                    onDelete={() => handleDeleteForklift(forklift.id)}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="animate-fade-in">
              <ForkliftList 
                forklifts={paginatedData}
                onForkliftClick={handleForkliftClick}
                onDeleteForklift={handleDeleteForklift}
              />
            </div>
          )}
          
          {filteredForklifts.length === 0 && (
            <div className="text-center py-16 text-slate-400 animate-fade-in">
              <div className="text-6xl mb-6 opacity-50">🤖</div>
              <h3 className="text-xl font-semibold mb-3 text-slate-300">No trading bots found</h3>
              <p className="text-slate-400">Try adjusting your filters or deploy a new trading bot.</p>
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* Enhanced Pagination */}
      {filteredForklifts.length > 0 && (
        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={goToPage}
          canGoPrevious={canGoPrevious}
          canGoNext={canGoNext}
          startIndex={startIndex}
          endIndex={endIndex}
          totalItems={totalItems}
        />
      )}
      
      {/* Add/Edit Forklift Dialog */}
      <ForkliftDialog 
        open={addDialogOpen} 
        onOpenChange={setAddDialogOpen}
        onSave={handleSaveForklift}
      />
      
      <ForkliftDialog 
        open={editDialogOpen} 
        onOpenChange={setEditDialogOpen}
        forklift={selectedForklift || undefined}
        onSave={handleSaveForklift}
      />
      
      {/* Forklift Details Dialog */}
      <ForkliftDetails
        open={detailsDialogOpen}
        onOpenChange={setDetailsDialogOpen}
        forklift={selectedForklift}
        onEdit={handleEditFromDetails}
      />
      
      {/* Delete Confirmation Dialog */}
      <ForkliftDeleteDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        forklift={selectedForklift}
        onConfirmDelete={handleConfirmDelete}
      />
    </div>
  );
};

export default TradingBotsPage;
