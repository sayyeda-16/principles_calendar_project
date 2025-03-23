# Project Calendar Website

This project is a dynamic and interactive calendar web application designed to help users manage their events effectively. It provides a user-friendly interface to view, navigate, and book events with ease.

## Features

* **Calendar Display:**
    * Displays the current month with the current date highlighted by default.
    * Allows users to navigate through previous and next months using intuitive arrow controls.
* **Date Navigation:**
    * "Today's Date" button: Quickly returns to the current date's calendar view.
    * "Go to Date" input: Enables users to jump to a specific date by entering it in `dd/mm/yyyy` format.
* **Event Booking:**
    * Users can book events on specific dates by providing:
        * Event Name
        * Event Time (from and to in 24 hour format)
        * Booking Reason or Description (optional)
    * Time Conflict Detection: The system prevents overlapping events by identifying and alerting users of time conflicts.
    * Quick event creation: Allows the user to create an event with only a name and time.
* **Event Visualization:**
    * Booked dates are visually distinguished on the calendar, making them easy to identify.
    * Displays booked events for selected day on the right side of the screen.
* **Persistent Storage:**
    * Event data is stored persistently using local storage, ensuring that events are preserved even after the browser is closed and reopened.
* **Responsive Design:**
    * The calendar and event display are designed to be user friendly.
* **Event Deletion:**
    * Events can be deleted by clicking on them in the events section, and confirming the deletion.

## Technologies Used

* **HTML:** For structuring the web page.
* **CSS:** For styling the calendar and its components.
* **JavaScript:** For implementing the calendar's functionality and event handling.
* **Local Storage:** For persistent data storage.
* **Font Awesome:** For icons.
* **Google Fonts:** For custom font styles.

## File Structure

* `index.html`: The main HTML file for the calendar application.
* `styles.css`: The CSS file containing the styles for the calendar.
* `script.js`: The JavaScript file containing the calendar's functionality.

## Usage

1.  Open `index.html` in a web browser.
2.  Use the navigation arrows to browse through months.
3.  Click on a date to view or add events.
4.  Use the "Today's Date" button to return to the current date.
5.  Use the input field and the "Go" button to jump to a specific date.
6.  Click the "Book an Event" button to add events.
7.  Fill in the event details and submit.
8.  View booked events on the right-hand side of the screen.
9.  Click on an event in the event list to delete it.

## JavaScript Functionality Overview

* **DOM Element Selection:** Selects all necessary DOM elements for interaction.
* **Calendar Initialization:** Generates the calendar display based on the current or selected month and year.
* **Month Navigation:** Functions to move to the previous and next months.
* **Date Selection:** Handles user clicks on calendar days, updates the displayed events, and highlights the selected day.
* **Date Input and Navigation:** Allows users to input and navigate to specific dates.
* **Event Management:** Functions to add, display, and delete events.
* **Local Storage Interaction:** Functions to save and retrieve event data from local storage.
* **Time Conflict Detection:** Checks for overlapping event times before adding new events.
* **Time Conversion:** Converts time formats for easier time conflict detection.

## CSS Styling Overview

* **Layout and Structure:** Styles the calendar container, month navigation, weekdays, and days.
* **Event Display:** Styles the event list and individual event items.
* **Add Event Form:** Styles the event addition form and its input fields.
* **Visual Enhancements:** Uses gradients, color variables, and hover effects to improve the user interface.

## Credits

* Icons from [Font Awesome](https://fontawesome.com/).
* Fonts from [Google Fonts](https://fonts.google.com/).
