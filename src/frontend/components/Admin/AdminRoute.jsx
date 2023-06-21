import React from 'react'
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../use-auth-client'

const AdminRoute = ({children}) => {
  
  const { isAdmin} = useAuth();

  if(isAdmin !== null) return children ;

 return <Navigate to='/' />;
}

export default AdminRoute