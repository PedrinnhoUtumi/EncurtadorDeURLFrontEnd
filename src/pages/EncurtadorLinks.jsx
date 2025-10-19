import { useState, useContext } from "react";
import { DadosContext } from "../Context/DadosContext";

function validar(novoLink) {
  if (!novoLink.legendaLink || !novoLink.urlNormal) {
    alert("Preencha todos os campos!");
    throw new Error("Campos obrigatórios não preenchidos");
  }
}

export function EncurtadorLinks() {
  const [novoLink, setNovoLink] = useState({ id: null, legendaLink: "", urlNormal: "" });
  const [habilitaEdicao, setHabilitaEdicao] = useState(false);
  const { dados } = useContext(DadosContext);

  async function criarLink(e) {
    e.preventDefault();
    try {
      validar(novoLink);

      const response = await fetch(`http://localhost:3000/links`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(novoLink),
      });

      if (!response.ok) throw new Error(`Erro ao criar link: ${response.statusText}`);

      const dadosResgatados = await response.json();
      setNovoLink({ urlNormal: "", legendaLink: "" });
      window.location.reload()
    } catch (error) {
      console.error(error);
    }
  }

  async function editarLink(e) {
    e.preventDefault();
    try {
      validar(novoLink);

      const response = await fetch(`http://localhost:3000/links/${novoLink.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(novoLink),
      });

      if (!response.ok) throw new Error(`Erro ao editar link: ${response.statusText}`);

      const dadosResgatados = await response.json();
      setHabilitaEdicao(false);
      setNovoLink({ id: null, urlNormal: "", legendaLink: "" });
      window.location.reload()
    } catch (error) {
      console.error(error);
    }
  }

  async function excluirLink(id) {
    if (!window.confirm("Tem certeza que deseja excluir este link?")) return;

    try {
      const response = await fetch(`http://localhost:3000/links/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error(`Erro ao excluir link: ${response.statusText}`);

      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  }


  return (
    <div className="min-h-screen flex flex-col items-center p-8 bg-red-500">
      <h1 className="text-3xl text-white font-bold mb-2 text-center">🔗 Encurtador de Links</h1>
      <p className="text-white mb-8 text-center">
        Transforme links longos em URLs curtas e fáceis de compartilhar
      </p>

      <form onSubmit={criarLink} className="w-full max-w-1xl bg-white p-6 rounded-2xl shadow">
        <label className="block text-sm font-medium text-gray-700 mb-1">Legenda do link *</label>
        <input
          type="text"
          value={novoLink.legendaLink}
          onChange={(e) => setNovoLink({ ...novoLink, legendaLink: e.target.value })}
          placeholder="Ex: Meu portfólio, Site da empresa..."
          className="w-full border border-gray-300 rounded-lg p-2 mb-4"
        />

        <label className="block text-sm font-medium text-gray-700 mb-1">URL para encurtar *</label>
        <div className="flex">
          <input
            type="url"
            value={novoLink.urlNormal}
            onChange={(e) => setNovoLink({ ...novoLink, urlNormal: e.target.value })}
            placeholder="https://exemplo.com/sua-url..."
            className="flex-1 border border-gray-300 rounded-lg p-2"
          />
          <button type="submit" className="bg-black ml-4 text-white px-7 py-2 rounded-lg hover:bg-gray-800">
            Encurtar
          </button>
        </div>
      </form>

      <div className="w-full max-w-5xl mt-10">
        <h2 className="text-white font-semibold mb-4">Meus Links</h2>
        <div className="bg-white p-4 rounded-2xl shadow flex flex-col gap-4">
          {dados.links?.length ? (
            dados.links.map((link) => (
              <div key={link.id} className="bg-gray-50 p-4 rounded-xl shadow-sm flex flex-col gap-2">
                <a
                  href={link.urlNormal}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 font-medium hover:underline"
                >
                  https://short.ly/{link.codigoGerado}
                </a>
                <p className="text-sm text-gray-600">{link.urlNormal}</p>

                <div className="flex items-center gap-2 mt-2">
                  <button
                    onClick={() => {
                      setNovoLink(link);
                      setHabilitaEdicao(true);
                    }}
                    className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => excluirLink(link.id)}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                  >
                    Excluir
                  </button>
                  <button
                    className="p-2 bg-gray-100 rounded-lg text-sm px-3 hover:bg-gray-200"
                    onClick={() => navigator.clipboard.writeText(link.urlNormal)}
                  >
                    Copiar
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center">Nenhum link criado ainda.</p>
          )}
        </div>
      </div>

      {habilitaEdicao && (
        <div className="fixed inset-0 flex items-center justify-center">
          <form onSubmit={editarLink} className="bg-white rounded-xl shadow-lg p-6 w-96">
            <h2 className="text-lg font-bold mb-4">Editar Link: {novoLink.id}</h2>

            <label className="block text-sm font-medium mb-1">Nova Legenda:</label>
            <input
              type="text"
              value={novoLink.legendaLink}
              onChange={(e) => setNovoLink({ ...novoLink, legendaLink: e.target.value })}
              className="w-full border rounded-lg p-2 mb-3"
            />

            <label className="block text-sm font-medium mb-1">Nova URL:</label>
            <input
              type="text"
              value={novoLink.urlNormal}
              onChange={(e) => setNovoLink({ ...novoLink, urlNormal: e.target.value })}
              className="w-full border rounded-lg p-2 mb-3"
            />

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setHabilitaEdicao(false)}
                className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
              >
                Cancelar
              </button>
              <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Salvar
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}