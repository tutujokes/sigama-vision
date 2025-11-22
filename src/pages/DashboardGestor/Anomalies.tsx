import { AlertTriangle, TrendingDown, TrendingUp, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { anomalyTypes, recentAlerts } from "@/lib/mockData";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const Anomalies = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [yAxisWidth, setYAxisWidth] = useState<number>(180);
  const [chartHeight, setChartHeight] = useState<number>(350);

  useEffect(() => {
    function onResize() {
      const mobile = typeof window !== "undefined" && window.innerWidth < 640;
      setIsMobile(mobile);
      setYAxisWidth(mobile ? 120 : 180);
      setChartHeight(mobile ? 300 : 350);
    }

    // initial check
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Detecção de Anomalias</h1>
        <p className="text-muted-foreground">Identificação inteligente de padrões suspeitos e irregularidades</p>
      </div>

      {/* Search Bar */}
      <Card className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Buscar por produtor, CPF, região ou tipo de anomalia..."
            className="pl-10"
          />
        </div>
      </Card>

      {/* Tipos de Anomalias */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {anomalyTypes.map((anomaly) => (
          <Card key={anomaly.type} className="p-4">
            <div className="flex items-start justify-between mb-2">
              <AlertTriangle className="w-5 h-5 text-warning" />
              {anomaly.trend > 0 ? (
                <TrendingUp className="w-4 h-4 text-destructive" />
              ) : (
                <TrendingDown className="w-4 h-4 text-success" />
              )}
            </div>
            <p className="text-2xl font-bold text-foreground mb-1">{anomaly.count}</p>
            <p className="text-xs text-muted-foreground mb-2">{anomaly.type}</p>
            <Badge
              variant="outline"
              className={
                anomaly.trend > 0
                  ? "bg-destructive/10 text-destructive border-destructive/20"
                  : "bg-success/10 text-success border-success/20"
              }
            >
              {anomaly.trend > 0 ? "+" : ""}{anomaly.trend}% vs mês anterior
            </Badge>
          </Card>
        ))}
      </div>

      {/* Gráfico de Anomalias */}
      <Card className="p-6 overflow-hidden">
        <h3 className="text-lg font-semibold text-foreground mb-4">Distribuição de Anomalias por Tipo</h3>
        {/* Adjust chart sizing for small screens to avoid horizontal overflow */}
        <ResponsiveContainer width="100%" height={chartHeight}>
          <BarChart data={anomalyTypes} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis type="number" tick={{ fill: "hsl(var(--muted-foreground))" }} />
            <YAxis
              type="category"
              dataKey="type"
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: isMobile ? 11 : 12 }}
              width={yAxisWidth}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "0.5rem",
              }}
            />
            <Bar dataKey="count" radius={[0, 8, 8, 0]}>
              {anomalyTypes.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={
                    entry.trend > 0
                      ? "hsl(var(--destructive))"
                      : entry.trend === 0
                      ? "hsl(var(--warning))"
                      : "hsl(var(--success))"
                  }
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* Detalhes de Alertas */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Alertas Detalhados</h3>
        <div className="space-y-3">
          {recentAlerts.map((alert) => {
            const severityColors = {
              high: "bg-destructive/10 text-destructive border-destructive/20",
              medium: "bg-warning/10 text-warning border-warning/20",
              low: "bg-info/10 text-info border-info/20",
            };

            const typeLabels = {
              duplicate: "Duplicado",
              suspicious: "Suspeito",
              validation: "Validação",
              fraud: "Fraude",
              pattern: "Padrão",
            };

            return (
              <div
                key={alert.id}
                className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className={severityColors[alert.severity]}>
                    {alert.severity === "high" ? "Alta" : alert.severity === "medium" ? "Média" : "Baixa"}
                  </Badge>
                  <Badge variant="outline" className="bg-muted text-muted-foreground">
                    {typeLabels[alert.type]}
                  </Badge>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground mb-1">{alert.message}</p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span>{alert.location}</span>
                    <span>•</span>
                    <span>{alert.timestamp}</span>
                  </div>
                </div>
                <button className="text-sm font-medium text-primary hover:underline mt-2 sm:mt-0 sm:ml-auto whitespace-nowrap">
                  Investigar
                </button>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
};

export default Anomalies;
