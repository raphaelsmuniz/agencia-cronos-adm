


//obter e escrever valores convertidos em String
const getLocalStorage = () => JSON.parse(localStorage.getItem('db_curso')) ?? []
const setLocalStorage = (dbCurso) => localStorage.setItem('db_curso', JSON.stringify(dbCurso))

//CRUD -> create, read, update e delete
const createCurso = (curso) => {
    const dbCurso = getLocalStorage()
    dbCurso.push (curso)
    setLocalStorage(dbCurso)
}

const readCurso = () => getLocalStorage()

const updateCurso = (index, curso) => {
    const dbCurso = readCurso()
    dbCurso[index] = curso
    setLocalStorage(dbCurso)
}

const deleteCurso = (index) => {
    const dbCurso = readCurso()
    dbCurso.splice(index, 1)
    setLocalStorage(dbCurso)
}

const validaCampo = () => {
    return document.getElementById('form').reportValidity()
}

//apagar campos quando add um curso ou cancela o add
const apagaCampo = () => {
    const campos = document.querySelectorAll('.curso-campo')
    campos.forEach(campo => campo.value = "")
    document.getElementById('nome').dataset.index = 'new'
}

//Interação com o Layout
const salvarCurso = () => {
    debugger
    if (validaCampo()) {
        const curso = {
            nome: document.getElementById('nome').value,
            // imagem: document.getElementById('imagem').value,
            descricao: document.getElementById('descricao').value
        }
        const index = document.getElementById('nome').dataset.index
        if (index == 'new') {
            createCurso(curso)
            atualizaTabela()
            apagaCampo()
        } else {
            updateCurso(index, curso)
            atualizaTabela()
            apagaCampo()
        }
    }
}

const criaLinha = (curso, index) => {
    const novaLinha = document.createElement('tr')
    novaLinha.innerHTML = `
    <td>${curso.nome}</td>
    <td>${curso.imagem}</td>
    <td>${curso.descricao}</td>
    <td>
        <button type="button" class="btn btn-secondary m-1" id="editar-${index}">Editar</button>
        <button type="button" class="btn btn-danger m-1" id="excluir-${index}" >Excluir</button>
    </td>
`
document.querySelector('#tableCurso>tbody').appendChild(novaLinha)
}
