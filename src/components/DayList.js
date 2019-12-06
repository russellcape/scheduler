import React from "react";
import DayListItem from "components/DayListItem";

export default function DayList(props) {
  const { days, day, setDay } = props;

  const listOfDays = days.map(currentDay => {
    return (
      <DayListItem
        key={currentDay.id}
        name={currentDay.name}
        spots={currentDay.spots}
        selected={currentDay.name === day}
        setDay={setDay}
      />
    );
  });
  return <ul>{listOfDays}</ul>;
}
