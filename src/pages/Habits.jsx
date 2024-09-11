import styled from "styled-components"
import { useState, useContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom"
import Icon from '@mui/material/Icon';

import userContext from "../contexts/UserContext";

import listhabits from "../components/listhabits";
import newHabit from "../components/newhabit";
import tokenContext from "../contexts/TokenContext";

export default function Habits() {
    const navigate = useNavigate();
    const {token,setToken} = useContext(tokenContext)    

    useEffect(() => {
        if(!token){
            navigate("/")
        }
    },[])

    const {usuario, setUsuario} = useContext(userContext)
    const [inputNewHabit, setInputNewHabit] = useState(false)
    const [habits, setHabits] = useState(null)



    function deslogar(){
        localStorage.removeItem("token")
        navigate("/")
    }

    return (

            <Back>
                <Header>
                    <h1>TrackIt</h1>
                    <img src={usuario.image} alt="user image" onClick={deslogar}></img>
                </Header>
                <Title>
                    <h2>Meus habitos</h2>
                    <h3 onClick={() => { setInputNewHabit(true) }}>+</h3>
                </Title>
                {newHabit(inputNewHabit, setInputNewHabit, habits, setHabits)}
                {listhabits(habits, setHabits)}
                <Footer>
                    <Habit><Icon>calendar_month</Icon>
                        Hábitos
                    </Habit>
                    <Today onClick={() => navigate('/hoje')}><Icon>event_available</Icon>
                        Hoje
                    </Today>
                </Footer>
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

const Footer = styled.div`
    position: fixed;
    bottom:0;
    left:0;
    width: 100%;
    height: 70px;
    background-color: #FFFFFF;

    display: flex;
    align-items: center;
    h2{

        width:50%;
        font-family: Lexend Deca;
        font-size: 17.98px;
        font-weight: 400;
        line-height: 22.47px;
        display: flex;
        justify-content: center;
    }
`

const Habit = styled.h2`
    background-color: #52B6FF;
    color: #FFFFFF;
    align-items: center;

    width: 50%;
    height:70px;
`
const Today = styled.h2`
    background-color: #FFFFFF;
    color: #D4D4D4;
    align-items: center;

    width: 50%;
    height:70px;
`