
import React from 'react';
import { 
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock,
  DollarSign,
  Bot,
  Users,
  Zap
} from 'lucide-react';
import { useAppStore } from '@/stores/useAppStore';
import PremiumMetricCard from '@/components/common/PremiumMetricCard';

const MetricsGrid: React.FC = () => {
  const { metricas } = useAppStore();

  const metrics = [
    {
      title: 'Total Bots',
      value: metricas.frotaTotal,
      icon: Activity,
      variant: 'primary' as const,
      subtitle: 'Trading bots registered'
    },
    {
      title: 'Active Bots',
      value: metricas.empilhadeirasOperacionais,
      icon: CheckCircle,
      variant: 'success' as const,
      trend: { value: 12, isPositive: true },
      subtitle: 'Currently trading'
    },
    {
      title: 'System Issues',
      value: metricas.empilhadeirasManutencao,
      icon: AlertTriangle,
      variant: 'warning' as const,
      subtitle: 'Need attention'
    },
    {
      title: 'Active Traders',
      value: metricas.operadoresAtivos,
      icon: Users,
      variant: 'info' as const,
      trend: { value: 8, isPositive: true },
      subtitle: 'Operational team'
    },
    {
      title: 'Overall Efficiency',
      value: `${metricas.eficienciaGeral}%`,
      icon: Zap,
      variant: 'primary' as const,
      trend: { value: 5, isPositive: true },
      subtitle: 'Average performance'
    },
    {
      title: 'Daily P&L',
      value: new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(metricas.custoOperacionalDia),
      icon: DollarSign,
      variant: 'danger' as const,
      subtitle: 'Today\'s profit/loss'
    },
    {
      title: 'Avg Position Time',
      value: `${metricas.tempoMedioOperacao}min`,
      icon: Clock,
      variant: 'warning' as const,
      subtitle: 'Average duration'
    },
    {
      title: 'Active Positions',
      value: metricas.operacoesAtivas,
      icon: Bot,
      variant: 'success' as const,
      subtitle: 'Currently open'
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric, index) => (
        <div key={metric.title} style={{ animationDelay: `${index * 0.1}s` }} className="animate-fade-in-scale">
          <PremiumMetricCard
            title={metric.title}
            value={metric.value}
            icon={metric.icon}
            variant={metric.variant}
            trend={metric.trend}
            subtitle={metric.subtitle}
          />
        </div>
      ))}
    </div>
  );
};

export default MetricsGrid;
