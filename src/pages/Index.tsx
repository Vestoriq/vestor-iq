
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import Forklifts from './Forklifts';
import Operators from './Operators';
import Operations from './Operations';
import Maintenance from './Maintenance';
import GasSupply from './GasSupply';
import Reports from './Reports';
import Configuracao from './Configuracao';
import MarketData from './MarketData';
import NotFound from './NotFound';

const Index = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/empilhadeiras" element={<Forklifts />} />
      <Route path="/trading-bots" element={<Forklifts />} />
      <Route path="/operadores" element={<Operators />} />
      <Route path="/traders" element={<Operators />} />
      <Route path="/operacoes" element={<Operations />} />
      <Route path="/positions" element={<Operations />} />
      <Route path="/manutencao" element={<Maintenance />} />
      <Route path="/system-health" element={<Maintenance />} />
      <Route path="/abastecimento" element={<GasSupply />} />
      <Route path="/relatorios" element={<Reports />} />
      <Route path="/reports" element={<Reports />} />
      <Route path="/market-data" element={<MarketData />} />
      <Route path="/settings" element={<Configuracao />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Index;
