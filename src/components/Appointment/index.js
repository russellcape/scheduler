import React from "react";

import "./styles.scss";

import Header from "./Header"
import Show from "./Show"
import Empty from "./Empty"
import Form from "./Form"
import Status from "./Status"
import Confirm from "./Confirm"

import useVisualMode from "../../hooks/useVisualMode"

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETE = "DELETE";
const CONFIRM = "CONFIRM"
const EDIT = "EDIT";

export default function Appointment(props) {
  const { interview, time, id, bookInterview, interviewers, deleteInterview } = props;
  const { mode, transition, back } = useVisualMode(interview ? SHOW : EMPTY);

  const onAdd = () => { transition(CREATE) };

  const onCancel = () => { back() };

  const onSave = (name, interviewer) => {
    transition(SAVING);
    const interview = {
      student: name,
      interviewer
    };
    bookInterview(id, interview)
    .then(() => transition(SHOW))
  }

  const onDelete = () => {
    transition(CONFIRM)
  }

  const onConfirm = () => {
    transition(DELETE, true);
    deleteInterview(id)
      .then(() => transition(EMPTY))
  }

  const onEdit = () => {
    transition(EDIT)
  }

  return(
    <article className="appointment">
      <Header time={time}/>
        {mode === EMPTY && (
        <Empty
          onAdd={onAdd}
        />
      )}
      {mode === SHOW && interview && (
        <Show
          student={interview.student}
          interviewer={interview.interviewer}
          onDelete={onDelete}
          onEdit={onEdit}
          id={id}
        />
      )}
      {mode === CREATE && (
      <Form 
        interviewers={interviewers}
        onCancel={onCancel}
        onSave={onSave}
      />
      )}
      {mode === EDIT && 
        <Form
          interviewers={interviewers}
          onSave={onSave}
          onCancel={onCancel}
          name={interview.student}
          interviewer={interview.interviewer.id}
          />
      }
      {mode === SAVING && 
        <Status
          message="Saving"
        />
      }
      {mode === DELETE && 
        <Status
        message="Deleting"
        />
      }
      {mode === CONFIRM && 
        <Confirm
          message="Are you sure you wouldlike to delete?"
          onConfirm={onConfirm}
          onCancel={onCancel}
          >
          </Confirm>
      }
    </article>
  );
};
