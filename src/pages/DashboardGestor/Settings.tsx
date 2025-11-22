import { Settings as SettingsIcon, User, Bell, Shield, Database } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const Settings = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    try {
      localStorage.clear();
      sessionStorage.clear();
    } catch (e) {
      /* ignore */
    }
    navigate("/landing");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Configurações</h1>
        <p className="text-muted-foreground">Gerencie preferências e configurações do sistema</p>
      </div>

      {/* Perfil */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <User className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Perfil do Usuário</h3>
        </div>
        <div className="space-y-4">
          <div>
            <Label className="text-sm text-muted-foreground">Nome</Label>
            <div className="flex items-center gap-3">
              <p className="text-foreground font-medium">Karol Pontes</p>
              <span className="text-sm text-muted-foreground">karolpontes@gestor.com</span>
            </div>
          </div>
          <div>
            <Label className="text-sm text-muted-foreground">Nível de Acesso</Label>
            <p className="text-foreground font-medium">Gestor/Coordenador - Visão Estadual</p>
          </div>
          <div className="flex items-center justify-between w-full">
            <div>
              <Button variant="outline">Editar Perfil</Button>
            </div>
            <div>
              <Button variant="outline" onClick={handleLogout} className="text-destructive">
                Sair
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Notificações */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <Bell className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Notificações</h3>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="alerts" className="text-foreground font-medium">Alertas de Anomalias</Label>
              <p className="text-sm text-muted-foreground">Receber notificações em tempo real</p>
            </div>
            <Switch id="alerts" defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="reports" className="text-foreground font-medium">Relatórios Diários</Label>
              <p className="text-sm text-muted-foreground">Resumo das atividades do dia</p>
            </div>
            <Switch id="reports" defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="critical" className="text-foreground font-medium">Alertas Críticos</Label>
              <p className="text-sm text-muted-foreground">Apenas situações de alta prioridade</p>
            </div>
            <Switch id="critical" defaultChecked />
          </div>
        </div>
      </Card>

      {/* Segurança */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <Shield className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Segurança</h3>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="2fa" className="text-foreground font-medium">Autenticação de Dois Fatores</Label>
              <p className="text-sm text-muted-foreground">Camada adicional de segurança</p>
            </div>
            <Switch id="2fa" />
          </div>
          <Button variant="outline">Alterar Senha</Button>
        </div>
      </Card>

      {/* Dados */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <Database className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Dados e Exportação</h3>
        </div>
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">
            Exporte relatórios e dados do sistema para análise externa.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button variant="outline" className="whitespace-normal">Exportar Relatório Mensal</Button>
            <Button variant="outline" className="whitespace-normal">Exportar Dados de Anomalias</Button>
          </div>
        </div>
      </Card>

      {/* Sistema */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <SettingsIcon className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Informações do Sistema</h3>
        </div>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Versão</span>
            <span className="text-foreground font-medium">1.0.0</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Última Atualização</span>
            <span className="text-foreground font-medium">15 Jan 2024</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Ambiente</span>
            <span className="text-foreground font-medium">Produção</span>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Settings;
