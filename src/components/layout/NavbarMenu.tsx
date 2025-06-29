import React from "react";
import { NavLink } from "react-router-dom";
import {
  BarChart3, Bot, Activity, Wrench, TrendingUp, FileText, Settings
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAppStore } from '@/stores/useAppStore';
import { StatusOperacao, StatusManutencao } from "@/types";

type Props = {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
};

const NavbarMenu: React.FC<Props> = ({ isMobileMenuOpen, setIsMobileMenuOpen }) => {
  const operacoes = useAppStore((state) => state.operacoes);
  const ordemServicos = useAppStore((state) => state.ordemServicos);

  const activePositions = operacoes.filter(op => op.status === StatusOperacao.EM_ANDAMENTO).length;
  const pendingOptimizations = ordemServicos.filter(os => 
    [StatusManutencao.ABERTA, StatusManutencao.EM_ANDAMENTO].includes(os.status)
  ).length;

  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: BarChart3,
      path: '/'
    },
    {
      id: 'trading-bots',
      label: 'Trading Bots',
      icon: Bot,
      path: '/trading-bots'
    },
    {
      id: 'traders',
      label: 'AI Algorithms',
      icon: TrendingUp,
      path: '/traders'
    },
    {
      id: 'positions',
      label: 'Positions',
      icon: Activity,
      path: '/positions',
      badge: activePositions > 0 ? activePositions : undefined
    },
    {
      id: 'system-health',
      label: 'System Health',
      icon: Wrench,
      path: '/system-health',
      badge: pendingOptimizations > 0 ? pendingOptimizations : undefined
    },
    {
      id: 'market-data',
      label: 'Market Data',
      icon: TrendingUp,
      path: '/market-data'
    },
    {
      id: 'reports',
      label: 'Analytics',
      icon: FileText,
      path: '/reports'
    }
  ];

  return (
    <>
      {/* Desktop Menu */}
      <nav className="hidden lg:flex items-center space-x-1">
        {menuItems.map((item) => (
          <NavLink
            key={item.id}
            to={item.path}
            className={({ isActive }) =>
              cn(
                "relative flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200",
                isActive
                  ? "text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-blue-950/50"
                  : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800/50"
              )
            }
          >
            <item.icon className="w-4 h-4" />
            <span>{item.label}</span>
            {item.badge && (
              <span className="ml-1 px-1.5 py-0.5 text-xs font-semibold bg-red-500 text-white rounded-full min-w-[18px] text-center">
                {item.badge}
              </span>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Menu */}
      <div className={cn(
        "lg:hidden fixed top-14 sm:top-16 right-0 h-[calc(100vh-3.5rem)] sm:h-[calc(100vh-4rem)] w-72 bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-700 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out",
        isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
      )}>
        <div className="p-4 space-y-2 overflow-y-auto h-full">
          {menuItems.map((item) => (
            <NavLink
              key={item.id}
              to={item.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className={({ isActive }) =>
                cn(
                  "relative flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200",
                  isActive
                    ? "text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-blue-950/50 shadow-sm"
                    : "text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800/50"
                )
              }
            >
              <item.icon className="w-5 h-5" />
              <span className="flex-1">{item.label}</span>
              {item.badge && (
                <span className="px-2 py-1 text-xs font-semibold bg-red-500 text-white rounded-full min-w-[20px] text-center">
                  {item.badge}
                </span>
              )}
            </NavLink>
          ))}
        </div>
      </div>
    </>
  );
};

export default NavbarMenu;
