import axios from "axios"


axios.defaults.baseURL = 'http://localhost:3000'


export const getStudents = async () => {
    return await axios.get('/students').then(res => res.data)
}

export const getStudent = async (id) => {
    return await axios.get(`/students/${parseInt(id)}`).then(res => res.data)
}

export const deleteStudent = async (id) => {
    return await axios.delete(`/students/${id}`)
}

export const editStudent = async (updatedData) => {
    return await axios.put(`/students/${parseInt(updatedData.id)}`, {...updatedData}).then(res => res.data)
}

export const addStudent = async (newStudent) => {
    return await axios.post('/students', newStudent).then(res => res.data)
}