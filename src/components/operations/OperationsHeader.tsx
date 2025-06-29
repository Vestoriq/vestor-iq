
import React from "react";
import { Button } from "@/components/ui/button";
import { Plus, Activity } from "lucide-react";
import PageHeader from "@/components/layout/PageHeader";

interface OperationsHeaderProps {
  onAdd: () => void;
}

const OperationsHeader: React.FC<OperationsHeaderProps> = ({ onAdd }) => (
  <PageHeader 
    title="Trading Positions"
    subtitle="Real-time position control and monitoring"
    description="Manage all active positions and monitor team performance"
    icon={Activity}
  >
    <Button
      className="gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
      onClick={onAdd}
    >
      <Plus className="w-4 h-4" />
      New Position
    </Button>
  </PageHeader>
);

export default OperationsHeader;
