import MaterialTable from 'material-table'
import React, {Component} from 'react'
import axios from 'axios'
import { Form, UncontrolledAlert} from 'reactstrap'
import DeferredSpinner from './DeferredSpinner'
import ProductEditor from './ProductEditor'

interface IProductDetailsState {
  data: any[],
  loading: boolean,
  errorMessage: string,
}

class ProductDetails extends Component<{},IProductDetailsState> {
  product: any;

  constructor(props) {
    super(props);
    this.product = props.location.state;
    this.state = {
      data: [],
      loading: true,
      errorMessage: ""
    };
  }

  componentDidMount() {
    this.fetchRelatedProducts();
  }

  async fetchRelatedProducts() {
    let urls: string[] = [];
    for (let p of this.product.relatedProducts) {
      urls.push(`${process.env.REACT_APP_API_URL}/products/${p}`)
    }
    let promiseArray = urls.map(url => axios(url));
    const data = await axios.all(promiseArray);
    let temp = data.map(r => r.data);
    this.setState({
      data: temp,
      loading: false
    });
  }

  render() {
    return (
      <div>
        {
          this.state && this.state.errorMessage
            ? <UncontrolledAlert color='danger'>{`Cannot fetch related products: ${this.state.errorMessage}`}</UncontrolledAlert>
            : <></>
        }
        <h2>Product Details</h2>
        <br/>
        <Form>
          <ProductEditor product={this.product} {...this.props}/>
          {
            this.state.loading
              ? <DeferredSpinner delay={250}/>
              : <MaterialTable
                  title="Related products"
                  data={this.state.data}
                  columns={[
                    {title: "Id", field: "id"},
                    {title: "Name", field: "name"}
                  ]}
                  options={{
                    search: false, paging: false,
                    
                  }}
                />
          }
        </Form>
      </div>
    );
  }
}


export default ProductDetails;