# Textos de la web - Español

Todos los textos que se ven en migueltaibo.com en español.

La web **no** lee este archivo: los textos reales están en `src/content/index.js`. Cada encabezado muestra la clave (`asi.esta`) a la que corresponde allí, para poder copiar cada cambio a su sitio.

Deja las claves como están. Cambia solo el texto que va debajo.

---

## Hero

_Home, first screen_

**`hero.name`**

Miguel Taibo

**`hero.statement`**

Estudio Ingeniería Informática en la UDC y construyo mi propia infraestructura: firmware, servidores y apps nativas.

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

Nube personal en una Raspberry Pi 5. Login único, archivos, copia de fotos, panel del servidor y app nativa.

**`projects.items[0].facts`**

- Raspberry Pi 5
- Passkeys y 2FA
- App para iOS y macOS
- Sin puertos abiertos

### TPHome

**`projects.items[1].name`**

TPHome

**`projects.items[1].tagline`**

Firmware propio para los interruptores de persiana de mi casa, con backend en una Raspberry Pi y un plano en tiempo real.

**`projects.items[1].facts`**

- Firmware ESP8266
- Protocolo MQTT binario
- Plano en tiempo real

### HackUDC 2026 — Reto Inditex

**`projects.items[2].name`**

HackUDC 2026 — Reto Inditex

**`projects.items[2].tagline`**

Buscador visual: a partir de una foto de moda, encuentra los productos del catálogo. Desarrollado en equipo en un fin de semana.

**`projects.items[2].facts`**

- CLIP ajustado
- Búsqueda con FAISS
- Entrenado sin GPU

### Dotfiles

**`projects.items[3].name`**

Dotfiles

**`projects.items[3].tagline`**

Un flake de Nix que configura mi portátil, mi escritorio y mi servidor con un solo comando.

**`projects.items[3].facts`**

- macOS
- NixOS
- Raspberry Pi OS

## About

_Home, after the projects_

**`about.heading`**

Autodidacta desde los doce.

**`about.body`**

Me centro en backend y arquitectura de sistemas. En mis proyectos desarrollo cada capa, del hardware a la interfaz, para entender y controlar cómo funciona el conjunto.

**`about.storyLink`**

Mi historia

## Contact

_Home, footer_

**`contact.heading`**

Contacto

**`contact.subheading`**

Busco prácticas en backend o infraestructura.

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

Resumen

**`projectDetail.modules`**

Módulos

**`projectDetail.features`**

Funciones

**`projectDetail.architecture`**

Arquitectura

**`projectDetail.challenges`**

Retos

**`projectDetail.viewOnGitHub`**

Ver en GitHub

**`projectDetail.next`**

Siguiente proyecto

### TPCloud (/tpcloud)

**`projectDetail.projects.tpcloud.name`**

TPCloud

**`projectDetail.projects.tpcloud.description`**

Nube personal autoalojada en una Raspberry Pi 5. Un único inicio de sesión para todos los servicios de migueltaibo.com, almacenamiento de archivos, copia de fotos, panel de administración y app nativa para iPhone y Mac.

**`projectDetail.projects.tpcloud.overview`**

Cada servicio de mi servidor tenía su propio login, su propio puerto y su propia forma de acceso externo. TPCloud los unifica. Un gateway, accesible solo a través de un túnel de Cloudflare, valida cada petición contra un servicio de autenticación común a todos los subdominios. Cada servicio es un módulo independiente que se conecta a ese núcleo. El sistema sustituye a Google Drive, iCloud Fotos y varias apps sueltas.

**`projectDetail.projects.tpcloud.modules[0].name`**

Núcleo: gateway y autenticación

**`projectDetail.projects.tpcloud.modules[0].description`**

Caddy enruta cada subdominio y valida cada petición contra el servicio de autenticación. Passkeys en la web, contraseña y TOTP en la app nativa. Las sesiones se pueden consultar y revocar desde cualquier dispositivo.

**`projectDetail.projects.tpcloud.modules[1].name`**

TPStore

**`projectDetail.projects.tpcloud.modules[1].description`**

Almacenamiento de archivos y fotos. Subidas por partes reanudables, miniaturas, soporte para ZIP y enlaces públicos con contraseña. Es el destino de la copia de fotos del iPhone.

**`projectDetail.projects.tpcloud.modules[2].name`**

TPApp

**`projectDetail.projects.tpcloud.modules[2].description`**

App nativa en SwiftUI para iPhone y Mac que sustituye a las interfaces web: archivos, galería con copia de fotos en segundo plano, control de la casa sobre el plano en tiempo real y ajustes de la cuenta.

**`projectDetail.projects.tpcloud.modules[3].name`**

TPAdmin

**`projectDetail.projects.tpcloud.modules[3].description`**

Panel de administración del servidor, pensado para el móvil. Temperatura y estado del sistema, contenedores y sus logs, redespliegues con un toque y sesiones de Claude Code en la Pi.

**`projectDetail.projects.tpcloud.features`**

- Inicio de sesión único en todos los subdominios, con passkeys o contraseña y TOTP
- Ningún puerto abierto: acceso exclusivo por túnel de Cloudflare
- Subidas por partes reanudables y enlaces protegidos con contraseña
- Copia de fotos del iPhone en segundo plano, sin duplicados y organizada por fecha
- App nativa para iOS y macOS con Liquid Glass
- Panel del servidor con estado, logs y redespliegues

**`projectDetail.projects.tpcloud.architecture`**

Todo corre en una Raspberry Pi 5 con Docker Compose. Un gateway Caddy detrás de cloudflared enruta cada subdominio a su contenedor dentro de una red Docker compartida. Antes de dejar pasar una petición, consulta al servicio de autenticación en FastAPI si la cookie de sesión es válida. TPStore y TPHome viven en repositorios propios y se unen a esa red como módulos. TPAdmin corre en el host como servicio de systemd. TPApp se comunica directamente con todas las APIs.

**`projectDetail.projects.tpcloud.challenges`**

El primer reto fue diseñar un flujo de autenticación válido tanto para el navegador como para una app nativa. El segundo, mantener los módulos en repositorios independientes compartiendo un solo login. El tercero, que la copia de fotos sobreviva a la suspensión de la app por parte de iOS. Al estar expuesto a internet, la seguridad condicionó cada decisión de diseño.

### TPHome (/tphome)

**`projectDetail.projects.tphome.name`**

TPHome

**`projectDetail.projects.tphome.description`**

Domótica propia de principio a fin. Firmware en C++ para interruptores de persiana comerciales, backend en FastAPI sobre una Raspberry Pi, protocolo MQTT binario y un plano de la casa en tiempo real.

**`projectDetail.projects.tphome.overview`**

Cada dispositivo de casa necesitaba su propia app y su propia nube, sin posibilidad de cambiar su comportamiento. Sustituí el firmware de fábrica de los interruptores por uno propio y construí el resto de capas: firmware en C++, backend en Python en una Raspberry Pi y panel en Vue con el plano de la casa. Los dispositivos solo se comunican con un broker en la red local.

**`projectDetail.projects.tphome.features`**

- Firmware propio en C++ para controladores de persiana ESP8266, con actualizaciones OTA
- Protocolo MQTT binario diseñado desde cero
- Posición calculada por tiempo: la primera pulsación para la persiana al 20%
- Descubrimiento y alta automática de dispositivos nuevos
- Plano SVG interactivo con actualizaciones por WebSocket
- Integrado como la pestaña Home de TPApp

**`projectDetail.projects.tphome.architecture`**

Los interruptores se conectan por WiFi a un broker Mosquitto en la Raspberry Pi. El backend en FastAPI traduce los comandos REST a MQTT, interpreta el estado de 2 bytes de cada dispositivo, lo guarda en SQLite y emite eventos al frontend por WebSocket. El acceso desde fuera de casa pasa por el gateway de TPCloud, con el mismo login que el resto de servicios.

**`projectDetail.projects.tphome.challenges`**

Los chips tienen 80 KB de RAM. El firmware evita por completo la memoria dinámica y el código bloqueante, y calcula la posición de la persiana solo por tiempo, porque no hay sensor. La parte más costosa fue hacerlo fiable ante cortes y reconexiones de WiFi. El soporte para chips BK7231N está en desarrollo.

### HackUDC 2026 — Reto Inditex (/hackudc26)

**`projectDetail.projects.hackudc26.name`**

HackUDC 2026 — Reto Inditex

**`projectDetail.projects.hackudc26.description`**

Buscador visual de moda desarrollado en equipo durante un fin de semana. A partir de la foto de un look, devuelve los productos más parecidos del catálogo con un modelo CLIP ajustado y FAISS.

**`projectDetail.projects.hackudc26.overview`**

Inditex proporcionó miles de fotos editoriales con looks completos y su catálogo de productos. El reto era identificar qué productos aparecen en cada foto usando solo la imagen. Lo resolvimos un equipo de estudiantes de primero de Ingeniería Informática e Ingeniería de Datos. La foto se sube por archivo o URL y el sistema devuelve los productos ordenados por similitud visual.

**`projectDetail.projects.hackudc26.features`**

- OpenCLIP ViT-B/32 ajustado con pares look–producto y loss contrastiva
- Índice FAISS del catálogo con búsquedas en milisegundos
- Backend en FastAPI con endpoints por archivo y por URL
- Frontend web con arrastrar y soltar y porcentaje de similitud
- Despliegue con Docker Compose

**`projectDetail.projects.hackudc26.architecture`**

Cada producto del catálogo se convierte una vez en un embedding con el encoder ajustado y se guarda en un índice FAISS de producto interno. En cada búsqueda, la foto pasa por el mismo encoder y FAISS devuelve los productos más cercanos. La API los envía con su imagen, descripción y puntuación.

**`projectDetail.projects.hackudc26.challenges`**

No teníamos GPU, así que todo el ajuste fino se hizo en CPU en Google Colab. Para que el entrenamiento cupiera en un fin de semana, solo descongelamos los cuatro últimos bloques del encoder de imagen.

### Dotfiles (/dotfiles)

**`projectDetail.projects.dotfiles.name`**

Dotfiles

**`projectDetail.projects.dotfiles.description`**

Un único flake de Nix para todas mis máquinas. Un comando configura mi MacBook, mi escritorio con NixOS y la Raspberry Pi del servidor con el mismo shell, editores y herramientas.

**`projectDetail.projects.dotfiles.overview`**

Configuraba cada máquina a mano y ninguna quedaba igual. Ahora todo el entorno está definido en código: un flake describe las tres máquinas y cualquiera se reconstruye desde cero con un comando.

**`projectDetail.projects.dotfiles.features`**

- Un flake con configuraciones de nix-darwin, NixOS y Home Manager independiente
- Módulos compartidos de shell, editores y paquetes para todas las máquinas
- Zsh, Starship, Kitty, Neovim y VS Code declarados en Nix
- Escritorio Hyprland con NVIDIA en NixOS
- Instalación en una línea para una Raspberry Pi recién formateada
- Un comando update que reconstruye la máquina actual

**`projectDetail.projects.dotfiles.architecture`**

flake.nix define una configuración por máquina. Cada host declara solo lo que lo diferencia e importa los módulos compartidos de Home Manager. El Mac y el escritorio usan el conjunto completo; la Pi, solo el shell y Neovim. Los archivos de configuración convencionales viven en una carpeta assets y se enlazan en su ruta.

**`projectDetail.projects.dotfiles.challenges`**

Mantener una sola fuente de verdad para macOS, NixOS y Raspberry Pi OS sin llenar la configuración de casos especiales. Nix lo permite, pero necesité varias reescrituras hasta dar con una estructura de módulos que escalara.

## Story

_/story_

**`story.backToHome`**

Volver al inicio

**`story.heading`**

Mi historia

**`story.subheading`**

Cómo empecé a programar y lo que he construido desde entonces.

### Primera infancia

**`story.entries[0].era`**

Infancia

**`story.entries[0].title`**

LEGO

**`story.entries[0].body`**

Montaba los sets de LEGO de una sentada, fuera cual fuera su tamaño. A quien me preguntaba, le decía que quería ser inventor.

### Primaria

**`story.entries[1].era`**

Primaria

**`story.entries[1].title`**

Scratch y robótica

**`story.entries[1].body`**

Mis primeros programas fueron en Scratch, en el colegio, junto con clases de robótica. Una visita al MUNCIT de A Coruña me acercó a los robots reales. En casa seguía haciendo proyectos en Scratch.

### 12 años

**`story.entries[2].era`**

12 años

**`story.entries[2].title`**

Python

**`story.entries[2].body`**

Ese verano empecé el curso de Python de Mastermind, la academia de Nate Gentile. Programaba varias horas al día.

### 12 años — ese mismo verano

**`story.entries[3].era`**

12 años

**`story.entries[3].title`**

Linux y ciberseguridad

**`story.entries[3].body`**

Después hice el curso de ciberseguridad de Savitar, también en Mastermind. Aprendí Linux, redes y máquinas virtuales, y empecé a trabajar desde la terminal.

### 15–16 años

**`story.entries[4].era`**

15–16 años

**`story.entries[4].title`**

Desarrollo web

**`story.entries[4].body`**

En 3.º y 4.º de la ESO aprendí HTML, CSS y JavaScript con los tutoriales de Dalto, Hola Mundo y midudev, y construí calculadoras y webs pequeñas. Ahí vi que lo que me interesaba era el backend: la lógica y la arquitectura.

### Bachillerato

**`story.entries[5].era`**

Bachillerato

**`story.entries[5].title`**

Selectividad

**`story.entries[5].body`**

Aparqué los proyectos personales para preparar la selectividad y entrar en Ingeniería Informática en la UDC. En esa época empecé a trabajar con herramientas de IA.

### 18 años — 1.º de carrera

**`story.entries[6].era`**

18 años · 1.º de carrera

**`story.entries[6].title`**

TPHome

**`story.entries[6].body`**

Empecé Ingeniería Informática en la Universidade da Coruña y, en paralelo, TPHome: firmware, backend y frontend desde cero. Hoy controla las persianas de mi casa.

### 19 años

**`story.entries[7].era`**

19 años

**`story.entries[7].title`**

TPCloud

**`story.entries[7].body`**

En el verano de 2026 empecé TPCloud. Nació como un login único para mis servicios y hoy incluye almacenamiento de archivos, copia de fotos del iPhone, un panel del servidor y una app nativa en SwiftUI. Sigue en desarrollo.

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
- Description: Software Engineering student at UDC. I build complete systems: firmware, backend and native apps.