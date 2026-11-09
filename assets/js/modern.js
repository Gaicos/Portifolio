(function () {
	const root = document.documentElement;
	const themeToggle = document.getElementById("theme-toggle");
	const languageToggle = document.getElementById("language-toggle");
	const languageLabel = document.getElementById("language-label");
	const menuToggle = document.querySelector(".menu-toggle");
	const navLinks = document.getElementById("nav-links");
	const typingText = document.getElementById("typing-text");
	const topbar = document.querySelector(".topbar");

	const translations = {
		"pt-BR": {
			nav_home: "Início", nav_about: "Sobre", nav_projects: "Projetos", nav_contact: "Contato",
			hero_status: "Disponível para oportunidades", hero_greeting: "Olá, eu sou",
			hero_description: "Transformo necessidades operacionais em soluções digitais, automações e sistemas integrados, combinando conhecimento de Risk/AML com desenvolvimento de software.",
			view_projects: "Ver projetos", download_cv: "Baixar currículo",
			about_kicker: "Sobre mim", about_title: "Construindo software com propósito.",
			about_text: "Sou profissional de Risk Management e Desenvolvimento com sólida experiência prática em automação, engenharia de ferramentas internas e melhoria de processos. Conecto C#, .NET, SQL Server, JavaScript, Python, Power Automate, SharePoint e Microsoft Lists para transformar rotinas manuais em soluções rastreáveis, robustas e escaláveis.",
			stat_years: "Conhecimento operacional", stat_technologies: "Tecnologias", stat_team: "Espírito de equipe",
			skills_title: "Stack principal",
			projects_kicker: "Projetos selecionados", projects_title: "O que tenho construído.",
			project_web: "Aplicação web", project_in_progress: "(em desenvolvimento)", project_game: "Jogo Web",
			liam_description: "Simulador web e CRM investigativo de AML desenvolvido em squad colaborativa de 3 desenvolvedores para centralização de dados, monitoramento e resolução de cenários de fraude e conformidade operacional.",
			lab_description: "Simulador investigativo Retro OS exercitando a metodologia dos 4 passos (Observe ➔ Conecte ➔ Classifique ➔ Decida) com Web Audio API e 8 casos reais.",
			training_description: "Jogo interativo de investigação com 5 níveis e 100 casos, perfis, ranking da equipe e modo ranqueado multiplayer online para treinar registros de Risk.",
			tracker_description: "Fila operacional para organizar solicitações enviadas por e-mail à equipe de Risk, melhorar o acompanhamento e documentar as ações dos analistas.",
			crud_description: "Aplicação web com operações CRUD, arquitetura em camadas e integração com banco de dados SQL Server.",
			ygo_description: "Aplicação desktop em C# para auxílio estatístico e gerenciamento de dados de jogos.",
			contact_kicker: "Vamos conversar", contact_title: "Tem um projeto ou oportunidade em mente?", contact_button: "Enviar mensagem",
			repos_kicker: "Código aberto", repos_title: "Repositórios no GitHub.",
			repo_risklab: "Simulador interativo de investigação de risco, antifraude e compliance em interface Retro OS.",
			repo_liam: "Simulador de AML e framework para desenvolvimento de cenários de alertas e risco operacional.",
			repo_csi: "Jogo interativo de investigação CSI Risk: 5 níveis, 100 casos e modo multiplayer.",
			repo_crud: "Aplicação com operações de cadastro e manipulação de banco de dados SQL Server com validação de dados.",
			repo_ygo: "Ferramenta desktop em C# para gerenciar estatísticas e dados de Yu-Gi-Oh!.",
			footer_text: "Todos os direitos reservados."
		},
		"en": {
			nav_home: "Home", nav_about: "About", nav_projects: "Projects", nav_contact: "Contact",
			hero_status: "Available for opportunities", hero_greeting: "Hi, I am",
			hero_description: "I turn operational needs into digital solutions, automations, and integrated systems by combining Risk/AML domain knowledge with hands-on software development.",
			view_projects: "View projects", download_cv: "Download résumé",
			about_kicker: "About me", about_title: "Building software with purpose.",
			about_text: "I am a Risk Management and Software Development professional with hands-on experience in automation, internal tool engineering, and process optimization. I leverage C#, .NET, SQL Server, JavaScript, Python, Power Automate, SharePoint, and Microsoft Lists to transform manual routines into traceable, robust, and scalable solutions.",
			stat_years: "Operational knowledge", stat_technologies: "Technologies", stat_team: "Team collaboration",
			skills_title: "Core stack",
			projects_kicker: "Selected projects", projects_title: "What I have built.",
			project_web: "Web App", project_in_progress: "(in progress)", project_game: "Web Game",
			liam_description: "Web AML platform, simulator, and investigative CRM built in a 3-developer squad for centralized telemetry, risk monitoring, and fraud scenario investigation.",
			lab_description: "Interactive Retro OS simulator exercising the 4-step methodology (Observe ➔ Connect ➔ Classify ➔ Decide) with native Web Audio API and 8 real cases.",
			training_description: "Interactive investigation game with 5 levels and 100 cases, player profiles, team ranking, and online multiplayer mode to sharpen Risk documentation skills.",
			tracker_description: "Operational queue organizing email requests sent to the Risk team, improving turnaround tracking and documenting analyst actions.",
			crud_description: "Full-stack web application featuring CRUD operations, layered architecture, and SQL Server integration.",
			ygo_description: "Desktop application built in C# for statistical calculation and game data management.",
			contact_kicker: "Let's connect", contact_title: "Have a project or opportunity in mind?", contact_button: "Send message",
			repos_kicker: "Open source", repos_title: "GitHub repositories.",
			repo_risklab: "Interactive risk, anti-fraud, and compliance investigation simulator built in a Retro OS interface.",
			repo_liam: "AML simulator and scenario framework for operational risk and alert modeling.",
			repo_csi: "CSI Risk interactive investigation game: 5 levels, 100 cases, and multiplayer mode.",
			repo_crud: "Web application featuring database operations and strict input validation.",
			repo_ygo: "Desktop tool built in C# to manage deck statistics and calculate probability distributions.",
			footer_text: "All rights reserved."
		}
	};

	function applyTheme(theme) {
		root.dataset.theme = theme;
		localStorage.setItem("portfolio-theme", theme);
		const icon = themeToggle.querySelector("i");
		icon.className = theme === "dark" ? "fas fa-sun" : "fas fa-moon";
		themeToggle.setAttribute("aria-label", theme === "dark" ? "Ativar tema claro" : "Ativar tema escuro");
		document.querySelector('meta[name="theme-color"]').content = theme === "dark" ? "#070b14" : "#f4f7fb";
	}

	function applyLanguage(language) {
		const content = translations[language];
		document.documentElement.lang = language === "pt-BR" ? "pt-BR" : "en";
		document.querySelectorAll("[data-i18n]").forEach((element) => {
			const key = element.dataset.i18n;
			if (content[key]) element.textContent = content[key];
		});
		languageLabel.textContent = language === "pt-BR" ? "EN" : "PT";
		languageToggle.setAttribute("aria-label", language === "pt-BR" ? "Mudar para inglês" : "Switch to Portuguese");
		localStorage.setItem("portfolio-language", language);
		startTyping(language === "pt-BR" ? "Desenvolvedor .NET & Automação" : ".NET Developer & Automation");
	}

	let typingTimer;
	function startTyping(text) {
		clearInterval(typingTimer);
		let index = 0;
		typingText.textContent = "";
		typingTimer = setInterval(() => {
			typingText.textContent = text.slice(0, index + 1);
			index += 1;
			if (index >= text.length) clearInterval(typingTimer);
		}, 55);
	}

	const savedTheme = localStorage.getItem("portfolio-theme");
	const preferredTheme = window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
	applyTheme(savedTheme || preferredTheme);

	const savedLanguage = localStorage.getItem("portfolio-language") || (navigator.language.startsWith("pt") ? "pt-BR" : "en");
	applyLanguage(savedLanguage);

	themeToggle.addEventListener("click", () => {
		applyTheme(root.dataset.theme === "dark" ? "light" : "dark");
	});

	languageToggle.addEventListener("click", () => {
		applyLanguage(localStorage.getItem("portfolio-language") === "pt-BR" ? "en" : "pt-BR");
	});

	if (menuToggle && navLinks) {
		menuToggle.addEventListener("click", () => {
			const expanded = menuToggle.getAttribute("aria-expanded") === "true";
			menuToggle.setAttribute("aria-expanded", !expanded);
			navLinks.classList.toggle("open");
		});

		navLinks.querySelectorAll("a").forEach((link) => {
			link.addEventListener("click", () => {
				menuToggle.setAttribute("aria-expanded", "false");
				navLinks.classList.remove("open");
			});
		});
	}

	const yearSpan = document.getElementById("current-year");
	if (yearSpan) yearSpan.textContent = new Date().getFullYear();
})();