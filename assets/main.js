document.documentElement.classList.add("js");

const tabGroups = document.querySelectorAll("[data-tabs]");

tabGroups.forEach((group) => {
  const tabs = Array.from(group.querySelectorAll('[role="tab"]'));
  const panels = Array.from(group.querySelectorAll('[role="tabpanel"]'));

  const activateTab = (tab, moveFocus = false) => {
    const target = tab.dataset.tab;

    tabs.forEach((item) => {
      const isActive = item === tab;
      item.classList.toggle("is-active", isActive);
      item.setAttribute("aria-selected", String(isActive));
      item.tabIndex = isActive ? 0 : -1;
    });

    panels.forEach((panel) => {
      const isActive = panel.dataset.panel === target;
      panel.classList.toggle("is-active", isActive);
      panel.hidden = !isActive;
    });

    if (moveFocus) tab.focus();
  };

  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => activateTab(tab));
    tab.addEventListener("keydown", (event) => {
      if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;

      event.preventDefault();
      let nextIndex = index;

      if (event.key === "ArrowLeft") nextIndex = (index - 1 + tabs.length) % tabs.length;
      if (event.key === "ArrowRight") nextIndex = (index + 1) % tabs.length;
      if (event.key === "Home") nextIndex = 0;
      if (event.key === "End") nextIndex = tabs.length - 1;

      activateTab(tabs[nextIndex], true);
    });
  });

  activateTab(tabs.find((tab) => tab.classList.contains("is-active")) ?? tabs[0]);
});

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const chaosToggle = document.querySelector(".chaos-toggle");
const reactiveElements = document.querySelectorAll(".event-card, .day-tab");

chaosToggle?.addEventListener("click", () => {
  const active = document.body.classList.toggle("maximum-chaos");
  chaosToggle.setAttribute("aria-pressed", String(active));
});

if (!reducedMotion) {
  window.addEventListener("pointermove", (event) => {
    document.documentElement.style.setProperty("--pointer-x", `${event.clientX}px`);
    document.documentElement.style.setProperty("--pointer-y", `${event.clientY}px`);
  });

  reactiveElements.forEach((element) => {
    element.addEventListener("pointermove", (event) => {
      const bounds = element.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width - 0.5;
      const y = (event.clientY - bounds.top) / bounds.height - 0.5;
      element.style.setProperty("--rotate-x", `${y * -5}deg`);
      element.style.setProperty("--rotate-y", `${x * 7}deg`);
    });

    element.addEventListener("pointerleave", () => {
      element.style.setProperty("--rotate-x", "0deg");
      element.style.setProperty("--rotate-y", "0deg");
    });
  });
}
