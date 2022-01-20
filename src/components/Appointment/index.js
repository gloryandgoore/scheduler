import React from "react";
import "./styles.scss"

export default function Appointment(props) {

  return( 
    <article className="appointment">
         {
        props.time &&
        <fragment>
          Appointment at {props.time}
        </fragment>
      }
      {
        !props.time &&
        <fragment>
          No Appointments
        </fragment>
      }
    </article>
  );
};