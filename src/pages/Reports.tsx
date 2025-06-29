
import React, { useState } from 'react';
import ModernKpiCard from '@/components/dashboard/ModernKpiCard';
import ReportsHeader from '@/components/reports/ReportsHeader';
import ReportsFilters from '@/components/reports/ReportsFilters';
import ReportCategorySection from '@/components/reports/ReportCategorySection';
import ReportsEmptyState from '@/components/reports/ReportsEmptyState';
import { FileBarChart, Download, Calendar as CalendarIcon, Clock, TrendingUp, Users, Wrench, DollarSign, BarChart3, Sparkles, Activity, Zap, Target, Bot } from 'lucide-react';
import { useAppStore } from '@/stores/useAppStore';
import { useReports } from '@/hooks/useReports';
import { StatusOperacao, StatusManutencao } from '@/types';
import { useToast } from '@/hooks/use-toast';

const ReportsPage = () => {
  const { toast } = useToast();
  const [search, setSearch] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState('');
  const [selectedForklift, setSelectedForklift] = useState('');
  const [selectedOperator, setSelectedOperator] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  // Get data from store
  const { empilhadeiras, operadores, operacoes, ordemServicos, abastecimentos } = useAppStore();
  const { resumoGeral } = useReports();

  // Calculate real-time trading stats
  const totalPositions = operacoes.length;
  const activePositions = operacoes.filter(op => op.status === StatusOperacao.EM_ANDAMENTO).length;
  const totalOptimizations = ordemServicos.length;
  const ongoingOptimizations = ordemServicos.filter(os => os.status !== StatusManutencao.CONCLUIDA).length;
  const totalTransactions = abastecimentos.length;

  // Handle report generation
  const handleGenerateReport = (reportType: string, categoryId: string) => {
    toast({
      title: "Report generated",
      description: `${reportType} report for ${categoryId} has been generated successfully.`
    });
    console.log(`Generating report: ${reportType} for category: ${categoryId}`);
  };

  const reportCategories = [
    {
      id: 'trading',
      title: 'Trading Performance',
      icon: BarChart3,
      gradient: 'from-blue-500 via-blue-600 to-indigo-700',
      bgPattern: 'bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-950/50 dark:to-indigo-900/50',
      iconBg: 'bg-gradient-to-br from-blue-500 to-indigo-600',
      reports: [
        { 
          name: 'Bot Performance Analytics', 
          description: `Analysis of ${empilhadeiras.length} trading bots with ${totalPositions} positions executed`, 
          type: 'Performance',
          icon: Activity,
          trend: activePositions > 0 ? `+${activePositions}` : '0',
          lastUpdate: '2 min',
          priority: 'high' as const,
          onGenerate: () => handleGenerateReport('Bot Performance Analytics', 'trading')
        },
        { 
          name: 'Algorithm Efficiency Report', 
          description: `Dashboard of ${operadores.length} algorithms active in the system`, 
          type: 'Efficiency',
          icon: Target,
          trend: `${operadores.length}`,
          lastUpdate: '5 min',
          priority: 'medium' as const,
          onGenerate: () => handleGenerateReport('Algorithm Efficiency Report', 'trading')
        },
        { 
          name: 'Position History Analysis', 
          description: `${totalPositions} positions with advanced temporal analysis`, 
          type: 'Historical',
          icon: TrendingUp,
          trend: `${totalPositions}`,
          lastUpdate: '1 min',
          priority: 'high' as const,
          onGenerate: () => handleGenerateReport('Position History Analysis', 'trading')
        }
      ]
    },
    {
      id: 'optimization',
      title: 'System Optimization',
      icon: Wrench,
      gradient: 'from-orange-500 via-red-500 to-pink-600',
      bgPattern: 'bg-gradient-to-br from-orange-50 to-red-100 dark:from-orange-950/50 dark:to-red-900/50',
      iconBg: 'bg-gradient-to-br from-orange-500 to-red-600',
      reports: [
        { 
          name: 'Algorithm Optimization History', 
          description: `${totalOptimizations} optimization cycles with performance analysis`, 
          type: 'Historical',
          icon: Clock,
          trend: `${totalOptimizations}`,
          lastUpdate: '10 min',
          priority: 'medium' as const,
          onGenerate: () => handleGenerateReport('Algorithm Optimization History', 'optimization')
        },
        { 
          name: 'Scheduled Optimizations', 
          description: `${ongoingOptimizations} active optimizations with performance alerts`, 
          type: 'Scheduled',
          icon: CalendarIcon,
          trend: ongoingOptimizations > 0 ? `${ongoingOptimizations}` : '0',
          lastUpdate: '3 min',
          priority: ongoingOptimizations > 0 ? 'high' as const : 'low' as const,
          onGenerate: () => handleGenerateReport('Scheduled Optimizations', 'optimization')
        },
        { 
          name: 'Performance Cost Analysis', 
          description: 'Financial dashboard with ROI projections based on real data', 
          type: 'Financial',
          icon: TrendingUp,
          trend: `$${resumoGeral.totalCustoManutencao.toFixed(0)}`,
          lastUpdate: '15 min',
          priority: 'medium' as const,
          onGenerate: () => handleGenerateReport('Performance Cost Analysis', 'optimization')
        }
      ]
    },
    {
      id: 'financial',
      title: 'Financial Analysis',
      icon: DollarSign,
      gradient: 'from-green-500 via-emerald-500 to-teal-600',
      bgPattern: 'bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-950/50 dark:to-emerald-900/50',
      iconBg: 'bg-gradient-to-br from-green-500 to-emerald-600',
      reports: [
        { 
          name: 'P&L Intelligence', 
          description: `Analysis of ${totalTransactions} transactions with $${resumoGeral.totalConsumo.toFixed(1)}K total volume`, 
          type: 'P&L',
          icon: Zap,
          trend: `$${resumoGeral.totalConsumo.toFixed(1)}K`,
          lastUpdate: '1 min',
          priority: 'high' as const,
          onGenerate: () => handleGenerateReport('P&L Intelligence', 'financial')
        },
        { 
          name: 'Risk-Adjusted Returns', 
          description: `Optimization based on ${resumoGeral.eficienciaGeral.toFixed(1)}% average efficiency`, 
          type: 'Risk Analysis',
          icon: Activity,
          trend: `${resumoGeral.eficienciaGeral.toFixed(1)}%`,
          lastUpdate: '2 min',
          priority: 'high' as const,
          onGenerate: () => handleGenerateReport('Risk-Adjusted Returns', 'financial')
        },
        { 
          name: 'Advanced Portfolio Analytics', 
          description: `Machine learning applied to ${totalTransactions} historical records`, 
          type: 'Portfolio',
          icon: BarChart3,
          trend: `${totalTransactions}`,
          lastUpdate: '8 min',
          priority: 'medium' as const,
          onGenerate: () => handleGenerateReport('Advanced Portfolio Analytics', 'financial')
        }
      ]
    },
    {
      id: 'algorithms',
      title: 'Algorithm Management',
      icon: Bot,
      gradient: 'from-purple-500 via-violet-500 to-indigo-600',
      bgPattern: 'bg-gradient-to-br from-purple-50 to-violet-100 dark:from-purple-950/50 dark:to-violet-900/50',
      iconBg: 'bg-gradient-to-br from-purple-500 to-violet-600',
      reports: [
        { 
          name: 'AI Model Performance', 
          description: `Monitoring of ${operadores.length} AI models and their configurations`, 
          type: 'AI Performance',
          icon: Bot,
          trend: `${operadores.length}`,
          lastUpdate: '30 min',
          priority: 'medium' as const,
          onGenerate: () => handleGenerateReport('AI Model Performance', 'algorithms')
        },
        { 
          name: 'Strategy Analytics', 
          description: `Performance dashboard with ${resumoGeral.eficienciaGeral.toFixed(1)}% efficiency rating`, 
          type: 'Strategy',
          icon: Target,
          trend: `${resumoGeral.eficienciaGeral.toFixed(1)}%`,
          lastUpdate: '5 min',
          priority: 'high' as const,
          onGenerate: () => handleGenerateReport('Strategy Analytics', 'algorithms')
        },
        { 
          name: 'ML Model Training', 
          description: `Advanced learning platform with ${operadores.length} active models`, 
          type: 'Machine Learning',
          icon: Sparkles,
          trend: `${operadores.length}`,
          lastUpdate: '12 min',
          priority: 'high' as const,
          onGenerate: () => handleGenerateReport('ML Model Training', 'algorithms')
        }
      ]
    }
  ];

  const quickStats = [
    { 
      title: 'Available Reports', 
      value: reportCategories.reduce((sum, cat) => sum + cat.reports.length, 0), 
      icon: FileBarChart,
      trend: 'up',
      trendValue: 12
    },
    { 
      title: 'Data Points', 
      value: totalPositions + totalOptimizations + totalTransactions, 
      icon: Download,
      trend: 'up',
      trendValue: 5
    },
    { 
      title: 'Active Categories', 
      value: reportCategories.length, 
      icon: CalendarIcon,
      trend: null,
      trendValue: 0
    },
    { 
      title: 'Last Update', 
      value: '2min', 
      icon: Clock,
      trend: null,
      trendValue: 0
    }
  ];

  const filteredCategories = reportCategories.filter(category => {
    if (selectedCategory && selectedCategory !== 'all' && category.id !== selectedCategory) return false;
    if (search) {
      return category.title.toLowerCase().includes(search.toLowerCase()) ||
             category.reports.some(report => 
               report.name.toLowerCase().includes(search.toLowerCase()) ||
               report.description.toLowerCase().includes(search.toLowerCase())
             );
    }
    return true;
  });

  const handleClearFilters = () => {
    setSearch('');
    setSelectedCategory('');
    setSelectedPeriod('');
    setSelectedForklift('');
    setSelectedOperator('');
  };

  return (
    <div className="space-y-8">
      <ReportsHeader />

      {/* Premium Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {quickStats.map((stat, index) => (
          <ModernKpiCard
            key={index}
            title={stat.title}
            value={typeof stat.value === 'string' ? 0 : stat.value}
            icon={stat.icon}
            variant="info"
            className="hover:scale-105 transition-transform duration-300"
          />
        ))}
      </div>

      <ReportsFilters
        search={search}
        setSearch={setSearch}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedPeriod={selectedPeriod}
        setSelectedPeriod={setSelectedPeriod}
        selectedForklift={selectedForklift}
        setSelectedForklift={setSelectedForklift}
      />

      {/* Ultra-Premium Report Categories */}
      <div className="space-y-8">
        {filteredCategories.map((category) => (
          <ReportCategorySection key={category.id} category={category} />
        ))}
      </div>

      {/* Empty State */}
      {filteredCategories.length === 0 && (
        <ReportsEmptyState onClearFilters={handleClearFilters} />
      )}
    </div>
  );
};

export default ReportsPage;
