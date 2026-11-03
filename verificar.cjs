const fs = require('fs');
const vm = require('vm');
const root = __dirname + '/Llenado-SAI-main/';
const source = fs.readFileSync(root + 'dashboard.js', 'utf8');
const context = {
  normalizarTexto: value => String(value ?? '').trim().toLowerCase().normalize('NFD').replace(/\p{M}/gu, '')
};
vm.createContext(context);
vm.runInContext(source.slice(source.indexOf('function apartadoValorCelda'), source.indexOf('function estadisticasNumericas')), context);
const cases = [
  ['CANCER DE MAMA TRIPLE NEGATIVO', 'CÁNCER DE MAMA'],
  ['CÁNCER DE MAMA IZQUIERDO', 'CÁNCER DE MAMA'],
  ['CANCER DE MAMA METASTASICO', 'CÁNCER DE MAMA'],
  ['CA DE MAMA', 'CÁNCER DE MAMA'],
  ['CÁNCER DE MAMA RECURRENTE Y METASTÁSICO', 'CÁNCER DE MAMA'],
  ['CÁNCER DE OVARIO', 'CÁNCER DE OVARIO'],
  ['CÁNCER DE MAMA Y OVARIO', 'CÁNCER DE MAMA Y OVARIO'],
  ['CÁNCER DE CUELLO UTERINO', 'CÁNCER CERVICOUTERINO'],
  ['DIABETES TIPO 2', 'DIABETES MELLITUS TIPO 2'],
  ['DM2', 'DIABETES MELLITUS TIPO 2'],
  ['', 'SIN DATO']
];
for (const [input, expected] of cases) {
  const actual = context.homologarDiagnostico(input);
  if (actual !== expected) throw Error(`${input}: ${actual} != ${expected}`);
}
const distribution = context.distribucionCategorica(cases.slice(0, 5).map(([diagnostico]) => ({ diagnostico })), 'diagnostico');
if (distribution.length !== 1 || distribution[0][1] !== 5) throw Error('El conteo de cáncer de mama no se consolidó');
console.log(`${cases.length} casos y conteo de distribución correctos`);
