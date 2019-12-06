import React from "react";

import "./styles.scss";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";

import useVisualMode from "../../hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETE = "DELETE";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

export default function Appointment(props) {
  const {
    interview,
    time,
    id,
    bookInterview,
    interviewers,
    deleteInterview
  } = props;

  const { mode, transition, back } = useVisualMode(interview ? SHOW : EMPTY);

  const save = (name, interviewer) => {
    if (interviewer === null) transition(ERROR_SAVE, true);
    const interview = {
      student: name,
      interviewer: interviewer || null
    };
    transition(SAVING);
    bookInterview(id, interview)
      .then(() => {
        transition(SHOW);
      })
      .catch(() => {
        transition(ERROR_SAVE, true);
      });
  };

  const destroy = function() {
    transition(CONFIRM);
  };

  return (
    <article className="appointment" data-testid="appointment">
      <Header time={time} />
      {mode === EMPTY && (
        <Empty
          onAdd={() => {
            transition(CREATE);
          }}
        />
      )}
      {mode === SHOW && (
        <Show
          student={interview.student}
          interviewer={interview.interviewer}
          onDelete={destroy}
          onEdit={() => {
            transition(EDIT);
          }}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={interviewers}
          onCancel={() => {
            back();
          }}
          onSave={save}
        />
      )}
      {mode === EDIT && (
        <Form
          interviewer={interview.interviewer.id}
          interviewers={interviewers}
          onSave={save}
          onCancel={() => transition(SHOW)}
          name={interview.student}
        />
      )}
      {mode === SAVING && <Status message="SAVING" />}
      {mode === DELETE && <Status message="DELETING" />}
      {mode === CONFIRM && (
        <Confirm
          message="Are you sure you would like to delete?"
          onConfirm={() => {
            transition(DELETE, true);
            deleteInterview(id)
              .then(() => {
                transition(EMPTY);
              })
              .catch(() => transition(ERROR_DELETE, true));
          }}
          onCancel={() => transition(SHOW)}
        />
      )}
      {mode === ERROR_SAVE && (
        <Error
          message="Appointment could not be saved."
          onClose={() => {
            back();
          }}
        />
      )}
      {mode === ERROR_DELETE && (
        <Error
          message="Appointment could not be deleted."
          onClose={() => {
            back();
          }}
        />
      )}
    </article>
  );
}
