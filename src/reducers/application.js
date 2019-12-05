export const SET_DAY = "SET_DAY";
export const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
export const SET_INTERVIEW = "SET_INTERVIEW";


function reducer(state, action) {
  switch (action.type) {
    case SET_DAY:
      return { ...state, day: action.day };
    case SET_APPLICATION_DATA:
      return {
        ...state,
        days: action.days,
        appointments: action.appointments,
        interviewers: action.interviewers
      };

    case SET_INTERVIEW:

      const mapDays = state.days.map(day => {
        if (!day.appointments.includes(action.id)) {
          return day;
        } else {
          if (action.operation === 'delete') {
            return {
              ...day,
              spots: day.spots + 1,
            };
          } else if (action.operation === 'update' && state.appointments[action.id].interview === null) {
            return {
              ...day,
              spots: day.spots - 1,
            }
          } else {
            return {
              ...day
            }
          }
        }
      })

      const appointment = {
        ...state.appointments[action.id],
        interview: { ...action.interview }
      };
      const appointments = {
        ...state.appointments,
        [action.id]: appointment
      };
      return { ...state, appointments, days: mapDays };

    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
};

export default reducer;