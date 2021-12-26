//obter e escrever valores convertidos em String
const getLocalStorage = () => JSON.parse(localStorage.getItem('db_curso')) ?? []
const setLocalStorage = (dbCurso) => localStorage.setItem('db_curso', JSON.stringify(dbCurso))

//CRUD

