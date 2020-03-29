import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';
import './styles.css';

import logoImg from '../../assets/logo.svg';

export default function Register() {
  const [form, setForm] = useState({});
  const [data, setData] = useState({});

  const history = useHistory();

  const handleRegister = async event => {
    event.preventDefault();

    const { name, email, whatsapp, city, uf } = form;

    setData({
      name,
      email,
      whatsapp,
      city,
      uf
    });
    
    try {
      const response = await api.post('ongs', data);
      alert(`Seu ID de acesso: ${response.data.id}`);

      // if success
      history.push('/');

    } catch (error) {
      alert('Erro no cadastro. Tente novamente.');
    }
  }

  const onChange = field => event => {
    setForm({
      ...form,
      [field]: event.target.value
    });
  }

  return (
    <div className="register-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be The Hero" />

          <h1>Cadastro</h1>
          <p>
            Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem
            os casos da sua ONG.
          </p>

          <Link className="back-link" to="/">
            <FiArrowLeft size={16} color="#e02041" />
            Voltar para o logon
          </Link>
        </section>

        <form onSubmit={handleRegister}>
          <input 
            placeholder="Nome da ONG" 
            value={form.name || ""} 
            onChange={onChange('name')} 
          />

          <input 
            type="email" 
            placeholder="E-mail" 
            value={form.email || ""} 
            onChange={onChange('email')} 
          />
          
          <input 
            placeholder="WhatsApp" 
            value={form.whatsapp || ""} 
            onChange={onChange('whatsapp')} 
          />
          
          <div className="input-group">
            <input 
              placeholder="Cidade" 
              value={form.city || ""} 
              onChange={onChange('city')}
            />

            <input 
              placeholder="UF" 
              style={{ width: 80 }} 
              value={form.uf || ""} 
              onChange={onChange('uf')} 
            />
          </div>

          <button className="button" type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
  );
}