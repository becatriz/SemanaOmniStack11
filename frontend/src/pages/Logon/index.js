import React, {useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
import './styles.css';

import heroesImg from '../../assets/heroes.png';
import logoImg from '../../assets/logo.svg';
import { FiLogIn} from 'react-icons/fi';

import api from '../../services/api';



export default function Logon() {
    const [id, setId] = useState('');
    const history = useHistory();

    async function handleLogin(e){
        e.preventDefault();

        try {
            const response = await api.post('sessions', {id});
            localStorage.setItem('ongId', id);
            localStorage.setItem('ongName', response.data.name);
            history.push('/profile');

        } catch (error) {
            alert('Falha no loguin, tente novamente');
        }


    }

    return (
        <div className="logon-container">
            <section className="form">
                <img src={logoImg} alt="Be the hero"></img>
                <form onSubmit={handleLogin}>
                    <h1>Faça seu logon</h1>

                    <input 
                    placeholder="Sua ID"
                    value={id}
                    onChange={e => setId(e.target.value)}/>

                    <button className="button" type="submit">Entrar</button>

                    <Link className="back-link" to="/register">
                        <FiLogIn size={16} color="e02041"/>
                        Não tenho cadastro
                    </Link>
                </form>
            </section>
            <img src={heroesImg} alt="Heroes" />
        </div>
    );

}