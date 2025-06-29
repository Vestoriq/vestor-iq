import React, { useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { Operacao, StatusOperacao, TipoOperacao, PrioridadeOperacao, StatusOperador } from '@/types';
import { useToast } from '@/hooks/use-toast';
import OperationDialog from '@/components/operations/OperationDialog';
import OperationDetails from '@/components/operations/OperationDetails';
import AdvancedFilters from '@/components/common/AdvancedFilters';
import { useFilters } from '@/hooks/use-filters';
import { useAppStore } from '@/stores/useAppStore';
import { Button } from "@/components/ui/button";
import OperationsHeader from "@/components/operations/OperationsHeader";
import OperationsKpiCards from "@/components/operations/OperationsKpiCards";
import OperationsFilterBar from "@/components/operations/OperationsFilterBar";
import ActiveOperationsSection from "@/components/operations/ActiveOperationsSection";
import CompletedOperationsSection from "@/components/operations/CompletedOperationsSection";
import { AlertCircle, CheckCircle2 } from "lucide-react";

// Available trading algorithms and strategies
const availableOperators = [
  { id: 'ALG001', name: 'Momentum Pro' },
  { id: 'ALG002', name: 'Mean Reversion' },
  { id: 'ALG003', name: 'Breakout Scanner' },
  { id: 'ALG004', name: 'Arbitrage Hunter' },
  { id: 'ALG005', name: 'Trend Follower' }
];

const availableForklifts = [
  { id: 'BOT001', model: 'Scalping Pro v2.1' },
  { id: 'BOT004', model: 'Swing Master' },
  { id: 'BOT002', model: 'Day Trader Elite' },
  { id: 'BOT006', model: 'Options Specialist' }
];

type EnrichedOperacao = Operacao & {
  operadorNome: string;
  empilhadeiraModelo: string;
};

const PositionsPage = () => {
  const isMobile = useIsMobile();
  const { toast } = useToast();

  // Zustand store usage
  const operations = useAppStore((state) => state.operacoes);
  const operators = useAppStore((state) => state.operadores);
  const forklifts = useAppStore((state) => state.empilhadeiras);

  const addOperacao = useAppStore((state) => state.addOperacao);
  const updateOperacao = useAppStore((state) => state.updateOperacao);
  const deleteOperacao = useAppStore((state) => state.deleteOperacao);

  // Dialog states
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  const [selectedOperation, setSelectedOperation] = useState<EnrichedOperacao | null>(null);

  // Use filters hook with corrected search fields
  const {
    search,
    setSearch,
    filters,
    setFilters,
    filteredData: filteredOperations,
    clearFilters
  } = useFilters({
    data: operations,
    searchFields: ['id', 'setor']
  });

  // Enhanced data joining for trading context
  const joinOperationData = (operation: Operacao): EnrichedOperacao => {
    // Find trading algorithm
    const operador = operators.find((op) => op.id === operation.operadorId) ||
      availableOperators.find((op) => op.id === operation.operadorId);
    
    let operadorNome = "Algorithm Not Found";
    if (operador) {
      if ('nome' in operador) {
        operadorNome = operador.nome;
      } else if ('name' in operador) {
        operadorNome = operador.name;
      }
    }

    // Find trading bot
    const empilhadeira = forklifts.find((fork) => fork.id === operation.empilhadeiraId) ||
      availableForklifts.find((fork) => fork.id === operation.empilhadeiraId);
    
    let empilhadeiraModelo = "Bot Not Found";
    if (empilhadeira) {
      if ('modelo' in empilhadeira) {
        empilhadeiraModelo = empilhadeira.modelo;
      } else if ('model' in empilhadeira) {
        empilhadeiraModelo = empilhadeira.model;
      }
    }

    return {
      ...operation,
      operadorNome,
      empilhadeiraModelo,
    };
  };

  // Filter and enrich positions
  const enrichedActiveOperations = filteredOperations
    .filter(op => op.status === StatusOperacao.EM_ANDAMENTO)
    .map(joinOperationData);

  const enrichedCompletedOperations = filteredOperations
    .filter(op => op.status === StatusOperacao.CONCLUIDA)
    .map(joinOperationData);

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  // Format time
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Calculate operation duration
  const calculateDuration = (operation: Operacao) => {
    const startTime = new Date(operation.dataInicio);
    const endTime = operation.dataFim ? new Date(operation.dataFim) : new Date();
    const diff = endTime.getTime() - startTime.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m${!operation.dataFim ? ' (in progress)' : ''}`;
  };

  // Save position
  const handleSaveOperation = (operationData: Operacao) => {
    if (operations.some(op => op.id === operationData.id)) {
      updateOperacao(operationData.id, operationData);
      toast({
        title: "Position updated",
        description: "The trading position has been updated successfully."
      });
    } else {
      addOperacao(operationData);
      toast({
        title: "Position opened",
        description: "New trading position has been opened successfully."
      });
    }
  };

  // Open details dialog
  const handleViewDetails = (operation: EnrichedOperacao) => {
    setSelectedOperation(operation);
    setDetailsDialogOpen(true);
  };

  // Open edit dialog from details
  const handleEditFromDetails = () => {
    setDetailsDialogOpen(false);
    setEditDialogOpen(true);
  };

  // Open edit dialog directly
  const handleEdit = (operation: EnrichedOperacao) => {
    setSelectedOperation(operation);
    setEditDialogOpen(true);
  };

  // Delete position
  const handleDeleteOperation = (id: string) => {
    if (confirm("Are you sure you want to close this position?")) {
      deleteOperacao(id);
      toast({
        title: "Position closed",
        description: "The trading position has been closed successfully."
      });
    }
  };

  // Get priority color and icon
  const getPriorityInfo = (prioridade: PrioridadeOperacao) => {
    switch (prioridade) {
      case PrioridadeOperacao.ALTA:
        return { color: 'text-red-400', bgColor: 'bg-red-500/20', borderColor: 'border-red-500/30', icon: AlertCircle };
      case PrioridadeOperacao.NORMAL:
        return { color: 'text-blue-400', bgColor: 'bg-blue-500/20', borderColor: 'border-blue-500/30', icon: CheckCircle2 };
      case PrioridadeOperacao.BAIXA:
        return { color: 'text-green-400', bgColor: 'bg-green-500/20', borderColor: 'border-green-500/30', icon: CheckCircle2 };
      default:
        return { color: 'text-gray-400', bgColor: 'bg-gray-500/20', borderColor: 'border-gray-500/30', icon: CheckCircle2 };
    }
  };

  // Get operation type info
  const getOperationTypeInfo = (tipo: TipoOperacao) => {
    switch (tipo) {
      case TipoOperacao.MOVIMENTACAO:
        return { label: 'Long', color: 'text-blue-400' };
      case TipoOperacao.CARGA:
        return { label: 'Buy', color: 'text-green-400' };
      case TipoOperacao.DESCARGA:
        return { label: 'Sell', color: 'text-orange-400' };
      case TipoOperacao.ESTOQUE:
        return { label: 'Hold', color: 'text-cyan-400' };
      case TipoOperacao.PICKING:
        return { label: 'Short', color: 'text-yellow-400' };
      default:
        return { label: 'Other', color: 'text-gray-400' };
    }
  };

  // Calculate progress percentage for active operations
  const calculateProgress = (operation: Operacao) => {
    if (operation.status !== StatusOperacao.EM_ANDAMENTO) return 100;
    const startTime = new Date(operation.dataInicio);
    const now = new Date();
    const elapsed = now.getTime() - startTime.getTime();
    const estimatedDuration = (operation.duracaoEstimada || 480) * 60 * 1000;
    return Math.min((elapsed / estimatedDuration) * 100, 95);
  };

  // View mode state
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Filter configuration for advanced filters with trading terminology
  const filterOptions = [
    {
      key: 'prioridade',
      label: 'Risk Level',
      type: 'select' as const,
      options: [
        { value: PrioridadeOperacao.ALTA, label: 'High Risk' },
        { value: PrioridadeOperacao.NORMAL, label: 'Medium Risk' },
        { value: PrioridadeOperacao.BAIXA, label: 'Low Risk' }
      ]
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <OperationsHeader onAdd={() => {
        setSelectedOperation(null);
        setAddDialogOpen(true);
      }} />

      {/* KPI Cards */}
      <OperationsKpiCards data={operations} />

      {/* Filter Bar */}
      <OperationsFilterBar
        search={search}
        setSearch={setSearch}
        filters={filters}
        setFilters={setFilters}
        clearFilters={clearFilters}
        filterOptions={filterOptions}
        viewMode={viewMode}
        setViewMode={setViewMode}
      />

      {/* Active Positions Section */}
      <ActiveOperationsSection
        operations={enrichedActiveOperations}
        onDetails={handleViewDetails}
        onEdit={handleEdit}
        calculateProgress={calculateProgress}
        getPriorityInfo={getPriorityInfo}
        getOperationTypeInfo={getOperationTypeInfo}
        formatTime={formatTime}
      />

      {/* Completed Positions Section */}
      <CompletedOperationsSection
        operations={enrichedCompletedOperations}
        onDetails={handleViewDetails}
        onDelete={handleDeleteOperation}
        formatDate={formatDate}
        formatTime={formatTime}
        calculateDuration={calculateDuration}
        getPriorityInfo={getPriorityInfo}
        getOperationTypeInfo={getOperationTypeInfo}
      />

      {/* Add Position Dialog */}
      <OperationDialog
        open={addDialogOpen}
        onOpenChange={setAddDialogOpen}
        onSave={handleSaveOperation}
        availableOperators={availableOperators}
        availableForklifts={availableForklifts}
      />

      {/* Edit Position Dialog */}
      <OperationDialog
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        operation={selectedOperation || undefined}
        onSave={handleSaveOperation}
        availableOperators={availableOperators}
        availableForklifts={availableForklifts}
      />

      {/* Position Details Dialog */}
      <OperationDetails
        open={detailsDialogOpen}
        onOpenChange={setDetailsDialogOpen}
        operation={selectedOperation}
        onEdit={handleEditFromDetails}
      />
    </div>
  );
};

export default PositionsPage;
