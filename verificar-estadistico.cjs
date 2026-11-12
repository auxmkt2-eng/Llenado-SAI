const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");
const path = require("node:path");

const dashboard = fs.readFileSync(path.join(__dirname, "dashboard.js"), "utf8");
const estadistico = fs.readFileSync(path.join(__dirname, "estadistico-casos.js"), "utf8");
const context = {
  normalizarTexto: value => String(value ?? "").trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""),
  document: { addEventListener() {} }
};
vm.createContext(context);
vm.runInContext(dashboard.slice(dashboard.indexOf("function apartadoValorCelda"), dashboard.indexOf("function estadisticasNumericas")), context);
vm.runInContext(estadistico, context);

const registros = [
  { marca: "SANARÉ", sede: "Morelia", fechaInfusion: "2025-01-05", paciente: "Ana Pérez", diagnostico: "CÁNCER DE MAMA" },
  { marca: "SANARÉ", sede: "Morelia", fechaInfusion: "2025-04-12", paciente: " ANA  PEREZ ", diagnostico: "CA DE MAMA" },
  { marca: "SANARÉ", sede: "Toluca", fechaInfusion: "2025-06-10", paciente: "Ana Pérez", diagnostico: "CÁNCER DE MAMA" },
  { marca: "SANARÉ", sede: "Toluca", fechaInfusion: "2025-03-02", paciente: "Luis", diagnostico: "CÁNCER DE OVARIO" },
  { marca: "SANARÉ", sede: "Morelia", fechaInfusion: "2024-02-01", paciente: "Ana Pérez", diagnostico: "CÁNCER DE MAMA" },
  { marca: "NOMAD", sede: "Morelia", fechaInfusion: "2025-02-01", paciente: "Otro", diagnostico: "CÁNCER DE MAMA" },
  { marca: "SANARÉ", sede: "Toluca", fechaInfusion: "2025-08-01", paciente: "Mario", diagnostico: "DIABETES TIPO 2" },
  { marca: "SANARÉ", sede: "Toluca", fechaInfusion: "", paciente: "Eva", diagnostico: "CÁNCER DE MAMA" },
  { marca: "SANARÉ", sede: "Toluca", fechaInfusion: "2025-08-01", paciente: "", diagnostico: "CÁNCER DE MAMA" }
];
const todos = context.construirEstadisticoCasos(registros);
assert.deepEqual(Array.from(todos.filas, f => [f.anio, f.total]), [["2025", 2], ["2024", 1]]);
assert.equal(todos.filas[0].sedes.morelia, 1);
assert.equal(todos.filas[0].sedes.toluca, 2);
assert.equal(todos.totalPeriodo, 2);
assert.equal(todos.sinFecha, 1);
assert.equal(todos.sinPaciente, 1);
const mama = context.construirEstadisticoCasos(registros, "CÁNCER DE MAMA");
assert.equal(mama.filas[0].total, 1);
assert.equal(mama.filas[0].sedes.toluca, 1);
assert.equal(mama.totalPeriodo, 1);
assert.equal(mama.columnasSede.length, 2);
console.log("Estadístico anual, filtro, sedes y deduplicación correctos.");
