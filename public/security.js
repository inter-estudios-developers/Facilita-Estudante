const canvas = document.getElementById('captchaCanvas');
const ctx = canvas.getContext('2d');
let captchaCode = "";

function generateCaptcha() {
    captchaCode = Math.random().toString(36).substring(2, 8).toUpperCase();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Fundo Escuro Intervixus
    ctx.fillStyle = "#0f172a";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Ruído e Linhas (Anti-Robot)
    for (let i = 0; i < 20; i++) {
        ctx.strokeStyle = `rgba(56, 189, 248, ${Math.random() * 0.3})`;
        ctx.beginPath();
        ctx.moveTo(Math.random() * 250, Math.random() * 80);
        ctx.lineTo(Math.random() * 250, Math.random() * 80);
        ctx.stroke();
    }

    // Letras Tortas e Distorcidas
    ctx.font = "bold 35px 'Courier New'";
    ctx.textBaseline = "middle";
    const chars = captchaCode.split('');

    chars.forEach((char, i) => {
        ctx.save();
        ctx.translate(30 + (i * 35), 40 + (Math.random() * 10 - 5));
        ctx.rotate((Math.random() - 0.5) * 0.5); // Inclinação aleatória
        ctx.fillStyle = "#38bdf8";
        ctx.fillText(char, 0, 0);
        ctx.restore();
    });
}

function validateAccess() {
    const input = document.getElementById('uInput').value.toUpperCase();
    const status = document.getElementById('status');

    if (input === captchaCode) {
        // 🔑 O SEGREDO: Cria o carimbo de autenticação
        sessionStorage.setItem('intervixus_auth', 'true');
        
        status.innerHTML = "✅ Verificado! Liberando acesso...";
        status.style.color = "#34d399";
        
        setTimeout(() => {
            window.location.href = "home.html"; 
        }, 1200);
    } else {
        status.innerHTML = "❌ Código incorreto!";
        status.style.color = "#f87171";
        generateCaptcha();
        document.getElementById('uInput').value = "";
    }
}

canvas.onclick = generateCaptcha;
window.onload = generateCaptcha;