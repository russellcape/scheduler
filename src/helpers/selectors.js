export function getAppointmentsForDay(state, day) {

  const filteredAppointments = [];

  const selectedDay = state.days.filter(d => d.name === day);

  // console.log("=========================================");
  // console.log("state is : ", selectedDay[0]);
  // console.log("=========================================");
  
  if (!selectedDay[0]) {
    return [];
  }
  selectedDay[0].appointments.forEach(appointmentId => {
    if (String(appointmentId) in state.appointments) {
      filteredAppointments.push(state.appointments[appointmentId])
    }
  });
  return filteredAppointments;
};


export function getInterview(state, interview) {

  // console.log("=========================================");
  // console.log("state is : ", getInterview[0]);
  // console.log("=========================================");

  if (!interview) {
    return null;
  }
  const interviewer = state.interviewers[interview.interviewer];

  return({  
    student: interview.student,
    interviewer: interviewer
  });
};