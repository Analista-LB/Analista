# Página Personal · Analista Grupo LuanBeer

Página estática de accesos rápidos publicada con GitHub Pages. Los archivos visibles están en la raíz del repositorio. No requiere dependencias ni proceso de compilación.

## Modificar los accesos

Editá `links.js`. Dentro de cada categoría, cambiá `name`, `description`, `url` o `icon` del acceso correspondiente. Conservá las comillas y las comas. Para agregar un botón, copiá un objeto del arreglo `links` y editá sus campos. La descripción sigue siendo parte del buscador aunque no se muestre bajo el nombre.

## Publicar cambios

Guardá `links.js` en la rama `main` con un commit. GitHub Pages publica la carpeta raíz de esa rama. Esperá a que termine el deployment en **Settings → Pages** o **Actions** y recargá la página. No hace falta modificar `index.html` para actualizar un enlace.

Los enlaces del HTML a CSS, JavaScript y favicon son relativos, por lo que funcionan desde la ruta `/Analista/`. El archivo `.nojekyll` evita procesamientos innecesarios de GitHub Pages.
