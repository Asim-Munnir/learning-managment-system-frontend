import { Edit } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const Lecture = ({lecture, courseId, index}) => {
    const navigate = useNavigate()
    const gotoUpdataLecture = async () => {
        navigate(`${lecture._id}`)
    }
  return (
    <div className='flex mt-4 items-center justify-between bg-[#F7F9FA] dark:bg-[#1F1F1F] px-4 py-2 rounded-md my-2'>
        <h1 className='font-bold text-gray-800 dark:text-gray-100'><span>{index+1}. </span> {lecture.lectureTitle}</h1>
        <Edit size={20} onClick={gotoUpdataLecture} className='cursor-pointer text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400' />
    </div>
  )
}

export default Lecture