import styled from "styled-components"
import trackitlogo from '../assets/trackit.svg'
import axios from 'axios';
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom"

export default function Signup(){
    const [loading, setLoading] = useState(false)

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const [image, setImage] = useState("")

    const navigate = useNavigate();

    function login(e) {
        e.preventDefault();

        setLoading(true)
        let photo = ""

        !image? photo = "https://th.bing.com/th/id/OIP.Rqw5f6J3R0bxYCe3HnMflQAAAA?rs=1&pid=ImgDetMain": photo = image;
        
        const requisicao = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up", {
            email, name, image: photo, password
        })
        requisicao.then(() => {
            setLoading(false),
            navigate("/")})
        .catch((err) => {
            alert(err.response.data.message),
            setLoading(false)
            })
        
        setEmail("")
        setImage("")
        setName("")
        setPassword("")
    }

    return (
        <Back>
            <Forms onSubmit={login}>
                <img src={trackitlogo} alt="TrackIt Logo"></img>
                <Enter
                    placeholder="  email"
                    required
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    disabled={loading}
                    
                    />
                <Enter
                    placeholder="  senha"
                    required
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    disabled={loading}
                    minLength={"5"}
                    />
                <Enter
                    placeholder="  nome"
                    required
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    disabled={loading}
                    minLength={"3"}
                     />
                <Enter
                    placeholder="  foto"
                    type="text"
                    value={image}
                    onChange={e => setImage(e.target.value)} 
                    disabled={loading}
                    />

                <button type="submit" disabled={loading}>
                    {!loading?"Cadastrar":"Carregando..."}</button>
                <Login to="/">Já tem uma conta? Faça login! </Login>
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
const Login = styled(Link)`
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