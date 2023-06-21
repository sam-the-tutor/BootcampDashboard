import React,{ useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { styled } from '@mui/material/styles'
import {Pets, Mail, Notifications } from '@mui/icons-material'
import { AppBar, Avatar, Button, Badge, Box, InputBase, Menu, MenuItem, Toolbar, Typography,} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import { useAuth } from '../../use-auth-client'





//#191923

const SytledToolbar = styled(Toolbar)({
  justifyContent:"space-between",
  display:"flex",
  backgroundColor: "#191923",
  color:"white"
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


function Navbar(){
  const navigate = useNavigate()
  //toggle the side menu on and off
  const[open,setOpen] = useState(false)
  
  const {login, isAdmin, isGraduate,logout, setIsAdmin,isLoading,setIsLoading} = useAuth();

console.log("from navbar :", isAdmin, isGraduate)
  const handleLogin= async ()=>{

    await login();

    //Login()
  
  }

  const handleLogout= async ()=>{

    await logout();

    //Login()
  
  }



  return (
    <AppBar position='sticky' >
      <SytledToolbar>
        <Typography variant='h6' sx={{display:{xs:"none",sm:"block"}}}>
          Motoko Bootcamp
        </Typography>
        <StyledBox display="flex">
          <Typography>
          <NavLink to='/' className={({isActive})=>isActive? 'link active' : 'link'}>Home</NavLink>
          </Typography>
          <Typography>
          <NavLink to='/graduates'>Graduates</NavLink>
          </Typography>
          <Typography>
          <NavLink to='/reviews'>Reviews</NavLink>
          </Typography>
          <Typography>

            {  isAdmin !== '' ?  
            <Button 
            onClick={()=>{
              logout();
              navigate('/')
            }}> 
            Logout 
            </Button> :     
            
            <Button
            onClick={login}>
              Login
              </Button>
          }
          </Typography>
         
        </StyledBox>
        <UserBox onClick={e=>setOpen(true)}>
        <MenuIcon />
        
        </UserBox>
        <Typography variant='h6' sx={{display:{xs:"block",sm:"none"}}}>
          Motoko Bootcamp
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
        <MenuItem ><NavLink to='/'>Home</NavLink></MenuItem>
        <MenuItem ><NavLink to='/graduates'>Graduates</NavLink></MenuItem>
        <MenuItem ><NavLink to='/reviews'>Reviews</NavLink></MenuItem>
        <MenuItem >
        { isAdmin !== '' ?  
            <Button 
            onClick={()=>{
              logout();
              navigate('/')
            }}> 
            Logout 
            </Button> :     
            <Button
            onClick={()=>{
              login
              if(isAdmin){
                navigate('/admin')
              }
            }}>
              Login
              </Button>
          }
        </MenuItem>
      </Menu>
      
      </SytledToolbar>
      

    </AppBar>
  )
}


export default Navbar