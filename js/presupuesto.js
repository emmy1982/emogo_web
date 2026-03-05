// ─────────────────────────────────────────────────────────────
// CONFIGURACIÓN EmailJS
// 1. Regístrate en https://www.emailjs.com (gratis hasta 200 emails/mes)
// 2. Crea un Service (Gmail) y anota el SERVICE_ID
// 3. Crea un Template con las variables del formulario y anota el TEMPLATE_ID
// 4. Copia tu Public Key desde Account > API Keys y sustitúyela abajo
// ─────────────────────────────────────────────────────────────
const EMAILJS_PUBLIC_KEY = 'XcVtLJAf-aE3JvDsQ';      // <— reemplazar
const EMAILJS_SERVICE_ID = 'service_mhv01cw';      // <— reemplazar
const EMAILJS_TEMPLATE_ID = 'template_fipcl8i';     // <— reemplazar
const DESTINO_EMAIL = 'emogo.design@gmail.com';

emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });

const SEND_ICON = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <line x1="22" y1="2" x2="11" y2="13"></line>
    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
</svg> Enviar solicitud`;

document.getElementById('presupuestoForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const btn = document.getElementById('btnSubmit');
    const successMsg = document.getElementById('feedbackSuccess');
    const errorMsg = document.getElementById('feedbackError');

    // Validación básica
    const required = this.querySelectorAll('[required]');
    let valid = true;
    required.forEach(field => {
        if (!field.value.trim()) {
            field.style.borderColor = '#e44';
            valid = false;
        } else {
            field.style.borderColor = '';
        }
    });

    if (!valid) {
        errorMsg.textContent = '⚠️ Por favor, rellena los campos obligatorios.';
        errorMsg.style.display = 'block';
        successMsg.style.display = 'none';
        return;
    }

    // Recoge "¿cómo nos conociste?"
    const radioSelected = this.querySelector('input[name="como_conociste"]:checked');

    const templateParams = {
        to_email: DESTINO_EMAIL,
        nombre: this.nombre.value,
        email: this.email.value,
        telefono: this.telefono.value,
        empresa: this.empresa.value || 'No indicada',
        tipo_web: this.tipo_web.value,
        presupuesto: this.presupuesto_aprox.value || 'No indicado',
        logo: this.logo.value,
        seo: this.seo.value,
        mensaje: this.mensaje.value,
        como_conociste: radioSelected ? radioSelected.value : 'No indicado',
    };

    // Estado cargando
    btn.textContent = 'Enviando…';
    btn.disabled = true;
    successMsg.style.display = 'none';
    errorMsg.style.display = 'none';

    emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
        .then(() => {
            successMsg.style.display = 'block';
            errorMsg.style.display = 'none';
            btn.textContent = '✅ ¡Enviado!';
            btn.disabled = false;
            document.getElementById('presupuestoForm').reset();
            setTimeout(() => { btn.innerHTML = SEND_ICON; }, 4000);
        })
        .catch((err) => {
            console.error('EmailJS error:', err);
            errorMsg.style.display = 'block';
            successMsg.style.display = 'none';
            btn.innerHTML = SEND_ICON;
            btn.disabled = false;
        });
});

// Limpiar error visual al escribir
document.querySelectorAll('input, select, textarea').forEach(field => {
    field.addEventListener('input', () => {
        field.style.borderColor = '';
    });
});
