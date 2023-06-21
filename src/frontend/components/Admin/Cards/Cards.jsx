import React from "react";
import { Divider, IconButton, ListItem, ListItemText } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { useAuth } from "../../../use-auth-client";
import { deleteAdmin } from "./Functions";




export const EditionCard = ({edition,id, deleteEdition}) => (
    <ListItem
    disableGutters
    secondaryAction={
      <IconButton edge="end" 
      value={edition.name} 
      id={id}
      aria-label="delete" 
      onClick={(event)=>deleteEdition(event.currentTarget.getAttribute('id'))}
      >
           <DeleteIcon  />
      </IconButton>
    }
  >
    <ListItemText
     primary={edition.name} 
     secondary={edition.runningDate} 
     primaryTypographyProps={{
      style: {
        color: 'blue', // Change the color of the ListItemText here
      },
    }}
    />
    <Divider />
  </ListItem>
  );
  


  export const AdminCard = ({ admin, id, deleteAdmin }) => (
    <ListItem
    disableGutters
    secondaryAction={
      <IconButton 
      edge="end" 
      aria-label="delete" 
      id={id}
      value={admin.toString()}
      onClick={(event)=>deleteAdmin(event.currentTarget.getAttribute('value'))}>
           <DeleteIcon />
      </IconButton>
    }
  >
    <ListItemText primary={admin.toString()}  />
  </ListItem>
  );

  export const GraduateCard = ({ graduate,id, deleteGraduate }) => (
    <ListItem
    disableGutters
    secondaryAction={
      <IconButton
      value ={graduate.name} 
      id={id}
      edge="end" 
      aria-label="delete"
      onClick={(event)=>deleteGraduate(event.currentTarget.getAttribute('id'))}
      >
           <DeleteIcon />
      </IconButton>
    }
  >
    <ListItemText primary={`${graduate.name }  ${graduate.level}  ${graduate.cohort}`} secondary={graduate.principal}  />
  </ListItem>
  );
