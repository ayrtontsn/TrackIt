import styled from "styled-components"
import { useEffect, useState } from "react";
import axios from 'axios';
import check from '../assets/check.svg';


export default function listhabitstoday(token) {
    const [habits, setHabits] = useState(null)
    

    useEffect(() => {
        const requisicao = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today", token)
            .then(resposta => { setHabits(resposta.data) })
            .catch(e => console.log(e.response.data.message))
    }, [habits])

    if(!habits){
        return(
            <div>
                Carregando...
            </div>
        )
    }

    function score(done,id){
        if(!done){
            const requisicao = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/check`,"",token)
        }else{
            const requisicao = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/uncheck`,"",token)
        }
    }

    return (
        habits.map(habit => (
                <Habit key={habit.id}>
                    <Info>
                    <h5>{habit.name}</h5>
                    <Sequence>
                        <h4>{`Sequência atual: ${habit.currentSequence}`}</h4>
                        <h4>{`Seu recorde: ${habit.highestSequence}`}</h4>
                    </Sequence>
                    </Info>
                    <Ion $done={habit.done} src={check} onClick={()=>score(habit.done,habit.id)}></Ion>
                </Habit>)
        ))
}

const Habit = styled.div`
    display: flex;
    flex-wrap: wrap;
    padding: 0 14px;
    background-color: #FFFFFF;
    margin: 18px;
    width: calc(100%-36px);
    position: relative;

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
        padding-top: 15px;
    }
`
const Info = styled.div`
    display: block;
`
const Ion = styled.img`
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;

    top: 15px;
    right: 15px;
    width: 35px;
    height: 35px;

    background-color: ${props => (props.$done? "#8FC549": "#EBEBEB")};
    padding: 17px;
    border-radius: 5px;
    
`
const Sequence = styled.div`
    display: block;
    padding: 15px 0;

    h4{
        font-family: Lexend Deca;
        font-size: 12.98px;
        font-weight: 400;
        line-height: 16.22px;
        text-align: left;



        background: #FFFFFF;
        color: #666666;
        margin:0;
    }


`