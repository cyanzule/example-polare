import React from 'react';
import { Admin, Resource, ListGuesser } from 'react-admin';
import simpleRestProvider from 'ra-data-simple-rest';
import Empty from '@/Layouts/Empty'
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { List, Datagrid, TextField, DateField, BooleanField } from 'react-admin';

const dataProvider = {
  getList: (resource, params) => {
    const cookie = window.axios.get('/sanctum/csrf-cookie')
    return window.axios.get(`/api/${resource}`);
  }
}

const UserList = (props) => (
  <List {...props}>
    <Datagrid>
      <TextField source="id" />
      <TextField source="name" />
      <TextField source="email" />
    </Datagrid>
  </List>
);


export default function AdminPage(props) {
  return (
    <Empty>
      <Admin
        // authProvider = {{
        //   logout: () => {
        //     window.axios.post('/logout', props.auth)
        //   }
        // }}
        dataProvider={dataProvider}
        loginPage={false}
        logoutButton={
          () => {
            return (<ResponsiveNavLink method="post" href={route('logout')} as="button">
              Log Out
            </ResponsiveNavLink>)
          }
        }
      >
        <Resource name="users" list={UserList} />

      </Admin>
    </Empty>
  )
}