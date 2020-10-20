import React, {Component} from 'react'
import {Jumbotron, Container} from 'reactstrap'

class Home extends Component {
  
  render() {
    return (
      <div>
        <h2>Home</h2>
        <Jumbotron fluid>
          <Container fluid>
            <h1 className="display-3">XYZ Clothing</h1>
            <p className="lead">This application was implemented by Anton Polkanov and based on a task provided by Mudbath Digital. 
            To see the solution, please proceed to the Products section.</p>
            <hr className="my-2" />
            <p>The following functions are supported:</p>
            <ul>
              <li>List products with summary (Name and Price)</li>
              <li>While fetching products, a spinner is displayed (APIs are mocked using json-server)</li>
              <li>Products search by Name</li>
              <li>Sorting by Name</li>
              <li>Pagination. The page size can be adjusted</li>
              <li>Conversion between different currencies</li>
              <li>Display product details - summary, id, desciption and related products</li>
              <li>While fetching related products, the spinner is displayed in a placeholder</li>
              <li>Fake login/logout</li>
            </ul>
          </Container>
        </Jumbotron>
      </div>
    );
  }
}

export default Home;