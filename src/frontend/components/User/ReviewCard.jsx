import { Card, CardContent, Grid, Typography } from '@mui/material'
import React from 'react'

const ReviewCard = ({owner,cohort,review, }) => {
  return (
    <Card sx={{bgcolor:"#FF650B",margin:"10px",color:"white"}}>
     
      <CardContent>
        <Grid container>
          <Grid item  xs={12} >
            <Typography variant='h6' component="span">
                " {review} "
            </Typography>
            
          </Grid>
          <Grid item xs={12} >
            <Typography variant='h6' >
                {owner}
            </Typography>

          </Grid>
          <Grid item xs={12}  >
            <Typography variant='h6' sx={{position :"relative"}} >
                {cohort}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default ReviewCard