import React, { Component } from 'react';
import { Container } from  'reactstrap';
import NavMenu from './NavMenu';

class Layout extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <NavMenu/>
        <Container>
          {this.props.children}
        </Container>
      </div>
    );
  }
  
}

export default Layout;
