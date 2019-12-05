import { useReducer, useEffect } from "react";
import axios from "axios"

  const SET_DAY = "SET_DAY";
  const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
  const SET_INTERVIEW = "SET_INTERVIEW";
  const SET_SPOTS = "SET_SPOTS"

  function reducer(state, action) {
    switch (action.type) {
      case SET_DAY:
        return { ...state, day: action.day }
      case SET_APPLICATION_DATA:
        return { ...state, days: action.days, appointments: action.appointments, interviewers: action.interviewers }
      case SET_INTERVIEW:
          const appointment = {
            ...state.appointments[action.id],
            interview: { ...action.interview }
          };
          const appointments = {
            ...state.appointments,
            [action.id]: appointment
          };
          return { ...state, appointments };
        case SET_SPOTS:
            const day = {
              ...state.days[action.id],
              spots: action.spots
            };
            const days = [
              ...state.days,
            ];
            days[action.id] = day;
          return { ...state, days };
        default:
          throw new Error(
            `Tried to reduce with unsupported action type: ${action.type}`
          );
      }
    }

export function useApplicationData() {

  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => dispatch({type: SET_DAY, day});


  useEffect(() => {
    Promise.all([
      Promise.resolve(axios.get("/api/days")),
      Promise.resolve(axios.get("/api/appointments")),
      Promise.resolve(axios.get("/api/interviewers"))
    ]).then((all) => {
      dispatch({ type: SET_APPLICATION_DATA, days: all[0].data, appointments: all[1].data, interviewers: all[2].data })
    });
  }, [])

  const bookInterview = function(id, interview) {
    return axios.put(`/api/appointments/${id}`, { interview })
      .then(() => {
        dispatch({ type: SET_INTERVIEW, id, interview })
        axios.get("/api/days")
          .then((res) => {
            dispatch({ type: SET_SPOTS, id: Math.floor(id / 5), spots: res.data[Math.floor(id / 5)].spots })
          })
      });
    }

  const deleteInterview = function(id) {
    return axios.delete(`/api/appointments/${id}`)
      .then(() => {
        dispatch({ type: SET_INTERVIEW, id, interview: null })
        axios.get('/api/days')
        .then((res) => {
          dispatch({ type: SET_SPOTS, id: Math.floor(id / 5), spots: res.data[Math.floor(id / 5)].spots })
        })
      }
    );
  }
  return { state, setDay, bookInterview, deleteInterview }
};

export default useApplicationData;