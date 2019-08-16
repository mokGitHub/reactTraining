import React, { useState, useContext } from 'react';
import * as  api from "./api/courseApi";
import UserContext from "./UserContext"

function CourseForm(props) {
    const [ course, setCourse ] = useState({
        title: "",
        category: "",
        authorId: 1,  // HACK hardcode author id
        id: 13
    });

    let [ userName, setUserName ] = useState("");

    const user = useContext(UserContext);

    function onChange(event) {
        const newCourse = { ...course } ; // copy the course object
        if( event.target.name === "username") {
            userName = event.target.value;
            setUserName(userName);
        } else {
            newCourse[event.target.name] = event.target.value; // value the someone just type
            var courses = api.getCourses();
            newCourse.id = courses.length + 3;
            setCourse(newCourse);
        }
    }

    return (
        <form onSubmit={event => props.onSubmit(course, event, userName)}>
            {user.name} AND {user.email}
            <div>
                <label>Title</label>
                <br/>
                <input type="text" id="title" value={course.title} onChange={onChange} name="title"/>
            </div>

            <div>
                <label>Category</label>
                <br/>
                <input type="text" id="category" value={course.category} onChange={onChange} name="category"/>
            </div>

            <div>
                <label>User Name</label>
                <br/>
                <input type="text" id="username" value={userName} onChange={onChange} name="username"/>
            </div>

            <input type="submit" value="Add Course"/>

        </form>
    );
}

export default CourseForm;