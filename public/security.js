const canvas = document.getElementById('captchaCanvas');
const ctx = canvas.getContext('2d');
let captchaCode = "";

function generateCaptcha() {
    captchaCode = Math.random().toString(36).substring(2, 8).toUpperCase();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Fundo com Ruído Dinâmico
    ctx.fillStyle = "#0f172a";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Linhas de Interferência (Anti-OCR)
    for (let i = 0; i < 15; i++) {
        ctx.strokeStyle = `rgba(56, 189, 248, ${Math.random() * 0.5})`;
        ctx.beginPath();
        ctx.moveTo(Math.random() * 250, Math.random() * 80);
        ctx.lineTo(Math.random() * 250, Math.random() * 80);
        ctx.stroke();
    }

    // Desenha cada letra com distorção individual
    const chars = captchaCode.split('');
    ctx.font = "bold 35px 'Courier New'";
    ctx.textBaseline = "middle";

    chars.forEach((char, i) => {
        ctx.save();
        ctx.translate(30 + (i * 35), 40 + (Math.random() * 10 - 5));
        ctx.rotate((Math.random() - 0.5) * 0.4); // Distorção de ângulo
        ctx.fillStyle = "#38bdf8";
        ctx.fillText(char, 0, 0);
        ctx.restore();
    });
}

function validateAccess() {
    const input = document.getElementById('uInput').value.toUpperCase();
    const status = document.getElementById('status');
    
    // Verificação de segurança adicional (Data e Navegador)
    const browserInfo = navigator.userAgent;
    const accessDate = new Date().toLocaleString();

    if (input === captchaCode) {
        status.innerHTML = "✅ Verificado! Redirecionando...";
        status.style.color = "#34d399";
        
        // Simula um log de segurança e redireciona
        console.log(`Acesso autorizado: ${accessDate} | Agent: ${browserInfo}`);
        setTimeout(() => {
            window.location.href = "home.html"; // Vai para o site real
        }, 1500);
    } else {
        status.innerHTML = "❌ Falha na validação. Tente novamente.";
        status.style.color = "#f87171";
        generateCaptcha();
    }
}

canvas.onclick = generateCaptcha;
window.onload = generateCaptcha;