import React from "react";
import axios from "axios"

import {
  render,
  cleanup,
  waitForElement,
  fireEvent,
  prettyDOM,
  getByText,
  getAllByTestId,
  getByAltText,
  getByPlaceholderText,
  queryByText,
  getByTestId
} from "@testing-library/react";

import Application from "components/Application";
import { _ } from "core-js";

afterEach(cleanup);

describe("Application", () => {

  it("defaults to Monday and changes the schedule when a new day is selected", () => {
    const { getByText } = render(<Application />);

    return waitForElement(() => getByText("Monday"));
  });

  it("changes the schedule when a new day is selected", async () => {
    const { getByText } = render(<Application />);

    await waitForElement(() => getByText("Monday"));

    fireEvent.click(getByText("Tuesday"));

    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });

  it("loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {

    const { container } = render(<Application />);
    
    await waitForElement(() => getByText(container, "Archie Cohen"))
    
    // console.log(prettyDOM(container));
    
    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];

    // console.log(prettyDOM(appointments))

    fireEvent.click(getByAltText(appointment, "Add"));

    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });

    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    fireEvent.click(getByText(appointment, /save/i));

    expect(getByText(appointment, "SAVING")).toBeInTheDocument();

    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));

    const day = getAllByTestId(container, "day").find(day => 
      queryByText(day, "Monday")
    );

    expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
    
    // console.log(prettyDOM(day));
  });

  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {

    const { container, debug } = render(<Application />);
    debug(container)

    await waitForElement(() => getByText(container, "Archie Cohen"))
        
    const appointment = getAllByTestId(container, "appointment").find( appointment => queryByText(appointment, "Archie Cohen"));
      
    fireEvent.click(getByAltText(appointment, "Delete"));

    expect(
      queryByText(appointment, "Are you sure you would like to delete?")
    ).toBeInTheDocument();

    fireEvent.click(getByText(appointment, "Confirm"));

    expect(
      getByText(appointment, "DELETING")
      ).toBeInTheDocument();

    await waitForElement(() => getByAltText(appointment, "Add"));

    const day = getAllByTestId(container, "day").find(day => 
      queryByText(day, "Monday")
    );

    expect(getByText(day, "2 spots remaining")).toBeInTheDocument();
  });

  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
    const { container } = render(<Application/>)

    await waitForElement(() => getByText(container, "Archie Cohen"))

    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    )

    fireEvent.click(getByAltText(appointment, "Edit"))

    const input = getByTestId(appointment, "student-name-input")
    expect(input).toHaveValue("Archie Cohen")

    fireEvent.change(input, { target: { value: "Lydia Miller-Jones" } })
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"))

    fireEvent.click(getByText(appointment, "Save"))
    expect(getByText(appointment, "SAVING")).toBeInTheDocument()

    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"))

    const day = getAllByTestId(container, "day").find(
      day => queryByText(day, "Monday")
    )

    expect(getByText(day, "1 spot remaining")).toBeInTheDocument()
  });

  it("shows the save error when failing to save an appointment", () => {
    axios.put.mockRejectedValueOnce();
  });

  it("shows the delete error when failing to delete an existing appointment", () => {
    axios.put.mockRejectedValueOnce();
  });

});