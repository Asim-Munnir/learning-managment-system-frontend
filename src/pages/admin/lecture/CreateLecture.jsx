import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useCreateLectureMutation, useGetCourseLectureQuery } from '@/features/api/courseApi'
import { Loader2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import Lecture from './Lecture'

const CreateLecture = () => {
    const [lectureTitle, setLectureTitle] = useState("")
    const params = useParams();
    const courseId = params.courseId
    const navigate = useNavigate()

    const [createLecture, { data, isLoading, isSuccess, error }] = useCreateLectureMutation()

    const { data: lectureData, isLoading: lectureIsLoading, isError: lectureIsError, refetch }  = useGetCourseLectureQuery(courseId)

    const createLectureHandler = async () => {
        await createLecture({ lectureTitle, courseId })
    }

    useEffect(() => {
        if (isSuccess) {
            refetch();
            toast.success(data?.message || "Lecture Created Successfully")
        }
        if (error) {
            toast.error(error.data?.message || "Error While Created Lecture")
        }
    }, [isSuccess, error])

    console.log(lectureData)

    return (
        <div className="flex-1 mx-4 md:mx-10 mt-4 md:mt-0">
            <div className="mb-4 mt-16 md:mt-0">
                <h1 className="font-bold text-xl md:text-2xl">
                    Let's add Lecture, add some basic details for your new Lecture
                </h1>
                <p className="text-sm md:text-base">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Possimus,
                    laborum!
                </p>
            </div>
            <div className="space-y-4">
                <div>
                    <Label>Title</Label>
                    <Input
                        type="text"
                        value={lectureTitle}
                        onChange={(e) => setLectureTitle(e.target.value)}
                        placeholder="Your Lecture Title"
                    />
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2 gap-3">
                    <Button variant="outline" onClick={() => navigate(`/admin/course/${courseId}`)}>
                        Back to course
                    </Button>

                    <Button disabled={isLoading} onClick={createLectureHandler}>
                        {
                            isLoading ? (
                                <>
                                    <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                                    Please Wait
                                </>
                            ) : "Create Lecture"
                        }
                    </Button>
                </div>

                <div className='mt-10 max-h-[50vh] sm:max-h-[44vh] overflow-y-auto pr-2'>
                    {
                        lectureIsLoading ? (<p>Loading lectures...</p>) : lectureIsError ? (<p>Failed to load lectures.</p>) : lectureData?.lectures?.length === 0 ? (<p> No lecture Avaliable </p>) : (
                            lectureData.lectures.map((lecture, index) => {
                                return <Lecture key={lecture._id} lecture={lecture} courseId={courseId} index={index} />
                            })
                        )
                    }
                </div>

            </div>
        </div>
    )
}

export default CreateLecture
