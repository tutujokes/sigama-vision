// Mock data para SIGAMA Vision

export const gtaStats = {
  today: 247,
  month: 8432,
  averageTime: "18min",
  successRate: 97.3,
  totalValue: "R$ 1.243.567,89",
};

export const regionalUnits = [
  { name: "São Luís", gtas: 1247, performance: 98.2 },
  { name: "Imperatriz", gtas: 1089, performance: 96.5 },
  { name: "Caxias", gtas: 876, performance: 95.8 },
  { name: "Timon", gtas: 743, performance: 97.1 },
  { name: "Açailândia", gtas: 654, performance: 94.3 },
  { name: "Bacabal", gtas: 589, performance: 96.7 },
  { name: "Balsas", gtas: 543, performance: 98.5 },
  { name: "Codó", gtas: 498, performance: 93.9 },
  { name: "Santa Inês", gtas: 432, performance: 95.2 },
  { name: "Chapadinha", gtas: 387, performance: 97.8 },
  { name: "Pedreiras", gtas: 321, performance: 94.6 },
  { name: "Barra do Corda", gtas: 298, performance: 96.1 },
  { name: "Pinheiro", gtas: 276, performance: 95.5 },
  { name: "Viana", gtas: 234, performance: 93.2 },
  { name: "Presidente Dutra", gtas: 198, performance: 97.3 },
  { name: "Grajaú", gtas: 176, performance: 94.8 },
  { name: "Coelho Neto", gtas: 154, performance: 96.4 },
  { name: "Carolina", gtas: 117, performance: 92.7 },
];

export const monthlyEmissions = [
  { month: "Jan", gtas: 7234, value: 987654 },
  { month: "Fev", gtas: 6892, value: 923187 },
  { month: "Mar", gtas: 7456, value: 1045321 },
  { month: "Abr", gtas: 7823, value: 1123456 },
  { month: "Mai", gtas: 8234, value: 1198765 },
  { month: "Jun", gtas: 8432, value: 1243567 },
];

export const speciesDistribution = [
  { name: "Bovinos", value: 45234, percentage: 67.8 },
  { name: "Suínos", value: 12456, percentage: 18.7 },
  { name: "Equinos", value: 5432, percentage: 8.1 },
  { name: "Caprinos", value: 2876, percentage: 4.3 },
  { name: "Ovinos", value: 743, percentage: 1.1 },
];

export const recentAlerts = [
  {
    id: 1,
    type: "duplicate",
    severity: "high",
    message: "Cadastro duplicado detectado - CPF 123.456.789-00",
    location: "São Luís",
    timestamp: "2024-01-15 14:32",
  },
  {
    id: 2,
    type: "suspicious",
    severity: "medium",
    message: "Movimentação atípica - Volume 3x acima da média",
    location: "Imperatriz",
    timestamp: "2024-01-15 13:18",
  },
  {
    id: 3,
    type: "validation",
    severity: "low",
    message: "Inconsistência em dados de destino",
    location: "Caxias",
    timestamp: "2024-01-15 12:45",
  },
  {
    id: 4,
    type: "fraud",
    severity: "high",
    message: "Possível fraude - Documento sem validação sanitária",
    location: "Timon",
    timestamp: "2024-01-15 11:23",
  },
  {
    id: 5,
    type: "pattern",
    severity: "medium",
    message: "Padrão suspeito - Emissões fora do horário comercial",
    location: "Açailândia",
    timestamp: "2024-01-15 10:15",
  },
];

export const heatMapData = [
  { region: "São Luís", lat: -2.53, lng: -44.30, intensity: 95 },
  { region: "Imperatriz", lat: -5.52, lng: -47.48, intensity: 88 },
  { region: "Caxias", lat: -4.86, lng: -43.36, intensity: 72 },
  { region: "Timon", lat: -5.09, lng: -42.84, intensity: 65 },
  { region: "Açailândia", lat: -4.95, lng: -47.50, intensity: 58 },
  { region: "Bacabal", lat: -4.23, lng: -44.78, intensity: 53 },
  { region: "Balsas", lat: -7.53, lng: -46.03, intensity: 48 },
  { region: "Codó", lat: -4.45, lng: -43.88, intensity: 44 },
];

export const anomalyTypes = [
  { type: "Cadastros Duplicados", count: 23, trend: -12 },
  { type: "Movimentações Atípicas", count: 47, trend: 8 },
  { type: "Valores Suspeitos", count: 15, trend: -5 },
  { type: "Documentação Incompleta", count: 31, trend: 3 },
  { type: "Padrões Irregulares", count: 19, trend: -7 },
];

export const processingTimes = [
  { hour: "08h", avgTime: 12 },
  { hour: "10h", avgTime: 15 },
  { hour: "12h", avgTime: 22 },
  { hour: "14h", avgTime: 18 },
  { hour: "16h", avgTime: 14 },
  { hour: "18h", avgTime: 10 },
];
