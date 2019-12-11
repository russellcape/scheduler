import React, { useState } from "react";
import InterviewerList from "../InterviewerList";
import Button from "../Button";

export default function Form(props) {
  const { name, interviewers, interviewer, onSave, onCancel } = props;

  const [stateName, setStateName] = useState(name || "");
  const [stateInterviewer, setStateInterviewer] = useState(interviewer || null);
  const [error, setError] = useState("");

  const reset = function() {
    setStateName("");
    setStateInterviewer(null);
  };

  const cancel = function() {
    reset();
    onCancel();
  };

  const validate = function(name, interviewer) {
    if (name === "" && interviewer === null) {
      return setError("Please enter name and select an interviewer.")
    }
    if (name === "") {
      return setError("Student name cannot be blank");
    }
    if (interviewer === null) {
      return setError("An interviewer must be selected")
    }
    setError("");
    onSave(stateName, stateInterviewer);
  };

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name={stateName}
            type="text"
            placeholder="Enter Student Name"
            value={stateName}
            onChange={event => setStateName(event.target.value)}
            data-testid="student-name-input"
          />
          <section className="appointment__validation">{error}</section>
        </form>
        <InterviewerList
          interviewers={interviewers}
          value={stateInterviewer}
          onChange={setStateInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>
            Cancel
          </Button>
          <Button confirm onClick={() => validate(stateName, stateInterviewer)}>
            Save
          </Button>
        </section>
      </section>
    </main>
  );
}