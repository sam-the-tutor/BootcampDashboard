import React,{useState} from "react";
import { useAuth, AuthProvider } from "./use-auth-client";
import "./assets/main.css";
import {Routes,Route } from "react-router-dom";

import Home from "./components/User/Home"
 import Review from "./components/User/Review"
 import Graduates from "./components/User/Graduates"
 import Error from "./components/User/Error"
import SharedLayout from "./components/User/SharedLayout";
 import AdminRoute from "./components/Admin/AdminRoute";
 import AdminDashboard from "./components/Admin/adminDashboard"
 import SharedAdminLayout from "./components/Admin/SharedAdminLayout"
 import SharedGraduateLayout from "./components/Graduate/SharedGraduateLayout"
 import GraduateRoute from "./components/Graduate/GraduateRoute";
 import GraduateBoard from "./components/Graduate/GraduateBoard";
 import Upload from './components/Upload'
 import Loader from './Loader'
 import ViewGraduates from './components/Admin/ViewGraduates'


function App() {
  const { isAuthenticated, identity ,whoamiActor,isLoading} = useAuth();

  console.log("My actor : ", whoamiActor)
  return (
    <>
 

    <Routes>
      <Route path='/' element={<SharedLayout /> }>
        <Route index element={<Home />} />
         <Route path ='graduates' element={<Graduates />} />
        <Route path ='reviews' element={<Review />} />
       <Route path ='*' element={<Error />} />
      </Route>

      <Route path='/admin' element={<SharedAdminLayout /> }>
        <Route index element ={
          <AdminRoute>
            <AdminDashboard />
            </AdminRoute>
        } />
        <Route path ='viewgraduates' element={<AdminRoute><ViewGraduates /></AdminRoute>} />
         <Route path ='*' element={<Error />} />
      </Route>

      <Route path='graduate' element={<SharedGraduateLayout  />}>
        <Route index element={
            <GraduateRoute>
              <GraduateBoard />
            </GraduateRoute>
        } />
          <Route path ='*' element={<Error />} />
       </Route> *
       {/* <Route path='upload' element={<Upload />} /> */}
    </Routes>
    </>
  );
}

export default () => (
  <AuthProvider>
    <App />
  </AuthProvider>
);
