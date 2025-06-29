import React from "react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Cell } from "recharts";
import { ChartContainer } from "@/components/ui/chart";

// ✅ Translated data labels to English
const data = [
  { name: "Operational", value: 9 },
  { name: "Under Maintenance", value: 3 },
  { name: "Stopped", value: 3 },
];

const barColors = [
  "hsl(var(--status-operational))",
  "hsl(var(--status-maintenance))",
  "hsl(var(--status-warning))"
];

const legend = [
  { label: "Operational", color: barColors[0] },
  { label: "Under Maintenance", color: barColors[1] },
  { label: "Stopped", color: barColors[2] },
];

export default function FleetBarChart() {
  return (
    <div className="w-full h-64 flex flex-col items-center justify-center">
      <ChartContainer config={{}}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis 
              dataKey="name" 
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 14 }} 
              className="text-slate-600 dark:text-slate-400"
            />
            <YAxis hide />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: "hsl(var(--card))", 
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
                color: "hsl(var(--card-foreground))"
              }}
            />
            <Bar dataKey="value" radius={16}>
              {data.map((entry, idx) => (
                <Cell key={`cell-${idx}`} fill={barColors[idx]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>
      <div className="flex items-center justify-center gap-4 mt-4">
        {legend.map((item, idx) => (
          <span key={idx} className="flex items-center gap-1 text-sm text-slate-600 dark:text-slate-400">
            <span className="inline-block w-3 h-3 rounded-full" style={{ background: item.color }} />
            {item.label}
          </span>
        ))}
      </div>
    </div>
  );
}
