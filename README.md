# Marvel Challenge · Juan Antonio Ledesma

## Introducción

Este proyecto consiste en una aplicación web que permite visualizar un listado de personajes de Marvel, buscar personajes específicos y marcar favoritos. Además, se puede acceder a un detalle de cada personaje donde se muestra información relevante y los cómics en los que aparece.

El desarrollo ha seguido una arquitectura modular y escalable, asegurando la correcta separación de responsabilidades.

## Instalación

Para instalar y ejecutar el proyecto, sigue estos pasos:

### 1. Instalar dependencias

```
npm install
```

### 2. Configurar variables de entorno

Crear un archivo `.env.local` en la raíz del proyecto con las siguientes variables:

```
NEXT_PUBLIC_MARVEL_PUBLIC_KEY=01e858cb06141804100ba176c95c5124
NEXT_PUBLIC_MARVEL_PRIVATE_KEY=af21f5ec17d522217cf8ffd39eb5a08f4417b6c7
```

### 3. Ejecutar el modo desarrollo

```
npm run dev
```

## Tecnologías utilizadas

- Next.js 15.1.6

- React 19

- Node.js >= 20

- TypeScript y .tsx

- SASS para los estilos (.modules.scss -> te permite encapsular estilos), también se han utilizado custom properties

- ESLint y Prettier para formateo y estándares de código

- Vitest + Testing Library para pruebas unitarias y de integración

- MD5 para el manejo de hash

- JSDOM para emulación del DOM en pruebas

## Estructura del proyecto

```
marvel-challenge-juan-antonio-ledesma/
├── .next/ # Archivos generados por Next.js
├── node_modules/ # Dependencias del proyecto
├── public/ # Archivos estáticos
├── src/
│ ├── **tests**/ # Pruebas unitarias y de integración
│ ├── app/ # Punto de entrada de la aplicación
│ ├── assets/ # Imágenes, fuentes y recursos
│ ├── common/ # Componentes compartidos
│ │ ├── components/
│ │ │ ├── Header/
│   │   │   ├── Header.module.scss
│   │   │   ├── Header.tsx
│ │ │ ├── Main/
│ │ │ ├── MessageParagraph/
│ │ ├── styles/
│ ├── features/characters/ # Feature concreta (se puede añadir más features para escalar mejor el proyecto)
│ │ ├── components/
│ │ │ ├── CharacterCard/
│ │ │ ├── CharacterInfo/
│ │ │ ├── CharacterList/
│ │ │ ├── CharacterSearch/
│ │ │ ├── ComicsInfo/
│ │ │ ├── FavoriteButton/
│ │ ├── context/
│ ├── hooks/
│ ├── services/
│ ├── types/
│ ├── setupTests.ts
├── .env.local # Variables de entorno locales
├── .gitignore # Archivos a ignorar en Git
├── .prettierrc # Configuración de Prettier
├── eslint.config.mjs # Configuración de ESLint
├── next-env.d.ts # Tipado global para Next.js
├── next.config.ts # Configuración de Next.js
├── package-lock.json
├── package.json # Dependencias y scripts
├── README.md # Documentación del proyecto
├── tsconfig.json # Configuración de TypeScript
├── vitest.config.ts # Configuración de Vitest
```

## Scripts disponibles

- `npm run dev`: Ejecuta el entorno de desarrollo con TurboPack

- `npm run build`: Construye el proyecto para producción

- `npm run start`: Inicia la aplicación en modo producción

- `npm run lint`: Ejecuta ESLint para analizar el código

- `npm run lint:fix`: Corrige errores de linting automáticamente

- `npm run format`: Formatea el código con Prettier

- `npm run test`: Ejecuta las pruebas con Vitest

## Pruebas

Se han implementado pruebas unitarias y de integración utilizando Vitest y Testing Library. Un ejemplo de prueba:

```
import { render, screen } from '@testing-library/react';
import CharacterList from '../components/CharacterList';

test('Muestra la lista de personajes', () => {
render(<CharacterList />);
expect(screen.getByText(/Spider-Man/i)).toBeInTheDocument();
});
```

## Conclusión

Este proyecto cumple con los requerimientos de la prueba técnica, aplicando buenas prácticas de desarrollo, arquitectura escalable y optimización del rendimiento.
