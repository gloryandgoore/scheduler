import React from "react";
import "components/Appointment/styles.scss";
import Confirm from "./Confirm";
import Empty from "./Empty";
import Form from "./Form";
import Header from "./Header";
import Show from "./Show";
import Status from "./Status";
import Error from "./Error";
import useVisualMode from "hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const CONFIRM = "CONFIRM";
const SAVING = "SAVING";
const DELETING = "DELETING";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

export default function Appointment(props) {
  const { id, time, interview, interviewers, bookInterview, cancelInterview } =
    props;
  const { mode, transition, back } = useVisualMode(interview ? SHOW : EMPTY);

  function save(name, interviewer) {
    if (!name || !interviewer) {
      return console.log("Name and/or interviewer not selected");
    }
    const interview = {
      student: name,
      interviewer,
    };

    transition(SAVING);
    bookInterview(id, interview)
    .then(() => transition(SHOW))
    .catch(error => transition(ERROR_SAVE, true));
  }

  function deleting(name, interviewer) {
    transition(DELETING, true);
      cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch(error => transition(ERROR_DELETE, true));

  }

  return (
    <article className="appointment">
      <Header time={time} />

      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SAVING && <Status message="Saving" />}
      {mode === DELETING && <Status message="Deleting" />}
      {mode === CONFIRM && (
        <Confirm
          message="Are you sure you would like to delete?"
          onConfirm={deleting}
          onCancel={() => back(SHOW)}
        />
      )}
      {mode === SHOW && (
        <Show
          student={interview.student}
          interviewer={interview.interviewer.name}
          onEdit={() => transition(EDIT)}
          onDelete={() => transition(CONFIRM)}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={interviewers}
          onCancel={() => back(EMPTY)}
          onSave={save}
        />
      )}
      {mode === EDIT && (
        <Form
          name={interview.student}
          interviewers={interviewers}
          interviewer={interview.interviewer.id}
          onSave={save}
          onCancel={() => back(SHOW)}
        />
      )}
      {mode === ERROR_SAVE && (
        <Error
          message="Could not save appointment."
          onClose={() => back(SHOW)}
        />)}
      {mode === ERROR_DELETE && (
        <Error
          message="Could not delete appointment."
          onClose={back}
        />)}
    </article>
  );
}
