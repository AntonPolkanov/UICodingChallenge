import React, {Component} from 'react'
import MaterialTable from 'material-table'
import axios from 'axios'

class Products extends Component{

  constructor(props) {
    super(props);
    const {history} = props;
    this.history = history;
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

  openProductDetails = (rowData) => {
      this.history.push(`/productDetails/${rowData.id}`, rowData, {...this.props});
  }

  renderProductsTable(data) {
    return (
      <MaterialTable
        title="Available products"
        data={data}
        columns={[
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
        onRowClick={(event, rowData, togglePanel) => this.openProductDetails(rowData)}
      >
      </MaterialTable>
    );
  }
 
  render() {
    let contents = this.state.loading
      ? <p><em>Loading...</em></p>
      : this.renderProductsTable(this.state.data)

    return (
      <div>
        <h2>Products</h2>
        <br/>
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