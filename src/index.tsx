
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {AppContainer} from 'react-hot-loader';
import App from './components/App/App';


declare let module: {hot: any};


const root = document.getElementById('root');

ReactDOM.render(
    <AppContainer>
        <App/>
    </AppContainer>,
    root
);

if(module.hot) {
    module.hot.accept('./components/App/App', () => {

        const NewApp = require('./components/App/App').default;

        ReactDOM.render(
            <AppContainer>
                <NewApp/>
            </AppContainer>,
            root
        );
    });
}
