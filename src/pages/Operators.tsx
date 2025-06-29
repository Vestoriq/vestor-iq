import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { useIsMobile } from '@/hooks/use-mobile';
import { Input } from '@/components/ui/input';
import { Search, Plus, Bot, CheckCircle, Clock, Award, TrendingUp, Activity, Filter, Grid3X3, List, Zap, Shield, Target, BarChart3, DollarSign, AlertTriangle } from 'lucide-react';
import { Operador, FuncaoOperador, StatusOperador, TipoCertificacao, StatusCertificacao } from '@/types';
import { useToast } from '@/hooks/use-toast';
import OperatorDialog from '@/components/operators/OperatorDialog';
import OperatorDetails from '@/components/operators/OperatorDetails';
import OperatorCard from '@/components/operators/OperatorCard';
import AdvancedFilters from '@/components/common/AdvancedFilters';
import { useFilters } from '@/hooks/use-filters';
import PageHeader from '@/components/layout/PageHeader';
import ModernKpiCard from '@/components/dashboard/ModernKpiCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useAppStore } from '@/stores/useAppStore';

const AlgorithmsPage = () => {
  const isMobile = useIsMobile();
  const { toast } = useToast();

  // Use Zustand for AI algorithms data
  const operadores = useAppStore((state) => state.operadores);
  const addOperador = useAppStore((state) => state.addOperador);
  const updateOperador = useAppStore((state) => state.updateOperador);
  const deleteOperador = useAppStore((state) => state.deleteOperador);

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Dialog states
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  const [selectedOperator, setSelectedOperator] = useState<Operador | null>(null);

  // Use filters hook for AI algorithms
  const {
    search,
    setSearch,
    filters,
    setFilters,
    filteredData: filteredOperators,
    clearFilters
  } = useFilters({
    data: operadores,
    searchFields: ['nome', 'cpf', 'email', 'setor']
  });

  const filterOptions = [
    {
      key: 'setor',
      label: 'Market Focus',
      type: 'select' as const,
      options: [
        { value: 'Equities', label: 'Equities' },
        { value: 'Options', label: 'Options' },
        { value: 'Forex', label: 'Forex' },
        { value: 'Crypto', label: 'Crypto' },
        { value: 'Futures', label: 'Futures' }
      ]
    },
    {
      key: 'turno',
      label: 'Trading Session',
      type: 'select' as const,
      options: [
        { value: 'Pre-Market', label: 'Pre-Market' },
        { value: 'Regular Hours', label: 'Regular Hours' },
        { value: 'After Hours', label: 'After Hours' },
        { value: '24/7', label: '24/7' }
      ]
    },
    {
      key: 'produtividade',
      label: 'Minimum Success Rate (%)',
      type: 'number' as const
    }
  ];

  // Enhanced handlers for AI algorithms
  const handleSaveOperator = (operatorData: Operador) => {
    const operadorExistente = operadores.some(op => op.id === operatorData.id);

    if (operadorExistente) {
      updateOperador(operatorData.id, operatorData);
      toast({
        title: "Algorithm Updated",
        description: "The trading algorithm has been updated successfully."
      });
    } else {
      addOperador(operatorData);
      toast({
        title: "Algorithm Deployed",
        description: "New trading algorithm has been deployed successfully."
      });
    }
  };

  const handleViewDetails = (operator: Operador) => {
    setSelectedOperator(operator);
    setDetailsDialogOpen(true);
  };

  const handleEditFromDetails = () => {
    setDetailsDialogOpen(false);
    setEditDialogOpen(true);
  };

  const handleEdit = (operator: Operador) => {
    setSelectedOperator(operator);
    setEditDialogOpen(true);
  };

  const handleDeleteOperator = (id: string) => {
    if (confirm("Are you sure you want to deactivate this algorithm?")) {
      deleteOperador(id);
      toast({
        title: "Algorithm Deactivated",
        description: "The trading algorithm has been deactivated successfully."
      });
    }
  };

  // Statistics based on AI algorithms
  const stats = {
    total: operadores.length,
    active: operadores.filter(op => op.status === StatusOperador.ATIVO).length,
    avgSuccessRate: operadores.length > 0 ? Math.round(operadores.reduce((sum, op) => sum + op.produtividade, 0) / operadores.length) : 0,
    totalProfitToday: 12450.75,
    totalTrades: operadores.reduce((sum, op) => sum + op.horasTrabalhadas * 8, 0) // Simulating trades
  };

  // Algorithm performance data
  const getAlgorithmMetrics = (operator: Operador) => {
    const baseMetrics = {
      winRate: operator.produtividade,
      sharpeRatio: Number(((operator.produtividade / 100) * 2.5 + Math.random() * 0.5).toFixed(2)),
      maxDrawdown: Number((Math.random() * 15 + 5).toFixed(1)),
      avgReturn: Number((operator.produtividade * 0.8 + Math.random() * 20).toFixed(2)),
      totalTrades: operator.horasTrabalhadas * 8,
      profitToday: Number((Math.random() * 5000 + 500).toFixed(2))
    };
    return baseMetrics;
  };

  const getStatusColor = (status: StatusOperador) => {
    switch (status) {
      case StatusOperador.ATIVO:
        return 'bg-green-500';
      case StatusOperador.INATIVO:
        return 'bg-red-500';
      case StatusOperador.FERIAS:
        return 'bg-yellow-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusText = (status: StatusOperador) => {
    switch (status) {
      case StatusOperador.ATIVO:
        return 'Active';
      case StatusOperador.INATIVO:
        return 'Inactive';
      case StatusOperador.FERIAS:
        return 'Paused';
      case StatusOperador.AFASTADO:
        return 'Disabled';
      default:
        return 'Unknown';
    }
  };

  const getAlgorithmTypeText = (funcao: FuncaoOperador) => {
    switch (funcao) {
      case FuncaoOperador.OPERADOR:
        return 'Scalping Bot';
      case FuncaoOperador.SUPERVISOR:
        return 'Swing Trader';
      case FuncaoOperador.COORDENADOR:
        return 'ML Predictor';
      case FuncaoOperador.GERENTE:
        return 'Master Strategy';
      default:
        return 'Basic Algorithm';
    }
  };

  return (
    <div className="space-y-8">
      {/* Enhanced Header */}
      <PageHeader
        title="AI Trading Algorithms"
        description="Manage and monitor your automated trading strategies powered by advanced AI models"
        icon={Bot}
      >
        <Button 
          className="gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
          onClick={() => {
            setSelectedOperator(null);
            setAddDialogOpen(true);
          }}
        >
          <Plus className="w-4 h-4" />
          Deploy New Algorithm
        </Button>
      </PageHeader>

      {/* Enhanced Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <ModernKpiCard
          title="Total Algorithms"
          value={stats.total}
          icon={Bot}
          variant="default"
        />
        
        <ModernKpiCard
          title="Active Trading"
          value={stats.active}
          icon={Zap}
          variant="success"
        />
        
        <ModernKpiCard
          title="Avg Success Rate"
          value={stats.avgSuccessRate}
          icon={Target}
          variant="info"
        />
        
        <ModernKpiCard
          title="Today's Profit"
          value={stats.totalProfitToday}
          icon={DollarSign}
          variant="success"
        />
        
        <ModernKpiCard
          title="Total Trades"
          value={stats.totalTrades}
          icon={BarChart3}
          variant="warning"
        />
      </div>

      {/* Enhanced Filter Section */}
      <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <Input 
              type="text" 
              placeholder="Search algorithms by name, strategy, or market focus..." 
              className="pl-10 bg-slate-900/50 border-slate-600/50 text-slate-100 placeholder:text-slate-400 focus:border-blue-500/50 focus:ring-blue-500/20"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Status Filter */}
          <div className="w-full lg:w-auto min-w-[160px]">
            <Select
              value={filters.status || 'all'}
              onValueChange={(value) => setFilters({ ...filters, status: value === 'all' ? '' : value })}
            >
              <SelectTrigger className="bg-slate-900/50 border-slate-600/50 text-slate-100 hover:bg-slate-800/70 transition-colors">
                <SelectValue placeholder="All Statuses" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-600">
                <SelectItem value="all" className="text-slate-100">All Statuses</SelectItem>
                <SelectItem value={StatusOperador.ATIVO} className="text-slate-100">Active</SelectItem>
                <SelectItem value={StatusOperador.INATIVO} className="text-slate-100">Inactive</SelectItem>
                <SelectItem value={StatusOperador.FERIAS} className="text-slate-100">Paused</SelectItem>
                <SelectItem value={StatusOperador.AFASTADO} className="text-slate-100">Disabled</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Algorithm Type Filter */}
          <div className="w-full lg:w-auto min-w-[160px]">
            <Select
              value={filters.funcao || 'all'}
              onValueChange={(value) => setFilters({ ...filters, funcao: value === 'all' ? '' : value })}
            >
              <SelectTrigger className="bg-slate-900/50 border-slate-600/50 text-slate-100 hover:bg-slate-800/70 transition-colors">
                <SelectValue placeholder="All Algorithm Types" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-600">
                <SelectItem value="all" className="text-slate-100">All Types</SelectItem>
                <SelectItem value={FuncaoOperador.OPERADOR} className="text-slate-100">Scalping Bot</SelectItem>
                <SelectItem value={FuncaoOperador.SUPERVISOR} className="text-slate-100">Swing Trader</SelectItem>
                <SelectItem value={FuncaoOperador.COORDENADOR} className="text-slate-100">ML Predictor</SelectItem>
                <SelectItem value={FuncaoOperador.GERENTE} className="text-slate-100">Master Strategy</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Advanced Filters */}
          <AdvancedFilters
            filters={filterOptions}
            values={filters}
            onFiltersChange={setFilters}
            onClearFilters={clearFilters}
            triggerProps={{
              variant: "outline",
              className: "bg-slate-900/50 border-slate-600/50 text-slate-100 hover:bg-slate-800/70 hover:text-slate-100 transition-colors"
            }}
          />

          {/* View Toggle */}
          <div className="flex gap-1 p-1 bg-slate-900/50 rounded-lg border border-slate-600/50">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('grid')}
              className={viewMode === 'grid' 
                ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                : 'text-slate-300 hover:text-slate-100 hover:bg-slate-700/50'
              }
            >
              <Grid3X3 className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
              className={viewMode === 'list' 
                ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                : 'text-slate-300 hover:text-slate-100 hover:bg-slate-700/50'
              }
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Algorithm Performance Overview */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <BarChart3 className="w-5 h-5 text-blue-500" />
            Algorithm Performance Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-500">+12.4%</div>
              <div className="text-muted-foreground">Portfolio Return (30d)</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-500">2.1</div>
              <div className="text-muted-foreground">Average Sharpe Ratio</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-500">-5.2%</div>
              <div className="text-muted-foreground">Max Drawdown</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Algorithms Display */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-foreground flex items-center gap-2">
            <Activity className="w-6 h-6 text-primary" />
            {viewMode === 'grid' ? 'AI Trading Algorithms' : 'Algorithm Performance Table'}
          </h2>
          <span className="text-sm text-muted-foreground">
            {filteredOperators.length} algorithm{filteredOperators.length !== 1 ? 's' : ''} found
          </span>
        </div>

        {filteredOperators.length > 0 ? (
          viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredOperators.map((operator) => {
                const metrics = getAlgorithmMetrics(operator);
                return (
                  <Card key={operator.id} className="glass-card hover:shadow-xl transition-all duration-300 cursor-pointer" onClick={() => handleViewDetails(operator)}>
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
                            <Bot className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-foreground">{operator.nome}</h3>
                            <p className="text-sm text-muted-foreground">{getAlgorithmTypeText(operator.funcao)}</p>
                          </div>
                        </div>
                        <Badge className={`${getStatusColor(operator.status)} text-white border-0`}>
                          {getStatusText(operator.status)}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-green-500">{metrics.winRate}%</div>
                          <div className="text-xs text-muted-foreground">Win Rate</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-blue-500">${metrics.profitToday.toFixed(0)}</div>
                          <div className="text-xs text-muted-foreground">Today's P&L</div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Sharpe Ratio:</span>
                          <span className="font-medium">{metrics.sharpeRatio.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Max Drawdown:</span>
                          <span className="font-medium text-red-400">-{metrics.maxDrawdown.toFixed(1)}%</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Total Trades:</span>
                          <span className="font-medium">{metrics.totalTrades}</span>
                        </div>
                      </div>
                      
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Performance</span>
                          <span className="font-medium">{metrics.winRate}%</span>
                        </div>
                        <Progress value={metrics.winRate} className="h-2" />
                      </div>
                      
                      <div className="flex gap-2 pt-2">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEdit(operator);
                          }}
                          className="flex-1"
                        >
                          Configure
                        </Button>
                        <Button 
                          size="sm" 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleViewDetails(operator);
                          }}
                          className="flex-1"
                        >
                          View Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          ) : (
            <Card className="glass-card">
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Algorithm</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Win Rate</TableHead>
                      <TableHead>Sharpe Ratio</TableHead>
                      <TableHead>Today's P&L</TableHead>
                      <TableHead>Total Trades</TableHead>
                      <TableHead>Risk Level</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredOperators.map((operator) => {
                      const metrics = getAlgorithmMetrics(operator);
                      const riskLevel = metrics.maxDrawdown > 10 ? 'High' : metrics.maxDrawdown > 5 ? 'Medium' : 'Low';
                      const riskColor = riskLevel === 'High' ? 'text-red-500' : riskLevel === 'Medium' ? 'text-yellow-500' : 'text-green-500';
                      
                      return (
                        <TableRow key={operator.id} className="hover:bg-muted/50">
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Bot className="w-4 h-4 text-blue-500" />
                              <div>
                                <div className="font-medium">{operator.nome}</div>
                                <div className="text-sm text-muted-foreground">{operator.setor}</div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{getAlgorithmTypeText(operator.funcao)}</Badge>
                          </TableCell>
                          <TableCell>
                            <Badge className={`${getStatusColor(operator.status)} text-white border-0`}>
                              {getStatusText(operator.status)}
                            </Badge>
                          </TableCell>
                          <TableCell className="font-medium text-green-500">{metrics.winRate}%</TableCell>
                          <TableCell className="font-medium">{metrics.sharpeRatio.toFixed(2)}</TableCell>
                          <TableCell className={`font-medium ${metrics.profitToday > 0 ? 'text-green-500' : 'text-red-500'}`}>
                            ${metrics.profitToday.toFixed(2)}
                          </TableCell>
                          <TableCell>{metrics.totalTrades}</TableCell>
                          <TableCell className={riskColor}>{riskLevel}</TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline" onClick={() => handleEdit(operator)}>
                                Configure
                              </Button>
                              <Button size="sm" onClick={() => handleViewDetails(operator)}>
                                Details
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          )
        ) : (
          <Card className="glass-card">
            <CardContent className="p-12 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent/30 flex items-center justify-center">
                <Bot className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                No Algorithms Found
              </h3>
              <p className="text-muted-foreground mb-6">
                No trading algorithms match your search criteria. Deploy your first algorithm to get started.
              </p>
              <Button
                onClick={() => {
                  setSelectedOperator(null);
                  setAddDialogOpen(true);
                }}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Deploy Algorithm
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Add Algorithm Dialog */}
      <OperatorDialog
        open={addDialogOpen}
        onOpenChange={setAddDialogOpen}
        onSave={handleSaveOperator}
      />
      
      {/* Edit Algorithm Dialog */}
      <OperatorDialog
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        operator={selectedOperator || undefined}
        onSave={handleSaveOperator}
      />
      
      {/* Algorithm Details Dialog */}
      <OperatorDetails
        open={detailsDialogOpen}
        onOpenChange={setDetailsDialogOpen}
        operator={selectedOperator}
        onEdit={handleEditFromDetails}
      />
    </div>
  );
};

export default AlgorithmsPage;
