# 📖 Guía Completa de Configuración - Ferre Chat IA

Esta guía te ayudará a configurar **Ferre** desde cero en tu máquina Windows, Mac o Linux.

## 🎯 Tabla de Contenidos

1. [Requisitos Previos](#requisitos-previos)
2. [Instalación Paso a Paso](#instalación-paso-a-paso)
3. [Configuración de la API](#configuración-de-la-api)
4. [Desarrollo Local](#desarrollo-local)
5. [Compilación para iOS (Sin Mac)](#compilación-para-ios-sin-mac)
6. [Compilación para Android](#compilación-para-android)
7. [Despliegue en App Store](#despliegue-en-app-store)
8. [Solución de Problemas](#solución-de-problemas)

---

## 🛠️ Requisitos Previos

### Software Necesario

- **Node.js** (versión 16 o superior)
  - Descarga desde: https://nodejs.org
  - Verifica: `node --version` y `npm --version`

- **Git** (para control de versiones)
  - Descarga desde: https://git-scm.com
  - Verifica: `git --version`

- **Expo CLI** (se instala con npm)
  - Se instala automáticamente en el primer `npm start`

- **Expo Go** (aplicación móvil)
  - iOS: Descarga desde App Store
  - Android: Descarga desde Google Play Store

### Cuentas Necesarias

- **Cuenta de Google** (para API de Gemini)
- **Cuenta de GitHub** (opcional, para repositorio)
- **Cuenta de Expo** (gratuita, para compilación)

---

## 📥 Instalación Paso a Paso

### Paso 1: Clonar el Repositorio

```bash
# Abre tu terminal/CMD
git clone https://github.com/tu-usuario/ferre-chat-ia.git
cd ferre-chat-ia
```

### Paso 2: Instalar Dependencias

```bash
npm install
```

Esto instalará:
- React Native
- Expo
- Google Generative AI
- React Native Markdown Display
- Expo Linear Gradient
- Y más...

**Tiempo estimado**: 2-5 minutos

### Paso 3: Crear Archivo .env

En la raíz del proyecto, crea un archivo llamado `.env`:

```bash
# Windows (CMD)
echo EXPO_PUBLIC_GEMINI_API_KEY=tu_api_key_aqui > .env

# Mac/Linux
echo "EXPO_PUBLIC_GEMINI_API_KEY=tu_api_key_aqui" > .env
```

O crea el archivo manualmente con tu editor favorito.

---

## 🔑 Configuración de la API

### Obtener tu API Key de Gemini

1. **Abre Google AI Studio**:
   - Ve a: https://aistudio.google.com
   - Inicia sesión con tu cuenta de Google

2. **Crear API Key**:
   - Haz clic en "Create API Key"
   - Selecciona "Create API key in new project"
   - Copia la clave generada

3. **Guardar en .env**:
   ```env
   EXPO_PUBLIC_GEMINI_API_KEY=AIzaSy...tu_clave_aqui...
   ```

### Verificar que Funciona

```bash
npm start
```

Si ves el código QR, ¡está funcionando!

---

## 💻 Desarrollo Local

### Opción 1: Expo Go (Recomendado para Desarrollo)

1. **Inicia el servidor**:
```bash
npm start
```

2. **Escanea el código QR**:
   - iOS: Abre la cámara y escanea
   - Android: Abre Expo Go y escanea

3. **La app se abrirá en tu dispositivo**

### Opción 2: Emulador

#### Para iOS (Mac solo):
```bash
npm run ios
```

#### Para Android:
```bash
npm run android
```

### Opción 3: Web (Desarrollo Rápido)
```bash
npm run web
```

Abre http://localhost:19006 en tu navegador

---

## 🍎 Compilación para iOS (Sin Mac)

### ¿Por qué sin Mac?

Normalmente necesitarías una Mac para compilar apps iOS. Con **EAS Build**, Expo compila en la nube. ¡Magia! ✨

### Paso 1: Instalar EAS CLI

```bash
npm install -g eas-cli
```

Verifica: `eas --version`

### Paso 2: Autenticarse

```bash
eas login
```

Sigue las instrucciones para crear/iniciar sesión en tu cuenta de Expo

### Paso 3: Compilar para iOS

```bash
eas build --platform ios
```

**Opciones**:
- `--platform ios` - Compilar solo para iOS
- `--platform android` - Compilar solo para Android
- Sin parámetro - Compilar para ambos

### Paso 4: Descargar el .ipa

1. Espera a que termine la compilación (5-15 minutos)
2. EAS te dará un enlace para descargar el archivo `.ipa`
3. Descárgalo en tu computadora

### Paso 5: Instalar en tu iPhone

#### Opción A: Usando Expo Go (Más Fácil)
```bash
eas build --platform ios --profile preview
```

Luego abre el enlace en tu iPhone y selecciona "Abrir en Expo Go"

#### Opción B: Usando TestFlight (Más Complejo)
1. Necesitas una cuenta de desarrollador de Apple ($99/año)
2. Sube el .ipa a TestFlight
3. Invita a testers
4. Instala desde TestFlight

#### Opción C: Instalación Manual
Usa herramientas como **Altstore** o **Sideloadly** para instalar el .ipa

---

## 🤖 Compilación para Android

### Paso 1: Compilar

```bash
eas build --platform android
```

### Paso 2: Descargar el APK

1. Espera a que termine (5-15 minutos)
2. Descarga el archivo `.apk`

### Paso 3: Instalar en tu Android

```bash
adb install nombre-del-archivo.apk
```

O transfiere el `.apk` a tu dispositivo y abre con un gestor de archivos

---

## 🚀 Despliegue en App Store

### Para iOS

1. **Crear cuenta de desarrollador**:
   - Ve a: https://developer.apple.com
   - Paga $99/año
   - Crea certificados

2. **Compilar para producción**:
```bash
eas build --platform ios --profile production
```

3. **Subir a App Store Connect**:
```bash
eas submit --platform ios
```

### Para Google Play

1. **Crear cuenta de desarrollador**:
   - Ve a: https://play.google.com/console
   - Paga $25 (una sola vez)

2. **Compilar para producción**:
```bash
eas build --platform android --profile production
```

3. **Subir a Google Play**:
```bash
eas submit --platform android
```

---

## 🐛 Solución de Problemas

### Error: "EXPO_PUBLIC_GEMINI_API_KEY is not set"

**Solución**:
1. Verifica que existe el archivo `.env`
2. Verifica que tiene el formato correcto:
   ```env
   EXPO_PUBLIC_GEMINI_API_KEY=AIzaSy...
   ```
3. Reinicia: `npm start`

### Error: "Cannot find module '@google/generative-ai'"

**Solución**:
```bash
npm install @google/generative-ai
```

### Error: "API Key inválida"

**Solución**:
1. Ve a https://aistudio.google.com
2. Verifica que la API Key es válida
3. Copia nuevamente sin espacios
4. Actualiza `.env`

### La app no se abre en el dispositivo

**Solución**:
1. Verifica que Expo Go está instalado
2. Verifica que estás en la misma red WiFi
3. Reinicia: `npm start`
4. Escanea el código QR nuevamente

### Error: "Build failed"

**Solución**:
1. Limpia el caché: `expo start --clear`
2. Reinstala dependencias: `rm -rf node_modules && npm install`
3. Intenta nuevamente: `eas build --platform ios`

### El chat no responde

**Solución**:
1. Verifica tu conexión a internet
2. Verifica que tu API Key tiene cuota
3. Intenta con un mensaje más simple
4. Revisa la consola para errores

---

## 📚 Comandos Útiles

```bash
# Iniciar desarrollo
npm start

# Compilar para iOS
eas build --platform ios

# Compilar para Android
eas build --platform android

# Compilar para ambos
eas build

# Limpiar caché
expo start --clear

# Reinstalar dependencias
npm install

# Ver logs
npm start -- --verbose

# Actualizar Expo
npm install -g expo-cli@latest
```

---

## 🎓 Próximos Pasos

1. **Personaliza los colores** en `App.js`
2. **Añade más sugerencias** en el array `suggestions`
3. **Cambia los mensajes de bienvenida**
4. **Sube a GitHub** para compartir con otros
5. **Publica en App Store/Play Store**

---

## 💬 Soporte

Si tienes problemas:

1. Revisa esta guía nuevamente
2. Consulta la documentación oficial:
   - https://docs.expo.dev
   - https://ai.google.dev
3. Abre un issue en GitHub
4. Pregunta en comunidades:
   - Expo Discord
   - React Native Community

---

## 🎉 ¡Felicidades!

¡Ya tienes Ferre funcionando! Ahora puedes:

- ✅ Desarrollar localmente
- ✅ Compilar para iOS sin Mac
- ✅ Compilar para Android
- ✅ Publicar en App Stores
- ✅ Compartir con el mundo

**¡Disfruta creando con Ferre! 🔥**

---

*Última actualización: Noviembre 2025*
