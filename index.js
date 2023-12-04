const { readFileSync } = require("fs");


function gerarFaturaHTML(fatura, pecas) {
  let html = `
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Fatura - ${fatura.cliente}</title>
      <style>
        /* Adicione estilos CSS conforme necessário */
      </style>
    </head>
    <body>
      <h1>Fatura ${fatura.cliente}</h1>
      <ul>
  `;

  for (let apre of fatura.apresentacoes) {
    const peca = getPeca(pecas, apre);
    const totalApresentacao = calcularTotalApresentacao(pecas, apre);
    html += `
        <li>
          <strong>${peca.nome}:</strong>
          ${formatarMoeda(totalApresentacao)} (${apre.audiencia} assentos)
        </li>
    `;
  }

  const totalFatura = calcularTotalFatura(pecas, fatura.apresentacoes);
  const totalCreditos = calcularTotalCreditos(pecas, fatura.apresentacoes);

  html += `
      </ul>
      <p><strong>Valor total:</strong> ${formatarMoeda(totalFatura)}</p>
      <p><strong>Créditos acumulados:</strong> ${totalCreditos}</p>
    </body>
    </html>
  `;

  return html;
}


const faturas = JSON.parse(readFileSync("./faturas.json"));
const pecas = JSON.parse(readFileSync("./pecas.json"));
const faturaStr = gerarFaturaStr(faturas, pecas);

const faturaHTML = gerarFaturaHTML(faturas, pecas);
console.log(faturaStr);

// Exemplo de como salvar o HTML em um arquivo (Node.js)
const { writeFileSync } = require('fs');
writeFileSync('./fatura.html', faturaHTML);
