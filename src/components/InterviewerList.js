import React from "react";
import InterviewerListItem from "./InterviewerListItem";
import "./InterviewerList.scss";
import PropTypes from "prop-types";

export default function InterviewerList(props) {
  const { interviewers, value, onChange } = props;

  InterviewerList.propTypes = {
    value: PropTypes.number,
    onChange: PropTypes.func.isRequired
  };

  const listOfInterviewers = interviewers.map(interviewer => {
    return (
      <InterviewerListItem
        key={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
        selected={interviewer.id === value}
        setInterviewer={() => onChange(interviewer.id)}
      />
    );
  });
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer:</h4>
      <ul className="interviewers__list">{listOfInterviewers}</ul>
    </section>
  );
}
