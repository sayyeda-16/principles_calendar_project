// DOM Element Selectors
  const calendar = document.querySelector(".calendar"),
  date = document.querySelector(".date"),
  daysContainer = document.querySelector(".days"),
  prev = document.querySelector(".prev"),
  next = document.querySelector(".next"),
  todayBtn = document.querySelector(".today-btn"),
  gotoBtn = document.querySelector(".goto-btn"),
  dateInput = document.querySelector(".date-input"),
  eventDay = document.querySelector(".event-day"),
  eventDate = document.querySelector(".event-date"),
  eventsContainer = document.querySelector(".events"),
  addEventBtn = document.querySelector(".add-event"),
  addEventWrapper = document.querySelector(".add-event-wrapper "),
  addEventCloseBtn = document.querySelector(".close "),
  addEventTitle = document.querySelector(".event-name "),
  addEventFrom = document.querySelector(".event-time-from "),
  addEventTo = document.querySelector(".event-time-to "),
  addEventSubmit = document.querySelector(".add-event-btn ");
  addEventDescription = document.querySelector(".event-description ");

// Current Date and Calendar State
let today = new Date();
let activeDay;
let month = today.getMonth();
let year = today.getFullYear();

// Month Names Array
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// Events Array (retrieved from local storage)
const eventsArr = [];
getEvents();
console.log(eventsArr);

// Initializes the calendar display for the current month and year.
function initCalendar() {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const prevLastDay = new Date(year, month, 0);
  const prevDays = prevLastDay.getDate();
  const lastDate = lastDay.getDate();
  const day = firstDay.getDay();
  const nextDays = 7 - lastDay.getDay() - 1;

  date.innerHTML = months[month] + " " + year;

  let days = "";

  // Add days from the previous month
  for (let x = day; x > 0; x--) {
    days += `<div class="day prev-date">${prevDays - x + 1}</div>`;
  }
  // Add days from the current month
  for (let i = 1; i <= lastDate; i++) {
    // Check if event is present on that day
    let event = false;
    eventsArr.forEach((eventObj) => {
      if (
        eventObj.day === i &&
        eventObj.month === month + 1 &&
        eventObj.year === year
      ) {
        event = true;
      }
    });
    // Highlight today's date and set activeDay
    if (
      i === new Date().getDate() &&
      year === new Date().getFullYear() &&
      month === new Date().getMonth()
    ) {
      activeDay = i;
      getActiveDay(i);
      updateEvents(i);
      if (event) {
        days += `<div class="day today active event">${i}</div>`;
      } else {
        days += `<div class="day today active">${i}</div>`;
      }
    } else {
      if (event) {
        days += `<div class="day event">${i}</div>`;
      } else {
        days += `<div class="day ">${i}</div>`;
      }
    }
  }

  for (let j = 1; j <= nextDays; j++) {
    days += `<div class="day next-date">${j}</div>`;
  }
  daysContainer.innerHTML = days;
  addListener();
}

// Displays the previous month and re-initializes the calendar.
function prevMonth() {
  month--;
  if (month < 0) {
    month = 11;
    year--;
  }
  initCalendar();
}

// Displays the next month and re-initializes the calendar.
function nextMonth() {
  month++;
  if (month > 11) {
    month = 0;
    year++;
  }
  initCalendar();
}

prev.addEventListener("click", prevMonth);
next.addEventListener("click", nextMonth);
initCalendar();

// Function to add active on day
function addListener() {
  const days = document.querySelectorAll(".day");
  days.forEach((day) => {
    day.addEventListener("click", (e) => {
      getActiveDay(e.target.innerHTML);
      updateEvents(Number(e.target.innerHTML));
      activeDay = Number(e.target.innerHTML);
      // Remove active
      days.forEach((day) => {
        day.classList.remove("active");
      });
      // If clicked prev-date or next-date switch to that month
      if (e.target.classList.contains("prev-date")) {
        prevMonth();
        // Add active to clicked day afte month is change
        setTimeout(() => {
          // Add active where no prev-date or next-date
          const days = document.querySelectorAll(".day");
          days.forEach((day) => {
            if (
              !day.classList.contains("prev-date") &&
              day.innerHTML === e.target.innerHTML
            ) {
              day.classList.add("active");
            }
          });
        }, 100);
      } else if (e.target.classList.contains("next-date")) {
        nextMonth();
        setTimeout(() => {
          const days = document.querySelectorAll(".day");
          days.forEach((day) => {
            if (
              !day.classList.contains("next-date") &&
              day.innerHTML === e.target.innerHTML
            ) {
              day.classList.add("active");
            }
          });
        }, 100);
      } else {
        e.target.classList.add("active");
      }
    });
  });
}

// Event listener for the "Today's Date" button
todayBtn.addEventListener("click", () => {
  today = new Date();
  month = today.getMonth();
  year = today.getFullYear();
  initCalendar();
});

// Input validation for date input
dateInput.addEventListener("input", (e) => {
  dateInput.value = dateInput.value.replace(/[^0-9/]/g, "");
  if (dateInput.value.length === 2 || dateInput.value.length === 5) {
    dateInput.value += "/";
  }
  if (dateInput.value.length > 10) {
    // Corrected length to 10 for dd/mm/yyyy
    dateInput.value = dateInput.value.slice(0, 10);
  }
  if (e.inputType === "deleteContentBackward") {
    if (dateInput.value.length === 3 || dateInput.value.length === 6) {
      dateInput.value = dateInput.value.slice(0, dateInput.value.length - 1);
    }
  }
});

// Event listener for the "Go" button to navigate to a specific date
gotoBtn.addEventListener("click", gotoDate);

// Navigates to the date entered in the date input field.
function gotoDate() {
  const dateArr = dateInput.value.split("/");
  if (dateArr.length === 3) {
    const day = parseInt(dateArr[0]);
    const monthInput = parseInt(dateArr[1]);
    const yearInput = parseInt(dateArr[2]);

    if (
      day > 0 &&
      day <= 31 &&
      monthInput > 0 &&
      monthInput <= 12 &&
      yearInput.toString().length === 4
    ) {
      const targetDate = new Date(yearInput, monthInput - 1, day);
      if (
        targetDate.getDate() === day &&
        targetDate.getMonth() === monthInput - 1 &&
        targetDate.getFullYear() === yearInput
      ) {
        month = monthInput - 1;
        year = yearInput;
        activeDay = day;
        initCalendar();
        getActiveDay(day);
        updateEvents(day);
        const days = document.querySelectorAll(".day");
        days.forEach((d) => {
          if (
            parseInt(d.innerHTML) === day &&
            !d.classList.contains("prev-date") &&
            !d.classList.contains("next-date")
          ) {
            document.querySelectorAll(".day").forEach(dayElement => dayElement.classList.remove('active'));
            d.classList.add("active");
          }
        });
        return;
      }
    }
  }
  alert("Invalid Date");
}

function getActiveDay(date) {
  const day = new Date(year, month, date);
  const dayName = day.toString().split(" ")[0];
  eventDay.innerHTML = dayName;
  eventDate.innerHTML = date + " " + months[month] + " " + year;
}

function updateEvents(date) {
    let events = "";
    eventsArr.forEach((event) => {
        if (
            date === event.day &&
            month + 1 === event.month &&
            year === event.year
        ) {
            event.events.forEach((event) => {
                events += `<div class="event">
                    <div class="title">
                        <i class="fas fa-circle"></i>
                        <h3 class="event-title">${event.title}</h3>
                    </div>
                    <div class="event-time">
                        <span class="event-time">${event.time}</span>
                    </div>
                    <div class="event-description">
                        <span class="event-description">${event.description}</span>
                    </div>
                </div>`;
            });
        }
    });
    if (events === "") {
        events = `<div class="no-event">
            <h3>No Events</h3>
        </div>`;
    }
    eventsContainer.innerHTML = events;
    saveEvents();
}

// Function to add event
addEventBtn.addEventListener("click", () => {
  addEventWrapper.classList.toggle("active");
});

addEventCloseBtn.addEventListener("click", () => {
  addEventWrapper.classList.remove("active");
});

document.addEventListener("click", (e) => {
  if (e.target !== addEventBtn && !addEventWrapper.contains(e.target)) {
    addEventWrapper.classList.remove("active");
  }
});

// Allow 50 chars in eventtitle
addEventTitle.addEventListener("input", (e) => {
  addEventTitle.value = addEventTitle.value.slice(0, 60);
});

// Allow only time in eventtime from and to
addEventFrom.addEventListener("input", (e) => {
  addEventFrom.value = addEventFrom.value.replace(/[^0-9:]/g, "");
  if (addEventFrom.value.length === 2) {
    addEventFrom.value += ":";
  }
  if (addEventFrom.value.length > 5) {
    addEventFrom.value = addEventFrom.value.slice(0, 5);
  }
});

addEventTo.addEventListener("input", (e) => {
  addEventTo.value = addEventTo.value.replace(/[^0-9:]/g, "");
  if (addEventTo.value.length === 2) {
    addEventTo.value += ":";
  }
  if (addEventTo.value.length > 5) {
    addEventTo.value = addEventTo.value.slice(0, 5);
  }
});


function convertTimeToMinutes(time) {
    let hours, minutes, period;

    // Check if the time includes AM/PM
    if (time.includes("AM") || time.includes("PM")) {
        const timeArr = time.split(/[:\s]+/); // Split by colon and spaces
        hours = parseInt(timeArr[0]);
        minutes = parseInt(timeArr[1]);
        period = timeArr[2].toUpperCase(); // Get AM/PM and convert to uppercase

        if (period === "PM" && hours !== 12) {
            hours += 12; // Convert PM to 24-hour format
        } else if (period === "AM" && hours === 12) {
            hours = 0; // Convert 12 AM to 0
        }
    } else {
        // Handle 24-hour format (if you still need it)
        const timeArr = time.split(":");
        hours = parseInt(timeArr[0]);
        minutes = parseInt(timeArr[1]);
    }

    return hours * 60 + minutes;
}

function checkTimeConflict(day, month, year, timeFrom, timeTo) {
    console.log("Checking time conflict for:", day, month, year, timeFrom, timeTo);

    const newStartTime = convertTimeToMinutes(timeFrom);
    const newEndTime = convertTimeToMinutes(timeTo);

    console.log("New event times (minutes):", newStartTime, newEndTime);

    for (const event of eventsArr) {
        if (event.day === day && event.month === month && event.year === year) {
            console.log("Checking events for the same date:", event);

            for (const existingEvent of event.events) {
                const existingTime = existingEvent.time.split(" - ");
                const existingStartTime = convertTimeToMinutes(existingTime[0]);
                const existingEndTime = convertTimeToMinutes(existingTime[1]);

                console.log("Existing event times (minutes):", existingStartTime, existingEndTime);

                // Check for overlap (including exact same times)
                if (newStartTime < existingEndTime && newEndTime > existingStartTime) {
                    console.log("Time conflict found!");
                    return true; // Conflict found
                }
            }
        }
    }
    console.log("No time conflict found.");
    return false; // No conflict
}

addEventSubmit.addEventListener("click", () => {
    const eventTitleValue = addEventTitle.value;
    const eventTimeFromValue = addEventFrom.value;
    const eventTimeToValue = addEventTo.value;
    const eventDescriptionValue = addEventDescription.value;

    if (eventTitleValue === "" || eventTimeFromValue === "" || eventTimeToValue === "") {
        alert("Please fill all the fields");
        return;
    }

    // Check correct time format 24 hour
    const timeFromArr = eventTimeFromValue.split(":");
    const timeToArr = eventTimeToValue.split(":");

    if (
        timeFromArr.length !== 2 ||
        timeToArr.length !== 2 ||
        timeFromArr[0] > 23 ||
        timeFromArr[1] > 59 ||
        timeToArr[0] > 23 ||
        timeToArr[1] > 59
    ) {
        alert("Invalid Time Format");
        return;
    }

    const timeFrom = convertTime(eventTimeFromValue);
    const timeTo = convertTime(eventTimeToValue);

    // Check if event exists
    let eventExist = false;
    eventsArr.forEach((event) => {
        if (event.day === activeDay && event.month === month + 1 && event.year === year) {
            event.events.forEach((item) => {
                if (item.title === eventTitleValue) {
                    eventExist = true;
                    alert("Event already exists");
                    return;
                }
            });
        }
    });
    if (eventExist) {
        return;
    }

    if (checkTimeConflict(activeDay, month + 1, year, eventTimeFromValue, eventTimeToValue)) {
        alert("Time conflict: This time slot is already booked.");
        return;
    }

    const newEvent = {
        title: eventTitleValue,
        time: timeFrom + " - " + timeTo,
        description: eventDescriptionValue,
    };

    let eventAdded = false;
    if (eventsArr.length > 0) {
        eventsArr.forEach((item) => {
            if (item.day === activeDay && item.month === month + 1 && item.year === year) {
                item.events.push(newEvent);
                eventAdded = true;
            }
        });
    }

    if (!eventAdded) {
        eventsArr.push({
            day: activeDay,
            month: month + 1,
            year: year,
            events: [newEvent],
        });
    }

    addEventWrapper.classList.remove("active");
    addEventTitle.value = "";
    addEventFrom.value = "";
    addEventTo.value = "";
    addEventDescription.value = "";
    updateEvents(activeDay);
});

// Function to delete event when clicked on event
eventsContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("event")) {
    if (confirm("Are you sure you want to delete this event?")) {
      const eventTitle = e.target.children[0].children[1].innerHTML;
      eventsArr.forEach((event) => {
        if (
          event.day === activeDay &&
          event.month === month + 1 &&
          event.year === year
        ) {
          event.events.forEach((item, index) => {
            if (item.title === eventTitle) {
              event.events.splice(index, 1);
            }
          });
          if (event.events.length === 0) {
            eventsArr.splice(eventsArr.indexOf(event), 1);
            const activeDayEl = document.querySelector(".day.active");
            if (activeDayEl.classList.contains("event")) {
              activeDayEl.classList.remove("event");
            }
          }
        }
      });
      updateEvents(activeDay);
    }
  }
});

// Function to save events in local storage
function saveEvents() {
  localStorage.setItem("events", JSON.stringify(eventsArr));
}

// Function to get events from local storage
function getEvents() {
  // Check if events are already saved in local storage then return event else nothing
  if (localStorage.getItem("events") === null) {
    return;
  }
  eventsArr.push(...JSON.parse(localStorage.getItem("events")));
}

function convertTime(time) {
  // Convert time to 24 hour format
  let timeArr = time.split(":");
  let timeHour = timeArr[0];
  let timeMin = timeArr[1];
  let timeFormat = timeHour >= 12 ? "PM" : "AM";
  timeHour = timeHour % 12 || 12;
  time = timeHour + ":" + timeMin + " " + timeFormat;
  return time;
}