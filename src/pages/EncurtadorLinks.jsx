import { useState } from "react";

function validar(novoLink) {
  if (!novoLink.legendaLink || !novoLink.urlNormal) {
    alert("Preencha todos os campos!")
    return
  }
}

export function EncurtadorLinks() {
  const [novoLink, setNovoLink] = useState({legendaLink: "", urlNormal: ""})

  async function criarLink(e) {
    e.preventDefault();
    try {
      validar(novoLink)

      const response = await fetch(`http://localhost:3000/links`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(novoLink),
      })

      if (!response.ok) {
        throw new Error(`Erro ao criar usuário: ${response.statusText}`)
      }
      const dados = await response.json()
      setNovoLink({ urlNormal: "", legendaLink: "" })
    } catch (error) {
      console.error(error)
    }
  }

  cons
  useEffect(() => {
    const l = dados.link?.find(l => l.codigoGerado === codigoGerado);
    setLink(l);
  }, [dados.link, codigoGerado]);


  return (
    <div className="min-h-screen flex flex-col items-center p-8 bg-red-500">
      <h1 className="text-3xl text-white font-bold mb-2 text-center">
        🔗 Encurtador de Links
      </h1>

      <p className="text-white mb-8 text-center">
        Transforme links longos em URLs curtas e fáceis de compartilhar
      </p>

      <form className="w-full max-w-1xl bg-white p-6 rounded-2xl shadow" onSubmit={criarLink}>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Legenda do link *
        </label>
        <input
          type="text"
          value={novoLink.legendaLink}
          onChange={(e) => setNovoLink({ ...novoLink, legendaLink: e.target.value })}
          placeholder="Ex: Meu portfólio, Site da empresa..."
          className="w-full border border-gray-300 rounded-lg p-2 mb-4"
        />

        <label className="block text-sm font-medium text-gray-700 mb-1">
          URL para encurtar *
        </label>
        <div className="flex ">
          <input
            type="url"
            value={novoLink.urlNormal}
            onChange={(e) => setNovoLink({ ...novoLink, urlNormal: e.target.value })}
            placeholder="https://exemplo.com/sua-url-muito-longa..."
            className="flex-1 border border-gray-300 rounded-lg p-2"
          />
          <button type="submit" className="bg-black ml-10 text-white px-7 py-2 rounded-lg">
            Encurtar
          </button>
        </div>
      </form>

      <div className="w-full max-w-5xl mt-10">
        <h2 className="text-white font-semibold">Meus Links</h2>

        <div className="bg-white p-4 rounded-2xl shadow flex flex-col gap-2">
          <p className="font-medium">Exame Seleção Técnico 2026</p>
          <a
            href={`https://short.ly/${codigoGerado}`}
            target="_blank"
            className="text-blue-600 hover:underline"
          >
            https://short.ly/ersb6d
          </a>
          <p className="text-sm text-gray-500 truncate">
            https://www.utfpr.edu.br/editais/graduacao-e-educacao-profiss...
          </p>

          <div className="flex justify-between items-center mt-2">
            <p className="text-sm text-gray-400">
              Criado em 01/10/2025, 09:06
            </p>
            <div className="flex items-center gap-2">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700" >Salvar</button>
              <button className="bg-gray-600 px-4 py-2 rounded-lg" >Cancelar</button>
              <button>Editar</button>
              <button>Excluir</button>

              <button className="p-2 bg-gray-100 rounded-lg text-sm px-3">
                Copiar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
