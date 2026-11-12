# Criterio de clasificación del estadístico

En **Dashboard interactivo → Diagnóstico**, las filas de la tabla muestran categorías agrupadas por el sitio donde se originó el cáncer. Se conservan las columnas de registros, pacientes, porcentaje y montos del desglose original. Es una **clasificación de reporte**, basada en la tabla de referencia del usuario; no asigna códigos CIE-O ni sustituye una revisión clínica.

## Decisiones de agrupación

| Categoría del reporte | Diagnósticos que reúne |
| --- | --- |
| Mama | Mama, seno y variantes mamarias. |
| Colón | Tumores primarios de colon. |
| Recto / colorrectal | Recto, colorrectal y menciones conjuntas de colon y recto. |
| Pulmón | Pulmón y bronquios. |
| Páncreas | Páncreas y variantes pancreáticas. |
| Ovario | Ovario, separado del resto ginecológico como en la imagen. |
| Ginecológico | Cérvix, útero, endometrio, trompas, vagina y vulva. |
| Genitourinario masculino | Próstata, pene y testículo. Estos órganos son distintos, pero pertenecen al mismo grupo anatómico amplio. |
| Riñón | Parénquima renal y riñón. |
| Vías urinarias | Vejiga, urotelio, uréter, uretra y pelvis renal. |
| Gástrico / esófago | Estómago y esófago, como en la imagen. |
| Vías biliares / vesícula | Colangiocarcinoma, conductos biliares y vesícula. |
| Sarcomas | Sarcomas de tejido blando, hueso y sarcomas con órgano mencionado. |
| Hematológico | Leucemia, linfoma y mieloma, aun si se menciona un órgano afectado. |
| Otros grupos | Tiroides, sistema nervioso central, cabeza y cuello, piel, hígado, tubo digestivo restante, tórax, endocrino y ojo. |

Los diagnósticos de **sitios múltiples** que no permiten reconocer un tumor primario conservan su texto original en la tabla. Los carcinomas sin órgano indicado se agrupan por tipo histológico sin inventar un sitio. Un cáncer metastásico se asigna al sitio primario cuando el texto lo permite; el órgano de la metástasis no define la categoría.

La columna **Registros** cuenta atenciones, mientras que **Pacientes** cuenta nombres de pacientes únicos dentro de cada categoría. El desglose respeta los filtros del dashboard interactivo. No se usan categorías genéricas llamadas «Otros Diagnósticos» u «Otros cánceres»: las enfermedades no oncológicas se agrupan por su nombre (por ejemplo, osteoporosis y anemia), y un texto que no pueda homologarse conserva su denominación original. El texto original de cada registro no se altera.

Se revisaron los 44 registros que antes aparecían como «Otros Diagnósticos» en la exportación del 12 de noviembre de 2026. Condrosarcoma se asigna a sarcomas; los tumores germinales retroperitoneales, la enfermedad trofoblástica gestacional y las neoplasias neuroendocrinas reciben categorías específicas. Las enfermedades no oncológicas quedan en grupos separados. Esta revisión no supone que toda enfermedad trofoblástica o todo teratoma inmaduro sea maligno; la categoría refleja el diagnóstico escrito, no una confirmación histológica adicional.

## Fuentes consultadas

- [Instituto Nacional del Cáncer: cáncer por ubicación en el cuerpo](https://www.cancer.gov/espanol/tipos/por-partes-cuerpo).
- [Instituto Nacional del Cáncer: lista de tipos de cáncer](https://www.cancer.gov/espanol/tipos).
- [Instituto Nacional del Cáncer: cáncer metastásico y sitio primario](https://www.cancer.gov/espanol/tipos/cancer-metastatico).
- [SEER: agrupación de sitios CIE-O-3](https://seer.cancer.gov/siterecode/icdo3_2023_expanded/).
- [Instituto Nacional del Cáncer: condrosarcoma](https://www.cancer.gov/espanol/tipos/hueso/hoja-informativa-hueso).
- [Instituto Nacional del Cáncer: tumores germinales extragonadales](https://www.cancer.gov/espanol/tipos/extragonadal-celulas-germinativas/paciente/tratamiento-extragonadal-pdq).
- [Instituto Nacional del Cáncer: enfermedad trofoblástica gestacional](https://www.cancer.gov/espanol/publicaciones/diccionarios/diccionario-cancer/def/tumor-trofoblastico-de-la-gestacion).

Las etiquetas finales siguen la tabla del usuario cuando esta separa sitios que podrían combinarse de otras maneras (por ejemplo, colon y recto). Se completaron los sitios ausentes para que los diagnósticos oncológicos aparezcan en la tabla agrupada.
