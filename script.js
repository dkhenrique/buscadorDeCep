document.getElementById("form").addEventListener("submit", async (event) => {
  event.preventDefault()

  const cep = document.getElementById("cep").value.trim()
  const main = document.getElementById("main")

  main.innerHTML = ""

  if (!/^\d{8}$/.test(cep)) {
    main.innerHTML = "<p style='color: red;'>CEP inválido</p>"
    return
  }

  try {
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
    const data = await response.json()

    if (data.erro) {
      main.innerHTML = "<p style='color: red;'>CEP não encontrado</p>"
      return
    }

    main.innerHTML = `
      <div class="card">
        <div class="card-header">
          <h2>Informações do CEP</h2>
        </div>

        <div class="card-body">
          <div class="info">
            <p>&#127760 <strong>CEP:</strong> <span id="cep">${data.cep}</span></p>
            <p>🛣️ <strong>Logradouro:</strong> <span id="logradouro">${data.logradouro}</span></p>
            <p>&#128235 <strong>Complemento:</strong> <span id="complemento">${data.complemento}</span></p>
            <p>&#127969 <strong>Bairro:</strong> <span id="bairro">${data.bairro}</span></p>
            <p>&#127758 <strong>Localidade:</strong> <span id="localidade">${data.localidade}</span></p>
            <p>&#129517 <strong>UF:</strong> <span id="uf">${data.uf}</span></p>
            <p>&#128222 <strong>DDD:</strong> <span id="ddd">${data.ddd}</span></p>
          </div>
        </div>
      </div>
    `
  } catch (error) {
    main.innerHTML = "<p style='color: red;'>Ocorreu um erro ao buscar o CEP. Tente novamente mais tarde.</p>"
    console.error("Erro ao buscar o CEP:", error)
  }

})