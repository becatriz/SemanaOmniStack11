import React from 'react';
import { Container, FileInfo, Preview } from './styles';



const FileList = ({files}) => (
    <Container>
       {files.map(uploadedFile => (
            <li key={uploadedFile.id}>
            <FileInfo>
                <Preview src={uploadedFile.preview}/>
                <div>
                    <strong>{uploadedFile.name}</strong>
                    <span>
                         <button onClick={() => {
                          
                          }}>Excluir</button> 
                        </span>

                 
                </div>
            </FileInfo>

            <div>
                {uploadedFile.uploaded && alert("Tudo certo")}
                {uploadedFile.error && alert("Falha no upload da imagem")}
  
            </div>
        </li>
       ))}
    </Container>
);


export default FileList;
