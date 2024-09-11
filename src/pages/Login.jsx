import styled from "styled-components"
import trackitlogo from '../assets/trackit.svg'
import axios from 'axios';
import { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom"

import userContext from "../contexts/UserContext";
import tokenContext from "../contexts/TokenContext";

import { ThreeDots } from "react-loader-spinner";

export default function LoginPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate();
    const {usuario, setUsuario} = useContext(userContext)
    const {token, setToken} = useContext(tokenContext)

    const [loading, setLoading] = useState(false)
    const [buttonEntrar, setButtonEntrar] = useState("Entrar")

    function login(event) {
        event.preventDefault();
        setLoading(true)

        const requisicao = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login", {
            
            email, password
        })
        requisicao.then((e) => {
            localStorage.setItem("token",e.data.token),
            setUsuario(e.data),
            setToken(e.data.token),
            setLoading(false),
            navigate("/habitos")})
        requisicao.catch((err) => {
            alert(err.response.data.message)
            setLoading(false)
            })
    }

    useEffect(()=>{

        if(token){
            navigate("/habitos")
        }

    },[])
    

    useEffect(()=>{
        if(!loading){
            setButtonEntrar("Entrar")
        }else{
            setButtonEntrar((<ThreeDots
                visible={true}
                height="13"
                width="51"
                color="#FFFFFF"
                radius="9"
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                wrapperClass=""
                />))
        }
    },[loading])

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
                    disabled={loading}
                    onChange={e => setEmail(e.target.value)} />
                    
                <Enter
                    id="senha"
                    placeholder="  senha"
                    required
                    type="password"
                    value={password}
                    disabled={loading}
                    onChange={e => setPassword(e.target.value)} />

                <button type="submit"> {buttonEntrar}</button>
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

        display: flex;
        justify-content: center;
        align-items: center;
        
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