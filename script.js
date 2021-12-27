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

//Interação com o Layout

const validaCampo = () => {
    return document.getElementById('form').reportValidity()
}


