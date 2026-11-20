const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');

for (const folder of [__dirname, path.join(__dirname, 'Llenado-SAI-LMP')]) {
  const source = fs.readFileSync(path.join(folder, 'dashboard.js'), 'utf8');
  const workbook = { sheets: {} };
  const context = {
    execUltimaData: [
      { paciente: 'Ana Pérez', sexo: 'F', tratamiento: 'R-CHOP', medicos: 'Dra. López' },
      { paciente: 'Luis Ruiz', sexo: 'M', tratamiento: 'QT', medicos: 'Dr. García' },
      { paciente: 'Eva Solís', sexo: 'F', tratamiento: '', medicos: '' },
      { paciente: '', sexo: 'F', tratamiento: 'Otro', medicos: 'Dr. Otro' }
    ],
    apartadoDetBuscarTexto: 'f',
    normalizarTexto: value => String(value ?? '').trim().toLowerCase().normalize('NFD').replace(/\p{M}/gu, ''),
    apartadoValorCelda: value => String(value ?? '').trim().toUpperCase() || 'SIN DATO',
    $: id => id === 'apartadoTabla' ? { querySelector: () => ({ children: [1] }) } : null,
    XLSX: { utils: {
      table_to_sheet: () => ({ summary: true }),
      aoa_to_sheet: rows => ({ rows }),
      book_new: () => workbook,
      book_append_sheet: (book, sheet, name) => { book.sheets[name] = sheet; }
    }, writeFile: (book, name) => { book.name = name; } },
    showToast: () => {}
  };
  vm.createContext(context);
  vm.runInContext(source.slice(source.indexOf('function filasDelApartado'), source.indexOf('function activarApartado')), context);
  vm.runInContext(source.slice(source.indexOf('function exportarApartadoAExcel'), source.indexOf('function initDashboardInteractivoEventos')), context);
  vm.runInContext('exportarApartadoAExcel({ key: "sexo", label: "Sexo", tipo: "categorica" })', context);

  assert.deepEqual(Object.keys(workbook.sheets), ['Resumen', 'Pacientes']);
  assert.deepEqual(JSON.parse(JSON.stringify(workbook.sheets.Pacientes.rows)), [
    ['Sexo', 'Paciente', 'Tratamiento', 'Médico encargado'],
    ['F', 'Ana Pérez', 'R-CHOP', 'Dra. López'],
    ['F', 'Eva Solís', '', '']
  ]);
  assert.match(workbook.name, /^desglose_sexo_\d{4}-\d{2}-\d{2}\.xlsx$/);

  const detail = { innerHTML: '' };
  const ui = {
    document: { documentElement: { getAttribute: () => 'dark' }, addEventListener: () => {} },
    window: {},
    getComputedStyle: () => ({ getPropertyValue: () => '' }),
    normalizarTexto: context.normalizarTexto,
    escapeHtml: value => String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'),
    $: id => id === 'apartadoDetalle' ? detail : null
  };
  vm.createContext(ui);
  vm.runInContext(source, ui);
  vm.runInContext(`
    execUltimaData = [
      { paciente: 'Ana Pérez', sexo: 'F', tratamiento: 'R-CHOP', medicos: 'Dra. López' },
      { paciente: 'Luis Ruiz', sexo: 'M', tratamiento: 'QT', medicos: 'Dr. García' }
    ];
    apartadoActivo = 'sexo';
    apartadoDetBuscarTexto = 'f';
    renderDetalleApartado();
  `, ui);
  assert.match(detail.innerHTML, /Detalle por paciente/);
  assert.match(detail.innerHTML, /Ana Pérez/);
  assert.match(detail.innerHTML, /R-CHOP/);
  assert.match(detail.innerHTML, /Dra\. López/);
  assert.doesNotMatch(detail.innerHTML, /Luis Ruiz/);
  console.log(`Exportación de Sexo correcta: ${folder}`);
}
