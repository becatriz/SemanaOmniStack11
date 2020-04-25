import React, { useState, useEffect } from 'react';
import logoImg from '../../assets/logo.svg';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2, FiEdit2 } from 'react-icons/fi';
import api from '../../services/api';

import './styles.css';



export default function Profile() {
    const [incidents, setIncidents] = useState([]);
    const [image, setImage] = useState([]);
    const history = useHistory();
    const ongId = localStorage.getItem('ongId');
    const ongName = localStorage.getItem('ongName');

    let id;

   


    useEffect(() => {
        api.get('/profile', {
            headers: {
                Authorization: ongId
            }
        }).then(response => {
            setIncidents(response.data);
        });

        api.get('/posts').then(response => {
           
            setImage(response.data.name);
        })

    }, [ongId]);

    async function handleDeleteIncident(id) {

        try {
            await api.delete(`incidents/${id}`, {
                headers: {
                    Authorization: ongId
                }
            });

            setIncidents(incidents.filter(incidents => incidents.id !== id));
        } catch (error) {
            alert('Erro ao apagar caso, tente novamente');

        }
    }

    async function handleIncident(id) {

        api.get('/incidentsAll').then((request, response) => {
        
        })
    }

    function handleGoPageUpdate(id){
        history.push(`/incidents/update/${id}`);
    }

    function handleLogout() {
        localStorage.clear();
        history.push('/');

    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be the hero"></img>
                <span>Bem vinda, {ongName}</span>
                <Link className="button" onClick={handleIncident}  to="/incidents/new" >Cadastrar novo caso </Link>
                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#E02041"></FiPower>
                </button>
            </header>
            <h1>Casos Cadastrados</h1>
            <ul>
                {incidents.map(incidents => (
                    <li key={incidents.id}>
                        <strong>CASO:</strong>
                        <p>{incidents.title}</p>

                        <strong>IMAGEM</strong>
                        <p>{incidents.image}</p>

                        <strong>DESRIÇÂO</strong>
                        <p>{incidents.description}</p>

                        <strong>VALOR:</strong>
                        <p>{Intl.NumberFormat('pt-BR', {
                            style: 'currency',
                            currency: 'BRL'
                        })
                            .format(incidents.value)}</p>

                        <button type="button" onClick={() => handleDeleteIncident(incidents.id)}>
                            <FiTrash2 size={20} color="#a8a8b3" />
                        </button>
                        <button type="button"  className="button-update" onClick={() => handleGoPageUpdate(incidents.id)}>
                            <FiEdit2 size={20} color="#a8a8b3" />
                        </button>
                    </li>

                ))}
            </ul>
        </div>
    );
}