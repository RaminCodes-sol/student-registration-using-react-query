import Students from "../components/Students"


const HomePage = () => {
  return (
    <div className="w-full max-w-[800px] mx-auto p-2">

      <h1 className="text-5xl text-center mt-5">Students</h1>
      
      <div>
          <Students />
      </div>
        
    </div>
  )
}

export default HomePage