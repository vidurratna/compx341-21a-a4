import * as React from 'react';
import { render } from "@testing-library/react";
import Amplify, { Auth } from "aws-amplify"
import config from "../../config";
import Overview from './Overview'

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

it('Check if the book overview displays the correct infomation in enough amount of time.', async ()=> {
    await Auth.signIn('vth98048@zwoho.com', 'password123');

    const bookID = ""

    const {getByText} = render(
        <Overview /> //match={{params:{id:bookID}}}
    )

    await new Promise((r)=> setTimeout(r, 2000)) // I will wait 2 seconds

    const searchQ = getByText('Brady Fisher', {exact: false});

    expect(searchQ).not.toBeNull();
})