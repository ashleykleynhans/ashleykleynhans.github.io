function ThemeManager(options) {
  var defaultTheme = options.defaultTheme || 'dark';
  var enableAutoDetectTheme = options.enableAutoDetectTheme.toLowerCase() === 'true';
  var lightThemeMatch = window.matchMedia('(prefers-color-scheme: light)');

  function applyTheme() {
    var theme = localStorage.getItem('themeOverride');
    if (theme !== 'light' && theme !== 'dark') {
      if (theme === 'browser' || enableAutoDetectTheme) {
        theme = lightThemeMatch.matches ? 'light' : 'dark';
      } else {
        theme = defaultTheme;
      }
    }

    if (theme === 'light') {
      document.body.classList.add('light-theme');
      document.body.classList.remove('dark-theme');
    } else {
      document.body.classList.add('dark-theme');
      document.body.classList.remove('light-theme');
    }
  }

  this.switch = function(themeOverride) {
    localStorage.setItem('themeOverride', themeOverride);
    applyTheme();
  };

  applyTheme();
  lightThemeMatch.addEventListener('change', applyTheme);
}

window.theme = new ThemeManager(document.getElementById('dark-theme-script').dataset);
