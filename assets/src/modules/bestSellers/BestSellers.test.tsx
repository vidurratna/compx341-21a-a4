// Vidur Ratna 1309874
import Amplify, { API, Auth } from "aws-amplify"
import React from "react";
import ReactDOM from "react-dom";
import config from "../../config";
import BestSellerProductRow from "./BestSellerProductRow";

jest.setTimeout(30000);

Amplify.configure({
    Auth: {
      mandatorySignIn: true,
      region: config.cognito.REGION,
      userPoolId: config.cognito.USER_POOL_ID,
      identityPoolId: config.cognito.IDENTITY_POOL_ID,
      userPoolWebClientId: config.cognito.APP_CLIENT_ID
    },
    API: {
      endpoints: [
        {
          name: "books",
          endpoint: config.apiGateway.API_URL,
          region: config.apiGateway.REGION
        },
        {
          name: "cart",
          endpoint: config.apiGateway.API_URL,
          region: config.apiGateway.REGION
        },
        {
          name: "orders",
          endpoint: config.apiGateway.API_URL,
          region: config.apiGateway.REGION
        },
        {
          name: "search",
          endpoint: config.apiGateway.API_URL,
          region: config.apiGateway.REGION
        },
        {
          name: "recommendations",
          endpoint: config.apiGateway.API_URL,
          region: config.apiGateway.REGION
        },
        {
          name: "bestsellers",
          endpoint: config.apiGateway.API_URL,
          region: config.apiGateway.REGION
        }
      ]
    }
  });

it('Check if the Best Sellers sort in rating order', async () => {

    await Auth.signIn('vth98048@zwoho.com', 'password123');

    const books: any[] = [
        {id: "3sbvndpe-d93b-11e8-9f8b-f2801f1b9fd1"}, // Graph - rating 5
        {id: "nuklcm5b-d93b-11e8-9f8b-f2801f1b9fd1"}, // Chasing Umami - 3
        {id: "a7zyln40-d93b-11e8-9f8b-f2801f1b9fd1"}, // Carbs - rating 4
        {id: "rkz1ljyg-d93b-11e8-9f8b-f2801f1b9fd1"}, // Dairy - rating 1
        {id: "o3ahe30e-d93b-11e8-9f8b-f2801f1b9fd1"}  // Classic - rating 2
    ]

    // Correct Order: Graph, Crabs, Chasing Umami, Classic, Dairy

    const jsonBookPromises: any[] = [];

    books.map((book) => {
        const bookObject = API.get("books",`/books/${book.id}`, null);
        jsonBookPromises.push(bookObject)
      })

    const allBookObjects = await Promise.all(jsonBookPromises);

    const sortedListOfBooks = allBookObjects.sort((a,b) => {
        return a.rating - b.rating
    })

    ReactDOM.render(
        <div>
            {sortedListOfBooks.slice(20).map(book => <BestSellerProductRow bookId={book.id} key={book.id} />)}
        </div>,
        document.createElement('div')
    )

    const bookNames = sortedListOfBooks.map((book) => book.name)

    expect(bookNames).toEqual(["Graph", "Carbs ", "Chasing Umami", "Classic", "Dairy"])

})