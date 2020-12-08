import React, { Component } from 'react';
import axios from 'axios';
import DogList from './DogList';
class DogContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dogs: [],
    };
  }
  componentDidMount() {
    this.getDogs();
  }
  getDogs = async () => {
    try {
      const parsedDogs = await axios(
        process.env.REACT_APP_FLASK_API_URL + '/api/v1/dogs/'
      );
      console.log(parsedDogs.data.data);
      await this.setState({
        dogs: parsedDogs.data.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
  render() {
    return <DogList dogs={this.state.dogs} />;
  }
}
export default DogContainer;