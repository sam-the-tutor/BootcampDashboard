import React,{ useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { styled } from '@mui/material/styles'
import {Pets, Mail, Notifications } from '@mui/icons-material'
import { AppBar, Avatar, Badge, Box, InputBase, Menu, MenuItem, Button, Toolbar, Typography,} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { useAuth } from '../../use-auth-client'
import { ImageUploader} from '../Upload'


const Navbar = () => {
  const { isAdmin, setIsAdmin,logout,login} = useAuth();
  const navigate = useNavigate();

  const[open,setOpen] = useState(false)


  return (
    <AppBar position='sticky' >
      <SytledToolbar>
        <Typography variant='h6' sx={{display:{xs:"none",sm:"block"}}}>
          Bootcamp Admin Dashboard
        </Typography>
        <StyledBox display="flex">
          {/* <Typography>
            < ImageUploader />
          </Typography> */}
          {/* <Typography><Button onClick={()=>{console.log("weeeeeu")}}>Upload</Button></Typography> */}
          <Typography>
          <NavLink to='viewgraduates'> Dashboard</NavLink>
          </Typography>
          <Typography>
          <Button 
            onClick={()=>{
              logout();
              navigate('/')
              setIsAdmin('')
            }}> 
            Logout 
            </Button> 
          </Typography>
         
        </StyledBox>
        <UserBox onClick={e=>setOpen(true)}>
         <MenuIcon />
        </UserBox>
        <Typography variant='span' sx={{display:{xs:"block",sm:"none"}}}>
          Admin
         </Typography>

        <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        open={open}
        onClose={e=>setOpen(false)}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem ><NavLink to='viewgraduates'>Dashboard</NavLink></MenuItem>
        <MenuItem >
        { isAdmin !== '' ?  
            <Button 
            onClick={()=>{
              logout();
              navigate('/')
              setIsAdmin('')
            }}> 
            Logout 
            </Button> :     
            <Button
            onClick={login}
            >
              Login
              </Button>
          }
        </MenuItem>
        {/* <MenuItem>< ImageUploader/></MenuItem> */}
        
      </Menu>
      
      </SytledToolbar>
      

    </AppBar>
  )
}


const SytledToolbar = styled(Toolbar)({
  justifyContent:"space-between",
  display:"flex",
  backgroundColor: "black"
})

const Search = styled("div")(({theme})=>({
  backgroundColor:"white",
  padding:"0 10px",
  borderRadius: "5px",
  width:"40%"
}))


const StyledBox = styled(Box)(({theme})=>({
  display:"none",
  gap:"20px",
  margin: 2,
  alignItems: "center",
  [theme.breakpoints.up("sm")]:{
    display:"flex"
  }
  
}))


const UserBox = styled(Box)(({theme})=>({
  display:"flex",
  gap:"10px",
  alignItems: "center",
  [theme.breakpoints.up("sm")]:{
    display:"none"
  }
  
}))





export default Navbar