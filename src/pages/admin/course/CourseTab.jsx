import RichTextEditor from '@/components/RichTextEditor'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useEditCourseMutation, useGetCourseByIdQuery, usePublishCourseMutation } from '@/features/api/courseApi'
import { Loader2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'

const CourseTab = () => {
    const [input, setInput] = useState({
        courseTitle: "",
        subTitle: "",
        description: "",
        category: "",
        courseLevel: "",
        coursePrice: "",
        courseThumbnail: ""
    })

    const params = useParams()
    const courseId = params.courseId
    const navigate = useNavigate()

    const { data: courseByIdData, isLoading: courseByIdLoading, refetch } = useGetCourseByIdQuery(courseId, { refetchOnMountOrArgChange: true })

    const [publishCourse, {isLoading: publishCourseIsLoading}] = usePublishCourseMutation()
    const [editCourse, { data, isSuccess, isLoading, error }] = useEditCourseMutation()

    const [previewThumbnail, setPreviewThumbnail] = useState("")

    const course = courseByIdData?.course;

    useEffect(() => {
        if (course) {
            setInput({
                courseTitle: course.courseTitle,
                subTitle: course.subTitle,
                description: course.description,
                category: course.category,
                courseLevel: course.courseLevel,
                coursePrice: course.coursePrice,
                courseThumbnail: ""
            })
        }
    }, [course])

    const changeEventhandler = (e) => {
        const { name, value } = e.target;
        setInput({ ...input, [name]: value })
    }

    const selectCategory = (value) => setInput({ ...input, category: value })
    const selectCourseLevel = (value) => setInput({ ...input, courseLevel: value })

    const selectThumbnail = (e) => {
        const file = e.target.files?.[0]
        if (file) {
            setInput({ ...input, courseThumbnail: file })
            const reader = new FileReader()
            reader.onloadend = () => setPreviewThumbnail(reader.result)
            reader.readAsDataURL(file)
        }
    }

    const updateCourseHandler = async () => {
        const formData = new FormData()
        formData.append("courseTitle", input.courseTitle)
        formData.append("subTitle", input.subTitle)
        formData.append("description", input.description)
        formData.append("category", input.category)
        formData.append("courseLevel", input.courseLevel)
        formData.append("coursePrice", input.coursePrice)
        formData.append("courseThumbnail", input.courseThumbnail)

        await editCourse({ formData, courseId })
    }

    const publishStatusHandler = async (action) => {
        try {
            const res = await publishCourse({ courseId, query: action })
            if (res.data) {
                refetch()
                toast.success(res.data.message)
            }
        } catch (error) {
            toast.error("Failed to Publish or Unpublish course")
        }
    }

    useEffect(() => {
        if (isSuccess && data) {
            toast.success(data.message || "Course Updated Successfully.")
            navigate("/admin/course")
        }
        if (error) {
            toast.error(error.data?.message || "Failed To Update Course")
        }
    }, [isSuccess, data, error])

    if (courseByIdLoading)
        return (
            <div className="flex items-center justify-center h-full min-h-[70vh]">
                <h1 className="text-2xl font-semibold text-gray-700">Loading...</h1>
            </div>
        );

    return (
        <Card>
            <CardHeader className="flex flex-col md:flex-row md:justify-between gap-4 md:gap-0">

                <div>
                    <CardTitle className="text-lg md:text-xl">Basic Course Information</CardTitle>
                    <CardDescription className="text-sm md:text-base">
                        Make changes to your course here. Click save when you're done.
                    </CardDescription>
                </div>

                <div className='flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2'>
                    <Button 
                        disabled={courseByIdData?.course.lectures.length === 0} 
                        variant="outline" 
                        onClick={() => publishStatusHandler(courseByIdData?.course.isPublished ? "false" : "true")}
                        className="w-full sm:w-auto"
                    >
                        {publishCourseIsLoading ? (
                            <>
                                <Loader2 className='mr-2 w-4 h-4 animate-spin' /> Please Wait
                            </>
                        ) : courseByIdData?.course.isPublished ? "Unpublish" : "Publish"}
                    </Button>
                    <Button className="w-full sm:w-auto">Remove Course</Button>
                </div>
            </CardHeader>

            <CardContent>
                <div className='space-y-4 mt-5'>

                    <div>
                        <Label>Title</Label>
                        <Input
                            type="text"
                            value={input.courseTitle}
                            onChange={changeEventhandler}
                            name="courseTitle"
                            placeholder="Ex. Fullstack Developer"
                        />
                    </div>

                    <div>
                        <Label>Subtitle</Label>
                        <Input
                            type="text"
                            name="subTitle"
                            value={input.subTitle}
                            onChange={changeEventhandler}
                            placeholder="Learn how to build, deploy, and manage apps with Docker"
                        />
                    </div>

                    <div>
                        <Label>Description</Label>
                        <RichTextEditor input={input} setInput={setInput} />
                    </div>

                    <div className='flex flex-col md:flex-row gap-4 md:gap-5'>

                        <div className='flex-1'>
                            <Label>Category</Label>
                            <Select onValueChange={selectCategory} value={input.category}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select a category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Category</SelectLabel>
                                        <SelectItem value="Next JS">Next JS</SelectItem>
                                        <SelectItem value="Data Science">Data Science</SelectItem>
                                        <SelectItem value="Frontend Development">Frontend Development</SelectItem>
                                        <SelectItem value="Fullstack Development">Fullstack Development</SelectItem>
                                        <SelectItem value="MERN Stack Development">MERN Stack Development</SelectItem>
                                        <SelectItem value="Javascript">Javascript</SelectItem>
                                        <SelectItem value="Python">Python</SelectItem>
                                        <SelectItem value="Docker">Docker</SelectItem>
                                        <SelectItem value="MongoDB">MongoDB</SelectItem>
                                        <SelectItem value="HTML">HTML</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className='flex-1'>
                            <Label>Course Level</Label>
                            <Select onValueChange={selectCourseLevel} value={input.courseLevel}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select a Course Level" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Course Level</SelectLabel>
                                        <SelectItem value="Beginner">Beginner</SelectItem>
                                        <SelectItem value="Medium">Medium</SelectItem>
                                        <SelectItem value="Advance">Advance</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className='flex-1'>
                            <Label>Price in (INR)</Label>
                            <Input
                                type="number"
                                name="coursePrice"
                                value={input.coursePrice}
                                onChange={changeEventhandler}
                                placeholder="199"
                                className="w-full"
                            />
                        </div>

                    </div>

                    <div>
                        <Label>Course Thumbnail</Label>
                        <Input
                            type="file"
                            onChange={selectThumbnail}
                            accept="image/*"
                            className="w-full"
                        />
                        {previewThumbnail && (
                            <img
                                src={previewThumbnail}
                                className='w-full sm:w-64 h-44 my-2 object-cover'
                                alt="Course Thumbnail"
                            />
                        )}
                    </div>

                    <div className='flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2'>
                        <Button onClick={() => navigate("/admin/course")} variant="outline" className="w-full sm:w-auto">Cancel</Button>
                        <Button disabled={isLoading} onClick={updateCourseHandler} className="w-full sm:w-auto">
                            {isLoading ? (
                                <>
                                    <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait
                                </>
                            ) : "Save"}
                        </Button>
                    </div>

                </div>
            </CardContent>
        </Card>
    )
}

export default CourseTab
