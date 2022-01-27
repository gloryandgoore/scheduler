export function getAppointmentsForDay(state, day) {
  //... returns an array of appointments for that day
  const filter = state.days.filter((d) => d.name === day);

  if (filter.length === 0) {
    return [];
  }
  const appArr = filter[0].appointments;

  const appointments = [];
  for (const data of appArr) {
    if (state.appointments[data]) {
      appointments.push(state.appointments[data]);
    }
  }
  return appointments;
}

export function getInterview(state, interview) {
  if (interview === null) {
    return null;
  }
  const interviewer = state.interviewers[interview.interviewer];
  return {
    student: interview.student,
    interviewer,
  };
}

export function getInterviewersForDay(state, day) {
  const filter = state.days.filter((d) => d.name === day);

  if (filter.length === 0) {
    return [];
  }
  const thisInterview = filter[0].interviewers;

  const interviewers = [];

  for (const id of thisInterview) {
    if (state.interviewers[id]) {
      interviewers.push(state.interviewers[id]);
    }
  }
  return interviewers;
}
