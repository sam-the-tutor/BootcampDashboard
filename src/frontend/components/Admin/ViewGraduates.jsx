import React, {useState, useEffect } from 'react';
import { Box, Grid, List, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useAuth } from '../../use-auth-client';
import { AdminCard,GraduateCard,EditionCard } from './Cards/Cards';
import { Principal } from '@dfinity/principal';

const Page = () => {
  const [admins, setAdmins] = useState([]);
  const [graduates,setGraduates] = useState([]);
  const [editions, setEditions] = useState([]);
  const{ isLoading,setIsLoading, whoamiActor} = useAuth();
  const [changes, setChanges] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        
        const [response1, response2, response3] = await Promise.all([
          whoamiActor.getAdminList(),
          whoamiActor.getAllGraduates(),
          whoamiActor.getAllEditions(),
        ]);
  
        setAdmins(response1)
        setGraduates(response2)
        setEditions(response3)
        
        console.log(response1,response2,response3)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [changes]);


  return (
    <Box  backgroundColor= "#191923" sx={{height:"100vh"}} >
     
      <Grid container spacing={2}n sx={{marginTop:1}}>
        <Grid item xs={4} >
           <Typography variant="h5" sx={{color:"white"}}>
           Admins
          </Typography>
          <hr/>
          <Box sx={{ height:300, overflow: 'auto' , padding : 3}}>
            <List sx={{backgroundColor: '#FF650B'}}>
              {
                admins.length > 0 ?
              admins.map((admin, index) => (
                <AdminCard key={index} id={index} admin={admin} deleteAdmin={deleteAdmin}/>
              )) : ""
            }
            </List>
          </Box>
        </Grid>
        <Grid item xs={4} >
           <Typography variant="h5" sx={{color:"white"}}>
           Graduates
          </Typography>
          <hr/>
          <Box sx={{ height: 300, overflow: 'auto' , padding : 3}}>
            <List sx={{backgroundColor: '#FF650B'}}>
              { graduates.length > 0 ?
              
              graduates.map((graduate, index) => (
                <GraduateCard key={index} id={index} graduate={graduate} deleteGraduate={deleteGraduate} />
              )) : ""
              }
            </List>
          </Box>
        </Grid>
        <Grid item xs={4} >
        <Typography variant="h5" sx={{color:"white"}}>
           Editions
          </Typography>
          <hr/>
          <Box sx={{ height: 300, overflow: 'auto' , padding : 3}}>
            <List   sx={{backgroundColor: '#FF650B'}}>
              {
                editions.length > 0 ?

                editions.map((edition, index) => (
                  <EditionCard key={index} id={index} edition={edition} deleteEdition={deleteEdition} />
                )) : ""
            }
            </List>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );


//add New edittion
async function AddEdition() {
  //console.log(newEdition)
  if(newEdition.name === '' || newEdition.date ===''){
    return
  }
  const rr ={
    name : newEdition.name,
    runningDate: newEdition.date
  }

  setIsLoading(true)
  const results = await whoamiActor.addCohort(rr)
  console.log("add cohort : ",results)

  setEditions((prevValues) => [...prevValues, newEdition]);
  setIsLoading(false)
  }


//add new admin
async function AddNewAdmin() {

if(adminValue === ''){
  return
}
setIsLoading(true)

const results = await whoamiActor.addAdmin(Principal.fromText(adminValue))
console.log("Add admin :", results)

  setIsLoading(false)
  setAdmins((prevAdmins) => [...prevAdmins, adminValue]);
};

//delete edition
async function deleteEdition(value) {
  if(window.confirm('Delete this Edition. This action cannot be reverted')){
    setIsLoading(true)
    const results = await whoamiActor.deleteCohort(Number(value))
    setChanges(`${value}`)
    setIsLoading(false)
  }else{
    return
  }
}

//delete admin
async function deleteAdmin(value) {
  if(window.confirm('Delete this admin. This action cannot be reverted')){
    setIsLoading(true)
    console.log(" delete admin working",value)
    const results = await whoamiActor.deleteAdmin(Principal.fromText(value))
    console.log(results)
    setChanges(`${value}`)
    setIsLoading(false)

    console.log(" delete admin working",value)
  }else{
    return
  }
}

//delete graduate
 async function deleteGraduate(value) {
  if(window.confirm('Delete this Graduate. This action cannot be reverted')){
    setIsLoading(true)
    const results = await whoamiActor.deleteGraduate(Number(value))
    // alert(result.ok)
    setChanges("graduate");
    setIsLoading(false)
    console.log("delete graduate working",value)
    
  }else{
    return
  }
 }
};

export default Page;
