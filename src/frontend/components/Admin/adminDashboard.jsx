import React, { useState,useEffect } from 'react';
import { Card, CardContent, TextField, Button, Box, Typography, List, ListItem, ListItemText, Grid, FormControl, InputLabel, Select, MenuItem, IconButton } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useAuth } from '../../use-auth-client';
import GraduateForm from './GraduateForm';
import LoadingCmp from '../../Loader';
import { EditionCard,AdminCard,GraduateCard } from './Cards/Cards';
import { Principal } from '@dfinity/principal';
import ImageUploader from '../Upload';


const AdminDashboard = () => {
 
  const classes = useStyles();
  const [adminValue, setAdminValue] = useState('');
  const [admins, setAdmins] = useState([]);
  const [graduates,setGraduates] = useState([]);

  const { isLoading, setIsLoading,whoamiActor} = useAuth();
 
  const [editions, setEditions] = useState([]);
  const [changes,setChanges] = useState("");

  const [newEdition,setNewEdition] = useState({
    name:'',
    date:'',
  })


  useEffect(() => {
    const fetchData = async () => {
      try {
        
        const [response] = await Promise.all([
          whoamiActor.getAllEditions(),
        ]);
        setEditions(response)
        
        console.log(response)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [changes]);






  return (
    <Box container sx={{height:"100vh", backgroundColor:"#191923"}} >
      <Grid container spacing={2} sx={{marginTop:1, justifyContent:"center", alignItems:"center", alignContent:"center"}}>
        <Grid item xs={12} sm={3}>
        <Card sx={{backgroundColor:"#191923", color:"white",border: '2px solid black'}}>
        <CardContent>
        <Typography>
            Add New Admin
          </Typography>
          <TextField
            className={classes.textarea}
            label="Enter Admin Principal"
            onChange={(event)=>setAdminValue(event.target.value)}
            margin="normal"
            variant="outlined"
            size='small'
            InputProps={{
              style: {
                color: 'white', // Change the color here
              },
            }}
            InputLabelProps={{
              style: {
                color: 'white', // Change the color of the label here
              },
            }}
            sx={{'& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: '#FF650B', // Change the color of the outline here
              },
              '&:hover fieldset': {
                borderColor: '#FF650B', // Change the color of the outline on hover here
              },
              '&.Mui-focused fieldset': {
                borderColor: '#FF650B', // Change the color of the outline when focused here
              },
            }}}
          />
        
          <Button sx={{backgroundColor:"#FF650B",color:"white",borderColor: 'white'}} variant="outlined" onClick={AddNewAdmin}>
            Add Admin
          </Button>
        </CardContent>
      </Card  >
      <Card sx={{display:{xs:"none",sm:"block"},mt:3, backgroundColor:"#191923", color:"white",border: '2px solid black'}}>
        <CardContent>
        < ImageUploader />
        </CardContent>
      </Card>
        </Grid>
        <Grid item xs={12} sm={5}>

        <Card>
        <Typography>
            Add New Graduate
          </Typography>
        <CardContent>
       <GraduateForm  editions={editions} setGraduates={setGraduates}/>
        </CardContent>
      </Card>
      
        </Grid>
        <Grid item xs={12} sm={3}>
        <Card sx={{backgroundColor:"#191923", color:"white",border: '2px solid black'}} >
        <CardContent>
          <Typography>
            Add New Edition
          </Typography>
          <TextField
            label="Enter Name"
            size="small"
            name="name"
            value={newEdition.name}
            onChange={(event)=>setNewEdition((prevInfo) => ({
              ...prevInfo,
              [event.target.name]: event.target.value
            }))}
            margin="normal"
            variant="outlined"
            fullWidth
            InputProps={{
              style: {
                color: 'white', // Change the color here
              },
            }}
            InputLabelProps={{
              style: {
                color: 'white', // Change the color of the label here
              },
            }}
            sx={{'& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: '#FF650B', // Change the color of the outline here
              },
              '&:hover fieldset': {
                borderColor: '#FF650B', // Change the color of the outline on hover here
              },
              '&.Mui-focused fieldset': {
                borderColor: '#FF650B', // Change the color of the outline when focused here
              },
            }}}
          />
          <TextField
            label="Enter Date"
            size="small"
            name="date"
            value={newEdition.date}
            onChange={(event)=>setNewEdition((prevInfo) => ({
              ...prevInfo,
              [event.target.name]: event.target.value
            }))}
            margin="normal"
            variant="outlined"
            fullWidth
            InputProps={{
              style: {
                color: 'white', // Change the color here
              },
            }}
            InputLabelProps={{
              style: {
                color: 'white', // Change the color of the label here
              },
            }}
            sx={{'& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: '#FF650B', // Change the color of the outline here
              },
              '&:hover fieldset': {
                borderColor: '#FF650B', // Change the color of the outline on hover here
              },
              '&.Mui-focused fieldset': {
                borderColor: '#FF650B', // Change the color of the outline when focused here
              },
            }}}
          />
          
          <Button sx={{backgroundColor:"#FF650B",color:"white"}} variant="outlined" onClick={AddEdition}>
            Add 
          </Button>
        </CardContent>
      </Card>
        </Grid>
      </Grid>
      
      {LoadingCmp(isLoading)}
    </Box>
   
  );

async function AddEdition() {
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
  setChanges(newEdition.name)
  //setEditions((prevValues) => [...prevValues, newEdition]);
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




};



const useStyles = makeStyles({
  page: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor:'#191923'
  },
  mybox: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
   // backgroundColor:'#191923',
    
  },
  card: {
    width: '300px',
    margin: '10px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  roundImage: {
    width: '150px',
    height: '150px',
    borderRadius: '50%',
    cursor: 'pointer',
  },
  textarea: {
    width: '100%',
    marginTop: '10px',
    color:"white",
    height:'50px',
    size:'small'
  },
});









export default AdminDashboard;
