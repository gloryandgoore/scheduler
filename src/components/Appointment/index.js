import React from "react";
import 'components/Appointment/styles.scss';
import Confirm from "./Confirm";
import Empty from "./Empty";
import Error from "./Error";
import Form from "./Form";
import Header from "./Header";
import Show from "./Show";
import Status from "./Status";
import useVisualMode from "hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const CONIFIRM = "CONFIRM";
const SAVING = "SAVING";
const DELETING = "DELETING";

export default function Appointment(props) {
  const { id, time, interview, interviewers, bookInterview, cancelInterview } = props;
  const { mode, transition, back } = useVisualMode(
    interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    if (!name || !interviewer) {
      return console.log("Name and/or interviewer not selected");
    }
    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING);
    bookInterview(id, interview)
    .then(() => {
      transition(SHOW);
    });
  }

  function deleting(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(DELETING);
    cancelInterview(id, interview)
    .then(() => {
      transition(EMPTY);
    });
  }

  return (
    <article className="appointment">
      <Header time={time} />

      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SAVING && <Status message = "Saving"/>}
      {mode === DELETING && <Status message = "Deleting"/>}
      {mode === CONIFIRM && (
        <Confirm
          message={props.message}
          onConfirm={deleting}
          onCancel={() => transition(CONIFIRM)}
        />
      )}
      {mode === SHOW && (
        <Show
          student={interview.student}
          interviewer={interview.interviewer.name}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={interviewers}
          onCancel = {back}
          onSave = {save}
        />)}
       

     
    </article>
  );
}