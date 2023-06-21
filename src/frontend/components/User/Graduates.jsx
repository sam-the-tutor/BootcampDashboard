 import React, { useEffect, useState } from 'react'

 import { Box, Button, Divider, Grid, Typography } from '@mui/material'
 import CustomCard from '../Graduate/GraduateCard'
 import { useAuth } from '../../use-auth-client'
import LoadingCmp from '../../Loader';




export default function Graduates(){

    const { whoamiActor,login,isLoading,setIsLoading} = useAuth();
    const [graduateData, setGraduateData] = useState([]);
    const [editionData,setEditionData] = useState([])
    const [editions, setEditions] = useState([]);
    
    

    useEffect(() => {
        const fetchData = async () => {
          try {
            setIsLoading(true)
            const [response,response2] = await Promise.all([
              whoamiActor.getAllGraduates(),
              whoamiActor.getAllEditions()
            ]);
    
            
            setGraduateData(response)
            setEditionData(response)
            setEditions(response2)
            console.log("Here",response,response2)
            setIsLoading(false)
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
        fetchData();
      }, []);
   
    function loadData (event){
        const {value} = event.target
       
        const result = graduateData.filter(myCohort => {return myCohort.cohort == value});
        setEditionData(result)
}

  return (

    
    <Box sx={{alignItems:"center", justifyContent:"center", backgroundColor:"#191923",width:'100%',height:'100vh'}} xs={12}>
        <Box >
        <Typography variant='h4' component="div"  > 
        Graduates
        </Typography>
        </Box>
        <Box display="flex" justifyContent="center" alignItems="center" columnGap={1}>
            {editions.map((edition,index)=>{
                console.log("edition :", edition)
                return <Button 
                variant="outlined" 
                key={index}
                value= {edition.name}
                onClick={(event)=>loadData(event)}
                >{edition.name}</Button>
            })}
        </Box>
        <Divider/>
        <Box mt={3} md={12}>
        <Grid item container columnGap={1} md={12}>
            {
                editionData.map((card,index)=>{
                    return  <CustomCard
                    name={card.name}
                    cohort={card.cohort}
                    imageSrc={imgProcess(card.image)}
                    cardColor={card.level}
                    key={index}
                    id={index}
                />
                })
            }
            </Grid>
        </Box>
        {<LoadingCmp isLoading={isLoading}/>}
    </Box>


  );



  function imgProcess(buffer) {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    for (let i = 0; i < bytes.length; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    const base64String = btoa(binary);
    return `data:image/jpeg;base64,${base64String}`;
  }

 

}
