import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { addStudent } from '../api/studentsApi'
import { GoHome } from "react-icons/go"



const AddStudent = () => {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const navigate = useNavigate()
  const queryClient = useQueryClient()


  /*--------Mutation--------*/
  const { mutate } = useMutation({
    mutationFn: addStudent,
    onSuccess: (newStudent) => {
      // queryClient.invalidateQueries({ queryKey: ['students'] })
      queryClient.setQueryData(['students'], oldData => ([...oldData ?? [], newStudent]))
      navigate(`/studentPage/${newStudent.id}`)
    }
  })


  /*--------Add-Stundent--------*/
  const onSubmit = (data) => {
    const newStudent = {
      id: parseInt(Date.now()),
      name: data.name,
      grade: parseInt(data.grade),
      year: parseInt(data.year)
    }
    mutate(newStudent)
  }



  return (
    <div className="w-full max-w-[500px] mx-auto mt-16">

      {/*--------Header--------*/}
      <div className="flex justify-between items-center mb-5">
        <button onClick={() => navigate('/')} className="bg-purple-600 text-2xl px-6 py-2 rounded transition-colors hover:bg-purple-700"><GoHome /></button>
        <h1 className="text-center text-2xl mb-4">Add Student</h1>
      </div>

      {/*--------Form--------*/}
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
        <label className="text-[.95rem] pt-2 pb-[.2rem] text-[#717171]">Name</label>
        <input type='text' {...register('name', { required:true })} placeholder="fullName..." className="px-2 py-3 border-none  focus:outline outline-purple-500 text-black mb-2 rounded text-[1.1rem]" />
        { errors.name && <span className="text-red-600 ml-1 text-[.93rem]">This field is required</span>}

        <label className="text-[.95rem] pt-2 pb-[.2rem] text-[#717171]">Grade</label>
        <input type='input' {...register('grade', { required:true, pattern: /^\d+$/ })} placeholder="Grade..." className="px-2 py-3 border-none focus:outline outline-purple-500 text-black mb-2 rounded text-[1.1rem]" />
        { errors.grade?.type === 'required' && <span className="text-red-600 ml-1 text-[.93rem]">This field is required</span>}
        { errors.grade?.type === 'pattern' && <span className="text-red-600 ml-1 text-[.93rem]">This field should be number</span>}

        <label className="text-[.95rem] pt-2 pb-[.2rem] text-[#717171]">Year</label>
        <input type='text' {...register('year', { required:true, pattern: /^\d+$/ })} placeholder="Year..." className="px-2 py-3 border-none focus:outline outline-purple-500 text-black mb-2 rounded text-[1.1rem]" />
        { errors.year?.type === 'required' && <span className="text-red-600 ml-1 text-[.93rem]">This field is required</span>}
        { errors.year?.type === 'pattern' && <span className="text-red-600 ml-1 text-[.93rem]">This field should be number</span>}

          <button className="bg-purple-600 py-3 mt-5 rounded transition-colors hover:bg-purple-700">submit</button>
      </form>

    </div>
  )
}

export default AddStudent