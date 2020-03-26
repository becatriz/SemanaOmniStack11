import React, { useState, useEffect } from 'react';
import logoImg from '../../assets/logo.svg';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import api from '../../services/api';

import './styles.css';

export default function UpdateIncident({ match }) {
    const [incidents, setIncidents] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');


    const history = useHistory();
    const ongId = localStorage.getItem('ongId');
    const paramId = match.params.id;



    useEffect(() => {
        async function loadIncidentsForUpdates() {


            try {

                const response = await api.get(`/incidents/${paramId}`);
                setTitle(response.data.title);
                setDescription(response.data.description);
                setValue(response.data.value);
                

            } catch (error) {
                alert('Erro ao carregar informações. Favor tente mais tarde');
            }
        }
        loadIncidentsForUpdates();
    }, []);

    async function handleUpdateIncidents(e) {
        e.preventDefault();

    
        try {
            await api.put(`incidents/${paramId}`, {  
                title,
                description,
                value,
                ongId
            });

            setIncidents(incidents.filter(incidents => incidents.id !== paramId));
            history.push('/profile')
        } catch (error) {
            alert('Erro ao editar registro, tente novamente');
        }


    }

    return (
        <div className="update-incident-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be the hero" />

                    <h1>Atualizar caso</h1>
                    <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>

                    <Link className="back-link" to="/profile">
                        <FiArrowLeft size={16} color="e02041" />
                        Votar para home
                    </Link>
                </section>
                <form onSubmit={handleUpdateIncidents} >
                    <input
                        placeholder="Título do caso"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                    <textarea
                        placeholder="Descrição"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                    <input
                        placeholder="Valor em reais"
                        value={value}
                        onChange={e => setValue(e.target.value)}
                    />

                    <button className="button" type="submit">Editar</button>
                </form>
            </div>
        </div>
    );
}