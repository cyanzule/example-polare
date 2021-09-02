import React from 'react';
import ReactDOM from 'react-dom';
import { Admin, Resource, ListGuesser } from 'react-admin';
import simpleRestProvider from 'ra-data-simple-rest';

const Root = () => (
    <Admin dataProvider={simpleRestProvider('//localhost:8000/api/')}>
        <Resource name='users' list={ListGuesser} />
    </Admin>
);
export default Root;

if (document.getElementById('root')) {
    ReactDOM.render(<Root />, document.getElementById('root'));
}