import React from "react";
import DayListItem from "components/DayListItem.js"

export default function DayList(props) {
const {days, setDay} = props


  const listOfDays = days.map(day => {
  return (
      <DayListItem 
        name={day.name} 
        spots={day.spots} 
        selected={day.name === props.day}
        setDay={setDay}  
        />
  )
  }
)
return(
  <ul>
    {listOfDays}
  </ul>
)




};

