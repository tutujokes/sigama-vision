import { Link, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Shield, Home } from "lucide-react";

const RoleCard = ({ icon: Icon, title, description, disabled, onClick }: any) => {
  return (
    <div
      onClick={!disabled ? onClick : undefined}
      className={
        `w-full cursor-pointer select-none rounded-lg border p-4 bg-card hover:shadow-md transition-all ` +
        (disabled ? "opacity-60 cursor-not-allowed" : "")
      }
      role="button"
      aria-disabled={disabled}
    >
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-md bg-muted/30">
          <Icon className="w-6 h-6 text-primary" />
        </div>
        <div className="flex-1">
          <div>
            <h4 className="text-lg font-semibold text-foreground">{title}</h4>
          </div>
          <p className="text-sm text-muted-foreground mt-1">{description}</p>
        </div>
      </div>
    </div>
  );
};

const Register = () => {
  const navigate = useNavigate();

  const handleSelect = (role: string) => {
    // TEMP: Pulamos o formulário de registro e redirecionamos diretamente
    // para o dashboard do tipo selecionado durante o desenvolvimento.
    // TODO: Remover esse comportamento e voltar ao fluxo de registro completo
    // (preencher dados cadastrais / validação) quando a integração estiver pronta.
    if (role === "produtor") {
      navigate("/produtor");
      return;
    }
    if (role === "fiscal") {
      navigate("/fiscal");
      return;
    }
    // Fallback: manter o comportamento original
    navigate(`/register/form?role=${encodeURIComponent(role)}`);
  };

  return (
    <div className="min-h-screen flex items-start justify-center bg-background py-12">
      <div className="w-full max-w-4xl px-4">
        <div className="text-center mb-6">
          <img src="/logos/sigama_small_logo.png" alt="SIGAMA" className="mx-auto w-20 h-20 rounded-md" />
          <h1 className="text-3xl font-extrabold mt-4">Criar Conta</h1>
          <p className="text-sm text-muted-foreground">Escolha seu tipo de acesso</p>
        </div>

        <Card className="p-6">
          <div className="flex flex-col gap-4 items-stretch">
            <RoleCard
              icon={Home}
              title="Produtor Rural"
              description="Gerencie suas GTAs"
              onClick={() => handleSelect("produtor")}
            />

            <RoleCard
              icon={Shield}
              title="Fiscal / Servidor AGED"
              description="Fiscalize e monitore"
              onClick={() => handleSelect("fiscal")}
            />

            <RoleCard
              icon={User}
              title="Gestor / Coordenador"
              description="(Acesso restrito)"
              disabled
              onClick={() => {}}
            />
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Já tem conta? <Link to="/" className="text-primary underline">Entrar</Link>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Register;
