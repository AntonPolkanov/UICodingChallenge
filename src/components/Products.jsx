import React, {Component} from 'react'
import MaterialTable from 'material-table'
import axios from 'axios'
import DeferredSpinner from './DeferredSpinner'
import {Dropdown, DropdownMenu, DropdownItem, DropdownToggle, UncontrolledAlert} from 'reactstrap'

class Products extends Component{

  constructor(props) {
    super(props);
    const {history} = props;
    this.history = history;
    this.state = {
      productsData: [],
      currencyData: [],
      loadingProducts: true,
      loadingCurrency: true,
      errorMessageProducts: "",
      errorMessageCurrency: "",
      errorMessageCulculations: "",
      dropDownOpen: false,
      currentCurrency: "Original"
    };
    this.handleCurrencyChange = this.handleCurrencyChange.bind(this);
  }

  toggleDrowDown = () => {
    this.setState({
      dropDownOpen: !this.state.dropDownOpen
    });
  }

  componentDidMount() {
    this.fetchProductsData();
    this.fetchCurrencyData();
  }

  fetchProductsData = () => {
    const url = `${process.env.REACT_APP_API_URL}/products`
    axios({
      method: "get",
      url: url
    }).then(response => {
      let products = response.data;
      products.map(p => {
        p.price.baseDisplay = p.price.base;
        p.price.amountDisplay = p.price.amount;
        return p;
      })
      this.setState({
        productsData: products,
        loadingProducts: false
      })
    }).catch(error => {
      console.log(error);
      this.setState({
        errorMessageProducts: error.message,
        loadingProducts: false
      })
    });
  }

  fetchCurrencyData = () => {
    const url = `${process.env.REACT_APP_API_URL}/exchangeRates`
    axios({
      method: "get",
      url: url
    }).then(response => {
      this.setState({
        currencyData: response.data,
        loadingCurrency: false
      })
    }).catch(error => {
      console.log(error);
      this.setState({
        errorMessageCurrency: error.message,
        loadingCurrency: false
      })
    });
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
              field: 'amountDisplay',
              render: rowData => rowData?.price?.amountDisplay ?? ""
            },
            {
              title: 'Currency',
              field: 'baseDisplay',
              editable: 'never',
              render: rowData => rowData?.price?.baseDisplay ?? ""
            }
          ]}
          onRowClick={(event, rowData, togglePanel) => this.openProductDetails(rowData)}
        />
    );
  }

  recalculateCurrency = (products, exchangeRates, targetCurrency) => {
    for(let p of products) {
      if (p.price.baseDisplay !== targetCurrency) {// if targetCurrency is already displayed.
          let oldCurrency = exchangeRates.find(x => x.base === p.price.baseDisplay);
          if (oldCurrency === undefined) {
            this.setState({
              errorMessageCulculations: `ERROR: Problem with the source data! Cannot find the currency for id=${p.id}`
            });
            continue;
          }

          if (oldCurrency.rates[targetCurrency] === undefined) {
            this.setState({
              errorMessageCulculations: `Cannot find target currency among the exchange list for id=${p.id}`
            });
            continue;
          }
          
          let newExRate = Number(oldCurrency.rates[targetCurrency], 10);
          if (isNaN(newExRate)) {
            this.setState({
              errorMessageCulculations: `Cannot convert new exachange rate to number for id=${p.id}`
            });
            continue;
          }

          p.price.baseDisplay = targetCurrency;
          p.price.amountDisplay = p.price.amountDisplay * newExRate;
      }
    }
    this.setState({
      productsData: products
    });
  }

  setDefault = (products) => {
    products.map(p => {
      p.price.baseDisplay = p.price.base;
      p.price.amountDisplay = p.price.amount;
      return p;
    });
    this.setState({
      productsData: products
    });
  }

  handleCurrencyChange(e) {
    const targetCurrency = e.currentTarget.textContent;
    this.setState({
      currentCurrency: targetCurrency
    });
    if (targetCurrency === "Original") {
      this.setDefault(this.state.productsData);
    } else {
      this.recalculateCurrency(
        this.state.productsData,
        this.state.currencyData,
        targetCurrency
      );
    }
    
  }

  renderCurrencyHeader(data) {
    return (
      <Dropdown isOpen={this.state.dropDownOpen} toggle={this.toggleDrowDown} style={{marginBottom: 10}}>
        <DropdownToggle caret id="carrency-dropdown">
          {this.state.currentCurrency}
        </DropdownToggle>
        <DropdownMenu >
          <DropdownItem><div onClick={this.handleCurrencyChange}>Original</div></DropdownItem>
          {
            data.map((item, i) => {
              return <DropdownItem key={i}><div onClick={this.handleCurrencyChange}>{item.base}</div></DropdownItem>
            })
          }
        </DropdownMenu>
      </Dropdown>
    );
  }
 
  render() {
    let contents = this.state.loadingProducts
      ? <DeferredSpinner delay={250}/>
      : this.renderProductsTable(this.state.productsData);

    let currency = this.state.loadingCurrency
      ? <></>
      : this.renderCurrencyHeader(this.state.currencyData);

    let errorAlert = this.state.errorMessageCulculations
      ? <UncontrolledAlert color="danger">{this.state.errorMessageCulculations}</UncontrolledAlert>
      : <></>;

    return (
      <div>
        <h2>Products</h2>
        <br/>
        {
          errorAlert
        }
        {
          !this.state.errorMessageCurrency
            ? currency
            : <div>{this.state.errorMessageCurrency}</div>
        }
        {
          !this.state.errorMessageProducts
            ? contents
            : <div>{this.state.errorMessageProducts}</div>
        }
      </div>
    );
  }
}

export default Products;