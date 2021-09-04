import React from 'react';
import { Admin, Resource, List, Datagrid, TextField, DateField, BooleanField, ShowButton, Show, SimpleShowLayout, SimpleForm, TextInput, PasswordInput, BooleanInput, Edit, HttpError, required, email } from 'react-admin';
import Empty from '@/Layouts/Empty'
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { toLower } from 'lodash';
import { NotImplemented } from 'http-errors';

const UsersList = (props) => (
  <List {...props}>
    <Datagrid >
      <TextField source="id" />
      <TextField source="name" />
      <TextField source="email" />
      <BooleanField label="Verified" source="email_verified_at" looseValue />
      <DateField source="updated_at" showTime />
      <ShowButton />
    </Datagrid>
  </List>
);

const UsersShow = (props) => (
  <Show {...props}>
    <SimpleShowLayout>
      <TextField source="id" />
      <TextField source="name" />
      <TextField source="email" />
      <DateField source="email_verified_at" showTime />
      <DateField source="created_at" showTime />
      <DateField source="updated_at" showTime />
    </SimpleShowLayout>
  </Show>
);

const UsersEdit = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput disabled source="id" />
      <TextInput validate={required()} source="name" />
      <TextInput validate={[required(), email()]} source="email" />
      <PasswordInput source="password" />
      <BooleanInput label="Verified" source="email_verified_at" />
    </SimpleForm>
  </Edit>
);

export default function AdminPage(props) {
  const axios = window.axios
  const COOKIE_URL = props.csrfUrl
  const API_URL = props.apiUrl

  const dataProvider = {
    getList: async (resource, params) => {
      await axios.get(COOKIE_URL)
      return axios.get(`${API_URL}/${resource}`, {
        params: {
          page: params.pagination.page,
          limit: params.pagination.perPage,
          field: params.sort.field,
          order: toLower(params.sort.order),
          filter: params.filter
        }
      }).then(
        (response) => ({
          data: response.data.data,
          total: response.data.total
        })
      );
    },
    getOne: async (resource, params) => {
      await axios.get(COOKIE_URL)
      return axios.get(`${API_URL}/${resource}/${params.id}`)
    },
    getMany: async (resource, params) => {
      await axios.get(COOKIE_URL)
      return axios.get(`${API_URL}/${resource}`, {
        params: { ids: params.ids }
      })
    },
    getManyReference: async (resource, params) => {
      await axios.get(COOKIE_URL)
      return axios.get(`${API_URL}/${resource}`, {
        params: { 
          id: params.id,
          target: params.target,
          page: params.pagination.page,
          limit: params.pagination.perPage,
          field: params.sort.field,
          order: toLower(params.sort.order),
          filter: params.filter 
        }
      })
    },
    create: async (resource, params) => {
      throw NotImplemented()
    },
    update: async (resource, params) => {
      await axios.get(COOKIE_URL)
      return axios.put(`${API_URL}/${resource}/${params.id}`, {
        data: params.data
      })
    },
    updateMany: async (resource, params) => {
      await axios.get(COOKIE_URL)
      return axios.put(`${API_URL}/${resource}`, {
        ids: params.ids,
        data: params.data
      })
    },
    delete: async (resource, params) => {
      await axios.get(COOKIE_URL)
      return axios.delete(`${API_URL}/${resource}/${params.id}`)
    },
    deleteMany: async (resource, params) => {
      await axios.get(COOKIE_URL)
      for (const id of params.ids) {
        axios.delete(`${API_URL}/${resource}/${id}`)
      }
    }
  }

  const authProvider = {
    checkAuth: () => new Promise(() => true),
    logout: () => {
      window.axios.post(API_URL + '/logout', props.auth)
    }
  }

  return (
    <Empty>
      <Admin
        // authProvider = {authProvider}
        dataProvider={dataProvider}
        loginPage={false}
        logoutButton={(<ResponsiveNavLink method="post" href={route('logout')} as="button">
          Log Out
        </ResponsiveNavLink>)

        }
      >
        <Resource name="users" list={UsersList} show={UsersShow} edit={UsersEdit} />
      </Admin>
    </Empty>
  )
}