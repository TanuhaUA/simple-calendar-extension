const calendarContainer = document.getElementById("calendar");

const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const today = new Date();
let currentDate = new Date(today);

function renderCalendar(date, settings) {
  calendarContainer.innerHTML = "";

  const startMonday = settings.weekStart === "monday";
  const theme = settings.theme || "light";

  document.body.className = theme;

  const daysOfWeek = startMonday
    ? ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    : ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const year = date.getFullYear();
  const month = date.getMonth();

  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);

  const monthName = date.toLocaleString("en-US", { month: "long" });

  // Header
  const header = document.createElement("div");
  header.className = "calendar-header";

  const prevBtn = document.createElement("button");
  prevBtn.textContent = "←";
  prevBtn.className = "nav-btn";
  prevBtn.onclick = () => {
    currentDate = new Date(year, month - 1, 1);
    renderCalendar(currentDate, settings);
  };

  const nextBtn = document.createElement("button");
  nextBtn.textContent = "→";
  nextBtn.className = "nav-btn";
  nextBtn.onclick = () => {
    currentDate = new Date(year, month + 1, 1);
    renderCalendar(currentDate, settings);
  };

  const goToday = document.createElement("button");
  goToday.textContent = "Today";
  goToday.className = "go-today";
  goToday.onclick = () => {
    currentDate = new Date(today);
    renderCalendar(currentDate);
  };

  const title = document.createElement("div");
  title.textContent = `${monthName} ${year}`;
  title.className = "calendar-title";

  header.appendChild(title);
  header.appendChild(prevBtn);
  header.appendChild(goToday);
  header.appendChild(nextBtn);

  calendarContainer.appendChild(header);

  // Days of week
  const daysRow = document.createElement("div");
  daysRow.className = "days-row";
  daysOfWeek.forEach((d) => {
    const el = document.createElement("div");
    el.textContent = d;
    el.className = "day-name";
    daysRow.appendChild(el);
  });
  calendarContainer.appendChild(daysRow);

  // Dates grid
  const grid = document.createElement("div");
  grid.className = "calendar-grid";

  // Compute offset
  const firstDayIndex = startMonday
    ? (firstDayOfMonth.getDay() + 6) % 7
    : firstDayOfMonth.getDay();

  const daysInMonth = lastDayOfMonth.getDate();

  // Empty slots
  for (let i = 0; i < firstDayIndex; i++) {
    const empty = document.createElement("div");
    empty.className = "empty";
    grid.appendChild(empty);
  }

  // Days
  for (let day = 1; day <= daysInMonth; day++) {
    const cell = document.createElement("div");
    cell.textContent = day;
    cell.className = "day-cell";

    const dayOfWeek = new Date(year, month, day).getDay();
    const isWeekend = startMonday
      ? dayOfWeek === 0 || dayOfWeek === 6
      : dayOfWeek === 0 || dayOfWeek === 6;

    if (isWeekend) cell.classList.add("weekend");

    const today = new Date();
    if (
      day === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear()
    ) {
      cell.classList.add("today");
    }

    grid.appendChild(cell);
  }

  calendarContainer.appendChild(grid);
}

chrome.storage.sync.get(["weekStart", "theme"], (settings) => {
  renderCalendar(currentDate, settings);
});
