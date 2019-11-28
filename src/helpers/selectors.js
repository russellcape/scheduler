export function getAppointmenrsForDay(state, day) {

  const filteredAppointments = [];

  const selectDay = state.days.filter(d => d.name === day)

  console.log("=========================================");
  console.log("state is : ", selectedDay[0]);
  console.log("=========================================");
  
  if (selectedDay[0] === undefined)
    return [];
  
  selectedDay[0].appointments.forEach(appointmentId => {
    if (String(appointmentId) in state.appointments) {
      filteredAppointments.push(state.appointments[appointmentId])
    }
  })
  return filteredAppointments;

}