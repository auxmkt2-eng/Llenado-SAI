// Vista y captura de LMP. Reutiliza cotizaciones con marca LMP:
// fecha_infusion = Fecha, servicio = Estudio/Tipo, monto_del_servicio = Monto.
let vistaLmpActiva = false;
let lmpEditandoId = null;

function sedeLmpPerfil() {
  return currentUser?.role === "sede" ? currentUser.sede : "Polanco";
}

function filasLmpVisibles() {
  if (typeof allRows === "undefined") return [];
  return allRows.filter(row =>
    normalizarTexto(row.marca) === "lmp" &&
    normalizarTexto(row.sede) === normalizarTexto(sedeLmpPerfil())
  );
}

function renderLmpTable() {
  const rows = filasLmpVisibles();
  const tbody = $("tablaLmpBody");
  tbody.innerHTML = rows.length ? rows.map(row => `
    <tr>
      <td>${escapeHtml(row.fechaInfusion || "—")}</td>
      <td>${escapeHtml(row.paciente || "—")}</td>
      <td>${escapeHtml(row.servicio || "—")}</td>
      <td class="money">${formatearMoneda(row.montoServicio)}</td>
      <td><button type="button" class="action-btn" data-lmp-edit="${escapeHtml(row.id)}">Editar</button></td>
    </tr>
  `).join("") : '<tr><td colspan="5" class="lmp-empty">Aún no hay registros LMP.</td></tr>';
  if (vistaLmpActiva) $("contadorFilas").textContent = `${rows.length} registros`;
}

function seleccionarVistaLmp(activa) {
  vistaLmpActiva = activa;
  $("tablaSanare").classList.toggle("hidden", activa);
  $("tablaLmp").classList.toggle("hidden", !activa);
  $("btnVistaLmp").classList.toggle("active", activa);
  $("btnVistaLmp").setAttribute("aria-pressed", String(activa));
  ["importSede", "btnImportarExcel", "btnExportarExcel", "btnNuevoRegistro"].forEach(id => {
    const el = $(id);
    if (el) el.classList.toggle("hidden", activa || (id === "btnNuevoRegistro" ? currentUser?.role !== "sede" : currentUser?.role !== "admin"));
  });
  $("btnNuevoLmp").classList.toggle("hidden", !activa);
  $("contadorFilas").textContent = activa
    ? `${filasLmpVisibles().length} registros`
    : `${filteredRows.length} registros`;
}

function abrirLmp(id = null) {
  if (!currentUser || !["admin", "sede"].includes(currentUser.role)) return;
  const row = id == null ? null : filasLmpVisibles().find(r => r.id === String(id));
  if (id != null && !row) return;
  lmpEditandoId = row?.id || null;
  $("formLmp").reset();
  $("tituloDrawerLmp").textContent = row ? "Editar registro LMP" : "Nuevo registro LMP";
  $("lmpFecha").value = row?.fechaInfusion || "";
  $("lmpPaciente").value = row?.paciente || "";
  $("lmpEstudio").value = row?.servicio || "";
  $("lmpMonto").value = row?.montoServicio ?? "";
  $("drawerLmp").classList.remove("hidden");
  $("drawerLmpBackdrop").classList.remove("hidden");
}

function cerrarLmp() {
  $("drawerLmp").classList.add("hidden");
  $("drawerLmpBackdrop").classList.add("hidden");
  lmpEditandoId = null;
}

async function guardarLmp(event) {
  event.preventDefault();
  if (!currentUser || !["admin", "sede"].includes(currentUser.role)) return;
  const sede = sedeLmpPerfil();
  const monto = Number($("lmpMonto").value);
  if (!$("lmpFecha").value || !$("lmpPaciente").value.trim() ||
      !$("lmpEstudio").value.trim() || !Number.isFinite(monto) || monto < 0) {
    showToast("Completa Fecha, Paciente, Estudio/Tipo y Monto.", "error");
    return;
  }
  const registro = {
    fecha_infusion: $("lmpFecha").value,
    paciente: $("lmpPaciente").value.trim(),
    servicio: $("lmpEstudio").value.trim(),
    monto_del_servicio: monto,
    sede
  };
  const btn = $("btnGuardarLmp");
  btn.disabled = true;
  try {
    let query;
    if (lmpEditandoId) {
      query = supabaseClient.from("cotizaciones").update(registro)
        .eq("id", lmpEditandoId).eq("marca", "LMP").eq("sede", sede);
    } else {
      query = supabaseClient.from("cotizaciones").insert({
        ...registro, marca: "LMP", folio: generarFolio("LMP", sede)
      });
    }
    const { error } = await query;
    if (error) throw error;
    cerrarLmp();
    await cargarRegistros();
    showToast("Registro LMP guardado.", "success");
  } catch (error) {
    console.error(error);
    showToast(error.message || "No se pudo guardar el registro LMP.", "error");
  } finally {
    btn.disabled = false;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  $("btnVistaLmp").addEventListener("click", () => seleccionarVistaLmp(true));
  $("importMarca").addEventListener("click", () => seleccionarVistaLmp(false));
  $("importMarca").addEventListener("change", () => seleccionarVistaLmp(false));
  $("btnNuevoLmp").addEventListener("click", () => abrirLmp());
  $("tablaLmpBody").addEventListener("click", event => {
    const btn = event.target.closest("[data-lmp-edit]");
    if (btn) abrirLmp(btn.dataset.lmpEdit);
  });
  $("btnCerrarLmp").addEventListener("click", cerrarLmp);
  $("drawerLmpBackdrop").addEventListener("click", cerrarLmp);
  $("formLmp").addEventListener("submit", guardarLmp);
});
