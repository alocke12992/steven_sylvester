import React from 'react';
import {
  Card,
  Container,
  Divider,
  Form,
  Grid,
  Header,
  Image,
  Label,
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
    const {results, toggleResult} = this.state;
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
export default SearchPubType;r