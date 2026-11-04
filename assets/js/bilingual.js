(function () {
	const root = document.documentElement;
	function translate() {
		const k = root.lang === "pt-BR" ? "pt" : "en";
		document.querySelectorAll("[data-pt]").forEach((el) => { el.textContent = el.dataset[k]; });
	}
	new MutationObserver(translate).observe(root, { attributes: true, attributeFilter: ["lang"] });
	translate();
})();