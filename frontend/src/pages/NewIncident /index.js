import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import './styles.css';

import logoImg from '../../assets/logo.svg';
import api from '../../services/api';

export default function NewIncident() {
  const [form, setForm] = useState({});
  const [data, setData] = useState({});

  const ongId = localStorage.getItem('ongId');
  const history = useHistory();

  const handleNewIncident = async event => {
    event.preventDefault();

    const { title, description, value } = form;

    setData({
      title,
      description,
      value
    });

    try {
      await api.post('incidents', data, {
        headers: {
          Authorization: ongId
        }
      });

      alert('Caso criado com sucesso');
      // if success
      history.push('/profile');

    } catch(error) {
      alert('Erro ao cadastrar caso. Tente novamente.');
    }

  }

  const onChange = field => event => {
    setForm({
      ...form,
      [field]: event.target.value
    });
  }

  return (
    <div className="new-incident-container">
      <div className="content">
        <section>
        <img src={logoImg} alt="Be The Hero" />

        <h1>Cadastrar novo caso</h1>
        <p>
          Descreva o caso detalhadamente para encontrar um herói para resolver
          isso.
        </p>

        <Link className="back-link" to="/profile">
          <FiArrowLeft size={16} color="#e02041"/>
          Voltar para a home
        </Link>
        </section>

        <form onSubmit={handleNewIncident}>
          <input 
            placeholder="Titulo do caso"
            value={form.title || ""}
            onChange={onChange('title')}
          />

          <textarea 
            placeholder="Descrição"
            value={form.description || ""}
            onChange={onChange('description')}
          ></textarea>

          <input 
            placeholder="Valor em reais"
            value={form.value || ""}
            onChange={onChange('value')}
          />

          {/* <button type="button">Cancelar</button> */}
          <button className="button" type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
  );
}