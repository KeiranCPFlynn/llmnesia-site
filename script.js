(function () {
  var doc = document.documentElement;
  var navToggle = document.getElementById("nav-toggle");
  var nav = document.getElementById("primary-nav");
  var themeToggle = document.getElementById("theme-toggle");
  var yearNode = document.getElementById("year");
  var THEME_KEY = "llmnesia-theme";

  function setTheme(theme) {
    var isLight = theme === "light";
    doc.classList.toggle("theme-light", isLight);
    if (themeToggle) {
      themeToggle.setAttribute("aria-pressed", String(isLight));
      themeToggle.textContent = isLight ? "Dark mode" : "Light mode";
    }
  }

  try {
    var savedTheme = localStorage.getItem(THEME_KEY);
    if (savedTheme === "light") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  } catch (error) {
    setTheme("dark");
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      var nowLight = !doc.classList.contains("theme-light");
      setTheme(nowLight ? "light" : "dark");
      try {
        localStorage.setItem(THEME_KEY, nowLight ? "light" : "dark");
      } catch (error) {
        /* localStorage may be unavailable in some privacy contexts */
      }
    });
  }

  if (navToggle && nav) {
    navToggle.addEventListener("click", function () {
      var isOpen = nav.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    nav.addEventListener("click", function (event) {
      var target = event.target;
      if (!(target instanceof HTMLElement)) {
        return;
      }
      if (target.tagName === "A" && window.matchMedia("(max-width: 900px)").matches) {
        nav.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  if (yearNode) {
    yearNode.textContent = String(new Date().getFullYear());
  }
})();
