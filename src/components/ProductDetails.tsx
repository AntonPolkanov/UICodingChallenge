import MaterialTable from 'material-table'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Form, UncontrolledAlert} from 'reactstrap'
import DeferredSpinner from './DeferredSpinner'
import ProductEditor from './ProductEditor'

export const ProductDetails = props => {
  const [state, setState] = useState({
    data: [],
    loading: true,
    errorMessage: ""
  })

  const fetchRelatedProducts = async () => {
    const promiseArray = props?.location?.state?.relatedProducts
      .map(item =>
        axios(`${process.env.REACT_APP_API_URL}/products/${item}`)
      );
    const products = await axios.all(promiseArray);
    const productsData = products.map((productItem: any) => productItem.data);

    setState({ data: productsData, loading: false });
  }

  useEffect(() => {
    fetchRelatedProducts();
  });

  return (
    <div>
      {
        state?.errorMessage &&
          <UncontrolledAlert color='danger'>
            {`Cannot fetch related products: ${state.errorMessage}`}
          </UncontrolledAlert>
      }
      <h2>Product Details</h2>
      <br/>
      <Form>
        <ProductEditor product={props.location.state} {...props}/>
        {
          state.loading
            ? <DeferredSpinner delay={250}/>
            : <MaterialTable
                title="Related products"
                data={state.data}
                columns={[
                  {title: "Id", field: "id"},
                  {title: "Name", field: "name"}
                ]}
                options={{ search: false, paging: false }}
              />
        }
      </Form>
    </div>
  );
}
