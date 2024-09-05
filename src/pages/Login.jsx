import styled from "styled-components"
import trackitlogo from '../assets/trackit.svg'
import axios from 'axios';
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function LoginPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    function login(e) {
        event.preventDefault();
        console.log(email, password)
    }

    return (
        <Back>
            <Forms onSubmit={login}>
                <img src={trackitlogo} alt="TrackIt Logo"></img>
                <Enter
                    id="email"
                    placeholder="  email"
                    required
                    type="text"
                    value={email}
                    onChange={e => setEmail(e.target.value)} />
                    
                <Enter
                    id="senha"
                    placeholder="  senha"
                    required
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)} />

                <button type="submit"> Entrar</button>
                <Register to="/cadastro">Não tem uma conta? Cadastre-se! </Register>
            </Forms>

        </Back>
    )
}
const Back = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: center;

`

const Forms = styled.form`
display: flex;
flex-wrap: wrap;
    align-items: normal;
    justify-content: center;
    img{
        width: 180px;
        padding: 20px;
    }
    button{
        font-family: Lexend Deca;
        font-size: 20.98px;
        font-weight: 400;
        line-height: 26.22px;
        text-align: center;


        width: 75%;
        height: 42px;
        background: #52B6FF;
        color: #FFFFFF;
        border-radius: 8px;
        border: 0;
        
    }
`
const Register = styled(Link)`
    margin: 25px;
    text-decoration: underline;
    color:#52B6FF;

    font-family: Lexend Deca;
    font-size: 13.98px;
    font-weight: 400;
    line-height: 17.47px;
    text-align: center;


`

const Enter = styled.input`

    height: 45px;
    
    width: 75%;
    margin-bottom: 6px;
    height: 40px;
    border: 1px solid #D4D4D4;
    border-radius: 5px;

    font-family: Lexend Deca;
    font-size: 19.98px;
    font-weight: 400;
    line-height: 24.97px;
    text-align: left;
`