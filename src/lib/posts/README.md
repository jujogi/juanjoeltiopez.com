# Cómo crear un artículo nuevo

Guía para publicar artículos con la misma estructura y estrategia (SEO y búsqueda con IA) que el resto del blog. Los artículos de referencia son `planarias-content.js` y `betta-gambitas-content.js`.

## 1. Elige el tema y el título

- Parte de una **pregunta que la gente busca o te hace en redes**: "¿Puede un Betta convivir con gambitas?", "¿Cómo eliminar planarias?".
- El título responde a esa pregunta y dice de qué trata en máximo ~60 caracteres. Puede ser la pregunta misma o "Tema: lo que vas a aprender".
- Antes de escribir, revisa qué dicen los artículos que ya existen sobre el tema. Los datos (temperaturas, pH, litros, dosis) tienen que coincidir en todo el sitio. Si cambias un dato, cámbialo en todos los artículos donde aparece.

## 2. Crea el archivo del contenido

Crea `src/lib/posts/<tema>-content.js` con el texto en Markdown:

```js
export default `
Intro: 2–3 frases que presentan el problema, en primera persona.

## ¿Primera pregunta?
...
`;
```

### Estructura del texto

1. **Intro corta** (2–3 frases): el problema y por qué importa. Sin rodeos.
2. **Secciones `##` escritas como preguntas**, tal como alguien las buscaría en Google: "¿Qué temperatura necesita un Betta?" en vez de "Temperatura". Usa títulos que no sean pregunta solo cuando suene más natural ("Mi recomendación").
3. **Cada sección empieza con la respuesta directa** y luego explica. La primera frase debe servir sola, sin el resto del párrafo.
4. **`###`** para subdividir una sección ("Si son pocas…", "Si son muchas…").
5. **Tablas** para comparar (X vs Y, parámetros, pasos con dosis). A Google y a los asistentes de IA les sirven mucho.
6. **Listas** para pasos y consejos; listas numeradas cuando el orden importa.
7. **Cierre** con tu recomendación personal y enlaces a otros artículos.

### Voz

- Español de Colombia, en primera persona, como en los videos: "te cuento", "en mis acuarios", "sin afanes".
- Experiencia propia siempre que se pueda: qué usas tú, qué te funcionó, qué viste en tu fishroom.
- Nada de datos inventados: cada número sale de tu experiencia o de una fuente seria.

### Imágenes

- Guárdalas en `public/images/<carpeta-del-tema>/`, en `.jpg`, de mínimo ~1200 px de ancho para la portada.
- En el texto: `![descripción de lo que se ve](/images/...)`, y debajo, en cursiva, un pie de foto que aporte algo: `*Mi gambario de Neocaridinas con…*`.
- No repitas en el texto la misma imagen de la portada.

### Enlaces

- **Internos:** enlaza 2–3 artículos relacionados con `[texto](/blog/slug)`. Y agrega un enlace al artículo nuevo desde los artículos existentes que hablan del tema.
- **Videos:** en el texto, enlaza el video de TikTok donde lo muestras: `[en este video te muestro…](https://www.tiktok.com/...)`. Describe solo lo que de verdad pasa en el video.

## 3. Registra los videos

En `src/lib/videosData.js`, agrega cada video nuevo con su `id`, `name`, y los enlaces de TikTok e Instagram. **Quita los parámetros de seguimiento** de los enlaces de Instagram (todo lo que va después de `?`).

## 4. Registra el artículo

En `src/lib/blogData.js`, importa el contenido y agrega una entrada al final de `blogPosts`:

| Campo        | Qué poner                                                                                                                                                           |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`         | El siguiente número                                                                                                                                                 |
| `title`      | El título del paso 1                                                                                                                                                |
| `slug`       | La URL: palabras clave en minúscula, sin tildes, separadas con guiones. **No lo cambies después de publicar** (si toca, agrega una redirección en `next.config.js`) |
| `excerpt`    | 1–2 frases (máx. ~160 caracteres). Es la descripción en Google y en las tarjetas                                                                                    |
| `summary`    | **"En pocas palabras"**: 40–60 palabras que responden la pregunta principal con los datos clave. Es el texto que más citan los asistentes de IA                     |
| `category`   | Una de las categorías de `src/lib/categories.js`. Un tema solo aparece en Google cuando tiene 2 artículos o más                                                     |
| `date`       | Fecha de publicación, formato `"2026-11-08T12:00:00Z"`                                                                                                              |
| `updated`    | Solo cuando revises el artículo de verdad. Muestra "Actualizado"                                                                                                    |
| `readTime`   | Palabras ÷ 200, redondeado: `"5 min lectura"`                                                                                                                       |
| `image`      | Imagen de la tarjeta                                                                                                                                                |
| `coverImage` | Imagen grande de la portada (horizontal)                                                                                                                            |
| `level`      | `"Principiante"` o `"Avanzado"`                                                                                                                                     |
| `careSheet`  | Opcional: "Ficha rápida" con 4–6 datos clave (litros, temperatura, pH, GH…). Los `key` disponibles están en `src/components/article/CareSheet.js`                   |
| `faq`        | **3–5 preguntas frecuentes** en lenguaje natural, con respuestas de 1–3 frases que se entiendan solas. Google las recibe como datos estructurados                   |
| `videoIds`   | 2–4 videos de `videosData.js` para "Videos relacionados"                                                                                                            |

Lo demás es automático: la página, el índice de contenidos, los datos para Google (artículo, FAQ, migas de pan), el sitemap y `llms.txt`.

## 5. Revisa antes de publicar

- [ ] `npm run lint` sin errores nuevos.
- [ ] Abre el artículo en `localhost:3000/blog/<slug>`: portada, "En pocas palabras", tablas, imágenes, preguntas frecuentes y videos.
- [ ] Míralo en el celular (o con la ventana angosta): que las tablas no rompan la página.
- [ ] Prueba cada enlace interno y de video.
- [ ] Los datos coinciden con los demás artículos.
- [ ] Revisa el título y la descripción en la pestaña del navegador y en la vista previa al compartir.
