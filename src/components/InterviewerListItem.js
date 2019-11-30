import React from "react";
import "components/InterviewerListItem.scss"
import classNames from 'classnames'

export default function InterviewerListItem(props) {
  const { id, name, avatar, selected, setInterviewer } = props;

  const interviewerClass = classNames("interviewer-list__item", {
    "interviewer-list__item--selected": selected
  });

  return (
    <li className={interviewerClass} onClick={setInterviewer}>
    <img
      className="interviewers__item-image"
      src={avatar}
      alt={name}
    />
    {selected && name}
  </li>
  );
}
