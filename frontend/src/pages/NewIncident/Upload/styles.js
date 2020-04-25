
import styled, {css} from 'styled-components';

import 'react-circular-progressbar/dist/styles.css'

export const Container = styled.div`
   heigth: 100%;
   display: flex;
   justify-content: center;
   align-items: center;
   
   
`;

export const Content = styled.div`
    width: 100%;
   
    font-size: 13px;
    background: #FFF;
    border: 1px solid #dcdce6;
    border-radius: 8px;
    padding:  15px;
    margin-top: 10px;
    color: #737380;
    

`;

const dragActive = css`
    border-color: #78e5d5;
   
`;

const dragReject = css`
    border-color: #e57878;
   
`;

export const DropContainer = styled.div.attrs({
    className: "dropzone"
})`
    border: 1px dashed #ddd;
    border-radiu: 4px;
    cursor: pointer;

    transition: heigth 0.2s ease;

    ${props => props.isDragActive && dragActive};
    ${props => props.isDragReject && dragReject};

`;

const messageColor = {
    default: '#999',
    error: '#e57878',
    sucess: '#78e5d5'
};

export const UploadMessage = styled.p`
    display: flex;
    color: ${props => messageColor[props.type || 'default']};
    justify-content: center;
    align-itens: center;
    padding: 5px 0

`;


