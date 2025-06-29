
import React from "react";
import { TrendingUp } from "lucide-react";

const LogoOnly: React.FC = () => (
  <div className="flex items-center">
    <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl">
      <TrendingUp className="w-6 h-6 text-white" />
    </div>
  </div>
);

export default LogoOnly;
