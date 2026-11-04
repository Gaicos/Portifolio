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
			hero_description: "Transformo necessidades operacionais em soluções digitais, automações e sistemas integrados, combinando conhecimento de Risk/AML com desenvolvimento prático.",
			view_projects: "Ver projetos", download_cv: "Baixar currículo",
			about_kicker: "Sobre mim", about_title: "Construindo software com propósito.",
			about_text: "Sou profissional de Risk Management com experiência prática em automação, desenvolvimento de ferramentas internas e melhoria de processos. Conecto conhecimento operacional a HTML, CSS, JavaScript, Python, Power Automate, SharePoint, Microsoft Lists e Excel para transformar rotinas manuais em soluções rastreáveis, organizadas e escaláveis.",
			stat_years: "Conhecimento operacional", stat_technologies: "Tecnologias", stat_team: "Espírito de equipe",
			skills_title: "Stack principal",
			projects_kicker: "Projetos selecionados", projects_title: "O que tenho construído.",
			project_web: "Aplicação web", project_in_progress: "(em desenvolvimento)",
			ygo_description: "Ferramenta desenvolvida em C# para auxiliar jogadores com recursos relacionados ao universo Yu-Gi-Oh!.",
			crud_description: "Aplicação web completa com operações CRUD, interface responsiva e integração com SQL Server.",
			liam_description: "Ecossistema interno para criação, distribuição, controle e tratamento de casos de Risk, com integração entre aplicações web, SharePoint, OneDrive e automações.",
			tracker_description: "Fila operacional para organizar solicitações enviadas por e-mail à equipe de Risk, melhorar o acompanhamento e documentar as ações dos analistas.",
			training_description: "Jogo interativo de investigação com 5 níveis e 100 casos, perfis, ranking da equipe e modo ranqueado multiplayer online para treinar registros de Risk.", project_game: "Jogo Web",
			contact_kicker: "Vamos conversar", contact_title: "Tem um projeto em mente?", contact_button: "Enviar mensagem",
			repos_kicker: "Código aberto", repos_title: "Repositórios no GitHub.", repo_csi: "Ferramentas e automações voltadas à operação de Risk.", repo_crud: "Cadastro de pessoas e manipulação de banco de dados com pessoas cadastradas.", repo_ygo: "Uma ferramenta intuitiva para gerenciar e otimizar decks de Yu-Gi-Oh!.",
			footer_text: "Todos os direitos reservados."
		},
		"en": {
			nav_home: "Home", nav_about: "About", nav_projects: "Projects", nav_contact: "Contact",
			hero_status: "Available for opportunities", hero_greeting: "Hi, I am",
			hero_description: "I turn operational needs into digital solutions, automations and integrated systems by combining Risk/AML knowledge with hands-on development.",
			view_projects: "View projects", download_cv: "Download résumé",
			about_kicker: "About me", about_title: "Building software with purpose.",
			about_text: "I am a Risk Management professional with hands-on experience in automation, internal tool development and process improvement. I combine operational knowledge with HTML, CSS, JavaScript, Python, Power Automate, SharePoint, Microsoft Lists and Excel to turn manual routines into traceable, organized and scalable solutions.",
			stat_years: "Operational knowledge", stat_technologies: "Technologies", stat_team: "Team spirit",
			skills_title: "Core stack",
			projects_kicker: "Selected projects", projects_title: "What I have built.",
			project_web: "Web App", project_in_progress: "(in progress)",
			ygo_description: "A C# tool created to help players with useful resources related to the Yu-Gi-Oh! universe.",
			crud_description: "A complete web application with CRUD operations, a responsive interface and SQL Server integration.",
			liam_description: "An internal ecosystem for creating, distributing, managing and handling Risk cases, integrated with web applications, SharePoint, OneDrive and automated workflows.",
			tracker_description: "An operational queue that organizes email requests sent to the Risk team, improves progress tracking and documents analysts' actions.",
			training_description: "An interactive investigation game with 5 levels and 100 cases, profiles, a team ranking and an online ranked multiplayer mode to train Risk record building.", project_game: "Web Game",
			contact_kicker: "Let's talk", contact_title: "Have a project in mind?", contact_button: "Send message",
			repos_kicker: "Open source", repos_title: "GitHub repositories.", repo_csi: "CSI Risk interactive investigation game: 5 levels, 100 cases and multiplayer mode.", repo_crud: "Person registration and database handling for registered people.", repo_ygo: "An intuitive tool to manage and optimize Yu-Gi-Oh! decks.",
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

	menuToggle.addEventListener("click", () => {
		const open = menuToggle.getAttribute("aria-expanded") === "true";
		menuToggle.setAttribute("aria-expanded", String(!open));
		navLinks.classList.toggle("open", !open);
		document.body.classList.toggle("menu-open", !open);
	});

	navLinks.querySelectorAll("a").forEach((link) => {
		link.addEventListener("click", () => {
			menuToggle.setAttribute("aria-expanded", "false");
			navLinks.classList.remove("open");
			document.body.classList.remove("menu-open");
		});
	});

	window.addEventListener("scroll", () => {
		topbar.classList.toggle("scrolled", window.scrollY > 20);
	}, { passive: true });

	document.getElementById("current-year").textContent = new Date().getFullYear();
})();

/* ===== Impact layer ===== */
(function () {
	const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

	// Scroll progress + cursor glow
	const bar = document.createElement("div");
	bar.className = "scroll-progress";
	const glow = document.createElement("div");
	glow.className = "cursor-glow";
	document.body.append(bar, glow);

	window.addEventListener("scroll", () => {
		const max = document.documentElement.scrollHeight - innerHeight;
		bar.style.transform = "scaleX(" + (max > 0 ? scrollY / max : 0) + ")";
	}, { passive: true });

	window.addEventListener("pointermove", (e) => {
		glow.style.transform = "translate(" + e.clientX + "px," + e.clientY + "px)";
	}, { passive: true });

	// Reveal on scroll
	const targets = document.querySelectorAll(".section-heading, .about-copy, .skills-panel, .repo-card, .project-card, .contact-card, .hero-copy > *, .hero-visual");
	targets.forEach((el, i) => {
		el.classList.add("reveal");
		el.style.setProperty("--delay", ((el.classList.contains("project-card") ? i % 2 : i % 6) * 0.08) + "s");
	});
	const io = new IntersectionObserver((entries) => {
		entries.forEach((entry) => {
			if (!entry.isIntersecting) return;
			entry.target.classList.add("visible");
			entry.target.querySelectorAll(".skill").forEach((s, i) => setTimeout(() => s.classList.add("in"), 150 * i));
			if (entry.target.classList.contains("about-copy")) countUp();
			io.unobserve(entry.target);
		});
	}, { threshold: 0.12 });
	targets.forEach((el) => io.observe(el));

	// Animated counters (10+, 100%)
	let counted = false;
	function countUp() {
		if (counted || reduce) return;
		counted = true;
		document.querySelectorAll(".about-stats strong").forEach((el) => {
			const match = el.textContent.match(/^(\d+)(.*)$/);
			if (!match) return;
			const end = +match[1], suffix = match[2], start = performance.now();
			(function tick(now) {
				const p = Math.min((now - start) / 1400, 1);
				el.textContent = Math.round(end * (1 - Math.pow(1 - p, 3))) + suffix;
				if (p < 1) requestAnimationFrame(tick);
			})(start);
		});
	}

	// Spotlight + 3D tilt on cards
	document.querySelectorAll(".glass-card, .project-card").forEach((card) => {
		card.addEventListener("pointermove", (e) => {
			const r = card.getBoundingClientRect();
			const x = e.clientX - r.left, y = e.clientY - r.top;
			card.style.setProperty("--mx", x + "px");
			card.style.setProperty("--my", y + "px");
			if (card.classList.contains("project-card") && !reduce) {
				card.style.setProperty("--ry", ((x / r.width - 0.5) * 6) + "deg");
				card.style.setProperty("--rx", ((0.5 - y / r.height) * 6) + "deg");
			}
		});
		card.addEventListener("pointerleave", () => { card.style.setProperty("--rx", "0deg"); card.style.setProperty("--ry", "0deg"); });
	});

	// Portrait tilt
	const portrait = document.querySelector(".portrait-frame");
	if (portrait && !reduce) {
		const visual = portrait.parentElement;
		visual.addEventListener("pointermove", (e) => {
			const r = visual.getBoundingClientRect();
			const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
			portrait.style.transform = "perspective(900px) rotateY(" + x * 12 + "deg) rotateX(" + -y * 12 + "deg)";
		});
		visual.addEventListener("pointerleave", () => { portrait.style.transform = ""; });
	}

	// Active nav link
	const links = [...document.querySelectorAll(".nav-links a")];
	const spy = new IntersectionObserver((entries) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) links.forEach((l) => l.classList.toggle("active", l.getAttribute("href") === "#" + entry.target.id));
		});
	}, { rootMargin: "-45% 0px -50% 0px" });
	document.querySelectorAll("main section[id]").forEach((s) => spy.observe(s));
})();
