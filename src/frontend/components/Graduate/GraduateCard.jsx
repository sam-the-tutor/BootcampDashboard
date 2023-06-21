import React,{useState} from 'react';
import { Box, Card, CardContent, CardHeader, Divider, Grid, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';



const useStyles = makeStyles({
  bronzeCard: {
    backgroundColor: '#FF650B',
  },
  goldenCard: {
    backgroundColor: '#FF650B',
  },
});



const useStyles2 = makeStyles({
    card: {
      display: 'flex',
      position: 'relative',
      justifyContent:'center',
      alignItems:'center',
      alignContent: 'center',
      height: '50px', // Specify the desired height for the card
    },
    image: {
      borderRadius:"50%",
      objectFit: 'cover',
      width:"100px",
      height:"100px",
      justifyContent:'center',
      alignItems:'center',
      alignContent: 'center',
    },
    badge: {
        position: 'relative', // Position the badge absolutely
        top: -125, // Adjust the top position of the badge
        right: -90, // Adjust the right position of the badge
        maxWidth: 50, // Set the maximum width of the badge
        maxHeight: 50, // Set the maximum height of the badge
        backgroundColor:"#191923",
        borderRadius:"50%"
      },

      typo:{
      display: 'flex',
      alignContent: 'center',
      justifyContent: 'center',
      alignItems:'center',

      }
  });

 

  async function imgProcess(buffer) {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    for (let i = 0; i < bytes.length; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    const base64String = btoa(binary);
    return `data:image/jpeg;base64,${base64String}`;
  }



 function CustomCard ({ name, cohort, imageSrc, cardColor,id }) {
  const myColors = useStyles();
  const classes2 = useStyles2();
  const [image,setImage] = useState('')
 
 


  return (
    <Card className={myColors.goldenCard} key={id} xs={12} sm={6} md={2} sx={{width:"180px",ml:3,mt:1.5}}>
      <CardContent >
          <Grid item xs={12} sx={{ml:3, height:'100px'}}>
            <img
            src={imageSrc}

              alt="Centered Image"
               className={classes2.image}
            />
            <img
              src ={cardColor == 'Honors'? "../../assets/ggg.png" : "../../assets/silver.png"}
              alt="Badge Image"
              className={classes2.badge}
            />
            
            </Grid>
            
           
          <Grid item>
            <Typography variant='h6' component="p">
                {name}
            </Typography>

          </Grid>
          <Grid item >
            <Typography variant='h6'  component="p" className={classes2.typo}>
                {cohort}
            </Typography>
          </Grid>

  
      </CardContent>
    </Card>
 
  );
};


export default CustomCard;
