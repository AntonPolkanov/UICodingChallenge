import React, {Component} from 'react'
import {Row, Col, Button, FormGroup, Label, Input, 
  InputGroup, InputGroupAddon, InputGroupText} from 'reactstrap'
import {History} from 'history'

interface IProductEditorProps {
  product: any
}
 
class ProductEditor extends Component<IProductEditorProps> {
  history: History;
  product: any;
  backClick: any;

  constructor(props) {
    super(props);
    const {history} = props; 
    this.history = history;
    this.product = this.props.product;
    this.backClick = this.onBackClick.bind(this);
  }

  onBackClick = () => {
    this.history.goBack();
  }

  render() {
    return (
      <div>
        <Button outline 
            color="secondary" 
            onClick={this.onBackClick} 
            style={{marginBottom:20, marginTop:-10}}
            size="md"
        >Back</Button>
        <Row form>
          <Col md={5}>
            <FormGroup>
              <Label for="name">Name</Label>
              <Input type="text" name="name" id="name" placeholder="Name" value={this?.product?.name}/>
            </FormGroup>
          </Col>
          <Col md={5}>
            <FormGroup>
              <Label for="price">Price</Label>
              <InputGroup>
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>{this.product.price.base}</InputGroupText>
                </InputGroupAddon>
                <Input type="number" name="price" id="price" placeholder="Price" value={this?.product?.price?.amount}/>
                <InputGroupAddon addonType="append">
                  <InputGroupText>.00</InputGroupText>
                </InputGroupAddon>
              </InputGroup>
            </FormGroup>
          </Col>
          <Col md={2}>
            <FormGroup>
              <Label for="id">Id</Label>
              <Input type="number" name="Id" id="id" placeholder="Product Id" value={this?.product?.id}/>
            </FormGroup>
          </Col>
        </Row>
        
        <FormGroup>
          <Label for="description">Description</Label>
          <Input type="textarea" name="description" id="description" placeholder="Name" value={this?.product?.description}/>
        </FormGroup>
      </div>
    );
  }
}

export default ProductEditor