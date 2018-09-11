import React, {Fragment, Component} from 'react';
import {Button, Icon} from 'semantic-ui-react';
import CourseForm from './CourseForm';
import axios from 'axios';

class Course extends Component {
  state = {showForm: false}

  toggleForm = () => {
    this.setState(state => {
      return {showForm: !state.showForm}
    })
  }

  form = () => {
    const {title, syllabus, id} = this.props
    return (
      <Fragment>
        {this.state.showForm &&
          <CourseForm
            title={title}
            syllabus={syllabus}
            id={id}
            updateCourse={this.props.updateCourse}
            closeForm={this.toggleForm}
          />
        }
      </Fragment>
    )
  }

  buttons = (id) => (
    <Fragment>
      {!this.state.showForm &&
        <Fragment>
          <Button icon onClick={this.toggleForm} color="blue">
            <Icon name='edit' />
          </Button>
          <Button icon onClick={() => this.props.deleteCourse(id)} color="red">
            <Icon name='delete' />
          </Button>
        </Fragment>
      }
    </Fragment>
  )

  render() {
    const {title, syllabus, id, user} = this.props
    return (
      <Fragment>
        {user.role === "admin" && this.form()}
        {!this.state.showForm &&
          <a
            style={{marginRight: '25px', color: "black"}}
            href={syllabus}
            target="_blank"
            rel="noopener noreferrer"
          >
            {title}
          </a>
        }
        {user.role === "admin" && this.buttons(id)}
      </Fragment>
    )
  }
}

export default Course