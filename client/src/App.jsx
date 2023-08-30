import React, { useContext, useEffect, useState } from 'react'
import Admin from './Admin';
import  Guest from './Guest';
import Users from './Users';
import { GlobalContext } from './Context/context';
import { decodeToken } from 'react-jwt'


export const AppRoute = '/'
const componentsByRoles = {
  'admin': Admin,
  'user': Users,
  'guest': Guest,
}

const getUserRole = (role) => componentsByRoles[role] || componentsByRoles['guest']

export default function App() {
  const { state, dispatch } = useContext(GlobalContext)

  const decodeUser = (token) => {
    if (token === undefined) {
      return undefined
    }
    else {
      const res = decodeToken(token);
      return res?.username
    }
  }

  const currentUser = decodeUser(state.token);

  useEffect(() => {
    console.log("user type", state);
  }, []);  

  //to take it to use role give state.user to this function and it will take you to user side
  const CurrentUser = getUserRole(state.user);
  return <CurrentUser />
}
