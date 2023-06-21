
import React,{useState} from 'react'
import { Card, CardHeader, CardContent, TextField, Button, Box, Typography, List, ListItem, ListItemText, Grid, FormControl, InputLabel, Select, MenuItem, IconButton } from '@mui/material';
import { useAuth } from '../../use-auth-client';
import LoadingCmp from '../../Loader';

const GraduateForm = ({editions,setGraduates}) => {

    const {whoamiActor,isLoading,setIsLoading } = useAuth();


    const [userInfo, setUserInfo] = useState({
        name: '',
        edition: '',
        level: '',
        principal:''
      });
        //update the graduate object on case of any change
      const handleFormChange = (event) => {
        const { name, value } = event.target;
        setUserInfo((prevUserInfo) => ({
          ...prevUserInfo,
          [name]: value
        }));
      };
     // (name : Text, principal : Text, cohort : Text, level : Text)
      //add graduate to the database
      async function handleSubmit(event)  {
        event.preventDefault();
        if(userInfo.name === ''|| userInfo.principal === '' || userInfo.level==='' || userInfo.edition ===''){
          alert("All fields are required")
          return
        }

        setIsLoading(true)
        setGraduates((preValues)=>[...preValues, userInfo])
        const results = await whoamiActor.addGraduate(userInfo.name,userInfo.principal,userInfo.edition,userInfo.level)
        console.log("graduate results :",results)
        setUserInfo({
            name: '',
            edition: '',
            level: '',
            principal:''
          })
        //console.log(userInfo); // Do something with the user's information
        setIsLoading(false)
      };
    



  return (
    
     <form onSubmit={handleSubmit} sx={{backgroundColor:"#191923", color:"white",border: '2px solid black'}}>
      <TextField
        label="Name"
        size="small"
        name="name"
        placeholder='Enter Graduate Name'
        value={userInfo.name}
        onChange={handleFormChange}
        margin="normal"
        variant="outlined"
        fullWidth
        style={{ marginRight: 2 }}
        InputProps={{
          style: {
            color: 'black', // Change the color here
          },
        }}
        InputLabelProps={{
          style: {
            color: 'black', // Change the color of the label here
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
     

    <FormControl variant="outlined" margin="normal" fullWidth style={{ marginRight: 2 }}>
        <InputLabel>Edition</InputLabel>
        <Select
          name="edition"
          value={userInfo.edition}
          onChange={handleFormChange}
          label="Edition"
          size="small"
        >

          {editions.map((edition,index)=>{
            return <MenuItem value={edition.name} key={index}>{edition.name}</MenuItem>
          })}
         
        </Select>
      </FormControl>
      <FormControl variant="outlined" fullWidth margin="normal" style={{ marginRight: 2 }}>
        <InputLabel>Level</InputLabel>
        <Select
          name="level"
          value={userInfo.level}
          size="small"
          onChange={handleFormChange}
          label="Level"
        >
          <MenuItem value="">Select Level</MenuItem>
          <MenuItem value="Ordinary">Ordinary</MenuItem>
          <MenuItem value="Honors">Honors</MenuItem>
        </Select>
      </FormControl>
      <TextField
        label="Principal ID"
        size="small"
        name="principal"
        placeholder='Enter Principal ID'
        value={userInfo.principal}
        onChange={handleFormChange}
        margin="normal"
        variant="outlined"
        style={{ marginRight: 2 }}
        fullWidth
        InputProps={{
          style: {
            color: 'black', // Change the color here
          },
        }}
        InputLabelProps={{
          style: {
            color: 'black', // Change the color of the label here
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
      <Button sx={{backgroundColor:"#FF650B",color:"white"}} variant="outlined" type="submit">
        Submit
      </Button>
      {<LoadingCmp isLoading={isLoading} />}
    </form>
  )
};

export default GraduateForm