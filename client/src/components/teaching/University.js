import React from 'react'
import UniversityForm from './UniversityForm';
import {Button, Grid, List, Divider} from 'semantic-ui-react'
import axios from 'axios';
import {connect} from 'react-redux';
import {deleteUniversity} from '../../actions/teaching';
import Course from './Course'
import CourseForm from './CourseForm';

class University extends React.Component {
  state = {showForm: false, showCourseForm: false, courses: []}

  componentDidMount() {
    this.getCourses()
  }

  getCourses = () => {
    axios.get(`api/universities/${this.props.university.id}/courses`)
      .then((res) => {
        console.log(res.data)
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
        console.log(res.data)
        this.setState({
          courses: [res.data, ...this.state.courses]
        })
        this.toggleCourseForm()
      })
      .catch(res => {
        return res
      })
  }

  form = ({university}) => {
    return (
      <Grid.Column width={6}>
        <UniversityForm {...university} closeForm={this.toggleForm} />
        <Button onClick={this.toggleForm}>
          Cancel
        </Button>
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
            <List.Header>
              {university.name}
            </List.Header>
            <List>
              {courses.length !== 0 && courses.map((course) => {
                return (
                  <List.Item key={course.id}>
                    <Course syllabus={course.syllabus} title={course.title} addCourse={this.addCourse} />
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
                  <Button onClick={this.toggleCourseForm}>+</Button>
              }
            </List>
          </div>
        }
        {/* {user.role === 'admin' && */}
        <List.Content floated='right'>
          {showForm ?
            null
            :
            <div>
              <Button onClick={this.toggleForm}>Edit</Button>
              <Button onClick={() => this.deleteUniversity(university.id)}>Delete</Button>
            </div>
          }
        </List.Content>
        {/* } */}
      </List.Item>
    )
  }
}

const mapStateToProps = (state) => {
  return {user: state.user}
}

export default connect(mapStateToProps)(University)