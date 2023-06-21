import React, {useState,useEffect } from 'react';
import { Card, CardContent, Grid,Typography,Button, TextField, Box, CardHeader, CardActions } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../use-auth-client';
import LoadingCmp from '../../Loader';
import { Principal } from '@dfinity/principal';


async function imgProcess(buffer) {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  const base64String = btoa(binary);
  return `data:image/jpeg;base64,${base64String}`;
}

const GraduateBoard = () => {

const navigate = useNavigate();
  const classes = useStyles();

  const {principal,whoamiActor,identity,isLoading,setIsLoading } = useAuth();

  const [imageUpload , setImageUpload] = useState([]);

  const [userImage, setUserImage] = useState('');

  const [userName, setUserName] = useState('')
  const [userLevel, setUserLevel] = useState('')
  const [userEdition,setUserEdition] = useState('')

  const [userPrincipal , setUserPrincipal] = useState('')
  
  const [content, setContent] = useState('');

  const [changes,setChanges] = useState('');
  const [graduateID,setGraduateID] = useState('');


  useEffect(() => {
    const fetchData = async () => {
      try {
        
        const [response,response2] = await Promise.all([
          whoamiActor.graduateDetails(principal),
          whoamiActor.getAllGraduates()
        ]);

          await setMyID(response2)

        const {image, level, name,cohort , principal: myPrincipal } = response.ok
        setUserImage(await imgProcess(image))
        setUserName(name)
        setUserPrincipal(myPrincipal)
        setUserLevel(level)
        setUserEdition(cohort)
        
        console.log("All graduates : ",response2)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [changes]);


  async function setMyID(graduates){
    graduates.map((graduate,index)=>{
      if(graduate.principal === principal.toString()){
        setGraduateID(index)
      }
    });
  };

  const handleImageChange = async(e) => {
    const file = e.target.files[0];
    console.log("file :", file)

    const reader = new FileReader();

    reader.onload = async (event) => {
      const n8 = await file.arrayBuffer();
      const final = [...new Uint8Array(n8)];
      console.log("final", final)
      
      setImageUpload(final)
      setUserImage(await imgProcess(final))
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };


  

  //handle when the user submits the review
  const handleSubmitReview= async () => {
    setIsLoading(true)
    const result = await whoamiActor.addReview(content);

    console.log("Review save :",result)
    setIsLoading(false)
  };

  //currently not working on the backend
  async function uploadProfilePicture(){
    setIsLoading(true)
    const result = await whoamiActor.editMyDetails(graduateID,imageUpload)

    console.log("My Picture upload :", imageUpload)
    setChanges(imageUpload)
    setIsLoading(false)
  
  };
  

  return (
    <Box className={classes.page}>
      <Card sx={{backgroundColor:"#191923"}}>
      <CardHeader
      title={<NavLink to='/'><Button sx={{color:'white'}}> Home</Button></NavLink>}
      />
      <CardContent sx={{display:"flex"}}>
      <Card className={classes.card} sx={{backgroundColor: "#FF650B", color :"white"}}>
      <CardHeader sx={{color :"white"}}
       title={`${userName} ${userEdition} ${userLevel}`}
      subheader={`Principal : ${userPrincipal.toString()}`}
      />
     
        <CardContent>
          <img
            src={userImage}
            alt="Profile"
            className={classes.roundImage}
            onClick={() => document.getElementById('imageInput').click()}
          />
          <input
            type="file"
            id="imageInput"
            style={{ display: 'none' }}
            onChange={(e)=>{handleImageChange(e)}}
          />
          <Typography variant="h6">Click to change image</Typography>
        </CardContent>
        <CardActions >
          <Button onClick={uploadProfilePicture} sx={{color :"white"}} variant='outlined'>
            Update Profile Picture
          </Button>
        </CardActions>
      </Card>
      <Card className={classes.card} sx={{backgroundColor: "#FF650B", color :"white"}}>
        <CardContent>
          <TextField
            label="Share Your Experience"
            multiline
            rows={4}
            sx={{color:'white'}}
            className={classes.textarea}
            onChange={(e)=> setContent(e.target.value)}
          />
          
        <CardActions>
        <Button variant="outlined" sx={{color :"white"}} onClick={handleSubmitReview}>
            Submit Review
          </Button>
        </CardActions>

        </CardContent>
      </Card>
      </CardContent>
      </Card>
      {<LoadingCmp isLoading={isLoading} />}
    </Box>
  );
};



const useStyles = makeStyles({
  page: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor:'#191923',
    color:'white'
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
  },
});

export default GraduateBoard;
