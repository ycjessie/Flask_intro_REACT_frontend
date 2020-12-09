// https://git.generalassemb.ly/prudential-0921/flask-react-post-delete-dog-app
import React, { Component } from 'react';
import { Form, Button, Label, Segment } from 'semantic-ui-react';
class CreateDogForm extends Component {
    constructor(){
        super();
    
        this.state = {
          name: '',
          owner: '',
          breed: ''
        }
      }
      handleChange = (e) => {
        this.setState({[e.currentTarget.name]: e.currentTarget.value})
      }
      render(){
        return (
          <Segment>
            <h4>Create Dog</h4>
            
            <Form onSubmit={(e) => {
                this.props.addDog(e, this.state);
                // clear the form after add the dog
                this.setState({ name: '', owner: '', breed: '' });
                }}>
              <Label>Dog:</Label>
              <Form.Input required type='text' name='name' value={this.state.name} onChange={this.handleChange}/>
              <Label>Owner:</Label>
              <Form.Input reqired type='text' name='owner' value={this.state.owner} onChange={this.handleChange}/>
              <Label>Breed:</Label>
              <Form.Input requiredtype='text' name='breed' value={this.state.breed} onChange={this.handleChange}/>
              <Button type='Submit'>Create Dog</Button>
            </Form>
          </Segment>
          )
      }
}
 
export default CreateDogForm;