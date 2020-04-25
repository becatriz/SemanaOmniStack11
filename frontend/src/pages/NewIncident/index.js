import React, { useState } from 'react';
import logoImg from '../../assets/logo.svg';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import api from '../../services/api';
import Upload from './Upload';
import FileList from './Upload/FileList';
import { uniqueId } from 'lodash';
import filesize from 'filesize';


import './styles.css';
import { Container, Content } from './Upload/styles'

export default function NewIncident() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');
    const [state, setState] = useState({ uploadedFiles: [] });



    const history = useHistory();
    const ongId = localStorage.getItem('ongId');

    const { uploadedFiles } = state;

    function handleUpload(files) {
        const uploadedFiles = files.map(file => ({
            file,
            id: uniqueId(),
            name: file.name,
            readableSize: filesize(file.size),
            preview: URL.createObjectURL(file),
            progress: 0,
            upload: false,
            erro: false,
            url: null,

        }))

        setState({
            uploadedFiles: state.uploadedFiles.concat(uploadedFiles)
        });

       
    }

    function updateFile(id, data) {
        setState({
            uploadedFiles: state.uploadedFiles.map(uploadedFile => {
                return id === uploadedFile.id ? { ...uploadedFile, ...data } : uploadedFile;
            })
        })
    }


    function processUpload(uploadedFile) {
        const data = new FormData();

        data.append('file', uploadedFile.file, uploadedFile.name);

        api.post('/posts', data, {
            onUploadProgress: e => {
                const progress = parseInt(Math.round((e.loaded * 100) / e.total));

                updateFile(uploadedFile.id, {
                    progress,
                })
            }
        })
    };



    async function handleNewIncidents(e) {
        e.preventDefault();

        const data = {
            title,
            description,
            value
        };

        try {
            await api.post('incidents', data, {
                headers: {
                    Authorization: ongId
                }
            })
            uploadedFiles.forEach(processUpload);
            history.push('/profile');
        } catch (error) {
            alert('Erro ao cadastrar caso, preencha novamente.');
        }

    }



    return (
        <div className="new-incident-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be the hero" />

                    <h1>Cadastrar novo caso</h1>
                    <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>

                    <Link className="back-link" to="/profile">
                        <FiArrowLeft size={16} color="e02041" />
                        Votar para home
                    </Link>
                </section>
                <form onSubmit={handleNewIncidents}>
                    <input
                        placeholder="Título do caso"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                    <Container>
                        <Content>
                            <Upload onUpload={handleUpload} />
                            {!!uploadedFiles.length && (
                                <FileList files={uploadedFiles} />
                            )}
                        </Content>
                    </Container>
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

                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}