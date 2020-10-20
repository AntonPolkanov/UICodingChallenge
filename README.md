This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Summary

The following functions are supported:
          
- List products with summary (Name and Price)
- Product search by Name
- Sorting by Name
- Pagination. The page size can be adjusted
- Conversion between different currencies
- Display product details - summary, id, desciption and related products
- While fetching products, a spinner is displayed
- While fetching related products, the spinner is displayed in a placeholder
- Fake login/logout

## Before running the project

The project uses json-server which mocks APIs based on the content db.json file. 
Install json-server globally by executing this command `npm install -g json-server`.
Open a terminal, go to the project folder ("xyz clothing") and run json-server 
`json-server --watch json_mock_api/src/db.json --port 4000`. If you use different
port, do not forget to change it in the .env.development file.
To install all required dependencies run `npm install` in the project folder.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

