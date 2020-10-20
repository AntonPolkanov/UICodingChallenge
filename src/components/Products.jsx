import React, {Component} from 'react'
import MaterialTable from 'material-table'
import axios from 'axios'

class Products extends Component{

  constructor() {
    super();
    this.state = {
      data: [],
      loading: true,
      errorMessage: ""
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    const url = `${process.env.REACT_APP_API_URL}/products`
    axios({
      method: "get",
      url: url
    }).then(response => {
      this.setState({
        data: response.data,
        loading: false
      })
    }).catch(error => {
      console.log(error);
      this.setState({
        errorMessage: error.message,
        loading: false
      })
    })
  }

  static renderProductsTable(data) {
    return (
      <MaterialTable
        title="Available products"
        columns={[
          {title: 'Id', field: 'id'},
          {title: 'Name', field: 'name'},
          { 
            title: 'Price', 
            field: 'amount',
            render: rowData => rowData.price.amount
          },
          {
            title: 'Currency',
            field: 'base',
            editable: 'never',
            render: rowData => rowData.price.base
          }
        ]}
        data = {data}
      >
      </MaterialTable>
    );
  }

  render() {
    let contents = this.state.loading
      ? <p><em>Loading...</em></p>
      : Products.renderProductsTable(this.state.data)

    return (
      <div>
        <h1>Products</h1>
        {
          !this.state.errorMessage
            ? contents
            : <div>{this.state.errorMessage}</div>
        }
      </div>
    );
  }
}

export default Products;