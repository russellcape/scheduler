import React from "react";

import "./styles.scss";

import Header from "./Header"
import Show from "./Show"
import Empty from "./Empty"
import Form from "./Form"
import Status from "./Status"

import useVisualMode from "../../hooks/useVisualMode"

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";

export default function Appointment(props) {
  const { interview, time, id, bookInterview, interviewers } = props;
  const { mode, transition, back } = useVisualMode(interview ? SHOW : EMPTY);

  const onAdd = () => { transition(CREATE) };
  
  const onCancel = () => { back() };

  const onSave = function(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);

    bookInterview(id, interview)
    .then(() => transition(SHOW))
  };

  return(
    <article className="appointment">
      <Header time={time}/>
      {mode === EMPTY && (
      <Empty onAdd={onAdd}/>
      )}
      {mode === SHOW && (
        <Show
          student={interview.student}
          interviewer={interview.interviewer}
        />
      )}
      {mode === CREATE && (
      <Form 
        interviewers={interviewers}
        onCancel={onCancel}
        onSave={onSave}
      />
      )}
      {mode === SAVING && (
        <Status message="Saving"/>
      )}
    </article>
  );
};