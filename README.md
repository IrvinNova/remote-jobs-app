Remote Jobs App
Aplicación móvil desarrollada con React Native + Expo, que permite buscar empleos remotos usando la API pública de Remotive, con funcionalidades de búsqueda, filtros, favoritos persistentes y detalle de empleo.

🚀 Funcionalidades
📋 Listado de empleos remotos
🔍 Búsqueda por título o empresa
🏷 Filtro por categoría
⏱ Filtro por tipo de empleo (full-time, contract, etc.)
♾ Infinite scroll
⭐ Guardar y quitar empleos de favoritos
💾 Favoritos persistentes (AsyncStorage)
📄 Vista de detalle de empleo
🌐 Aplicar al empleo (abre URL externa)
📤 Compartir empleo
🔄 Pull to refresh
🎨 UI con iconos PNG
⚠ Estados visuales: loading, error, sin resultados

🛠 Tecnologías usadas
- Expo SDK 52
- React Native
- TypeScript
- Zustand (state management)
- AsyncStorage
- React Navigation
- Remotive Public API

📦 Requisitos previos
- Asegúrate de tener instalado:
- Node.js ≥ 18
- npm o yarn
- Expo CLI
- iOS Simulator (macOS) o Android Emulator
(o Expo Go en un dispositivo físico)

Instalar Expo CLI (si no lo tienes):
npm install -g expo-cli

▶️ Instalación y ejecución
1️⃣ Clonar el repositorio

git clone https://github.com/IrvinNova/remote-jobs-app
cd remote-jobs-app

2️⃣ Instalar dependencias
npm install
# o
yarn install

3️⃣ Ejecutar la aplicación
npx expo start

Opciones disponibles:

- Presiona i para iOS
- Presiona a para Android
- Escanea el QR con Expo Go

🧹 (Opcional) Limpiar caché si hay errores
npx expo start -c


🔌 API utilizada
Remotive Jobs API

Listado de empleos:
https://remotive.com/api/remote-jobs

📂 Estructura del proyecto (resumen)

src/
 ├── api/
 │   └── remotiveApi.ts
 ├── components/
 │   ├── JobCard.tsx
 │   ├── CategoryFilter.tsx
 │   └── JobTypeFilter.tsx
 ├── screens/
 │   ├── JobsListScreen.tsx
 │   ├── JobDetailScreen.tsx
 │   └── FavoritesScreen.tsx
 ├── store/
 │   └── jobsStore.ts
 ├── constants/
 │   └── icons.ts
 ├── types/
 │   └── job.ts
assets/
 └── icons/

💾 Persistencia de favoritos

Los favoritos se almacenan localmente usando:

- zustand/middleware
- createJSONStorage
- @react-native-async-storage/async-storage

Esto permite que los favoritos se mantengan incluso después de cerrar la app.

🧪 Posibles mejoras futuras
- Autenticación de usuario
- Guardar filtros preferidos
- Paginación real desde API
- Modo oscuro
- Tests unitarios
- Publicación en stores

👨‍💻 Autor
Desarrollado por Irvin Nova