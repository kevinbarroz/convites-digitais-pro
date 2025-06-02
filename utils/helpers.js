export const gerarHTMLConvite = (convite) => {
  const cores = {
    roxo: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    rosa: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    azul: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    verde: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    laranja: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    pastel: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)'
  }

  const fontes = {
    elegante: "'Times New Roman', serif",
    moderna: "'Arial', sans-serif",
    divertida: "'Comic Sans MS', cursive"
  }

  const dataFormatada = new Date(convite.data_evento).toLocaleString('pt-BR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })

  const imagensHTML = convite.imagens && convite.imagens.length > 0 
    ? convite.imagens.map(img => `<img src="${img}" alt="Imagem do evento" style="width: 100%; max-width: 400px; border-radius: 15px; margin: 10px 0; box-shadow: 0 5px 15px rgba(0,0,0,0.2);">`).join('')
    : ''

  const whatsappLink = convite.whatsapp 
    ? `https://wa.me/55${convite.whatsapp.replace(/\D/g, '')}?text=Oi! Recebi seu convite para ${encodeURIComponent(convite.titulo)}. Gostaria de confirmar minha presença!`
    : ''

  return `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${convite.titulo}</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: ${fontes[convite.fonte]};
            background: ${cores[convite.cor]};
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
        }
        .convite-container {
            background: white;
            border-radius: 25px;
            padding: 40px;
            max-width: 600px;
            width: 100%;
            text-align: center;
            box-shadow: 0 20px 40px rgba(0,0,0,0.3);
            animation: fadeIn 1s ease-in;
        }
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .titulo {
            font-size: 2.5rem;
            color: #333;
            margin-bottom: 20px;
            background: ${cores[convite.cor]};
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
        .info {
            font-size: 1.2rem;
            color: #555;
            margin: 15px 0;
            padding: 10px;
            border-left: 4px solid;
            border-image: ${cores[convite.cor]} 1;
            text-align: left;
        }
        .descricao {
            font-size: 1.1rem;
            color: #666;
            margin: 20px 0;
            line-height: 1.6;
            font-style: italic;
        }
        .whatsapp-btn {
            display: inline-block;
            background: #25D366;
            color: white;
            padding: 15px 30px;
            border-radius: 50px;
            text-decoration: none;
            font-size: 1.1rem;
            font-weight: bold;
            margin-top: 30px;
            transition: transform 0.2s;
        }
        .whatsapp-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(37, 211, 102, 0.4);
        }
        .organizador {
            margin-top: 30px;
            padding-top: 20px;
            border-top: 2px solid #eee;
            color: #777;
            font-size: 0.9rem;
        }
        @media (max-width: 600px) {
            .convite-container { padding: 20px; }
            .titulo { font-size: 2rem; }
        }
    </style>
</head>
<body>
    <div class="convite-container">
        <h1 class="titulo">🎉 ${convite.titulo}</h1>
        <div class="info"><strong>📅 Data:</strong> ${dataFormatada}</div>
        <div class="info"><strong>📍 Local:</strong> ${convite.local}</div>
        ${convite.descricao ? `<div class="descricao">"${convite.descricao}"</div>` : ''}
        <div class="imagens">${imagensHTML}</div>
        ${whatsappLink ? `<a href="${whatsappLink}" class="whatsapp-btn" target="_blank">💬 Confirmar Presença via WhatsApp</a>` : ''}
        <div class="organizador">Organizado por: <strong>${convite.organizador}</strong></div>
    </div>
</body>
</html>`
}

export const showMessage = (setMessage, type, text) => {
  setMessage({ type, text })
  setTimeout(() => setMessage({ type: '', text: '' }), 5000)
}
