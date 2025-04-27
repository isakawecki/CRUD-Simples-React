import './App.css';
import React, { useState, useEffect } from 'react';

function App() {
  const [lista, setLista] = useState([]);
  const [nome, setNome] = useState('');
  const [marca, setMarca] = useState('');
  const [etapa, setEtapa] = useState('');
  const [tipoPele, setTipoPele] = useState('');
  const [imagemUrl, setImagemUrl] = useState('');
  const [editando, setEditando] = useState(null);
  const [modalAberto, setModalAberto] = useState(false);

  useEffect(() => {
    const dadosSalvos = localStorage.getItem('listaSkinCare');
    if (dadosSalvos) {
      setLista(JSON.parse(dadosSalvos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('listaSkinCare', JSON.stringify(lista));
  }, [lista]);

  const abrirModal = () => {
    setModalAberto(true);
  };

  const fecharModal = () => {
    setModalAberto(false);
    setNome('');
    setMarca('');
    setEtapa('');
    setTipoPele('');
    setImagemUrl('');
    setEditando(null);
  };

  const adicionarOuAtualizar = () => {
    if (!nome.trim() || !marca.trim() || !etapa.trim() || !tipoPele.trim()) return;

    const novoProduto = { nome, marca, etapa, tipoPele, imagemUrl };

    if (editando !== null) {
      const novaLista = [...lista];
      novaLista[editando] = novoProduto;
      setLista(novaLista);
    } else {
      setLista([...lista, novoProduto]);
    }

    fecharModal();
  };

  const editarItem = (index) => {
    const item = lista[index];
    setNome(item.nome);
    setMarca(item.marca);
    setEtapa(item.etapa);
    setTipoPele(item.tipoPele);
    setImagemUrl(item.imagemUrl);
    setEditando(index);
    setModalAberto(true);
  };

  const excluirItem = (index) => {
    const novaLista = lista.filter((_, i) => i !== index);
    setLista(novaLista);
  };

  return (
    <div className="container">

     

      <h2 className="skincare">SKINCARE</h2>

      <button className="enviarBtn" onClick={abrirModal}>Adicionar Produto</button>

      <ul>
        {lista.map((item, index) => (
          <li key={index}>
            {item.imagemUrl ? (
              <img
                src={item.imagemUrl}
                alt={item.nome}
              />
            ) : (
              <div className="image-placeholder">Sem Imagem</div> 
            )}
            <div className="produtoInfo">
              <strong>{item.nome}</strong> - <span>{item.marca}</span>
              <span>Etapa: {item.etapa}</span>
              <span>Tipo de pele: {item.tipoPele}</span>
            </div>
            <button className="editarBtn" onClick={() => editarItem(index)}>Editar</button>
            <button className="deletarBtn" onClick={() => excluirItem(index)}>Excluir</button>
          </li>
        ))}
      </ul>

      {/* Modal */}
      {modalAberto && (
        <div className="modal">
          <div className="modalConteudo">
            <h3>{editando !== null ? 'Editar Produto' : 'Adicionar Produto'}</h3>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Nome do produto"
            />
            <input
              type="text"
              value={marca}
              onChange={(e) => setMarca(e.target.value)}
              placeholder="Marca"
            />
            <input
              type="text"
              value={etapa}
              onChange={(e) => setEtapa(e.target.value)}
              placeholder="Etapa da rotina"
            />
            <input
              type="text"
              value={tipoPele}
              onChange={(e) => setTipoPele(e.target.value)}
              placeholder="Tipo de pele"
            />
            <input
              type="text"
              value={imagemUrl}
              onChange={(e) => setImagemUrl(e.target.value)}
              placeholder="URL da imagem do produto"
            />
            <div className="modalBtns">
              <button className="enviarBtn" onClick={adicionarOuAtualizar}>
                {editando !== null ? 'Atualizar' : 'Adicionar'}
              </button>
              <button className="cancelarBtn" onClick={fecharModal}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
