import { useNavigate, useParams } from "react-router-dom"
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { editStudent, getStudent } from "../api/studentsApi"
import { GoHome } from "react-icons/go"
import { IoMdArrowRoundBack } from "react-icons/io"



const EditStudent = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors } } = useForm()
  const queryClient = useQueryClient()


  /*-------Get-Selected-Student-------*/
  const { data: student, isLoading, isError, error } = useQuery({
    queryKey: ['stundets', id],
    queryFn: () => getStudent(id),
    cacheTime: 0
  })


  /*-------Mutation-For-Editing--------*/
  const { mutate } = useMutation({
    mutationFn: editStudent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['students'] })
      navigate(`/studentPage/${id}`)
    }
  })


  /*-------Edit-Selected-Student-------*/
  const onSubmit= (data) => {
    const updatedData = {
      name: data.name,
      grade: parseInt(data.grade),
      year: parseInt(data.year)
    }
    mutate({ id, ...updatedData })
  }


  if (isLoading) return <h1 className="text-center mt-5">Loading...</h1>
  if (isError) return <h1 className="text-center mt-5">Error:{error.message}</h1>



  return (
    <div className="w-full max-w-[500px] mx-auto mx-auto mt-20 px-5 py-1">

        {/*---------Page-Title---------*/}
        <h1 className="text-center text-2xl mb-8">Edit Student</h1>

        {/*---------Back-and-Home-Button---------*/}
        <div className="flex gap-3">
            <button onClick={() => navigate(-1)} className="bg-purple-600 text-xl px-6 py-2 mt-5 mb-5 rounded transition-colors hover:bg-purple-700"><IoMdArrowRoundBack /></button>
            <button onClick={() => navigate('/')} className="bg-purple-600 text-xl px-6 py-2 mt-5 mb-5 rounded transition-colors hover:bg-purple-700"><GoHome /></button>
        </div>

        {/*---------Form---------*/}
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
            <label className="text-[.95rem] pt-2 pb-[.2rem] text-[#717171]">Name</label>
            <input type='text' defaultValue={student.name} {...register('name', { required:true })} placeholder="fullName..." className="px-2 py-3 border-none  focus:outline outline-purple-500 text-black mb-2 rounded text-[1.1rem]" />
            { errors.name && <span className="text-red-600 ml-1 text-[.93rem]">This field is required</span>}

            <label className="text-[.95rem] pt-2 pb-[.2rem] text-[#717171]">Grade</label>
            <input type='input' defaultValue={student.grade} {...register('grade', { required:true, pattern: /^\d+$/ })} placeholder="Grade..." className="px-2 py-3 border-none focus:outline outline-purple-500 text-black mb-2 rounded text-[1.1rem]" />
            { errors.grade?.type === 'required' && <span className="text-red-600 ml-1 text-[.93rem]">This field is required</span>}
            { errors.grade?.type === 'pattern' && <span className="text-red-600 ml-1 text-[.93rem]">This field should be number</span>}

            <label className="text-[.95rem] pt-2 pb-[.2rem] text-[#717171]">Year</label>
            <input type='text' defaultValue={student.year} {...register('year', { required:true, pattern: /^\d+$/ })} placeholder="Year..." className="px-2 py-3 border-none focus:outline outline-purple-500 text-black mb-2 rounded text-[1.1rem]" />
            { errors.year?.type === 'required' && <span className="text-red-600 ml-1 text-[.93rem]">This field is required</span>}
            { errors.year?.type === 'pattern' && <span className="text-red-600 ml-1 text-[.93rem]">This field should be number</span>}

            <button className="bg-purple-600 py-3 mt-5 rounded transition-colors hover:bg-purple-700">submit</button>
        </form>

    </div>
  )
}

export default EditStudent