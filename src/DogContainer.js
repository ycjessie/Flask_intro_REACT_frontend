import React, { Component } from "react";
import { Grid } from "semantic-ui-react";
import axios from "axios";
import DogList from "./DogList";
// import Create Dog form
import CreateDogForm from "./CreateDogForm";
//import Dog Edit form
import EditDogModal from "./EditDogModal";
class DogContainer extends Component {
  state = {
      dogs: [],
      dogToEdit: {
        //setup to prefill the edit form
        name: "",
        breed: "",
        owner: "",
        id: "",
      },
      showEditModal: false, //track if Modal is open/close
    };
  
  componentDidMount() {
    this.getDogs();
  }
  //using the spread operator  empty our object 
  //in the dogToEdit

  getDogs = async () => {
    try {
      const parsedDogs = await axios(
        process.env.REACT_APP_FLASK_API_URL + "/api/v1/dogs/"
      );
      console.log(parsedDogs.data.data);
      await this.setState({
        dogs: parsedDogs.data.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
  addDog = async (e, dog) => {
    e.preventDefault();
    console.log(dog);

    try {
      // The createdDogResponse variable will store the response from the Flask API
      const createdDogResponse = await axios.post(
        process.env.REACT_APP_FLASK_API_URL + "/api/v1/dogs/",
        dog,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // we are emptying all the dogs that are living in state into a new array,
      // and then adding the dog we just created to the end of it
      // the new dog which is called parsedResponse.data

      console.log(createdDogResponse.data.data, " this is response");
      this.setState({
        dogs: [...this.state.dogs, createdDogResponse.data.data],
      });
    } catch (err) {
      console.log("error", err);
    }
  };
  deleteDog = async (id) => {
    console.log(id);
    const deleteDogResponse = await axios.delete(
      `${process.env.REACT_APP_FLASK_API_URL}/api/v1/dogs/${id}`
    );
    console.log(deleteDogResponse);
    // Now that the db has deleted our item, we need to remove it from state
    // Then make the delete request, then remove the dog from the state array using filter
    this.setState({ dogs: this.state.dogs.filter((dog) => dog.id !== id) });

    console.log(deleteDogResponse, " response from Flask server");
  };
  handleEditChange = (e) => {
    this.setState({
      dogToEdit: {
        ...this.state.dogToEdit,//using the spread operator
        [e.currentTarget.name]: e.currentTarget.value,
      },
    });
  };
  //https://git.generalassemb.ly/prudential-0921/flask-react-edit-dog-app
  openAndEdit = (dogFromTheList) => {
    console.log(dogFromTheList, " dogToEdit  ");

    this.setState({
      showEditModal: true,
      dogToEdit: {
        //lifting up from the DogList component.
        ...dogFromTheList,//spreading the dogFromTheList
      },
    });
  };
  
  closeModal=()=>{
    this.showEditModal= false
  }
  //Edit Dog
  closeAndEdit = async (e) => {
    e.preventDefault();
    try {
      //axios calling the backend
      //already tested with Postman
      const editResponse = await axios.put(
        process.env.REACT_APP_FLASK_API_URL +
          "/api/v1/dogs/" +
          this.state.dogToEdit.id,
        this.state.dogToEdit
      );

      console.log(editResponse, " parsed edit");
        //use Map() to create a new array
      const newDogArrayWithEdit = this.state.dogs.map((dog) => {
        if (dog.id === editResponse.data.data.id) {
          dog = editResponse.data.data;
        }
        return dog;
      });

      this.setState({
        showEditModal: false,
        dogs: newDogArrayWithEdit,
      });
    } catch (err) {
      console.log(err);
    }
  };
  render() {
    console.log(this.state)//reassigning dog to edit lift up
    return (
      <Grid
        columns={2}
        divided
        textAlign="center"
        style={{ height: "100%" }}
        verticalAlign="top"
        stackable
      >
        <Grid.Row>
          <Grid.Column>
            {/* render functions */}
            <DogList
              dogs={this.state.dogs}
              deleteDog={this.deleteDog}
              openAndEdit={this.openAndEdit}
            />
          </Grid.Column>
          <Grid.Column>
            <CreateDogForm addDog={this.addDog} />
          </Grid.Column>
          {/* Edit Dog */}
          <EditDogModal
            handleEditChange={this.handleEditChange}
            //pop up window for EditModal
            open={this.state.showEditModal}
            dogToEdit={this.state.dogToEdit}
            closeAndEdit={this.closeAndEdit}
            closeModal={this.closeModal}
          />
        </Grid.Row>
      </Grid>
    );
  }
}
export default DogContainer;
