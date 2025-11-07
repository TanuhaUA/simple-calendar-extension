const calendarContainer = document.getElementById("calendar");

const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

let currentDate = new Date();

function renderCalendar(date) {
  calendarContainer.innerHTML = "";

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
    renderCalendar(currentDate);
  };

  const nextBtn = document.createElement("button");
  nextBtn.textContent = "→";
  nextBtn.className = "nav-btn";
  nextBtn.onclick = () => {
    currentDate = new Date(year, month + 1, 1);
    renderCalendar(currentDate);
  };

  const title = document.createElement("div");
  title.textContent = `${monthName} ${year}`;
  title.className = "calendar-title";

  header.appendChild(prevBtn);
  header.appendChild(title);
  header.appendChild(nextBtn);

  calendarContainer.appendChild(header);

  // Days of week row
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

  // Compute starting offset (Monday-based)
  const firstDayIndex = (firstDayOfMonth.getDay() + 6) % 7; // 0 = Monday
  const daysInMonth = lastDayOfMonth.getDate();

  // Fill empty cells before the first day
  for (let i = 0; i < firstDayIndex; i++) {
    const empty = document.createElement("div");
    empty.className = "empty";
    grid.appendChild(empty);
  }

  // Fill actual days
  for (let day = 1; day <= daysInMonth; day++) {
    const cell = document.createElement("div");
    cell.textContent = day;
    cell.className = "day-cell";

    // Get weekday index (0 = Monday, 6 = Sunday)
    const weekday = (new Date(year, month, day).getDay() + 6) % 7;

    // Highlight weekends
    if (weekday === 5 || weekday === 6) {
      cell.classList.add("weekend");
    }

    // Highlight today
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

renderCalendar(currentDate);
