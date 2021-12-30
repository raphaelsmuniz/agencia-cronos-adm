
const openAdd = () => {
    window.open('http://127.0.0.1:5501/addCursoAdmin.html')    
}

const closeAdd = () => {
    // apagaCampo()
    window.open('http://127.0.0.1:5501/admin.html')
}

//obter e escrever valores convertidos em String
const getLocalStorage = () => JSON.parse(localStorage.getItem('db_curso')) ?? []
const setLocalStorage = (dbCurso) => localStorage.setItem('db_curso', JSON.stringify(dbCurso))

const tempCurso = {
    nome: 'Java',
    descricao: 'curso de java'
}

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
            //redireciona para a página principal
        } else {
            updateCurso(index, curso)
            atualizaTabela()
            apagaCampo()
            //redireciona para a página principal
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
        <button class="btn btn-secondary m-1" id="editar-${index}">Editar</button>
        <button class="btn btn-danger m-1" id="excluir-${index}" >Excluir</button>
    </td>
`
document.querySelector('#tableCurso>tbody').appendChild(novaLinha)
}

const apagaTabela = () => {
    const linhas = document.querySelectorAll('#tableCurso>tbody tr')
    linhas.forEach(linha => linha.parentNode.removeChild(linha))
}

const atualizaTabela = () => {
    const dbCurso = readCurso()
    apagaTabela()
    dbCurso.forEach(criaLinha)
}

const preencherCampos = (curso) => {
    document.getElementById('nome').value = curso.nome
    document.getElementById('imagem').value = curso.imagem
    document.getElementById('descricao').value = curso.descricao
    document.getElementById('nome').dataset.index = curso.index
}

const editaCurso = (index) => {
    const curso = readCurso()[index]
    curso.index = index
    preencherCampos(curso)
    //fechar aba após editar curso
}

const editaDelete = (event) => {
    if (event.target.type == 'button') {
        const [action, index] = event.target.id.split('-')
        if (action == 'edit') {
            editaCurso(index)
        } else {
            const curso = readCurso()[index]
            const resposta = confirm(`Deseja excluir o curso ${curso.nome}`)
            if (resposta) {
                deleteCurso(index)
                atualizaTabela()
            }
        }
    }
}

atualizaTabela()

//Eventos
document.getElementById('adicionarCurso')
    .addEventListener('click', openAdd)

document.getElementById('cancCurso')
    .addEventListener('click', closeAdd)

document.getElementById('salvarCurso')
    .addEventListener('click', salvarCurso)

document.querySelector('#tableCurso>tbody')
    .addEventListener('click', editaDelete)
