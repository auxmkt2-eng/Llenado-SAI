# Criterio de clasificación del estadístico

El filtro «Categoría de diagnóstico» agrupa los diagnósticos de Sanaré por el sitio donde se originó el cáncer. Es una **clasificación de reporte**, basada en la tabla de referencia del usuario; no asigna códigos CIE-O ni sustituye una revisión clínica.

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

Los cánceres de **sitios múltiples** y los que no permiten identificar el sitio se muestran en sendas categorías «Otros cánceres». No se infiere que una neoplasia sin indicación de malignidad sea cáncer. Un cáncer metastásico se asigna al sitio primario cuando el texto lo permite; el órgano de la metástasis no define la categoría.

El conteo usa pacientes únicos por año de **fecha de infusión**, no casos incidentes diagnosticados ese año. La identificación se basa en el nombre normalizado del paciente; los registros sin nombre o fecha válida se excluyen y se informan en la pantalla. El diagnóstico original no se altera.

## Fuentes consultadas

- [Instituto Nacional del Cáncer: cáncer por ubicación en el cuerpo](https://www.cancer.gov/espanol/tipos/por-partes-cuerpo).
- [Instituto Nacional del Cáncer: lista de tipos de cáncer](https://www.cancer.gov/espanol/tipos).
- [Instituto Nacional del Cáncer: cáncer metastásico y sitio primario](https://www.cancer.gov/espanol/tipos/cancer-metastatico).
- [SEER: agrupación de sitios CIE-O-3](https://seer.cancer.gov/siterecode/icdo3_2023_expanded/).

Las etiquetas finales siguen la tabla del usuario cuando esta separa sitios que podrían combinarse de otras maneras (por ejemplo, colon y recto). Se completaron los sitios ausentes para que los diagnósticos oncológicos no desaparezcan del filtro.
