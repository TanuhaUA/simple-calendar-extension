const weekStartSelect = document.getElementById("weekStart");
const themeSelect = document.getElementById("theme");
const status = document.getElementById("status");

chrome.storage.sync.get(["weekStart", "theme"], (data) => {
  if (data.weekStart) weekStartSelect.value = data.weekStart;
  if (data.theme) themeSelect.value = data.theme;
});

function saveOptions() {
  const weekStart = weekStartSelect.value;
  const theme = themeSelect.value;
  chrome.storage.sync.set({ weekStart, theme }, () => {
    status.textContent = "Saved!";
    setTimeout(() => (status.textContent = ""), 1200);
  });
}

weekStartSelect.addEventListener("change", saveOptions);
themeSelect.addEventListener("change", saveOptions);
