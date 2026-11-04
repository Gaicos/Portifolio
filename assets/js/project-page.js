(function () {
	const themeToggle = document.getElementById("theme-toggle");
	const languageToggle = document.getElementById("language-toggle");
	const languageLabel = document.getElementById("language-label");
	const root = document.documentElement;

	const translations = {
		"pt-BR": { back: "Voltar ao início", theme_dark: "Ativar tema escuro", theme_light: "Ativar tema claro" },
		"en": { back: "Back to home", theme_dark: "Activate dark theme", theme_light: "Activate light theme" }
	};

	function applyTheme(theme) {
		root.dataset.theme = theme;
		localStorage.setItem("portfolio-theme", theme);
		const icon = themeToggle.querySelector("i");
		icon.className = theme === "dark" ? "fas fa-sun" : "fas fa-moon";
		themeToggle.setAttribute("aria-label", theme === "dark"
			? translations[localStorage.getItem("portfolio-language") || "pt-BR"].theme_light
			: translations[localStorage.getItem("portfolio-language") || "pt-BR"].theme_dark);
		document.querySelector('meta[name="theme-color"]').content = theme === "dark" ? "#070b14" : "#f4f7fb";
	}

	function applyLanguage(language) {
		root.lang = language === "pt-BR" ? "pt-BR" : "en";
		document.querySelectorAll("[data-i18n]").forEach((element) => {
			const key = element.dataset.i18n;
			if (translations[language][key]) element.textContent = translations[language][key];
		});
		languageLabel.textContent = language === "pt-BR" ? "EN" : "PT";
		localStorage.setItem("portfolio-language", language);
		applyTheme(root.dataset.theme || "dark");
	}

	const savedTheme = localStorage.getItem("portfolio-theme") || (matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");
	const savedLanguage = localStorage.getItem("portfolio-language") || (navigator.language.startsWith("pt") ? "pt-BR" : "en");
	applyTheme(savedTheme);
	applyLanguage(savedLanguage);

	themeToggle.addEventListener("click", () => applyTheme(root.dataset.theme === "dark" ? "light" : "dark"));
	languageToggle.addEventListener("click", () => applyLanguage(localStorage.getItem("portfolio-language") === "pt-BR" ? "en" : "pt-BR"));
})();
