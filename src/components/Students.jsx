import { useState } from 'react'
import { useQuery } from "@tanstack/react-query"
import { getStudents } from "../api/studentsApi"
import Student from "./Student"
import { GoPlus } from "react-icons/go"
import { Link } from "react-router-dom"




const Students = () => {

  /*----------Get-Students----------*/
  let { data: students, isLoading, isError, error } = useQuery({
    queryKey: ['students'],
    queryFn: getStudents,
  })


  /*----------FilteredBy-State----------*/
  const [filteredBy, setFilteredBy] = useState({
    byGrade: false,
    byYear: false
  })


  /*---------Filter-By-Grade---------*/
  const filterByGrade = () => {
    students = students.sort((a, b) => {
      if (filteredBy.byGrade) {
        setFilteredBy({ ...filteredBy, byGrade: false })
        return a.grade > b.grade ? -1 : 1 
      } else {
        setFilteredBy({ ...filteredBy, byGrade: true })
        return a.grade > b.grade ? 1 : -1
      }
    })
  }


  /*---------Filter-By-Year---------*/
  const filterByYear = () => {
    students = students.sort((a, b) => {
      if (filteredBy.byYear) {
        setFilteredBy({ ...filteredBy, byYear: false })
        return a.year > b.year ? -1 : 1 
      } else {
        setFilteredBy({ ...filteredBy, byYear: true })
        return a.year > b.year ? 1 : -1
      }
    })
  }


  if (isLoading) return <h1 className="text-white text-center mt-10">Loading...</h1>
  if (isError) return <h1 className="text-white text-center mt-10">Error:{error.message}</h1>


  return (
    <div className="flex flex-col gap-4 mt-10">

      {/*----------Action-Buttons----------*/}
      <div className="flex justify-between mt-6 px-3">
        <button>
          <Link to='/addStudent' state={{students}} className="bg-orange-500 p-4 text-xl rounded transition-colors hover:bg-orange-600"><GoPlus /></Link>
        </button>

        <div className="flex items-center gap-2">
          <span>FilterBy:</span>
          <div className="flex gap-2">
            <button onClick={() => filterByGrade()} className="bg-orange-500 w-[70px] h-[35px] pb-1 rounded transition-colors hover:bg-orange-600">grade</button>
            <button onClick={() => filterByYear()} className="bg-orange-500 w-[70px] h-[35px] pb-1 rounded transition-colors hover:bg-orange-600">year</button>
          </div>
        </div>
      </div>


      {/*----------Table----------*/}
      <table>
          <tbody>
              {/*---Table-Header---*/}
              <tr className="table_row justify-items-center items-center border-t border-[#444] px-5 py-3 sticky top-0 z-10 bg-[#141414]">
                  <th>#</th>
                  <th>Name</th>
                  <th>Grade</th>
                  <th>Year</th>
              </tr>

              {/*---Table-Body---*/}
              {
                students?.map((student, index) => <Student key={student.id} index={index+1} student={student} />)
              }
          </tbody>
      </table>

    </div>
  )
}

export default Students