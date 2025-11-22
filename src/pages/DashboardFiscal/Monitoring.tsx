"use client";

import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import {
  MapPin,
  AlertTriangle,
  FileText,
  Clock,
  CheckCircle,
} from "lucide-react";

// ---------- Mini inline sparkline ----------
function SmallSpark({ data = [3, 5, 2, 6, 4] }: { data?: number[] }) {
  const max = Math.max(...data);
  const points = data
    .map(
      (d, i) =>
        `${(i / (data.length - 1)) * 100},${100 - (d / max) * 100}`
    )
    .join(" ");

  return (
    <svg
      viewBox="0 0 100 100"
      className="h-6 w-20"
      preserveAspectRatio="none"
      aria-hidden
    >
      <polyline
        fill="none"
        stroke="#16a34a"
        strokeWidth={2}
        points={points}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ---------- KPI Card ----------
const KPI = ({
  title,
  value,
  delta,
  spark,
  icon: Icon,
}: {
  title: string;
  value: string;
  delta?: string;
  spark?: number[];
  icon?: React.ElementType;
}) => (
  <Card className="h-full">
    <CardContent className="pt-4 pb-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 space-y-1">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            {title}
          </p>
          <p className="text-2xl font-semibold text-foreground">{value}</p>
          {delta && (
            <Badge
              variant={delta.startsWith("+") ? "default" : "secondary"}
              className="text-[0.7rem] mt-1"
            >
              {delta}
            </Badge>
          )}
        </div>

        <div className="flex flex-col items-end gap-2">
          {Icon && (
            <div className="p-2 bg-primary/10 rounded-lg">
              <Icon className="h-5 w-5 text-primary" />
            </div>
          )}
          {spark && <SmallSpark data={spark} />}
        </div>
      </div>
    </CardContent>
  </Card>
);

// ---------- Main Page ----------
export default function MonitoringFiscal() {
  const alerts = [
    {
      id: 1,
      title: "GTA suspeita",
      detail: "CPF: 123.456.789-00 — 50 bovinos em 1 dia",
      severity: "high",
      icon: AlertTriangle,
      action: "Investigar",
    },
    {
      id: 2,
      title: "Transporte ilegal",
      detail: "BR-135, km 45 — Sem GTA",
      severity: "critical",
      icon: MapPin,
      action: "Ir ao Local",
    },
    {
      id: 3,
      title: "Propriedade com pendência",
      detail: "Sítio Boa Vista — pendências",
      severity: "medium",
      icon: Clock,
      action: "Ver",
    },
  ];

  const severityColors: Record<
    (typeof alerts)[number]["severity"],
    string
  > = {
    critical:
      "border-red-500 bg-red-50 text-red-900 dark:bg-red-950/40 dark:border-red-400",
    high:
      "border-orange-500 bg-orange-50 text-orange-900 dark:bg-orange-950/40 dark:border-orange-400",
    medium:
      "border-yellow-500 bg-yellow-50 text-yellow-900 dark:bg-yellow-950/40 dark:border-yellow-400",
  };

  // Overlay data for map (percent coordinates relative to image)
  const alertPins = [
    { id: 1, x: 34, y: 42, title: "GTA suspeita - Fazenda Santa Clara" },
    { id: 2, x: 62, y: 28, title: "Transporte ilegal - BR-135 km45" },
  ];

  const cityDensity = [
    { id: "imperatriz", x: 50, y: 50, count: 24 },
    { id: "acailandia", x: 76, y: 62, count: 8 },
    { id: "bacabal", x: 22, y: 72, count: 14 },
  ];

  const propertiesPend = [
    { id: "p1", x: 36, y: 44, name: "Rancho Verde", issue: "Sem GTA" },
    { id: "p2", x: 58, y: 30, name: "Sítio Boa Vista", issue: "Pendências" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold text-foreground">
            Monitoramento Regional – Imperatriz
          </h1>
          <p className="text-sm text-muted-foreground">
            Acompanhamento em tempo real das fiscalizações e GTAs na
            jurisdição.
          </p>
          <p className="text-xs text-muted-foreground">
            Fiscal responsável:{" "}
            <span className="font-medium text-foreground">
              João Silva 
            </span>
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Button variant="outline" size="sm">
            Vaqueiro Digital
          </Button>
          <Button size="sm">Nova Fiscalização</Button>
        </div>
      </header>

      {/* KPI Grid */}
      <section
        aria-label="Indicadores de fiscalização"
        className="grid gap-4 md:grid-cols-4"
      >
        <KPI
          title="GTAs Hoje"
          value="89"
          delta="+15"
          spark={[2, 3, 5, 7, 9]}
          icon={FileText}
        />
        <KPI
          title="Alertas Ativos"
          value="12"
          delta="-3"
          spark={[6, 5, 4, 3, 2]}
          icon={AlertTriangle}
        />
        <KPI
          title="Fiscalizações Pendentes"
          value="8"
          spark={[1, 2, 1, 3, 2]}
          icon={Clock}
        />
        <KPI
          title="Conformidade"
          value="94%"
          delta="+2%"
          spark={[7, 7, 8, 9, 9]}
          icon={CheckCircle}
        />
      </section>

      {/* Mapa + Filtros */}
      <section className="grid gap-4 lg:grid-cols-[minmax(0,2fr)]">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-3">
            <Select defaultValue="all">
              <SelectTrigger className="w-[220px]">
                <SelectValue placeholder="Filtrar município" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os municípios</SelectItem>
                <SelectItem value="imperatriz">Imperatriz</SelectItem>
                <SelectItem value="acailandia">Açailândia</SelectItem>
                <SelectItem value="bacabal">Bacabal</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" size="sm">
              <MapPin className="h-4 w-4 mr-2" />
              Ver Propriedades
            </Button>
          </div>

          <Card className="mt-1 border-dashed">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Mapa Regional de Imperatriz
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="h-64 rounded-md bg-muted flex items-center justify-center relative overflow-hidden">
                <img
                  src="/images/imperatriz_mapa.png"
                  alt="Mapa de Imperatriz"
                  className="w-full h-full object-cover"
                />

                {/* Density circles */}
                {cityDensity.map((c) => {
                  const size = 18 + c.count * 3; // px
                  return (
                    <div
                      key={c.id}
                      aria-hidden
                      style={{ left: `${c.x}%`, top: `${c.y}%`, width: `${size}px`, height: `${size}px`, transform: "translate(-50%, -50%)" }}
                      className="absolute rounded-full bg-primary/20 border border-primary/40 pointer-events-none"
                    >
                      <span className="sr-only">{c.id} - {c.count} GTAs</span>
                    </div>
                  );
                })}

                {/* Alert pins */}
                {alertPins.map((p) => (
                  <button
                    key={p.id}
                    title={p.title}
                    style={{ left: `${p.x}%`, top: `${p.y}%`, transform: "translate(-50%, -100%)" }}
                    className="absolute -translate-y-1/2 flex items-center justify-center w-7 h-7 rounded-full bg-red-600 text-white shadow-lg"
                  >
                    <AlertTriangle className="w-4 h-4" />
                  </button>
                ))}

                {/* Properties with pendências */}
                {propertiesPend.map((pt) => (
                  <div
                    key={pt.id}
                    role="button"
                    title={`${pt.name} — ${pt.issue}`}
                    style={{ left: `${pt.x}%`, top: `${pt.y}%`, transform: "translate(-50%, -50%)" }}
                    className="absolute flex flex-col items-center gap-1 w-6 h-6"
                  >
                    <div className="w-3 h-3 rounded-full bg-amber-500 border border-amber-600" />
                  </div>
                ))}

                <div className="absolute inset-0 flex flex-col items-start justify-start p-4 pointer-events-none">
                  <div className="text-sm text-muted-foreground">12 municípios sob jurisdição</div>
                </div>

                <div className="absolute top-4 right-4">
                  <Badge
                    variant="destructive"
                    className="animate-pulse text-xs px-2 py-1"
                  >
                    3 alertas
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Alertas Críticos */}
      <section>
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between gap-3">
              <div>
                <CardTitle className="text-base">
                  Alertas Críticos ({alerts.length})
                </CardTitle>
                <p className="text-xs text-muted-foreground">
                  Eventos que exigem priorização pela equipe de fiscalização.
                </p>
              </div>
              <Badge variant="outline" className="text-xs">
                Atualizado há 2 min
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {alerts.map((a) => {
                const Icon = a.icon;
                return (
                  <li
                    key={a.id}
                    className={`border-l-4 rounded-md p-3 transition-colors hover:bg-muted/60 ${severityColors[a.severity]}`}
                  >
                    <div className="flex items-start gap-3">
                      <Icon className="h-5 w-5 mt-0.5 shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-sm truncate">
                          {a.title}
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          {a.detail}
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        {a.action}
                      </Button>
                    </div>
                  </li>
                );
              })}
            </ul>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
