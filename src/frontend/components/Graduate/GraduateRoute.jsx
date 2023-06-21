import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../use-auth-client'

const GraduateRoute = ({children}) => {
  const {isGraduate } = useAuth();

  
    if(isGraduate !== null) return children;

     return  <Navigate to='/' /> ;


}

export default GraduateRoute