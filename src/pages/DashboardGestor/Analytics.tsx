import { useState, useEffect } from "react";
import { BarChart3, TrendingUp, PieChart as PieChartIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import ChartSkeleton from "@/components/ChartSkeleton";
import { monthlyEmissions, speciesDistribution, processingTimes } from "@/lib/mockData";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const Analytics = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  const COLORS = [
    "hsl(var(--primary))",
    "hsl(var(--secondary))",
    "hsl(var(--accent))",
    "hsl(var(--success))",
    "hsl(var(--warning))",
  ];

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="space-y-2">
          <div className="h-8 w-64 bg-muted rounded animate-pulse" />
          <div className="h-4 w-96 bg-muted rounded animate-pulse" />
        </div>
        <ChartSkeleton title="Tendência de Emissões" height={350} />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartSkeleton title="Distribuição por Espécie" height={300} />
          <ChartSkeleton title="Tempo de Processamento" height={300} />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard Analítico</h1>
        <p className="text-muted-foreground">Métricas de desempenho e tendências do sistema</p>
      </div>

      {/* Emissões Mensais */}
      <Card className="p-6">
        {/* header + IA prediction */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <TrendingUp className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold text-foreground">Tendência de Emissões (2024)</h3>
          </div>
          {/* IA prediction: compute from mockData and display colored text */}
          <div>
            {(() => {
              // TODO: substituir por previsão real da IA (chamada a serviço/model).
              // compute simple prediction based on last two months in mockData
              const months = monthlyEmissions.map((m) => m.month);
              const lastIndex = monthlyEmissions.length - 1;
              const prevIndex = Math.max(0, lastIndex - 1);
              const prev = monthlyEmissions[prevIndex]?.gtas ?? 0;
              const last = monthlyEmissions[lastIndex]?.gtas ?? 0;
              const pct = prev > 0 ? ((last - prev) / prev) * 100 : 0;
              const direction = pct >= 0 ? "aumento" : "queda";
              const pctStr = Math.abs(pct).toFixed(1);
              const monthOrder = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
              const currentMonth = monthlyEmissions[lastIndex]?.month;
              const nextMonth = monthOrder[monthOrder.indexOf(currentMonth) + 1] ?? "mês seguinte";
              const colorClass = pct >= 0 ? "text-success" : "text-destructive";

              return (
                <div className={`text-sm font-medium ${colorClass}`}>
                  A IA prevê {direction} de {pctStr}% para {nextMonth}
                </div>
              );
            })()}
          </div>
        </div>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={monthlyEmissions}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="month" tick={{ fill: "hsl(var(--muted-foreground))" }} />
            <YAxis tick={{ fill: "hsl(var(--muted-foreground))" }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "0.5rem",
              }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="gtas"
              stroke="hsl(var(--primary))"
              strokeWidth={3}
              name="GTAs Emitidas"
              dot={{ fill: "hsl(var(--primary))", r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      {/* Grid com 2 gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Distribuição por Espécie */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <PieChartIcon className="w-5 h-5 text-secondary" />
            <h3 className="text-lg font-semibold text-foreground">Distribuição por Espécie</h3>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={speciesDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percentage }) => `${name}: ${percentage}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {speciesDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "0.5rem",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            {speciesDistribution.map((species, index) => (
              <div key={species.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  />
                  <span className="text-sm text-foreground">{species.name}</span>
                </div>
                <span className="text-sm font-medium text-foreground">
                  {species.value.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </Card>

        {/* Tempo de Processamento */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <BarChart3 className="w-5 h-5 text-accent" />
            <h3 className="text-lg font-semibold text-foreground">Tempo Médio de Processamento</h3>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={processingTimes}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="hour" tick={{ fill: "hsl(var(--muted-foreground))" }} />
              <YAxis tick={{ fill: "hsl(var(--muted-foreground))" }} label={{ value: "minutos", angle: -90, position: "insideLeft" }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "0.5rem",
                }}
              />
              <Bar dataKey="avgTime" fill="hsl(var(--accent))" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <p className="text-sm text-muted-foreground mt-4">
            Tempo médio de processamento varia ao longo do dia, com picos no horário de almoço.
          </p>
        </Card>
      </div>

      {/* Estatísticas Resumidas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6 text-center">
          <p className="text-sm text-muted-foreground mb-2">Volume Total (6 meses)</p>
          <p className="text-3xl font-bold text-foreground">46.071</p>
          <p className="text-xs text-success mt-1">↑ 18% vs período anterior</p>
        </Card>
        <Card className="p-6 text-center">
          <p className="text-sm text-muted-foreground mb-2">Valor Total Arrecadado</p>
          <p className="text-3xl font-bold text-foreground">R$ 6,5M</p>
          <p className="text-xs text-success mt-1">↑ 23% vs período anterior</p>
        </Card>
        <Card className="p-6 text-center">
          <p className="text-sm text-muted-foreground mb-2">Eficiência Média</p>
          <p className="text-3xl font-bold text-foreground">96,8%</p>
          <p className="text-xs text-success mt-1">↑ 2,3% vs período anterior</p>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;
