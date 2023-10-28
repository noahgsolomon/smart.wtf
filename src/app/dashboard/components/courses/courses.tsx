import { api } from "@/trpc/server";
import CourseCard from "./coursecard";


const Courses = async () => {
    const courses = (await api.course.getCourses.query()).courses;
    console.log(courses);

    return (
        <div>
              <h1>Courses</h1>
              <div className="flex flex-wrap gap-8 py-4">
                {courses.map((course) => {
                    return <CourseCard course={course} key={course.id} />
                })}
              </div>
        </div>
        )
}

export default Courses;