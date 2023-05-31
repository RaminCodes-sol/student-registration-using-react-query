import { useNavigate } from "react-router-dom"



const Student = ({ student, index }) => {
  const { id, name, grade, year } = student
  const navigate = useNavigate()

  return (
    <tr onClick={() => navigate(`/studentPage/${id}`)} className="table_row justify-items-center items-center bg-purple-600 px-5 py-4 transition-colors cursor-pointer hover:bg-purple-800 mb-4">
      <td>{index}</td>
      <td>{name}</td>
      <td>{grade}</td>
      <td>{year}</td>
    </tr>
  )
}

export default Student