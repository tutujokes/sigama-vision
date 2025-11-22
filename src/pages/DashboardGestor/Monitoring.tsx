import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Activity, TrendingUp, Clock, DollarSign, CheckCircle2, MapPin } from "lucide-react";
import KPICard from "@/components/KPICard";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import ChartSkeleton from "@/components/ChartSkeleton";
import { gtaStats, recentAlerts, heatMapData, regionalUnits } from "@/lib/mockData";
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

const Monitoring = () => {
  const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

  useEffect(() => {
    // Simula carregamento de dados
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="h-8 w-64 bg-muted rounded animate-pulse" />
            <div className="h-4 w-48 bg-muted rounded animate-pulse" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="p-6 animate-pulse">
              <div className="space-y-3">
                <div className="h-4 w-24 bg-muted rounded" />
                <div className="h-8 w-32 bg-muted rounded" />
                <div className="h-3 w-20 bg-muted rounded" />
              </div>
            </Card>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartSkeleton title="Densidade por Região" height={300} />
          <ChartSkeleton title="Performance Regional" height={300} />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Monitoramento de GTAs</h1>
          <p className="text-muted-foreground">Visão em tempo real do sistema SIGAMA</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="bg-success/10 text-success border-success/20 px-4 py-2">
          <div className="w-2 h-2 rounded-full bg-success animate-pulse mr-2" />
          Sistema Ativo
          </Badge>

          {/* Logout moved to Perfil do Usuário (Settings) */}
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="GTAs Hoje"
          value={gtaStats.today}
          subtitle="Emissões do dia"
          icon={Activity}
          trend={{ value: 12, label: "vs ontem" }}
          variant="default"
        />
        <KPICard
          title="GTAs do Mês"
          value={gtaStats.month.toLocaleString()}
          subtitle="Total em janeiro"
          icon={TrendingUp}
          trend={{ value: 8, label: "vs mês anterior" }}
          variant="success"
        />
        <KPICard
          title="Tempo Médio"
          value={gtaStats.averageTime}
          subtitle="Processamento"
          icon={Clock}
          trend={{ value: -5, label: "otimização" }}
          variant="warning"
        />
        <KPICard
          title="Taxa de Sucesso"
          value={`${gtaStats.successRate}%`}
          subtitle="Aprovação"
          icon={CheckCircle2}
          variant="success"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Mapa de Calor */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">Densidade por Região</h3>
            <MapPin className="w-5 h-5 text-muted-foreground" />
          </div>
          <div className="space-y-3">
            {heatMapData.map((region) => (
              <div key={region.region} className="flex items-center gap-3">
                <span className="text-sm font-medium text-foreground w-32">{region.region}</span>
                <div className="flex-1 bg-muted rounded-full h-6 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-primary to-primary-light transition-all"
                    style={{ width: `${region.intensity}%` }}
                  />
                </div>
                <span className="text-sm font-semibold text-primary w-12 text-right">
                  {region.intensity}%
                </span>
              </div>
            ))}
          </div>
        </Card>

        {/* Performance Regional */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Top 10 Unidades Regionais</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={regionalUnits.slice(0, 10)}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis
                dataKey="name"
                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis tick={{ fill: "hsl(var(--muted-foreground))" }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "0.5rem",
                }}
              />
              <Bar dataKey="gtas" radius={[8, 8, 0, 0]}>
                {regionalUnits.slice(0, 10).map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={index < 3 ? "hsl(var(--primary))" : "hsl(var(--secondary))"}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Alertas Recentes */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Alertas Recentes</h3>
        <div className="space-y-3">
          {recentAlerts.map((alert) => {
            const severityColors = {
              high: "bg-destructive/10 text-destructive border-destructive/20",
              medium: "bg-warning/10 text-warning border-warning/20",
              low: "bg-info/10 text-info border-info/20",
            };

            return (
              <div
                key={alert.id}
                className="flex items-start gap-4 p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors"
              >
                <Badge variant="outline" className={severityColors[alert.severity]}>
                  {alert.severity === "high" ? "Alta" : alert.severity === "medium" ? "Média" : "Baixa"}
                </Badge>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground mb-1">{alert.message}</p>
                  <p className="text-xs text-muted-foreground">
                    {alert.location} • {alert.timestamp}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
};

export default Monitoring;
