import React, {useState, useEffect} from 'react';
import * as  api from "./api/courseApi";
import CourseForm from "./CourseForm";
import UserContext from "./UserContext";

function App(props) {

    // Declare state using React useState hook
    const [courses, setCourses] = useState([]);
    const [user, setUser] = useState({name: "Cory", email: "cor@h.com"});

    useEffect(() => {
        api.getCourses().then(courses => setCourses(courses));
    }, []);

    function deleteCourse(id) {
        // Note : not mutating state. Create an updated Copy
        api.deleteCourse(id);
        const newCourses = courses.filter(course => course.id !== id);
        setCourses(newCourses);
    }

    function renderCourse(course) {
        return (
            <tr key={course.id}>
                <td>
                    <button onClick={event => deleteCourse(course.id)}>Delete</button>
                    {course.title}
                </td>
                <td>{course.category}</td>
            </tr>
        );
    }

    return (
        <>
            <UserContext.Provider value={user}>
                <h1>Courses</h1>
                <CourseForm onSubmit={handleSave}/>

                {/* Exercie 1: Display Title and Author in a table*/}
                <table>
                    <thead>
                    <tr>
                        <th>Title</th>
                        <th>Category</th>
                    </tr>
                    </thead>
                    <tbody>
                    {courses.map(renderCourse)}
                    </tbody>
                </table>
            </UserContext.Provider>
        </>
    );

    function handleSave(course, event, userName) {
        event.preventDefault();
        api.addCourse(course).then(savedCourse => {
            // the course has been saved to DB
            const newCourses = [...courses, savedCourse];
            setCourses(newCourses);
        }); // save it to DB
        user.name = userName;
        setUser(user)
    }
}

export default App;