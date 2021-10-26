import { useState, useEffect } from 'react';
import api from './services/api';
import './Conteudo.css';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {fas} from '@fortawesome/free-solid-svg-icons';
library.add(fas);


export default function Conteudo(){
    const [cep, setCep] = useState("");
    const [resposta, setResposta] = useState ([]);
    const [btn, setBtn] = useState(true);

    useEffect(()=>{
        api.get(`${cep}/json`)
        .then((resp)=>{setResposta(resp.data)})
        .catch((erro)=>{console.log(erro)})
    },[btn])
    console.log(resposta)
    return (
        <div className="container">
            <h1> 
                <div className="tracinho"></div>
                CONSULTAR <span>CEP</span> 
                <div className="tracinho"></div>
            </h1>

            <div className="conteudo">
                <input type="number" name="cep" onChange={(e)=>setCep(e.target.value)} placeholder="ex: 46400-000" />

                <button onClick={()=> btn ? setBtn(false) : setBtn(true)}><FontAwesomeIcon icon="arrow-right" /></button>
            </div>

            <div className="dados">
                <div className="dadoCep">
                    <h1>CEP: {resposta.cep}</h1>
                    <h4>{resposta.localidade} - {resposta.uf}</h4>
                </div>
                <div name="resultado" className="dadosAll">
                    <div className="left">
                        <p><span> Logradouro: </span>
                        {resposta.logradouro}</p>
                        <p><span> CEP: </span>
                        {resposta.cep}</p>
                        <p><span> Bairro: </span>
                        {resposta.bairro}</p>
                    </div>
                    <div className="right">
                        <p><span> Cidade: </span>
                        {resposta.localidade}</p>
                        <p><span> UF: </span>
                        {resposta.uf}</p>
                        <p><span> Código DDD: </span>
                        {resposta.ddd}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}