import React, { useState,useEffect } from 'react'

import { Box, Grid, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import ReviewCard from './ReviewCard';
import { useAuth } from '../../use-auth-client';
import { v4 as uuidv4} from 'uuid'
import LoadingCmp from '../../Loader';


const useStyles = makeStyles({
  card: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: "100%",
    maxWidth: "100%",
    maxHeight:"100%"
    
    
  },})




const Review = () => {

  const myCard = useStyles();
  const { whoamiActor,isLoading, setIsLoading} = useAuth();
  const [reviews , setAReviews] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {

        setIsLoading(true)
        
        const [response] = await Promise.all([
          
          whoamiActor.getAllReviews()
        ]);

        
        setAReviews(response)
  
        console.log("Here",response)
        setIsLoading(false)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

return(
  <Box backgroundColor= "#191923" sx={{height:"100vh"}} >
    <Box>
      <Typography>
        What Bootcamp Graduates Say!!!!!
      </Typography>
    </Box>
    <Box>

    <Grid container >
      {
        reviews.map((review,index) =>{
          return <ReviewCard 
          owner ={review.owner}
          cohort = {review.cohort}
          review = {review.review}
          key={index}
          
          />
        })
      }

    </Grid>
    </Box>
{<LoadingCmp isLoading={isLoading}/>}
  </Box>
)
}

export default Review
