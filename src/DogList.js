import React from 'react';
import { Card, Button} from 'semantic-ui-react';
function DogList(props){
  const dogs = props.dogs.map((dog) => {
    return (
        <Card key={dog.id}>
          <Card.Content>
            <Card.Header>{dog.name}</Card.Header>
            <Card.Description>{dog.breed}</Card.Description>
          </Card.Content>
          <Card.Content extra>
            <Button onClick={() => props.deleteDog(dog.id)}>Delete Dog</Button>
            {/* onClick on button for edit dog passing down from Dogcontainer */}
            {/* https://git.generalassemb.ly/prudential-0921/flask-react-edit-dog-app */}
            <Button onClick={() => props.openAndEdit(dog)}>Edit Dog</Button>
            {/* pass up the dog to DogContainer so add it to state, and open Modal. */}
          </Card.Content>
        </Card>
        )
  })
  return (
      <Card.Group>
        { dogs }
      </Card.Group>
    )
}
export default DogList