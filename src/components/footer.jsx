import styled from "styled-components";

export default function footer(){
    return(
    <Footer>
        <h2>Hábitos</h2>
        <h2>hoje</h2>
    </Footer>)
}

const Footer = styled.div`
    position: fixed;
    bottom:0;
    left:0;
    width: 100%;
    height: 70px;
    background-color: #FFFFFF;

    display: flex;
    justify-content: space-around;
`