import styled from "styled-components"
import { useEffect,useContext } from "react";
import axios from 'axios';

import tokenContext from "../contexts/TokenContext";

export default function listhabits(habits, setHabits) {
    const d = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"]
    const {token, setToken} = useContext(tokenContext)
    
    const auth = {
        headers: {
            Authorization: `Bearer ${token}`}
        }

    useEffect(() => {
        const requisicao = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", auth)
            .then(resposta => { setHabits(resposta.data) })
            .catch(e => console.log(e.response.data.message))
    }, [])

    if (!habits) {
        return (
            <div>
                Carregando...
            </div>
        )
    }



    return (
        <>
            <NoItens $noitens={habits.length}>
                <p>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</p>
            </NoItens>
        {habits.map(habit => (

            <Habit key={habit.id}>
                <h5>{habit.name}</h5>
                <Day>{d.map(day => (
                    <ListDays
                        key={habit.id + d.indexOf(day)}
                        $enable={habit.days.includes(d.indexOf(day))}
                    >{day[0]}</ListDays>
                ))}</Day>
            </Habit>

            ))}
        </>)
}

const Habit = styled.div`
    display: block;
    flex-wrap: wrap;
    padding: 0 14px;
    background-color: #FFFFFF;
    margin: 18px;
    width: calc(100%-36px);

    border-radius: 5px;

    h5 {
        font-family: Lexend Deca;
        font-size: 19.98px;
        font-weight: 400;
        line-height: 24.97px;
        text-align: left;


        background: #FFFFFF;
        color: #666666;
        margin:0;
        padding: 15px 0;
    }
`
const Day = styled.div`
    display: flex;
`
const ListDays = styled.h6`
    margin: 0 4px; 
    margin-bottom: 15px;

    border:1px solid #D4D4D4;
    width: 30px;
    height: 30px;
    border-radius: 5px;

    font-family: Lexend Deca;
    font-size: 19.98px;
    font-weight: 400;
    text-align: center;

    color: ${props => (props.$enable ? "#FFFFFF" : "#DBDBDB")} ;
    background-color: ${props => (props.$enable ? "#DBDBDB" : "#FFFFFF")};
    `
const NoItens = styled.div`
    display: ${props => (props.$noitens ? "none" : "flex")};
    font-family: Lexend Deca;
    font-size: 17.98px;
    font-weight: 400;
    line-height: 22.47px;
    text-align: left;
    color: #666666;

    margin: 0 25px;
`