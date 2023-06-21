import React, { useState,useEffect } from 'react';
import { Box, Button, Grid, Typography } from '@mui/material';
import { useAuth } from '../use-auth-client';
import LoadingCmp from '../Loader';

export function ImageUploader(){
  const { whoamiActor,isLoading,setIsLoading,} = useAuth();

  const [images, setImages] = useState([]);

  const handleImageUpload = (event) => {

    const uploadedImages = Array.from(event.target.files);

    uploadedImages.map((image)=>{
        const reader = new FileReader();
    
        reader.onload = async (event) => {
          const n8 = await image.arrayBuffer();
          const final = [...new Uint8Array(n8)];
          setImages((prevImages)=>[...prevImages, final])
        };
    
        if (image) {
          reader.readAsDataURL(image);
        }
      });
  
    }

 async function uploadImages(){
  if(images.length < 1){
    return
  }
  setIsLoading(true)
  const results = await whoamiActor.addImage(images)
  console.log(results)
  alert(results.ok)
  setIsLoading(false)
 }
  

  return (
    <Box>

    <Grid container spacing={2} alignItems="center">
      <Grid item >
        <input
          accept="image/*"
          id="image-upload"
          multiple
          type="file"
          style={{ display: 'none' }}
          onChange={handleImageUpload}

        />
        <label htmlFor="image-upload">
          <Button variant="outlined" color="primary" component="span">
           Select Images
          </Button>
        </label>
        
      </Grid>
      <Grid item xs={12} >
      <Button variant="outlined" sx={{backgroundColor:"#FF650B",color:"white",borderColor: 'white'}}  onClick={uploadImages}>Upload</Button>

      </Grid>
    </Grid>
    {<LoadingCmp isLoading={isLoading} />}
     </Box>
  );
};

export default ImageUploader;
