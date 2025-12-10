import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useGetCreatorCourseQuery } from '@/features/api/courseApi'
import { Edit } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'


const CourseTable = () => {
    const { data, isLoading } = useGetCreatorCourseQuery()
    const navigate = useNavigate()

    if (isLoading)
        return (
            <div className="flex items-center justify-center h-full min-h-[70vh]">
                <h1 className="text-2xl font-semibold text-gray-700">Loading...</h1>
            </div>
        );

    return (
        <div className='mt-20 md:mt-0'>
            <Button onClick={() => navigate(`/admin/course/create`)}>Create a new Course</Button>

            <Table>
                <TableCaption>A list of your recent Courses.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Price</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data?.courses.map((course) => (
                        <TableRow key={course._id}>
                            <TableCell className="font-medium">{course?.coursePrice || "NA"}</TableCell>
                            <TableCell><Badge> {course?.isPublished ? "Published" : "Draft"}</Badge></TableCell>
                            <TableCell>{course?.courseTitle}</TableCell>
                            <TableCell className="text-right">
                                <Button size='sm' variant='ghost' onClick={() => navigate(`/admin/course/${course._id}`)}><Edit /></Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>

            </Table>
        </div>
    )
}

export default CourseTable