import styled from "styled-components"

export default function listhabits(habits) {
    const d = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"]
    return (
        habits.map(habit => (
            <Habit key={habit.id}>
                <h5>{habit.name}</h5>
                <Day>{d.map(day => (
                    <ListDays
                        key={habit.id+d.indexOf(day)}
                        $enable={habit.days.includes(d.indexOf(day))}
                    >{day[0]}</ListDays>
                ))}</Day>
            </Habit>
        )))
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

        color: ${props => (props.$enable? "#FFFFFF": "#DBDBDB")} ;
        background-color: ${props => (props.$enable? "#DBDBDB": "#FFFFFF")};
        `


    
//color: ${props => ((props.selected.inclues(props.bg)) ? "#FFFFFF" : "#DBDBDB")} ;
//background-color: ${props => ((props.selected.inclues(props.bg)) ? "#DBDBDB" : "#FFFFFF")};
