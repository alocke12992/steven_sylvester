import React from 'react';
import {Button, Icon} from 'semantic-ui-react';
import CourseForm from './CourseForm';

class Course extends React.Component {
  state = {editing: false}

  toggleForm = () => {
    this.setState(state => {
      return {editing: !state.editing}
    })
  }

  render() {
    const {editing} = this.state
    const {title, syllabus, id, user} = this.props
    return (
      <div>
        {editing ? <CourseForm title={title} syllabus={syllabus} id={id} updateCourse={this.props.updateCourse} closeForm={this.toggleForm} /> : <a href={syllabus}>{title}</a>}
        {user.role === "admin" &&
          <Button icon onClick={this.toggleForm}>
            <Icon name={editing ? 'undo' : 'edit'} />
          </Button>
        }
      </div>
    )
  }
}

export default Course