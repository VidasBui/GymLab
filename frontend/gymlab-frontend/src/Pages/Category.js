import React,{ useEffect, useState } from "react";
import {Table, Form} from 'react-bootstrap';
import { useNavigate } from 'react-router';
import {
    Box,
    Button,
    TextField,
    Grid,
    Paper,
    FormControl,
    MenuItem,
    Select,
    Stack,
    Dialog,
    DialogContent,
    Typography,
    Snackbar,
    Alert,
    Item,
    TableHead,
    TableCell,
    TableRow,
    TableBody
  } from "@mui/material";

const Categories = () => {
    const [data, setData] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState("");
    const [refresh, setRefresh] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
       (async () => {
        try{
        fetch('/api/categories')        
        .then(response=>response.json())
        .then(data=>
        {
            setData(data);
        });

        } catch (e){
            setError("Message: " + e);
        } finally {
            setLoaded(true);
        }
       })(); 
    }, [refresh]);


    const Category = (props) => {
        const [name, setName] = useState(props.name);
        const [description, setDescription] = useState(props.description);
        const [open, setOpen] = useState(false);
        const handleOpen = () => setOpen(true);
        const handleClose = () => setOpen(false);
    
        const [input, setInput] = useState(props.description);
      
        const toSportPrograms = () => {
          navigate('/sportProgram', {state:{categoryName:name}});
      }
      
        const handleSubmit = (e) => {
            e.preventDefault();
            (async () => {
              fetch(`/api/categories/${name}`,{
                method:'PUT',
                headers:{
                    'Accept':'*/*',
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    description:input
                })
            })
            .then(res=>{res.json(); if(res.status != 200) alert(`failed with status ${res.status}`); else setDescription(input); handleClose()})
            })();
    
        }
        const [openDelete, setOpenDelete] = useState(false);
        const handleDeleteOpen = () => setOpenDelete(true);
        const handleDeleteClose = () => setOpenDelete(false);

        const handleDelete = () => {
            let filtered = data.filter(n => n.name != name);
            
            (async () => {
              fetch(`/api/categories/${name}`,{
                method:'DELETE',
                headers:{
                    'Accept':'*/*',
                    'Content-Type':'application/json'
                }
            })
            .then(res=>{if(res.status != 204) alert(`failed with status ${res.status}`); else setData([...filtered]);})
            })();
            handleDeleteClose();
        } 

        return (
            <>
            <TableRow>
              <TableCell>
                {name}
              </TableCell>
              <TableCell>
                {description}
              </TableCell>
              <TableCell>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Button variant="contained" color = 'primary' onClick={toSportPrograms}>View</Button>
                  <Button variant="contained" color = 'info' onClick={handleOpen}>Edit</Button>
                  <Button variant="contained" color = 'error' onClick={handleDeleteOpen}>Delete</Button>
                </Stack>
              </TableCell>
            </TableRow>
            <Dialog PaperProps={{ sx: { width: "60%" } }} 
                open={open}
                onClose={handleClose}
            >
                <DialogContent>
                <Typography sx ={{textAlign:"center", fontWeight: "bold", fontSize: 22}}>Edit category</Typography>
                <form onSubmit = {handleSubmit}>
                <Typography>Name</Typography>
                <TextField sx = {{width: '100%', mb:2, mt:1}} variant="filled" defaultValue = {name} label="Read Only" InputProps={{readOnly: true}}/>
                <Typography>Description</Typography>
                    <TextField sx = {{width: '100%', mb:2}} required multiline maxRows={9} label="Required" variant="filled" value={input} onChange={(event) => setInput(event.currentTarget.value)}/>
                    <Box display="block"><Button variant="contained" sx ={{display:"block", m:"auto"}} type="submit">Save</Button></Box>
                    </form>
                </DialogContent>
            </Dialog>
            <Dialog PaperProps={{ sx: { width: "60%" } }} 
                open={openDelete}
                onClose={handleDeleteClose}
            >
                <DialogContent>
                <Typography sx ={{textAlign:"center", fontWeight: "bold", fontSize: 22}}>Delete category</Typography>
                <Typography>Name</Typography>
                <TextField sx = {{width: '100%', mb:2, mt:1}} variant="filled" defaultValue = {name} label="Read Only" InputProps={{readOnly: true}}/>
                <Typography>Description</Typography>
                <TextField sx = {{width: '100%', mb:2, mt:1}} variant="filled" multiline maxRows={9} defaultValue = {description} label="Read Only" InputProps={{readOnly: true}}/>
                  <Stack  direction="row" justifyContent="center" spacing={1}>
                    <Button variant="contained" color = 'error' onClick={handleDelete}>Delete</Button>
                    <Button variant="contained" color = 'info' onClick={handleDeleteClose}>Cancel</Button>
                  </Stack>
                </DialogContent>
            </Dialog>
            </>
        );
    }

    const ItemAdd = () => {
      const [addName, setAddName] = useState("");
      const [addDescription, setAddDescription] = useState("");
      const [openAdd, setOpenAdd] = useState(false);
      const handleOpenAdd = () => setOpenAdd(true);
      const handleCloseAdd = () => setOpenAdd(false);

        const handleAdd = (e) => {
          e.preventDefault();
            if(addName !== "" && addDescription !== "")
            (async () => {
                fetch('/api/categories',{
                  method:'POST',
                  headers:{
                      'Accept':'*/*',
                      'Content-Type':'application/json'
                  },
                  body:JSON.stringify({
                      name:addName,
                      description:addDescription
                  })
              })
              .then(res=>{res.json(); 
                if(res.status != 201) alert(`failed with status ${res.status}`);
                  else setData([...data, {
                    "name": addName,
                    "description": addDescription }])
                  })
            })();
        }

        return(
            <>
            <Button display= "block" variant="contained" sx = {{width: '100%', mt:3, alignItems: "justify-end", mr:0}} onClick={handleOpenAdd}>Add new category</Button>
            <Dialog PaperProps={{ sx: { width: "60%" } }}          
              open={openAdd}
              onClose={handleCloseAdd}>
              <DialogContent >
                <form onSubmit={handleAdd}>
                <Typography sx ={{textAlign:"center", fontWeight: "bold", fontSize: 22}}>Add category</Typography>
                <Typography>Name</Typography>
                <TextField sx = {{width: '100%', mb:2}} required label="Required" variant="filled" value={addName} onChange={(event) => setAddName(event.currentTarget.value)}/>
                <Typography>Description</Typography>
                <TextField sx = {{width: '100%', mb:2}} required multiline maxRows={9} label="Required" variant="filled" value={addDescription} onChange={(event) => setAddDescription(event.currentTarget.value)}/>
                <Box display="block"><Button variant="contained" sx ={{display:"block", m:"auto"}} type="submit">Submit</Button></Box>
                </form>
                </DialogContent>
            </Dialog>
            </>
        );
    }

    return (
      <>
      <ItemAdd/>
      {(loaded && error === "") ?

      <div>
        <Table className="mt-4" striped bordered hover size="sm">
          <TableHead>
            <TableRow>
              <TableCell sx = {{width: '20%', textAlign:"center", fontSize: "19px", fontWeight: "bold"}}>Name</TableCell>
              <TableCell sx = {{width: '65%', textAlign:"center", fontSize: "19px", fontWeight: "bold"}}>Description</TableCell>
              <TableCell sx = {{width: '15%', textAlign:"center", fontSize: "19px", fontWeight: "bold"}}>Options</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {
          data.map((item) => {
                return (<Category name={item.name} description={item.description}/>);
            })
          }
          </TableBody>
        </Table>
      </div>
      : <Typography>{error}</Typography>
      }
      </>
  );
}
export default Categories;