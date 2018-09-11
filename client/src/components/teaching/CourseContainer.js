import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Course from './Course';
import CourseForm from './CourseForm';
import {List, Button} from 'semantic-ui-react';

class CourseContainer extends React.Component {
  state = {courses: [], showForm: false}

  componentDidMount() {
    this.getCourses()
  }

  getCourses = () => {
    axios.get(`api/universities/${this.props.universityId}/courses`)
      .then((res) => {
        res.data.sort(function (a, b) {return b.id - a.id})
        this.setState({courses: [...res.data]})
      })
      .catch((err) => {
        return err
      })
  }

  addCourse = (course) => {
    const title = encodeURIComponent(course.title)
    const data = new FormData()
    data.append('syllabus', course.syllabus)
    axios.post(`api/universities/${this.props.universityId}/courses?title=${title}`, data)
      .then(res => {
        this.setState({
          courses: [res.data, ...this.state.courses]
        })
        this.toggleCourseForm()
      })
      .catch(err => {
        console.log(err)
      })
  }

  updateCourse = (course) => {
    const {courses} = this.state
    const title = encodeURIComponent(course.title)
    const data = new FormData()
    let itemToUpdate
    data.append('syllabus', course.syllabus)
    axios.put(`api/universities/${this.props.universityId}/courses/${course.id}?title=${title}`, data)
      .then(res => {
        courses.map((item) => {
          if (item.id === course.id) {
            return itemToUpdate = item
          }
        });
        courses.splice(courses.indexOf(itemToUpdate), 1, res.data)
        this.setState({
          courses: [...courses]
        })
      })
      .catch(err => {
        console.log(err)
      })
  }

  deleteCourse = (id) => {
    axios.delete(`/api/universities/${this.props.universityId}/courses/${id}`, id)
      .then(res => {
        this.getCourses()
      })
      .catch(err => {
        console.log(err)
      })
  }

  toggleCourseForm = () => {
    this.setState(state => {
      return {showCourseForm: !state.showCourseForm}
    })
  }

  courseForm = () => (
    <div style={{display: 'flex', justifyContent: 'center'}}>
      {this.state.showCourseForm ?
        <CourseForm addCourse={this.addCourse} closeForm={this.toggleCourseForm} />
        :
        <Button
          onClick={this.toggleCourseForm}
          color="blue"
          style={{marginBottom: '25px', marginTop: '25px'}}
        >
          Add Course
        </Button>

      }
    </div>
  )

  render() {
    const {user} = this.props
    const {courses} = this.state
    return (
      <div>
        {user.role === 'admin' && this.courseForm()}
        <List bulleted>
          {courses.length !== 0 && courses.map((course) => {
            return (
              <OneCourse key={course.id}>
                <Course
                  id={course.id}
                  syllabus={course.syllabus}
                  title={course.title}
                  addCourse={this.addCourse}
                  updateCourse={this.updateCourse}
                  user={user}
                  deleteCourse={this.deleteCourse}
                />
              </OneCourse>
            )
          })
          }
        </List>
      </div>
    )
  }
}

const OneCourse = styled(List.Item)`
  display: flex !important;
  align-items: center !important;
`

export default CourseContainer;