import React from 'react';
import {
  Grid,
} from 'semantic-ui-react';

class SearchPubType extends React.Component {
  state = {
    publications: [],
    publication: '',
    results: [],
    toggleResult: false,
  };

  findPubs = (publications) => {
    let results = [];
    publications.map((p) => {
      p.name.toLowerCase().includes(pouse.toLowerCase())
        ? results.push(p)
        : null;
    });
    this.setState({
      results: results,
      toggleResult: true,
    });
  };

  handleChange = (e) => {
    const {name, value} = e.target;
    this.setState({[name]: value});
  };

  handleSubmit = (e) => {
    const {publication} = this.state;
    e.preventDefault();
    this.findPubs(publication);
  };


  showResults = () => {
    const {results} = this.state;
    return results.map((result) => (
      <Grid.Column key={result.id}>

      </Grid.Column>
    ));
  }
  render() {
    return (
      <div></div>
    )
  }
}
export default SearchPubType;