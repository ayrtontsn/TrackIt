import styled from "styled-components"
import { useState, useContext, useEffect} from "react";
import axios from 'axios';

import { ThreeDots } from "react-loader-spinner";
import tokenContext from "../contexts/TokenContext";

export default function newHabit(inputNewHabit,setInputNewHabit,habits, setHabits) {
    const [habit, setHabit] = useState("")
    const [daily, setDaily] = useState([])

    const [loading, setLoading] = useState(false)
    const [buttonEntrar, setButtonEntrar] = useState("Salvar")

    const {token, setToken} = useContext(tokenContext)
    const auth = {
        headers: {
            Authorization: `Bearer ${token}`}
        }

    useEffect(()=>{
        if(!loading){
            setButtonEntrar("Salvar")
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

    function save(e) {
        e.preventDefault();
        setLoading(true)

        const requisicao = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", {
            name: habit,
            days: daily
        }, auth)
            .then((resposta) => {
                setHabit(""),
                    setDaily([]),
                    setInputNewHabit(false),
                    setLoading(false),
                setHabits([...habits, resposta.data])
            })
            .catch((e) => {
                alert(e.response.data.message),
                setLoading(false)
            })
    }

    function week() {
        const days = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"]
        return (
            days.map(day => (
                <Day
                    key={days.indexOf(day)}
                    onClick={() => !loading && add(days.indexOf(day))}
                    $bg={daily.includes(days.indexOf(day))}
                >{day[0]}</Day>
            ))
        )
    }

    function add(num) {
        if (daily.includes(num)) {
            setDaily(daily.filter(iten => iten !== num))
        } else (
            setDaily([...daily, num])
        )
    }

    return (
        <NewHabit $enabled={inputNewHabit} >
            <Enter
                placeholder="  nome do hábito"
                required
                type="text"
                value={habit}
                onChange={e => setHabit(e.target.value)}
                disabled={loading}
                minLength={"5"} />
            <Week>
            {week()}
            </Week>
            <Button>
                <h5 onClick={() => setInputNewHabit(false)}>Cancelar</h5>
                <button type="submit" onClick={save}> {buttonEntrar}</button>
            </Button>
        </NewHabit>)
}

const NewHabit = styled.form`
    display: ${props => props.$enabled ? "flex" : "none"};
    flex-wrap: wrap;
    justify-content: space-around;
    padding: 14px;
    background-color: #FFFFFF;
    margin: 18px;
    width: calc(100%-36px);

    border-radius: 5px;

    button{
        font-family: Lexend Deca;
        font-size: 20.98px;
        font-weight: 400;
        line-height: 26.22px;

        height: 42px;
        background: #52B6FF;
        color: #FFFFFF;
        border-radius: 8px;
        border: 0;
        padding: 0 20px;
        
        margin: 15px 0;
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

const Day = styled.div`
    border:1px solid #D4D4D4;

    width: 30px;
    height: 30px;
    border-radius: 5px;
    margin: 4px;

    font-family: Lexend Deca;
    font-size: 19.98px;
    font-weight: 400;
    line-height: 24.97px;
    text-align: center;

    color: ${props => (props.$bg ? "#FFFFFF" : "#DBDBDB")} ;
    background-color: ${props => (props.$bg ? "#DBDBDB" : "#FFFFFF")};
`

const Week = styled.div`
    display: flex;
    width: 97%;
`
const Button = styled.div`
    display: flex;
    width: 97%;
    justify-content: end;
`