export function getAppointmentsForDay(state, day) {

    if (state.days.length === 0) {
      return [];
    }
    let appointments = [];
    let appointmentsArray = [];
    for (const i of state.days) {
      if (i.name === day) {
        appointmentsArray = i.appointments;
      }
    }
    console.log("Appointment array", appointmentsArray);
    for (const i of appointmentsArray) {
      if (state.appointments[i]) {
        appointments.push(state.appointments[i])
      }
    }
    console.log("Appointments", appointments);
    return appointments;
  }

  export function getInterview(state, interview) {
    if (!interview) {
      return null;
    }
    const interviewer = state.interviewers[interview.interviewer];
    return { ...interview, interviewer };
  }