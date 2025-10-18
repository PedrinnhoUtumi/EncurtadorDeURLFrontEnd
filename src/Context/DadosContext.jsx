import { createContext, useEffect, useState } from "react";

export const DadosContext = createContext();

export function DadosProvider({ children }) {
  // Estado inicial com estrutura clara
  const [dados, setDados] = useState({ links: [] });

  function adicionarDados(novosDadosPorTabela) {
    if (!novosDadosPorTabela || typeof novosDadosPorTabela !== "object") return;

    setDados((prev) => {
      const novoEstado = { ...prev };
      for (const [tabela, registros] of Object.entries(novosDadosPorTabela)) {
        if (!Array.isArray(registros)) continue;

        const existentes = new Set(
          (novoEstado[tabela] || []).map((item) => JSON.stringify(item))
        );
        const novosUnicos = registros.filter(
          (item) => !existentes.has(JSON.stringify(item))
        );
        novoEstado[tabela] = [...(novoEstado[tabela] || []), ...novosUnicos];
      }
      return novoEstado;
    });
  }

  useEffect(() => {
    const fetchAPI = async () => {
      try {
        const response = await fetch("http://localhost:3000/links");
        if (!response.ok) {
          throw new Error("Erro ao buscar os dados do servidor");
        }

        const json = await response.json();

        // Aqui ajustamos de acordo com o formato real da resposta:
        // Supondo que o backend retorne um array de links:
        if (Array.isArray(json)) {
          adicionarDados({ links: json });
        }
        // Se o backend retornar { message: [...] }:
        else if (json.message && Array.isArray(json.message)) {
          adicionarDados({ links: json.message });
        }

      } catch (err) {
        console.error("❌ Erro na requisição:", err.message);
      }
    };

    fetchAPI();
  }, []);

  const exportar = {
    dados,
    adicionarDados,
  };

  return (
    <DadosContext.Provider value={exportar}>{children}</DadosContext.Provider>
  );
}
