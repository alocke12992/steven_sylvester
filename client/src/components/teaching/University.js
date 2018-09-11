import React from 'react'
import UniversityForm from './UniversityForm';
import {Button, Grid, List, Icon} from 'semantic-ui-react'
import axios from 'axios';
import {connect} from 'react-redux';
import {deleteUniversity} from '../../actions/teaching';
import Course from './Course';
import CourseForm from './CourseForm';
import styled from 'styled-components';

class University extends React.Component {
  state = {showForm: false, showCourseForm: false, courses: []}

  componentDidMount() {
    this.getCourses()
  }

  getCourses = () => {
    axios.get(`api/universities/${this.props.university.id}/courses`)
      .then((res) => {
        this.setState({courses: [...res.data]})
      })
      .catch((res) => {
        return res
      })
  }

  toggleForm = () => {
    this.setState(state => {
      return {showForm: !state.showForm}
    })
  }
  toggleCourseForm = () => {
    this.setState(state => {
      return {showCourseForm: !state.showCourseForm}
    })
  }

  addCourse = (course) => {
    axios.post(`api/universities/${this.props.university.id}/courses`, course)
      .then(res => {
        this.setState({
          courses: [res.data, ...this.state.courses]
        })
        this.toggleCourseForm()
      })
      .catch(res => {
        return res
      })
  }

  updateCourse = (course) => {
    const {courses} = this.state
    let itemToUpdate
    axios.put(`api/universities/${this.props.university.id}/courses/${course.id}`, course)
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
      .catch(res => {
        return res
      })
  }

  form = ({university}) => {
    return (
      <Grid.Column width={6}>
        <UniversityForm {...university} closeForm={this.toggleForm} />
      </Grid.Column>
    )
  }

  deleteUniversity = (id) => {
    const {dispatch} = this.props
    dispatch(deleteUniversity(id))
  }


  render() {
    const {university, user} = this.props
    const {showForm, courses, showCourseForm} = this.state
    return (
      <List.Item key={university.id}>
        {showForm ? this.form({university})
          :

          <div>
            <UniHeader>
              {university.name}
              <List.Content>
                {showForm ?
                  null
                  :
                  <React.Fragment>
                    {/* {user.role === 'admin' && */}
                    <React.Fragment>
                      <Button
                        onClick={this.toggleForm}
                        color="blue"
                        icon
                      >
                        <Icon name="edit" />
                      </Button>
                      <Button
                        onClick={() => this.deleteUniversity(university.id)}
                        color="red"
                        icon
                      >
                        <Icon name="delete" />
                      </Button>
                    </React.Fragment>
                    {/* } */}
                  </React.Fragment>
                }
              </List.Content>
            </UniHeader>
            <List bulleted>
              {courses.length !== 0 && courses.map((course) => {
                return (
                  <List.Item key={course.id}>
                    <Course
                      id={course.id}
                      syllabus={course.syllabus}
                      title={course.title}
                      addCourse={this.addCourse}
                      updateCourse={this.updateCourse}
                      user={user}
                    />
                  </List.Item>
                )
              })
              }
              {
                showCourseForm ?
                  <div>
                    <CourseForm addCourse={this.addCourse} />
                    <Button onClick={this.toggleCourseForm}>-</Button>
                  </div>
                  :
                  <React.Fragment>
                    {user.role === 'admin' &&
                      <Button onClick={this.toggleCourseForm}>+</Button>
                    }
                  </React.Fragment>
              }
            </List>
          </div>
        }
      </List.Item>
    )
  }
}

const UniHeader = styled(List.Header)`
  display: flex !important
  justify-content: space-between !important;
`

export default connect()(University)