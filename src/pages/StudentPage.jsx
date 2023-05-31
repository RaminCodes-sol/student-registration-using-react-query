import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useNavigate, useParams } from "react-router-dom"
import { deleteStudent, getStudent } from "../api/studentsApi"
import { AiFillEdit } from "react-icons/ai"
import { MdDelete } from "react-icons/md"
import { GoHome } from "react-icons/go"



const StudentPage = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const queryClient = useQueryClient()


  /*--------Get-Stundent--------*/
  const { data: student, isLoading, isError, error } = useQuery({
    queryKey: ['students', id],
    queryFn: () => getStudent(id),
    cacheTime: 0,
    initialData: () => {
      return queryClient.getQueryData(['students'])?.data?.find(student => student.id === parseInt(id))
    }
  })


  /*--------Mutation-For-Deleting--------*/
  const { mutate } = useMutation({
    mutationFn: deleteStudent,
    onSuccess: () => {  
      queryClient.invalidateQueries({ queryKey: ['students'] })
      navigate('/')
    } 
  })
  
  
  /*--------Delete-Student--------*/
  const removeStudent = (id) => {
    mutate(id)
  }


  if (isLoading) return <h1 className="text-center mt-10">Loading...</h1>
  if (isError) return <h1 className="text-center mt-10">Error:{error.message}</h1>

  

  return (
    <div className="w-full max-w-[500px] mx-auto mt-20 px-5 py-1">

        {/*--------Home-Button--------*/}
        <button onClick={() => navigate('/')} className='bg-purple-600 text-2xl px-6 py-2 rounded mb-5 transition-colors hover:bg-purple-700'>
          <GoHome />
        </button>

        {/*--------Student-Details--------*/}
        <div className="flex items-center gap-2 mb-4 mt-12">
            <span>ID:</span>
            <h1 className="text-2xl">{student.id}</h1>
        </div>
        <div className="flex items-center gap-2 mb-4">
            <span>Name:</span>
            <h1 className="text-2xl">{student.name}</h1>
        </div>
        <div className="flex items-center gap-2 mb-4">
            <span>Grade:</span>
            <h1 className="text-2xl">{student.grade}</h1>
        </div>
        <div className="flex items-center gap-2 mb-4">
            <span>Year:</span>
            <h1 className="text-2xl">{student.year}</h1>
        </div>
        
        {/*--------Edit-and-Remove-Button--------*/}
        <div className="flex gap-6 w-full mt-12">
            <button onClick={() => navigate(`/editStudent/${id}`)} className="bg-orange-500 w-[50%] py-2 text-2xl transition-colors hover:bg-orange-600"><AiFillEdit /></button>
            <button onClick={() => removeStudent(id)} className="bg-red-500 w-[50%] py-2 text-2xl transition-colors hover:bg-red-600"><MdDelete /></button>
        </div>
        
    </div>
  )
}

export default StudentPage