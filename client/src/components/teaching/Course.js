import React from 'react';

class Course extends React.Component {
  state = {editing: false}

  render() {
    const {title, syllabus} = this.props
    return (
      <div><a href={syllabus}>{title}</a></div>
    )
  }
}

export default Course