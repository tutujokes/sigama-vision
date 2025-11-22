import React from "react";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";

const GtasProdutor = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Formulário de Emissão de GTA — Produtor</h1>
        <p className="text-muted-foreground">Ferramentas e formulários que o produtor deve usar</p>
      </div>

      <Card className="p-6">
        <div className="prose text-sm text-foreground">
          <p>
            O <strong>Vaqueiro Digital</strong> é uma ferramenta de fiscalização e validação. Por questões de conflito de
            interesse, o produtor rural não tem acesso ao fluxo de fiscalização (Vaqueiro Digital). Em vez disso, produtores
            devem usar os formulários e áreas abaixo para emitir e gerenciar GTAs.
          </p>

          <ul>
            <li>
              <strong>Formulário de emissão de GTA</strong> — emitir uma nova GTA (rota: <code>/produtor/gtas</code>).
            </li>
            <li>
              <strong>Upload de documentos sanitários</strong> — envie certificados e atestados (PDF/foto) relacionados às
              suas GTAs.
            </li>
            <li>
              <strong>Visualização de GTAs emitidas</strong> — acompanhe o histórico e status das GTAs que você emitiu.
            </li>
          </ul>

          <p className="mt-3">Abaixo estão ações rápidas para produtores:</p>
          <div className="flex gap-2 mt-2">
            <Link to="/produtor/gtas" className="rounded bg-emerald-600 text-white px-3 py-2 text-sm">
              Emitir GTA
            </Link>
            <button className="rounded border px-3 py-2 text-sm">Enviar documento</button>
            <button className="rounded border px-3 py-2 text-sm">Minhas GTAs</button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default GtasProdutor;
