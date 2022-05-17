import React, {Component} from 'react';
import { BrowserRouter } from "react-router-dom";

import {ApolloClient, InMemoryCache, ApolloProvider} from "@apollo/client";
// components
import Main from './components/Main';


// apollo client setup
const client = new ApolloClient({
    uri: 'http://localhost:3001/graphql',
    cache: new InMemoryCache(),
});

class App extends Component {
    render() {
        return (
            <BrowserRouter>

                <ApolloProvider client={client}>
                    <div id="main">
                        <h1>hello</h1>
                        <Main/>
                    </div>
                </ApolloProvider>
            </BrowserRouter>

        );
    }
}

export default App;