import { useState, useContext } from "react";
import { DadosContext } from "../Context/DadosContext";
import { Calendar, Copy, PencilIcon, Trash2, Link2 } from "lucide-react";
import { Pagina } from "../components/Pagina.jsx";

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

      const response = await fetch(`https://projetoencurtadordeurlbackend.onrender.com/links`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(novoLink),
      });

      if (!response.ok) throw new Error(`Erro ao criar link: ${response.statusText}`);

      await response.json();
      setNovoLink({ urlNormal: "", legendaLink: "" });
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  }

  async function editarLink(e) {
    e.preventDefault();
    try {
      validar(novoLink);

      const response = await fetch(`https://projetoencurtadordeurlbackend.onrender.com/links/${novoLink.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(novoLink),
      });

      if (!response.ok) throw new Error(`Erro ao editar link: ${response.statusText}`);

      await response.json();
      setHabilitaEdicao(false);
      setNovoLink({ id: null, urlNormal: "", legendaLink: "" });
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  }

  async function excluirLink(id) {
    if (!window.confirm("Tem certeza que deseja excluir este link?")) return;

    try {
      const response = await fetch(`https://projetoencurtadordeurlbackend.onrender.com/links/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error(`Erro ao excluir link: ${response.statusText}`);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  }

  async function incrementarLink(e, link) {
    e.preventDefault();
    try {
      const response = await fetch(`https://projetoencurtadordeurlbackend.onrender.com/incrementa/${link.codigoGerado}`, {
        method: "GET",
      });

      if (!response.ok) throw new Error(`Erro ao editar link: ${response.statusText}`);
      window.open(link.urlNormal, "_blank");

      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Pagina>
      <div className="min-h-screen flex flex-col items-center p-8 bg-gradient-to-br from-red-500 to-red-700">
        <h1 className="text-4xl text-white font-extrabold mb-2 text-center">🔗 Encurtador de Links</h1>
        <p className="text-white mb-10 text-center text-lg opacity-90">
          Transforme links longos em URLs curtas e compartilhe com estilo!
        </p>

        <form
          onSubmit={criarLink}
          className="w-full max-w-2xl bg-white p-8 rounded-2xl shadow-2xl border border-gray-100"
        >
          <label className="block text-sm font-medium text-gray-700 mb-2">Legenda do link *</label>
          <input
            type="text"
            value={novoLink.legendaLink}
            onChange={(e) => setNovoLink({ ...novoLink, legendaLink: e.target.value })}
            placeholder="Ex: Portfólio, Site da empresa..."
            className="w-full border border-gray-300 rounded-lg p-3 mb-5 focus:ring-2 focus:ring-red-400 focus:outline-none"
          />

          <label className="block text-sm font-medium text-gray-700 mb-2">URL para encurtar *</label>
          <div className="flex gap-3">
            <input
              type="url"
              value={novoLink.urlNormal}
              onChange={(e) => setNovoLink({ ...novoLink, urlNormal: e.target.value })}
              placeholder="https://exemplo.com/sua-url..."
              className="flex-1 border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-red-400 focus:outline-none"
            />
            <button
              type="submit"
              className="bg-red-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-red-700 transition-all"
            >
              Encurtar
            </button>
          </div>
        </form>

        <div className="w-full max-w-5xl mt-12">
          <h2 className="text-white font-semibold text-xl mb-5">📋 Meus Links</h2>
          <div className="bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-xl flex flex-col gap-4">
            {dados.links?.length ? (
              dados.links.map((link) => (
                <div
                  key={link.id}
                  className="bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 p-5 rounded-xl shadow-md hover:shadow-xl transition-all"
                >
                  <div className="flex justify-between items-center mb-3">
                    <button
                      onClick={(e) => incrementarLink(e, link)}
                      className="text-red-600 font-semibold hover:underline text-lg flex items-center gap-1"
                    >
                      <Link2 size={18} /> short.ly/{link.codigoGerado}
                    </button>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setNovoLink(link);
                          setHabilitaEdicao(true);
                        }}
                        className="bg-yellow-400 text-white p-2 rounded-lg hover:bg-yellow-500 transition-all"
                      >
                        <PencilIcon size={18} />
                      </button>
                      <button
                        onClick={() => excluirLink(link.id)}
                        className="bg-red-600 text-white p-2 rounded-lg hover:bg-red-700 transition-all"
                      >
                        <Trash2 size={18} />
                      </button>
                      <button
                        className="bg-gray-200 text-gray-700 p-2 rounded-lg hover:bg-gray-300 transition-all"
                        onClick={() => navigator.clipboard.writeText(link.urlNormal)}
                      >
                        <Copy size={18} />
                      </button>
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 truncate">{link.urlNormal}</p>

                  <div className="flex justify-between items-center mt-3 text-gray-700 text-sm">
                    <div className="flex items-center gap-1">
                      <Calendar size={16} /> Criado em <b>{link.dataCriacao}</b>
                    </div>
                    <div>
                      Cliques 🖱️:{" "}
                      <span className="font-semibold text-gray-800">{link.clicks}</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center italic py-6">Nenhum link criado ainda 😕</p>
            )}
          </div>
        </div>

        {habilitaEdicao && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
            <form
              onSubmit={editarLink}
              className="bg-white rounded-2xl shadow-2xl p-8 w-96 border border-gray-200"
            >
              <h2 className="text-lg font-bold mb-5 text-gray-800">
                ✏️ Editar Link #{novoLink.id}
              </h2>

              <label className="block text-sm font-medium mb-1 text-gray-700">Nova Legenda:</label>
              <input
                type="text"
                value={novoLink.legendaLink}
                onChange={(e) => setNovoLink({ ...novoLink, legendaLink: e.target.value })}
                className="w-full border rounded-lg p-2 mb-4 focus:ring-2 focus:ring-red-400 focus:outline-none"
              />

              <label className="block text-sm font-medium mb-1 text-gray-700">Nova URL:</label>
              <input
                type="text"
                value={novoLink.urlNormal}
                onChange={(e) => setNovoLink({ ...novoLink, urlNormal: e.target.value })}
                className="w-full border rounded-lg p-2 mb-4 focus:ring-2 focus:ring-red-400 focus:outline-none"
              />

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setHabilitaEdicao(false)}
                  className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition-all"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all"
                >
                  Salvar
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </Pagina>
  );
}
