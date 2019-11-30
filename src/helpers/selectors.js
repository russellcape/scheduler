export function getAppointmentsForDay(state, day) {
  const filteredAppointments = [];
  const selectedDay = state.days.filter(dayObj => dayObj.name === day);

  if (!selectedDay[0]) {
    return [];
  }
  selectedDay[0].appointments.forEach(appointmentId => {
    if (String(appointmentId) in state.appointments) {
      filteredAppointments.push(state.appointments[appointmentId])
    }
  });
  // console.log(filteredAppointments)
  return filteredAppointments;
};


export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }
  const interviewer = state.interviewers[interview.interviewer];
  const studentName = interview.student

  // console.log(state)
  // console.log(interview.student)
  // console.log(interviewer)

  return({
    student: studentName,
    interviewer: interviewer
  });
};

export function getInterviewersForDay(state, day) {
  const filteredDays = state.days.filter(dayObj => dayObj.name === day);

  if (filteredDays.length === 0) {
    return [];
  }
  const interviewersArr = filteredDays[0].interviewers
  const interviewersForDay = [];
  for (const interviewer of interviewersArr) {
    // console.log(interviewer)
    if (interviewer in state.interviewers) {
      interviewersForDay.push(state.interviewers[interviewer])
    }
  }
  return interviewersForDay;
}