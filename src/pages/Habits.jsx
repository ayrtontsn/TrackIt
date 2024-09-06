import styled from "styled-components"
import trackitlogo from '../assets/trackit.svg'
import axios from 'axios';
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom"

import listhabits from "../components/listhabits";
import footer from "../components/footer";

export default function Habits() {
    const location = useLocation();
    const id = location.id
    const image = location.image
    const name = location.name
    const token = {headers:{Authorization: "Bearer "+localStorage.getItem("token")}}
    
    const [newhabit, setNewhabit] = useState(false)
    const [habit, setHabit] = useState("")
    const [habits, setHabits] = useState(null)
    const [daily, setDaily] = useState([])



    function week(){
        const days = ["Dom","Seg","Ter","Qua","Qui","Sex","Sab"]
       return(
            days.map(day => (
                <Day
                key={days.indexOf(day)}
                onClick={() => add(days.indexOf(day))}
                $bg={daily.includes(days.indexOf(day))}
                >{day[0]}</Day>
            ))
        )
    }

    useEffect(() =>{
        const requisicao = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits",token)
        .then(resposta => {setHabits(resposta.data)})
        .catch(e => console.log(e.response.data.message))
    },[])

    function add(num){
        if(daily.includes(num)){          
            setDaily(daily.filter(iten => iten !== num))          
        }else(
            setDaily([...daily,num])
        )
    }

    function save(e){
        e.preventDefault();
    const requisicao = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits",{
        name: habit,
        days: daily
    },token)
    .then((resposta) => {
        setHabit(""),
        setDaily([]),
        setNewhabit(false)
        setHabits([...habits,resposta.data])
    })
    .catch((e) => alert(e.response.data.message))
    }



    if(!habits){
        return(
        <div>
            Carregando...
        </div>
        )
    }

    return (
        <Back>
            <Header>
                <h1>TrackIt</h1>
                <img src={image} alt="user image"></img>
            </Header>
            <Title>
                <h2>Meus habitos</h2>
                <h3 onClick={() => { setNewhabit(true) }}>+</h3>
            </Title>
            <NewHabit $enabled={newhabit} >
                <Enter
                    placeholder="  nome do hábito"
                    required
                    type="text"
                    value={habit}
                    onChange={e => setHabit(e.target.value)}
                    minLength={"5"} />
                {week()}
                <h5 onClick={() => setNewhabit(false)}>Cancelar</h5>
                <button type="submit" onClick={save}> Salvar</button>
            </NewHabit>
            <NoItens $noitens={habits.length}>
                <p>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</p>
            </NoItens>
            {listhabits(habits)}
            {footer()}
        </Back>
    )
}
const Back = styled.div`
    display: block;
    position: fixed;
    background-color: #f2f2f2;
    width: 100vw;
    height:calc(100vh - 80px);
    left: 0;

    overflow-y: scroll;

`
const Header = styled.div`
    display: flex;
    position: fixed;
    left: 0;
    top: 0;
    width:100%;
    height: 70px;
    align-items: center;
    background-color: #126BA5;
    justify-content: space-between;

    h1{
        font-family: Playball;
        font-size: 38.98px;
        font-weight: 400;
        line-height: 48.73px;
        text-align: left;
        margin: 0 20px;

        color: #FFFFFF;
    }
    img{
        width: 50px;
        height:50px;
        border-radius: 50px;
        margin: 0 20px;
        
    }
`

const Title = styled.div`
    display: flex;
    padding-top: 70px;
    width:100%;
    height: 70px;
    align-items: center;
    justify-content: space-between;


    h2{
        font-family: Lexend Deca;
        font-size: 22.98px;
        font-weight: 400;
        line-height: 28.72px;
        text-align: left;

        padding: 0 20px;
        
        color: #126BA5;
    }
    h3{
        font-family: Lexend Deca;
        font-size: 26.98px;
        font-weight: 400;
        line-height: 33.72px;
        text-align: center;

        margin: 0 20px;
        
        background-color: #52B6FF;
        color: #FFFFFF;
        width: 40px;
        height: 35px;
        border-radius: 5px;
    }
`

const NewHabit = styled.form`
    display: ${props => props.$enabled ? "flex" : "none"};
    flex-wrap: wrap;
    justify-content: space-around;
    background-color: #FFFFFF;
    padding: 15px;
    margin: 10px;
    width: 87%;

    border-radius: 5px;

    button{
        font-family: Lexend Deca;
        font-size: 20.98px;
        font-weight: 400;
        line-height: 26.22px;

        width: 25%;
        height: 42px;
        background: #52B6FF;
        color: #FFFFFF;
        border-radius: 8px;
        border: 0;
        
        margin: 15px;
    }
    h5 {
        font-family: Lexend Deca;
        font-size: 20.98px;
        font-weight: 400;
        line-height: 26.22px;

        background: #FFFFFF;
        color: #52B6FF;
        margin:0;
        padding: 22px;
    }
`

const Enter = styled.input`

    height: 45px;
    
    width: 95%;
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
const NoItens = styled.div`
    display: ${props =>(props.$noitens?"none":"flex")};
    font-family: Lexend Deca;
    font-size: 17.98px;
    font-weight: 400;
    line-height: 22.47px;
    text-align: left;
    color: #666666;

    margin: 0 25px;
`
const Day = styled.div`
    border:1px solid #D4D4D4;

    width: 30px;
    height: 30px;
    border-radius: 5px;

    font-family: Lexend Deca;
    font-size: 19.98px;
    font-weight: 400;
    line-height: 24.97px;
    text-align: center;

    color: ${props => (props.$bg? "#FFFFFF": "#DBDBDB")} ;
    background-color: ${props => (props.$bg? "#DBDBDB": "#FFFFFF")};
`