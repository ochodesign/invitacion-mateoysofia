
# Invitación Digital de Casamiento

Este proyecto es una invitación digital interactiva para un casamiento, desarrollada en React y Tailwind CSS, lista para ser subida a un hosting como Hostinger.

## Características principales
- Diseño elegante y moderno, adaptado a la temática de boda.
- Paleta de colores personalizada: bordó/rojo pasión como color principal y detalles en blanco.
- Tipografía elegante para toda la web.
- Secciones:
  - **Cuenta regresiva** al evento.
  - **Sobre nosotros**: historia de los novios.
  - **Galería de fotos** con lightbox y navegación por teclado.
  - **Información del evento**: ceremonia, dress code y ubicación con Google Maps.
  - **Regalos**: datos de CBU y alias para transferencias.
  - **Formulario de confirmación** (opcional, según configuración).
  - **Footer** con créditos y frase romántica.
- Totalmente responsive y optimizada para móviles.

## Instalación y uso local
1. Clona el repositorio:
	```bash
	git clone https://github.com/ochodesign/inv-casamiento.git
	```
2. Instala las dependencias:
	```bash
	npm install
	```
3. Inicia el entorno de desarrollo:
	```bash
	npm start
	```
4. Para generar la versión lista para subir a un hosting:
	```bash
	npm run build
	```
	Los archivos finales estarán en la carpeta `public`.

## Despliegue en Hostinger (u otro hosting)
1. Comprime el contenido de la carpeta `public` en un .zip.
2. Sube y descomprime ese .zip en la carpeta pública de tu hosting (`public_html`).
3. Accede a tu dominio y ¡listo!

## Personalización
- Puedes cambiar textos, imágenes y colores editando los archivos en `src/components` y la configuración en `tailwind.config.js`.
- Las imágenes se encuentran en `public/img`.

## Créditos
- Desarrollado por Ocho Design Web.
- Basado en React, Tailwind CSS y Webpack.

---
¡Gracias por acompañarnos en este día tan especial!
