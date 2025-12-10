import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { Switch } from '@/components/ui/switch'
import { useEditLectureMutation, useGetLectureByIdQuery, useRemoveLectureMutation } from '@/features/api/courseApi'
import axios from 'axios'
import { Loader2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'

const MEDIA_API = "http://localhost:8080/api/v1/media"

const LectureTab = () => {
    const [lectureTitle, setLectureTitle] = useState("")
    const [uploadVideoInfo, setUploadVideoInfo] = useState(null)
    const [isFree, setIsFree] = useState(false)
    const [mediaProgress, setMediaProgress] = useState(false)
    const [uploadProgress, setUploadProgress] = useState(0)
    const [btnDisabled, setBtnDisabled] = useState(true)

    const params = useParams()
    const courseId = params.courseId
    const lectureId = params.lectureId
    const navigate = useNavigate()

    const [editLecture, { data, isLoading, error, isSuccess }] = useEditLectureMutation()
    const [removeLecture, { data: removeLectureData, isLoading: removeIsLoading, isSuccess: removeIsSuccess }] = useRemoveLectureMutation()
    const { data: lectureIdData } = useGetLectureByIdQuery(lectureId)
    const getLectureIdData = lectureIdData?.lecture

    useEffect(() => {
        if (getLectureIdData) {
            setLectureTitle(getLectureIdData.lectureTitle)
            setIsFree(getLectureIdData.isPreviewFree)
        }
    }, [getLectureIdData])

    const fileChangeHandler = async (e) => {
        const file = e.target.files[0]
        if (!file) return
        const formData = new FormData()
        formData.append("file", file)
        setMediaProgress(true)
        try {
            const res = await axios.post(`${MEDIA_API}/upload-video`, formData, {
                onUploadProgress: ({ loaded, total }) => {
                    setUploadProgress(Math.round((loaded / total) * 100))
                }
            })
            if (res.data.success) {
                setUploadVideoInfo({ videoUrl: res.data.data.secure_url, publicId: res.data.data.public_id })
                setBtnDisabled(false)
                toast.success(res.data.message)
            }
        } catch (err) {
            console.log(err)
            toast.error("Video upload failed")
        } finally {
            setMediaProgress(false)
        }
    }

    const editLectureHandler = async () => {
        await editLecture({ lectureTitle, videoInfo: uploadVideoInfo, isPreviewFree: isFree, courseId, lectureId })
    }

    const removeLectureHandler = async () => {
        await removeLecture(lectureId)
    }

    useEffect(() => {
        if (isSuccess && data) {
            toast.success(data.message || "Lecture Updated Successfully")
            navigate(`/admin/course/${courseId}/lecture`)
        }
        if (error) {
            toast.error(error.data?.message || "Lecture not updated")
        }
    }, [isSuccess, data, error])

    useEffect(() => {
        if (removeIsSuccess) {
            toast.success(removeLectureData.message || "Lecture Deleted Successfully")
            navigate(`/admin/course/${courseId}/lecture`)
        }
    }, [removeIsSuccess])

    return (
        <div className="p-2 sm:p-4 md:p-6">
            <Card>
                <CardHeader className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
    <div className='space-y-2'>
        <CardTitle className="text-lg md:text-xl">Edit Lecture</CardTitle>
        <CardDescription className="text-sm md:text-base">Make changes and click save when done.</CardDescription>
    </div>

    <div className="flex flex-col sm:flex-row gap-2">
        <Button disabled={removeIsLoading} variant="destructive" onClick={removeLectureHandler} className="w-full sm:w-auto">
            {removeIsLoading ? (
                <>
                    <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please Wait
                </>
            ) : "Remove Lecture"}
        </Button>
    </div>
</CardHeader>

                <CardContent className="space-y-4 mt-4">

                    <div>
                        <Label>Title</Label>
                        <Input
                            value={lectureTitle}
                            onChange={(e) => setLectureTitle(e.target.value)}
                            type="text"
                            placeholder="Ex. Introduction to JavaScript"
                            className="w-full"
                        />
                    </div>

                    <div className='my-4'>
                        <Label>Video <span className='text-red-500'>*</span></Label>
                        <Input
                            type="file"
                            accept="video/*"
                            onChange={fileChangeHandler}
                            className="w-full sm:w-auto"
                        />
                    </div>

                    <div className='flex items-center space-x-2 my-4'>
                        <Switch checked={isFree} onCheckedChange={setIsFree} id="free-video" />
                        <Label htmlFor="free-video">Is this video FREE</Label>
                    </div>

                    {mediaProgress && (
                        <div className='my-4'>
                            <Progress value={uploadProgress} className="w-full" />
                            <p className="text-sm mt-1">{uploadProgress}% uploaded</p>
                        </div>
                    )}

                    <div className='mt-4 flex flex-col sm:flex-row gap-2'>
                        <Button disabled={isLoading} onClick={editLectureHandler} className="w-full sm:w-auto">
                            {isLoading ? (
                                <>
                                    <Loader2 className='mr-2 w-4 h-4 animate-spin' /> Please Wait
                                </>
                            ) : "Update Lecture"}
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default LectureTab
