# ✈️ Viajar en un Click - Sitio Web en Construcción

Página estática oficial de despegue para **Viajar en un Click** (`info@viajarenunclick.com.ar`).

## 🚀 Características
- **Diseño Responsivo & Glassmorphic:** Paleta vibrante alineada al logo oficial.
- **Micro-Animaciones:** Canvas dinámico con trazos de vuelo de aviones y nubes flotantes.
- **Contacto Directo:** Botón de copiado en 1-click para `info@viajarenunclick.com.ar` con alertas *toast*.
- **Formulario de Registro:** Captura de correo para notificación de lanzamiento.
- **Optimizado para Cloudflare Pages:** Configurado con cabeceras de caché y rutas automáticas.

## 🛠️ Archivos del Proyecto
- `index.html` - Maquetación y accesibilidad.
- `styles.css` - Estilos CSS3, variables y animación.
- `script.js` - Lógica de portapapeles, animaciones canvas y formulario.
- `logo.png` - Logo oficial del sitio.
- `_headers` - Cabeceras de seguridad y caché para Cloudflare Pages.
- `_routes.json` - Enrutamiento para Cloudflare Pages.

---

## ⚡ Despliegue en Cloudflare Pages

### Opción 1: Conexión Directa con GitHub (Recomendado)
1. Entrá a tu panel de [Cloudflare Dashboard](https://dash.cloudflare.com/).
2. Ve a **Workers & Pages** > **Create application** > **Pages** > **Connect to Git**.
3. Seleccioná este repositorio (`viajar-en-un-click`).
4. Configuración de Build:
   - **Framework preset:** None (Static HTML)
   - **Build command:** *(dejar en blanco)*
   - **Build output directory:** `/` *(o la raíz del proyecto)*
5. Hacé clic en **Save and Deploy**. ¡Listo!

### Opción 2: Usando Wrangler CLI
```bash
npx wrangler pages deploy . --project-name=viajar-en-un-click
```

---
© 2026 Viajar en un Click. Todos los derechos reservados.
