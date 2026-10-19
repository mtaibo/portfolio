# Textos de la web — Español

Todos los textos que se ven en migueltaibo.com en español. Edítalos aquí y pídele a Claude que los aplique.

La web **no** lee este archivo: los textos reales están en `src/content/index.js`. Cada encabezado muestra la clave (`asi.esta`) a la que corresponde allí, para poder copiar cada cambio a su sitio.

Deja las claves como están. Cambia solo el texto que va debajo.

---

## Hero

_Home, first screen_

**`hero.name`**

Miguel Taibo

**`hero.statement`**

Construyo mi propia infraestructura, desde el firmware de un interruptor hasta la app de mi móvil.

**`hero.stack`**

- Firmware del interruptor
- Servidor en casa
- Nube personal
- App nativa

_The four labels under the diagram, left to right (top to bottom on phones)._

## Projects

_Home, project list_

**`projects.label`**

Proyectos

**`projects.more`**

Ver más

### TPCloud

**`projects.items[0].name`**

TPCloud

**`projects.items[0].tagline`**

Mi propia nube en una Raspberry Pi: un único login, mis archivos y fotos, un panel del servidor y una app nativa.

**`projects.items[0].facts`**

- Raspberry Pi 5
- Passkeys y 2FA
- App para iOS y macOS
- Sin puertos abiertos

### TPHome

**`projects.items[1].name`**

TPHome

**`projects.items[1].tagline`**

Mi propio firmware en los interruptores de persiana de mi casa, controlados desde un plano en tiempo real.

**`projects.items[1].facts`**

- Firmware ESP8266
- Protocolo MQTT binario
- Plano en tiempo real

### HackUDC 2026 — Reto Inditex

**`projects.items[2].name`**

HackUDC 2026 — Reto Inditex

**`projects.items[2].tagline`**

Encuentra los productos de una foto de moda por cómo se ven. Hecho en un fin de semana con mi equipo.

**`projects.items[2].facts`**

- CLIP ajustado
- Búsqueda con FAISS
- Entrenado sin GPU

### Dotfiles

**`projects.items[3].name`**

Dotfiles

**`projects.items[3].tagline`**

Un flake de Nix que reconstruye mi portátil, mi escritorio y mi servidor con un solo comando.

**`projects.items[3].facts`**

- macOS
- NixOS
- Raspberry Pi OS

## About

_Home, after the projects_

**`about.heading`**

Autodidacta desde los doce. Estudiante de Ingeniería Informática en la UDC.

**`about.body`**

Siempre he querido entender cómo funcionan las cosas por dentro. El backend y la arquitectura son mi fuerte, y me gusta controlar cada capa de lo que construyo.

**`about.storyLink`**

Leer mi historia

## Contact

_Home, footer_

**`contact.heading`**

Hablemos.

**`contact.subheading`**

Abierto a prácticas, colaboraciones y buenas conversaciones sobre sistemas.

**`contact.email`**

contact@migueltaibo.com

**`contact.copyright`**

© 2026 Miguel Taibo

## Project pages

_/tpcloud, /tphome, /hackudc26, /dotfiles_

### Shared labels

**`projectDetail.backToHome`**

Volver al inicio

**`projectDetail.overview`**

Descripción general

**`projectDetail.modules`**

Módulos

**`projectDetail.features`**

Características principales

**`projectDetail.architecture`**

Arquitectura

**`projectDetail.challenges`**

Retos y aprendizajes

**`projectDetail.viewOnGitHub`**

Ver en GitHub

**`projectDetail.next`**

Siguiente proyecto

### TPCloud (/tpcloud)

**`projectDetail.projects.tpcloud.name`**

TPCloud

**`projectDetail.projects.tpcloud.description`**

Mi propia nube personal, autoalojada en una Raspberry Pi. Un único inicio de sesión para todo lo que hay en migueltaibo.com, almacenamiento de archivos y copia de fotos, un panel de control del servidor y una app nativa para iPhone y Mac.

**`projectDetail.projects.tpcloud.overview`**

Cada servicio que añadía a mi servidor necesitaba su propio login, su propio puerto y su propia forma de acceder desde fuera. TPCloud los convierte en una sola nube: un gateway expuesto únicamente a través de un túnel de Cloudflare, un servicio de autenticación con el que inicio sesión una vez para todos los subdominios, y un conjunto de módulos que se conectan a él. Es mi sustituto de Google Drive, iCloud Fotos y un montón de apps sueltas, en un hardware que es mío.

**`projectDetail.projects.tpcloud.modules[0].name`**

Núcleo: gateway y autenticación

**`projectDetail.projects.tpcloud.modules[0].description`**

Caddy enruta cada subdominio y valida cada petición contra mi servicio de autenticación. Passkeys en la web, contraseña + TOTP en la app nativa, y sesiones que puedo ver y revocar desde cualquier sitio.

**`projectDetail.projects.tpcloud.modules[1].name`**

TPStore

**`projectDetail.projects.tpcloud.modules[1].description`**

Mi nube de archivos y fotos: un explorador con subidas que se reanudan, miniaturas y soporte ZIP, enlaces públicos con contraseña, y el backend al que mi iPhone sube sus fotos.

**`projectDetail.projects.tpcloud.modules[2].name`**

TPApp

**`projectDetail.projects.tpcloud.modules[2].description`**

Una app nativa en SwiftUI para iPhone y Mac que sustituye a las webs: archivos, una galería al estilo de Fotos con copia en segundo plano, mi casa en un plano en tiempo real y los ajustes de la cuenta.

**`projectDetail.projects.tpcloud.modules[3].name`**

TPAdmin

**`projectDetail.projects.tpcloud.modules[3].description`**

El panel de administración del servidor: temperatura y estado, cada contenedor y sus logs, redespliegues con un toque y sesiones de Claude Code en la Pi, todo desde el móvil.

**`projectDetail.projects.tpcloud.features`**

- Inicio de sesión único en todos los subdominios con passkeys o contraseña + TOTP
- Sin puertos abiertos: todo se accede a través de un túnel de Cloudflare
- Almacenamiento con subidas por partes que se reanudan y enlaces protegidos con contraseña
- Copia de las fotos del iPhone en segundo plano, sin duplicados y organizadas por fecha
- App nativa para iOS y macOS con Liquid Glass y una galería al estilo de Fotos
- Panel del servidor con estado, logs y redespliegues con un toque

**`projectDetail.projects.tpcloud.architecture`**

Todo corre en una Raspberry Pi 5 con Docker Compose. Un gateway Caddy detrás de cloudflared enruta cada subdominio a su contenedor en una red de Docker compartida, y pide al servicio de autenticación en FastAPI que valide la cookie de sesión antes de dejar pasar cada petición. TPStore y TPHome viven en sus propios repos y se unen a esa red como módulos, TPAdmin corre en el host como servicio de systemd, y TPApp habla directamente con todas sus APIs.

**`projectDetail.projects.tpcloud.challenges`**

TPCloud me enseñó a pensar en sistemas en vez de en apps sueltas: diseñar un flujo de autenticación que funcione tanto en el navegador como en una app nativa, mantener los módulos independientes compartiendo un solo login, y conseguir que la copia de fotos sobreviva a que iOS suspenda la app. También me hizo tomarme mucho más en serio la seguridad, porque todo es accesible desde internet.

### TPHome (/tphome)

**`projectDetail.projects.tphome.name`**

TPHome

**`projectDetail.projects.tphome.description`**

Domótica construida desde cero. Mi propio firmware en interruptores de persiana comerciales, un backend FastAPI en una Raspberry Pi que habla con ellos por un protocolo MQTT binario, y un plano de la casa en tiempo real.

**`projectDetail.projects.tphome.overview`**

Me cansé de necesitar una app y una nube distintas para cada dispositivo de mi casa, sin poder cambiar cómo se comportan. Así que abrí los interruptores, sustituí el firmware de fábrica por el mío y construí todas las capas por encima: firmware en C++ en los chips, un backend en Python en una Raspberry Pi y un panel en Vue con un plano de la casa en tiempo real. Los dispositivos solo hablan con un broker de mi red local.

**`projectDetail.projects.tphome.features`**

- Firmware propio en C++ para controladores de persiana ESP8266, con actualizaciones OTA
- Protocolo MQTT binario y compacto diseñado desde cero
- Posición calculada por tiempo: la persiana se para al 20% en la primera pulsación
- Descubrimiento y alta automática de dispositivos nuevos
- Plano SVG interactivo con actualizaciones en tiempo real por WebSocket
- También disponible como la pestaña Home de mi app nativa

**`projectDetail.projects.tphome.architecture`**

Los interruptores se conectan por WiFi a un broker Mosquitto en la Raspberry Pi. El backend FastAPI traduce los comandos REST a MQTT, interpreta el estado de 2 bytes de cada dispositivo, lo guarda en SQLite y envía eventos en directo al frontend por WebSocket. Desde fuera de casa se accede a través del gateway de TPCloud, con el mismo login que todo lo demás.

**`projectDetail.projects.tphome.challenges`**

Escribir firmware para chips con 80 KB de RAM me obligó a evitar por completo la memoria dinámica y el código bloqueante, y a calcular la posición de la persiana solo a partir del tiempo, porque no hay sensor. Hacerlo fiable ante cortes y reconexiones de WiFi llevó mucho más tiempo que hacerlo funcionar la primera vez. El soporte para chips BK7231N sigue en desarrollo.

### HackUDC 2026 — Reto Inditex (/hackudc26)

**`projectDetail.projects.hackudc26.name`**

HackUDC 2026 — Reto Inditex

**`projectDetail.projects.hackudc26.description`**

Buscador visual de moda hecho con mi equipo en un fin de semana. Subes la foto de un look y devuelve los productos más parecidos del catálogo, con un modelo CLIP ajustado y FAISS.

**`projectDetail.projects.hackudc26.overview`**

Inditex nos dio miles de fotos editoriales de modelos con looks completos y un catálogo de productos, y nos pidió encontrar qué productos aparecen en cada foto solo a partir de la imagen. Lo hicimos en el HackUDC 2026 un equipo de estudiantes de primero de Ingeniería Informática e Ingeniería de Datos: subes una foto por archivo o URL y obtienes los productos más cercanos, ordenados por parecido visual.

**`projectDetail.projects.hackudc26.features`**

- OpenCLIP ViT-B/32 ajustado con pares look–producto y una loss contrastiva
- Índice FAISS del catálogo para búsquedas en milisegundos
- Backend FastAPI con endpoints por archivo y por URL
- Frontend web sencillo con arrastrar y soltar y porcentajes de similitud
- Todo en contenedores con Docker Compose

**`projectDetail.projects.hackudc26.architecture`**

Cada producto del catálogo se convierte una vez en un embedding con el encoder ajustado y se guarda en un índice FAISS de producto interno. Al buscar, la foto subida pasa por el mismo encoder y FAISS devuelve los productos más cercanos, que la API envía con su imagen, descripción y puntuación.

**`projectDetail.projects.hackudc26.challenges`**

No teníamos GPU, así que todo el ajuste se hizo en CPU en Google Colab. Eso nos obligó a descongelar solo los cuatro últimos bloques del encoder de imagen y a sacar el máximo partido a muy poca potencia en un solo fin de semana.

### Dotfiles (/dotfiles)

**`projectDetail.projects.dotfiles.name`**

Dotfiles

**`projectDetail.projects.dotfiles.description`**

Un único flake de Nix para todas mis máquinas. Un comando configura mi MacBook, mi escritorio NixOS y la Raspberry Pi de mi servidor: mismo shell, mismos editores, mismas herramientas.

**`projectDetail.projects.dotfiles.overview`**

Antes configuraba cada máquina a mano y todas acababan siendo un poco distintas. Ahora todo mi entorno es código: un único flake de Nix describe mi MacBook, mi escritorio NixOS y mi Raspberry Pi, y cualquiera se puede reconstruir desde cero con un comando.

**`projectDetail.projects.dotfiles.features`**

- Un flake con configuraciones de nix-darwin, NixOS y Home Manager independiente
- Módulos compartidos para el shell, los editores y los paquetes en todas las máquinas
- Zsh, Starship, Kitty, Neovim y VS Code declarados en Nix
- Escritorio Hyprland con NVIDIA en NixOS
- Instalación en una línea para una Raspberry Pi recién formateada
- Un comando update que reconstruye la máquina en la que esté

**`projectDetail.projects.dotfiles.architecture`**

flake.nix define una configuración por máquina. Cada host solo declara lo que lo hace único e importa los módulos compartidos de Home Manager: el Mac y el escritorio usan el conjunto completo, la Pi solo el shell y Neovim. Los archivos de configuración normales viven en una carpeta assets y se enlazan en su sitio.

**`projectDetail.projects.dotfiles.challenges`**

Lo difícil fue mantener una única fuente de verdad para tres sistemas muy distintos (macOS, NixOS y Raspberry Pi OS) sin que la configuración se convirtiera en un laberinto de casos especiales. Nix lo hace posible, pero me llevó varias reescrituras dar con la estructura de módulos adecuada.

## Story

_/story_

**`story.backToHome`**

Volver al inicio

**`story.heading`**

Mi historia completa

**`story.subheading`**

De juegos de LEGO a sistemas distribuidos.

### Primera infancia

**`story.entries[0].era`**

Primera infancia

**`story.entries[0].title`**

Constructor de nacimiento

**`story.entries[0].body`**

Antes de tocar un ordenador, estaba obsesionado con construir cosas. Pasaba las tardes montando sets de LEGO pieza a pieza — fuera cual fuera el tamaño, los terminaba en una sola sentada. Le decía a todo el mundo que quería ser inventor.

### Primaria

**`story.entries[1].era`**

Primaria

**`story.entries[1].title`**

Scratch y robótica

**`story.entries[1].body`**

En el colegio tuve mi primer contacto con la programación a través de Scratch, y empecé a ir a clases de robótica — USB en mano — para programar en los ordenadores del cole. Visité el MUNCIT en A Coruña para ver robots de verdad. Me encantó. En casa seguía haciendo proyectillos en Scratch por pura diversión.

### 12 años

**`story.entries[2].era`**

12 años

**`story.entries[2].title`**

Python y Mastermind

**`story.entries[2].body`**

El verano que cumplí 12 años encontré a Nate Gentile en YouTube y descubrí su academia Mastermind. Empecé su curso de Python y me enganchó de inmediato — sin IA, sin atajos, solo código. Pasaba horas programando cada día.

### 12 años — ese mismo verano

**`story.entries[3].era`**

12 años — ese mismo verano

**`story.entries[3].title`**

Ciberseguridad, Linux y la terminal

**`story.entries[3].body`**

Justo después de Python, hice el curso de ciberseguridad de Savitar en Mastermind. Se abrió un mundo entero: Linux, redes, máquinas virtuales, personalización de la terminal. Tenía doce años y ya levantaba VMs y leía páginas de man.

### 15–16 años

**`story.entries[4].era`**

15–16 años

**`story.entries[4].title`**

Desarrollo web y la llamada del backend

**`story.entries[4].body`**

En tercero y cuarto de la ESO empecé con HTML, CSS y JavaScript — sobre todo con tutoriales de Dalto en YouTube. Hice calculadoras sencillas y webs pequeñas. Otros como Hola Mundo y Midu Dev me profundizaron en el mundo web, y quedó claro que lo que realmente me gustaba era el backend: la lógica, la arquitectura, los sistemas por debajo.

### Bachillerato

**`story.entries[5].era`**

Bachillerato

**`story.entries[5].title`**

Cabeza agachada, vista en el objetivo

**`story.entries[5].body`**

Dejé de lado los proyectos personales para centrarme en la selectividad. El objetivo era claro: Ingeniería Informática en la UDC. También fue la época en la que la IA empezó a aparecer por todos lados — empecé a trastear con ella pronto, mucho antes de que se pusiera de moda.

### 18 años — 1.º de carrera

**`story.entries[6].era`**

18 años — 1.º de carrera

**`story.entries[6].title`**

TPHome

**`story.entries[6].body`**

Empecé Ingeniería Informática en la Universidade Da Coruña y, en paralelo, comencé TPHome. Diseñé el firmware, el backend y el frontend completamente desde cero. Hoy controla las persianas de mi casa — de principio a fin, con software que escribí yo mismo.

### 19 años

**`story.entries[7].era`**

19 años

**`story.entries[7].title`**

TPCloud

**`story.entries[7].body`**

Este verano empecé TPCloud, mi propia nube personal. Empezó como un único inicio de sesión para mis servicios y creció hasta incluir almacenamiento de archivos, copia de fotos desde el iPhone, un panel de control de mi servidor y una app nativa en SwiftUI que lo une todo. Es lo más ambicioso que he construido hasta ahora — y todavía no he terminado.

## Fixed text

_Not in src/content/index.js; written directly in the components and the same in both languages unless noted_

**`src/components/SocialLinks.vue`**

- GitHub
- LinkedIn
- Email

**`src/components/visuals/CloudVisual.vue (TPCloud diagram)`**

- Browser
- TPApp
- Internet
- Cloudflare Tunnel
- gateway
- auth
- login, accounts, cloud, store, share, tphome, admin

**`src/components/visuals/SearchVisual.vue (HackUDC diagram, translated)`**

- tu foto

**`src/components/visuals/TerminalVisual.vue (Dotfiles terminal)`**

Command `update` and the output lines for macbook, desktop and tphome.

**`index.html (browser tab and link previews, English only)`**

- Title: Miguel Taibo
- Description: Computer Science student at UDC, building systems end to end, from custom firmware to backend and frontend.
