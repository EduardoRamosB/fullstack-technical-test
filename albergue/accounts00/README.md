# Albergue Tail-World
Esta es la parte front-end

## React + TypeScript + Vite + Vitest + Mantine

Este es un proyecto basado en React con TypeScript, utilizando Vite como bundler, Vitest para pruebas, y Mantine como librería de componentes. El proyecto incluye configuración básica para HMR y ESLint con reglas recomendadas.

Actualmente, hay dos plugins oficiales disponibles para React en Vite:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) utiliza [Babel](https://babeljs.io/) para Fast Refresh.
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) utiliza [SWC](https://swc.rs/) para Fast Refresh.

## Requisitos

- Node.js (versión 14 o superior)
- npm (versión 6 o superior)

## Configuración del entorno

1. **Clona el repositorio:**

   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd nombre_del_proyecto

2. **Instala las dependencias:**
    ```bash
   npm install

3. **Ejecuta el servidor de desarrollo:**
   ```bash
   npm run dev
Esto iniciará el servidor de desarrollo en http://localhost:5173/.


## Importante:
Antes de ejecutar los test y coverage, ir a `accounts00/vitest.setup.mjs` y descomentar este bloque. De lo contrario, no funcionarán ni test ni coverage. Se comentan las líneas solo porque SonarCloud lanza observaciones al código al encontrar que `observe`, `unobserve`, y `disconnect` no se usan directamente en el código.
   ````bash
  
      class ResizeObserver {
         observe() {}
         unobserve() {}
         disconnect() {}
       }
      window.ResizeObserver = ResizeObserver;
 

## PRUEBAS
Las pruebas están configuradas utilizando Vitest y adaptadas para la librería Mantine.

1. **Para ejecutar las pruebas, utiliza el siguiente comando:**
   npm test

2. **Para ejecutar coberturad de codigo (coverage), utiliza el siguiente comando:**
   vitest run --coverage
