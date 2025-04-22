import './App.css';
import React, { useState, useEffect } from 'react';

function App() {
  const [lista, setLista] = useState([]);
  const [nome, setNome] = useState('');
  const [marca, setMarca] = useState('');
  const [etapa, setEtapa] = useState('');
  const [tipoPele, setTipoPele] = useState('');
  const [editando, setEditando] = useState(null);

  useEffect(() => {
    const dadosSalvos = localStorage.getItem('listaSkinCare');
    if (dadosSalvos) {
      setLista(JSON.parse(dadosSalvos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('listaSkinCare', JSON.stringify(lista));
  }, [lista]);

  const adicionarOuAtualizar = () => {
    if (nome.trim() === '') return;

    const novoProduto = {
      nome,
      marca,
      etapa,
      tipoPele
    };

    if (editando !== null) {
      const novaLista = [...lista];
      novaLista[editando] = novoProduto;
      setLista(novaLista);
      setEditando(null);
    } else {
      setLista([...lista, novoProduto]);
    }

 
    setNome('');
    setMarca('');
    setEtapa('');
    setTipoPele('');
  };

  const editarItem = (index) => {
    const item = lista[index];
    setNome(item.nome);
    setMarca(item.marca);
    setEtapa(item.etapa);
    setTipoPele(item.tipoPele);
    setEditando(index);
  };

  const excluirItem = (index) => {
    const novaLista = lista.filter((_, i) => i !== index);
    setLista(novaLista);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
      <h2 className='skincare'>SKINCARE</h2>

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
      <button onClick={adicionarOuAtualizar} style={{ marginTop: '10px' }}>
        {editando !== null ? 'Atualizar' : 'Adicionar'}
      </button>

      <ul style={{ marginTop: '20px' }}>
        {lista.map((item, index) => (
          <li key={index} style={{ marginBottom: '15px' }}>
            <strong>{item.nome}</strong> - {item.marca} <br />
            Etapa: {item.etapa} <br />
            Tipo de pele: {item.tipoPele}
            <br />
            <button onClick={() => editarItem(index)} style={{ marginRight: '10px' }}>Editar</button>
            <button onClick={() => excluirItem(index)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
