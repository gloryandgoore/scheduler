import React, { Fragment } from 'react';
import "./styles.scss";

import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";

export default function Appointment(props) {
  return (
    <article className="appointment">
      {props.time && <Fragment>Appointment at {props.time}</Fragment>}
      {!props.time && <Fragment>No Appointments</Fragment>}
      {props.interview ?
        <Show student={props.interview.student}
              interviewer={props.interview.interviewer} /> :
              <Empty />}
    </article>
  );
}
