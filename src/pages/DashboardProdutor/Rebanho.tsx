import React, { useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Plus, Upload, Download, MoreHorizontal, Calendar as CalendarIcon, Clock, Check, AlertTriangle, FileText, Activity, Layers, MapPin, Heart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import ChartSkeleton from "@/components/ChartSkeleton";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination";


const RebanhoProdutor = () => {
  const [species, setSpecies] = useState<string | undefined>(undefined);
  const [status, setStatus] = useState<string | undefined>(undefined);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const pageSize = 5;

  const animals = useMemo(
    () => [
      { tag: "BR-001", species: "Bovino", age: "2a", sex: "F", vaccine: "Em dia" },
      { tag: "BR-002", species: "Bovino", age: "1a", sex: "M", vaccine: "Atrasado" },
      { tag: "BR-003", species: "Capri", age: "3a", sex: "F", vaccine: "Em dia" },
      { tag: "BR-004", species: "Suíno", age: "6m", sex: "M", vaccine: "Em dia" },
      { tag: "BR-005", species: "Bovino", age: "4a", sex: "F", vaccine: "Atrasado" },
      { tag: "BR-006", species: "Bovino", age: "1a", sex: "F", vaccine: "Em dia" },
      { tag: "BR-007", species: "Capri", age: "2a", sex: "M", vaccine: "Em dia" },
    ],
    [],
  );

  const filtered = useMemo(() => {
    return animals.filter((a) => {
      if (species && a.species !== species) return false;
      if (status) {
        if (status === "em-dia" && !/Em dia/i.test(a.vaccine)) return false;
        if (status === "atrasado" && !/Atrasado/i.test(a.vaccine)) return false;
      }
      if (search && !`${a.tag} ${a.species} ${a.age} ${a.sex} ${a.vaccine}`.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [animals, species, status, search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const pageItems = filtered.slice((page - 1) * pageSize, page * pageSize);
  
  const MiniSparkline = ({ points = [4,6,5,8,7,9,6], color = '#D1FAE5' }: { points?: number[]; color?: string }) => {
    const max = Math.max(...points);
    const w = 80;
    const h = 24;
    const gap = w / (points.length - 1);
    const path = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${i * gap} ${h - (p / max) * h}`).join(' ');
    return (
      <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="inline-block align-middle">
        <path d={path} fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  };
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Meu Rebanho</h1>
          <p className="text-muted-foreground">Visão completa do rebanho e ações rápidas</p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="default" size="sm" className="inline-flex items-center">
            <Plus className="w-4 h-4" />
            <span>Animal</span>
          </Button>
          <Button variant="outline" size="sm" className="inline-flex items-center">
            <Upload className="w-4 h-4" />
            <span>Importar</span>
          </Button>
          <Button variant="outline" size="sm" className="inline-flex items-center">
            <Download className="w-4 h-4" />
            <span>Exportar</span>
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="min-w-[220px]">
          <label className="text-sm text-muted-foreground block mb-1">Seletor de Fazenda</label>
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Fazenda Santa Clara" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="santa-clara">Fazenda Santa Clara</SelectItem>
              <SelectItem value="sao-joao">Fazenda São João</SelectItem>
              <SelectItem value="vale-verde">Fazenda Vale Verde</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Card className="p-4">
        <Tabs defaultValue="visao-geral">
          <TabsList>
            <TabsTrigger value="visao-geral">Visão Geral</TabsTrigger>
            <TabsTrigger value="lista-animais">Lista de Animais</TabsTrigger>
            <TabsTrigger value="calendario">Calendário de Vacinação</TabsTrigger>
          </TabsList>

          <TabsContent value="visao-geral">
            <div className="py-6 space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Visão Geral</h3>
                <p className="text-sm text-muted-foreground">Resumo com métricas rápidas e ações.</p>
              </div>

              {/* KPI cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <Card className="p-4 flex items-start justify-between">
                  <div>
                    <div className="text-2xl font-bold">247</div>
                    <div className="text-sm text-muted-foreground">Total Animais</div>
                    <div className="text-xs text-muted-foreground mt-1">Últimos 30 dias</div>
                  </div>
                  <div className="text-right flex flex-col items-end gap-2">
                    <div className="rounded-full bg-emerald-50 text-emerald-700 text-xs px-2 py-0.5">+4%</div>
                    <MiniSparkline />
                  </div>
                </Card>

                <Card className="p-4 flex items-start justify-between">
                  <div>
                    <div className="text-2xl font-bold">3</div>
                    <div className="text-sm text-muted-foreground">Propriedades</div>
                    <div className="text-xs text-muted-foreground mt-1">Ativas</div>
                  </div>
                  <div className="text-right flex flex-col items-end gap-2">
                    <div className="rounded-full bg-emerald-50 text-emerald-700 text-xs px-2 py-0.5">+1</div>
                    <MiniSparkline points={[2,2,3,3,3,3,3]} color="#C7F9E8" />
                  </div>
                </Card>

                <Card className="p-4 flex items-start justify-between">
                  <div>
                    <div className="text-2xl font-bold">15</div>
                    <div className="text-sm text-muted-foreground">Alertas</div>
                    <div className="text-xs text-muted-foreground mt-1">Prioridade</div>
                  </div>
                  <div className="text-right flex flex-col items-end gap-2">
                    <div className="rounded-full bg-amber-50 text-amber-700 text-xs px-2 py-0.5">+3</div>
                    <MiniSparkline points={[1,3,2,4,3,5,4]} color="#FEF3C7" />
                  </div>
                </Card>

                <Card className="p-4 flex items-start justify-between">
                  <div>
                    <div className="text-2xl font-bold">98%</div>
                    <div className="text-sm text-muted-foreground">Saúde do Rebanho</div>
                    <div className="text-xs text-muted-foreground mt-1">Média ponderada</div>
                  </div>
                  <div className="text-right flex flex-col items-end gap-2">
                    <div className="rounded-full bg-emerald-50 text-emerald-700 text-xs px-2 py-0.5">+0.5%</div>
                    <MiniSparkline points={[8,9,9,8,9,10,9]} color="#DCFCE7" />
                  </div>
                </Card>
              </div>

              {/* Species summary */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="rounded-full bg-emerald-50 p-2">
                      <Activity className="w-5 h-5 text-emerald-700" />
                    </div>
                    <div>
                      <div className="text-xl font-semibold">189</div>
                      <div className="text-sm text-muted-foreground">Bovino</div>
                    </div>
                  </div>
                  <div className="text-sm text-emerald-600">+12 ↗</div>
                </Card>

                <Card className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="rounded-full bg-emerald-50 p-2">
                      <Layers className="w-5 h-5 text-emerald-700" />
                    </div>
                    <div>
                      <div className="text-xl font-semibold">42</div>
                      <div className="text-sm text-muted-foreground">Capri</div>
                    </div>
                  </div>
                  <div className="text-sm text-emerald-600">+3 ↗</div>
                </Card>

                <Card className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="rounded-full bg-rose-50 p-2">
                      <MapPin className="w-5 h-5 text-rose-600" />
                    </div>
                    <div>
                      <div className="text-xl font-semibold">16</div>
                      <div className="text-sm text-muted-foreground">Suíno</div>
                    </div>
                  </div>
                  <div className="text-sm text-rose-600">-2 ↘</div>
                </Card>
              </div>

              {/* Chart + actions + alerts */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="lg:col-span-2">
                  <ChartSkeleton title="Crescimento do Rebanho (últimos 6 meses)" height={260} />

                  <div className="flex gap-2 mt-4">
                    <Button variant="default" size="sm" className="inline-flex items-center">
                      Cadastrar Animal
                    </Button>
                    <Button variant="secondary" size="sm">Nova GTA</Button>
                    <Button variant="outline" size="sm">Registrar Vacina</Button>
                    <Button variant="ghost" size="sm">Gerar Relatório</Button>
                  </div>
                </div>

                <div>
                  <Card className="p-4 mb-4">
                    <h4 className="font-semibold mb-2">Alertas Importantes</h4>
                    <ul className="text-sm space-y-2">
                      <li className="flex items-start gap-2"><AlertTriangle className="w-4 h-4 text-amber-600 mt-0.5" /><span><strong>15</strong> animais - Vacinação atrasada</span></li>
                      <li className="flex items-start gap-2"><FileText className="w-4 h-4 text-foreground/70 mt-0.5" /><span><strong>3</strong> GTAs aguardando aprovação</span></li>
                      <li className="flex items-start gap-2"><Check className="w-4 h-4 text-emerald-600 mt-0.5" /><span>Certificado Brucelose válido</span></li>
                    </ul>
                  </Card>

                  <Card className="p-4">
                    <h4 className="font-semibold mb-2">Movimentações Recentes</h4>
                    <ul className="text-sm space-y-2">
                      <li>• 18/11 - GTA #2345 Aprovada</li>
                      <li>• 17/11 - 8 animais vacinados</li>
                      <li>• 15/11 - Novo animal cadastrado</li>
                      <li>• 12/11 - Exportação de lote</li>
                      <li>• 10/11 - Importação concluída</li>
                    </ul>
                  </Card>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="lista-animais">
                <div className="py-6 space-y-4">
                  <div className="flex flex-col md:flex-row md:items-end gap-3 md:gap-4">
                    <div className="w-full md:w-48">
                      <label className="text-sm text-muted-foreground block mb-1">Espécie</label>
                      <Select onValueChange={(v) => { setSpecies(v === "all" ? undefined : v); setPage(1); }}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Todas" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Todas</SelectItem>
                          <SelectItem value="Bovino">Bovino</SelectItem>
                          <SelectItem value="Capri">Capri</SelectItem>
                          <SelectItem value="Suíno">Suíno</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="w-full md:w-48">
                      <label className="text-sm text-muted-foreground block mb-1">Status</label>
                      <Select onValueChange={(v) => { setStatus(v === "all" ? undefined : v); setPage(1); }}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Todos" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Todos</SelectItem>
                          <SelectItem value="em-dia">Em dia</SelectItem>
                          <SelectItem value="atrasado">Atrasado</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex-1">
                      <label className="text-sm text-muted-foreground block mb-1">Buscar</label>
                      <div className="flex gap-2">
                        <Input placeholder="ID, brinco, espécie..." value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} />
                        <Button variant="outline">🔍</Button>
                      </div>
                    </div>
                  </div>

                  <Card className="p-0">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Brinco</TableHead>
                          <TableHead>Espécie</TableHead>
                          <TableHead>Idade</TableHead>
                          <TableHead>Sexo</TableHead>
                          <TableHead>Vacinas</TableHead>
                          <TableHead className="text-center">Ações</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {pageItems.map((a) => (
                          <TableRow key={a.tag}>
                            <TableCell className="font-medium">{a.tag}</TableCell>
                            <TableCell>{a.species}</TableCell>
                            <TableCell>{a.age}</TableCell>
                            <TableCell>{a.sex}</TableCell>
                            <TableCell>{a.vaccine}</TableCell>
                            <TableCell>
                              <div className="flex h-full items-center justify-center">
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon">
                                      <MoreHorizontal className="w-4 h-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuItem>Ver Detalhes</DropdownMenuItem>
                                    <DropdownMenuItem>Registrar Vacina</DropdownMenuItem>
                                    <DropdownMenuItem>Registrar Evento</DropdownMenuItem>
                                    <DropdownMenuItem>Histórico Sanitário (PDF)</DropdownMenuItem>
                                    <DropdownMenuItem>Editar</DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>

                    <div className="p-4">
                      <Pagination className="w-full">
                        <PaginationContent>
                          <PaginationItem>
                            <PaginationPrevious onClick={() => setPage((p) => Math.max(1, p - 1))} />
                          </PaginationItem>
                          {Array.from({ length: totalPages }).map((_, i) => (
                            <PaginationItem key={i}>
                              <PaginationLink isActive={i + 1 === page} onClick={() => setPage(i + 1)}>
                                {i + 1}
                              </PaginationLink>
                            </PaginationItem>
                          ))}
                          <PaginationItem>
                            <PaginationNext onClick={() => setPage((p) => Math.min(totalPages, p + 1))} />
                          </PaginationItem>
                        </PaginationContent>
                      </Pagination>
                    </div>
                  </Card>
                </div>
          </TabsContent>

          <TabsContent value="calendario">
            <div className="py-6 space-y-4">
              <div className="flex items-center gap-2">
                <Button variant="default" className="inline-flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  Agendar Vacinação
                </Button>
                <Button variant="secondary" className="inline-flex items-center gap-2">
                  <Upload className="w-4 h-4" />
                  Registrar
                </Button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* Vacinações Pendentes */}
                <Card className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold">Vacinações Pendentes</h4>
                    <Badge variant="outline" className="text-foreground/80">1 item</Badge>
                  </div>

                  <div className="space-y-3">
                    <div className="rounded-md border border-amber-100 bg-amber-50 p-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="rounded-full bg-amber-100 p-2">
                            <AlertTriangle className="w-5 h-5 text-amber-600" />
                          </div>
                          <div>
                            <div className="font-medium text-foreground">Antiaftosa</div>
                            <div className="text-sm text-muted-foreground">15 animais • Prazo: 2 dias</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button size="sm" variant="default">Registrar em Lote</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Próximas Vacinações (Timeline) */}
                <Card className="p-4 lg:col-span-2">
                  <h4 className="font-semibold mb-2">Próximas Vacinações (Timeline)</h4>
                  <div className="space-y-3">
                    <div>
                      <div className="font-medium flex items-center gap-2"><CalendarIcon className="w-4 h-4 text-foreground/70" /> Novembro</div>
                      <ul className="mt-1 ml-4 text-sm text-muted-foreground space-y-1">
                        <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> Brucelose - 42 animais</li>
                        <li className="flex items-center gap-2"><Clock className="w-4 h-4 text-amber-600" /> Antiaftosa - 15 animais</li>
                      </ul>
                    </div>

                    <div>
                      <div className="font-medium flex items-center gap-2"><CalendarIcon className="w-4 h-4 text-foreground/70" /> Dezembro</div>
                      <ul className="mt-1 ml-4 text-sm text-muted-foreground space-y-1">
                        <li className="flex items-center gap-2"><Clock className="w-4 h-4 text-emerald-600" /> Raiva - 27 animais</li>
                      </ul>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Histórico */}
              <Card className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold">Histórico</h4>
                  <div className="flex items-center gap-3">
                    <div className="w-40">
                      <label className="text-sm text-muted-foreground block mb-1">Mês</label>
                      <Select onValueChange={() => {}}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Todos" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Todos</SelectItem>
                          <SelectItem value="nov">Novembro</SelectItem>
                          <SelectItem value="dez">Dezembro</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="w-48">
                      <label className="text-sm text-muted-foreground block mb-1">Vacina</label>
                      <Select onValueChange={() => {}}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Todas" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Todas</SelectItem>
                          <SelectItem value="brucelose">Brucelose</SelectItem>
                          <SelectItem value="raiva">Raiva</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> 15/10 - Brucelose - 42 animais</div>
                  <div className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> 20/09 - Raiva - 27 animais</div>
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default RebanhoProdutor;