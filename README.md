# 🔥 Ferre - Chat IA con Gemini 2.5 Flash

**100% GRATIS | Sin Pagar Nada | Permanente**

Ferre es una aplicación móvil moderna desarrollada con **React Native y Expo** que integra la potencia de **Gemini 2.5 Flash** para proporcionar respuestas inteligentes en tiempo real.

## ⚡ Inicio Rápido (5 minutos)

```bash
# 1. Clonar
git clone https://github.com/tu-usuario/ferre-chat-ia.git
cd ferre-chat-ia

# 2. Instalar
npm install

# 3. Configurar API Key (GRATIS)
echo "EXPO_PUBLIC_GEMINI_API_KEY=tu_api_key_aqui" > .env

# 4. Iniciar
npm start

# 5. Escanea el código QR con Expo Go en tu teléfono
# ¡Listo! Ferre funciona GRATIS en tu teléfono
```

**[👉 Guía Rápida Completa (QUICK_START_GRATIS.md)](./QUICK_START_GRATIS.md)**

---

## 💰 100% GRATIS - Sin Pagar Nada

| Componente | Costo |
|-----------|-------|
| Desarrollo | GRATIS |
| API de Gemini | GRATIS |
| Compilación | GRATIS |
| Hosting | GRATIS |
| Base de Datos | GRATIS |
| **TOTAL** | **$0** |

**[👉 Guía Completa de Opciones Gratuitas (DEPLOYMENT_GRATIS.md)](./DEPLOYMENT_GRATIS.md)**

---

## ✨ Características Principales

- **💬 Chat en Tiempo Real**: Respuestas de Gemini con streaming para una experiencia fluida
- **🎨 Interfaz Moderna**: Diseño personalizado con gradientes, animaciones y modo oscuro/claro
- **⚡ Gemini 2.5 Flash**: Modelo IA actual y optimizado para respuestas rápidas
- **📱 Responsive**: Adaptado perfectamente para iPhone, iPad y dispositivos Android
- **🔤 Soporte Markdown**: Respuestas formateadas con código, listas y más
- **💾 Historial de Conversación**: Mantiene el contexto durante la sesión
- **🎯 Sugerencias Predefinidas**: Acceso rápido a preguntas comunes
- **🌙 Tema Personalizado**: Avatar de Ferre con animaciones de pulso

**[👉 Ver todas las características (FEATURES.md)](./FEATURES.md)**

---

## 🚀 Opciones de Uso (Todas Gratis)

### 📱 Opción 1: Expo Go (Más Fácil)
- Descarga Expo Go en tu teléfono (GRATIS)
- Ejecuta `npm start` en tu computadora
- Escanea el código QR
- ¡Listo! Ferre funciona en tu teléfono

**Ventaja**: Súper fácil, sin compilación
**Desventaja**: Solo funciona mientras la computadora está encendida

### 🌐 Opción 2: Vercel (Permanente en la Nube)
- Sube a GitHub (GRATIS)
- Conecta Vercel (GRATIS)
- Tu app estará en: `https://ferre-chat.vercel.app`
- Accesible desde cualquier navegador

**Ventaja**: Permanente, sin necesidad de computadora
**Desventaja**: Necesita conexión a internet

### 📲 Opción 3: GitHub Pages (Permanente)
- Habilita GitHub Pages en tu repositorio
- Tu app estará en: `https://tu-usuario.github.io/ferre-chat-ia`
- Completamente gratis

**Ventaja**: Súper simple, permanente
**Desventaja**: Solo web

---

## 🛠️ Requisitos Previos

- **Node.js** (versión LTS) - [Descargar](https://nodejs.org)
- **Git** - [Descargar](https://git-scm.com)
- **Expo Go** en tu teléfono (GRATIS)
- **API Key de Google Gemini** (GRATIS) - [Obtener](https://aistudio.google.com)

---

## 📖 Documentación

| Documento | Descripción |
|-----------|-----------|
| [QUICK_START_GRATIS.md](./QUICK_START_GRATIS.md) | ⚡ Inicio en 5 minutos (RECOMENDADO) |
| [DEPLOYMENT_GRATIS.md](./DEPLOYMENT_GRATIS.md) | 💰 Todas las opciones 100% gratis |
| [SETUP_GUIDE.md](./SETUP_GUIDE.md) | 📖 Guía completa de configuración |
| [FEATURES.md](./FEATURES.md) | ✨ Todas las características |
| [DEPLOYMENT.md](./DEPLOYMENT.md) | 🚀 Publicación en App Stores (opcional) |

---

## 🔑 Configuración de la API (Gratis)

### Obtener tu API Key de Gemini

1. Ve a [Google AI Studio](https://aistudio.google.com)
2. Haz clic en "Create API Key"
3. Copia tu clave API
4. Pégala en el archivo `.env`

```env
EXPO_PUBLIC_GEMINI_API_KEY=AIzaSy...tu_clave_aqui...
```

**Costo**: GRATIS ✅

---

## 📁 Estructura del Proyecto

```
ferre-chat-ia/
├── App.js                    # Componente principal
├── app.json                  # Configuración de Expo
├── package.json              # Dependencias
├── .env                      # Variables de entorno (NO commitear)
├── .gitignore               # Archivos a ignorar
├── README.md                # Este archivo
├── QUICK_START_GRATIS.md    # Inicio rápido
├── DEPLOYMENT_GRATIS.md     # Opciones gratuitas
├── SETUP_GUIDE.md           # Guía completa
├── FEATURES.md              # Características
├── DEPLOYMENT.md            # Publicación (opcional)
├── assets/                  # Iconos y splash
└── node_modules/            # Dependencias instaladas
```

---

## 🎮 Uso

### Desarrollo Local

```bash
npm start
```

Luego:
- **iOS**: Abre Cámara y escanea el código QR
- **Android**: Abre Expo Go y escanea el código QR

### Web

```bash
npm run web
```

Abre `http://localhost:19006` en tu navegador

### Compilar (Opcional)

```bash
# iOS
eas build --platform ios

# Android
eas build --platform android
```

---

## 🎨 Personalización

### Cambiar Colores

Edita los colores en `App.js`:
```javascript
const colors = isDarkMode ? {
  userBubble: '#ff6b35',
  accent: '#ff6b35',
  ferreGradient: ['#ff6b35', '#ff8c42'],
  // ...
}
```

### Cambiar Sugerencias

Modifica el array `suggestions` en `App.js`:
```javascript
const suggestions = [
  '🔥 Tu sugerencia aquí',
  '💻 Otra sugerencia',
];
```

### Cambiar Nombre

Busca "Ferre" en `App.js` y reemplaza con tu nombre

---

## 🐛 Solución de Problemas

### Error: "API Key no válida"
- Verifica que tu `.env` está configurado correctamente
- Asegúrate de que la API Key es válida en Google AI Studio
- Reinicia: `npm start`

### Error: "No se puede conectar a Gemini"
- Verifica tu conexión a internet
- Comprueba que tu API Key tiene cuota disponible
- Intenta con un mensaje más simple

### La app no se abre en el dispositivo
- Asegúrate de tener Expo Go instalado
- Verifica que estás en la misma red WiFi
- Escanea el código QR nuevamente

**[👉 Más soluciones (SETUP_GUIDE.md)](./SETUP_GUIDE.md)**

---

## 🌟 ¿Por qué Ferre es Especial?

1. **100% Gratis**: Sin costos ocultos
2. **Permanente**: Funciona para siempre
3. **Moderno**: Interfaz hermosa y responsiva
4. **Rápido**: Respuestas instantáneas
5. **Seguro**: Tu privacidad es prioritaria
6. **Personalizable**: Adapta Ferre a tu gusto
7. **Código Abierto**: Contribuye y mejora

---

## 📚 Recursos Útiles

- [Documentación de Expo](https://docs.expo.dev)
- [API de Google Generative AI](https://ai.google.dev)
- [React Native Docs](https://reactnative.dev)
- [Comunidad de Expo](https://forums.expo.dev)

---

## 🤝 Contribuir

¡Las contribuciones son bienvenidas! Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature
3. Commit tus cambios
4. Push a la rama
5. Abre un Pull Request

---

## 📄 Licencia

Este proyecto está bajo la licencia MIT. Ver `LICENSE` para más detalles.

---

## 🎯 Roadmap Futuro

- [ ] Historial persistente en la nube
- [ ] Múltiples temas personalizables
- [ ] Soporte para múltiples idiomas
- [ ] Integración con más APIs
- [ ] Soporte para voz
- [ ] Análisis de imágenes

---

## 💬 Soporte

¿Preguntas o problemas?

1. Revisa la documentación
2. Abre un issue en GitHub
3. Pregunta en comunidades

---

## 🎉 ¡Empecemos!

```bash
git clone https://github.com/tu-usuario/ferre-chat-ia.git
cd ferre-chat-ia
npm install
echo "EXPO_PUBLIC_GEMINI_API_KEY=tu_api_key_aqui" > .env
npm start
```

**Escanea el código QR con Expo Go y ¡disfruta de Ferre! 🔥**

---

**Creado con ❤️ por el equipo de Ferre**

*Última actualización: Noviembre 2025*
