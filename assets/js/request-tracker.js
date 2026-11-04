(function () {
	const root = document.documentElement;
	const lang = () => (root.lang === "pt-BR" ? "pt" : "en");

	const STATUS = {
		pendente: { pt: "Pendente", en: "Pending", cls: "s-red" },
		aguardando: { pt: "Aguardando Resposta", en: "Awaiting Reply", cls: "s-amber" },
		andamento: { pt: "Em andamento", en: "In progress", cls: "s-green" },
		compliance: { pt: "Escalado Compliance", en: "Compliance Escalation", cls: "s-purple" },
		escalonado: { pt: "Escalonado", en: "Escalated", cls: "s-blue" },
		resolvido: { pt: "Resolvido", en: "Resolved", cls: "s-gray" }
	};
	const NEXT = ["aguardando", "compliance", "escalonado", "resolvido"];

	// Fictional data only
	const tickets = [
		{ id: "RT-1042", origin: "Risk", type: "DEPÓSITO", status: "pendente", owner: "" },
		{ id: "RT-1043", origin: "CS", type: "SAQUE", status: "pendente", owner: "" },
		{ id: "RT-1044", origin: "CS", type: "SAQUE", status: "pendente", owner: "" },
		{ id: "RT-1045", origin: "Risk", type: "DEPÓSITO", status: "pendente", owner: "" },
		{ id: "RT-1038", origin: "CS", type: "SAQUE", status: "aguardando", owner: "Analista A" },
		{ id: "RT-1035", origin: "Risk", type: "DEPÓSITO", status: "escalonado", owner: "Analista B" },
		{ id: "RT-1031", origin: "CS", type: "SAQUE", status: "resolvido", owner: "Analista A" }
	];
	let filter = "pendente";

	const tabsEl = document.getElementById("rt-tabs");
	const bodyEl = document.getElementById("rt-body");
	if (!tabsEl || !bodyEl) return;

	const label = (key) => STATUS[key][lang()];
	const t = (pt, en) => (lang() === "pt" ? pt : en);

	function renderTabs() {
		const keys = Object.keys(STATUS).concat("todos");
		tabsEl.innerHTML = keys.map((k) => {
			const name = k === "todos" ? t("Todos", "All") : label(k);
			return '<button type="button" class="' + (k === filter ? "active" : "") + '" data-k="' + k + '">' + name + "</button>";
		}).join("");
	}

	function renderRows() {
		const rows = tickets.filter((x) => filter === "todos" || x.status === filter);
		if (!rows.length) {
			bodyEl.innerHTML = '<tr><td colspan="6" class="rt-empty">' + t("Nenhum ticket nesta visão.", "No tickets in this view.") + "</td></tr>";
			return;
		}
		bodyEl.innerHTML = rows.map((x) => {
			let action = "";
			if (x.status === "pendente") {
				action = '<button class="rt-btn" data-assign="' + x.id + '">' + t("Atribuir", "Assign") + "</button>";
			} else if (x.status === "andamento") {
				action = '<select class="rt-select" data-move="' + x.id + '"><option value="">' + t("Mover para…", "Move to…") + "</option>" +
					NEXT.map((k) => '<option value="' + k + '">' + label(k) + "</option>").join("") + "</select>";
			} else {
				action = '<span class="rt-dash">—</span>';
			}
			const originCls = x.origin === "Risk" ? "o-risk" : "o-cs";
			return "<tr><td><b>" + x.id + '</b></td><td><span class="pill ' + originCls + '">' + x.origin + '</span></td><td><span class="pill ' +
				(x.type === "SAQUE" ? "o-cs" : "o-risk") + '">' + x.type + "</span></td><td>" + (x.owner || '<span class="rt-dash">—</span>') +
				'</td><td><span class="pill ' + STATUS[x.status].cls + '">' + label(x.status) + "</span></td><td>" + action + "</td></tr>";
		}).join("");
	}

	function render() { renderTabs(); renderRows(); }

	tabsEl.addEventListener("click", (e) => {
		const b = e.target.closest("button");
		if (!b) return;
		filter = b.dataset.k;
		render();
	});
	bodyEl.addEventListener("click", (e) => {
		const b = e.target.closest("[data-assign]");
		if (!b) return;
		const item = tickets.find((x) => x.id === b.dataset.assign);
		item.status = "andamento";
		item.owner = t("Você", "You");
		filter = "andamento";
		render();
	});
	bodyEl.addEventListener("change", (e) => {
		const s = e.target.closest("[data-move]");
		if (!s || !s.value) return;
		tickets.find((x) => x.id === s.dataset.move).status = s.value;
		render();
	});

	// Page-specific PT/EN swap using data-pt / data-en
	function translate() {
		document.querySelectorAll("[data-pt]").forEach((el) => { el.textContent = el.dataset[lang()]; });
		render();
	}
	new MutationObserver(translate).observe(root, { attributes: true, attributeFilter: ["lang"] });
	translate();
})();

