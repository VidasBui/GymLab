import React,{ useEffect, useState } from "react";
import {Table, Form} from 'react-bootstrap';
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import Cookies from 'js-cookie'
import jwt_decode from "jwt-decode";

import {
    Box,
    Button,
    TextField,
    Rating,
    LinearProgress,
    Grid,
    Paper,
    FormControl,
    OutlinedInput ,
    InputLabel,
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

  const RatingEntity = () => {
    const token = Cookies.get('token');
    const decoded = token !== undefined ? jwt_decode(token) : "";
    const userRole = decoded == "" ? "Guest" : decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'][0];
    const [data, setData] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState("");
    const [refresh, setRefresh] = useState(false);

    const location = useLocation();
    useEffect(() => {
       (async () => {
        try{
        fetch(`/api/categories/${location.state.categoryName}/sportPrograms/${location.state.sportProgramId}/ratings`)        
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

    const RatingEntity = (props) => {
        const [id, setId] = useState(props.id);
        const [comment, setComment] = useState(props.comment);
        const [evaluation, setEvaluation] = useState(props.evaluation);
        const [open, setOpen] = useState(false);

        const handleOpen = () => setOpen(true);
        const handleClose = () => setOpen(false);

        const [openDelete, setOpenDelete] = useState(false);
        const handleDeleteOpen = () => setOpenDelete(true);
        const handleDeleteClose = () => setOpenDelete(false);
    
        const [commentEdit, setEditComment] = useState(props.comment);
        const [evaluationEdit, setEditEvaluation] = useState(props.evaluation);

        const handleSubmit = (e) => {
          e.preventDefault();
          (async () => {fetch(`api/categories/${location.state.categoryName}/sportPrograms/${location.state.sportProgramId}/ratings/${id}`,{
              method:'PUT',
              headers:{
                  'Authorization':"Bearer "+ token,
                  'Accept':'*/*',
                  'Content-Type':'application/json'
              },
              body:JSON.stringify({
                  comment:commentEdit,
                  evaluation:evaluationEdit
              })
          }).then(res => {res.status == 403 ? alert ("You can't edit ratings created by other users!") : 
            setComment(commentEdit);
            setEvaluation(evaluationEdit);
            handleClose();
          })
        })()
      }

      const handleDelete = () => {
        let filtered = data.filter(n => n.id != id);
        
        (async () => {fetch(`api/categories/${location.state.categoryName}/sportPrograms/${location.state.sportProgramId}/ratings/${id}`,{
            method:'DELETE',
            headers:{
                'Authorization':"Bearer "+ token,
                'Accept':'*/*',
                'Content-Type':'application/json'
            }
        })
        .then(res=>{
          if(res.status != 204) alert(`failed with status ${res.status}`); else setData([...filtered]);})
        })();
        handleDeleteClose();
    } 

        return (
            <>
            <TableRow>
              <TableCell>
                {comment}
              </TableCell>
              <TableCell>
              <Rating readOnly size="large" value={evaluation}/>
              </TableCell>
              {userRole != "Guest" && <TableCell>
              <Stack direction="row" justifyContent ="center" alignItems="center" spacing={1}>
                  <Button variant="contained" color = 'info' onClick={handleOpen}>Edit</Button>
                  <Button variant="contained" color = 'error' onClick={handleDeleteOpen}>Delete</Button>
                </Stack>
              </TableCell>}
            </TableRow>
            <Dialog PaperProps={{ sx: { width: "60%" } }} 
                open={open}
                onClose={handleClose}
            >
                <DialogContent>
                <Typography sx ={{textAlign:"center", fontWeight: "bold", fontSize: 22}}>Edit Rating</Typography>
                <form onSubmit = {handleSubmit}>
                <Typography>Id</Typography>
                <TextField sx = {{width: '100%', mb:2}} variant="filled" defaultValue = {id} label="Read Only" InputProps={{readOnly: true}}/>
                <Typography>Comment</Typography>
                <TextField multiline maxRows={9} sx = {{width: '100%', mb:2}} variant="filled" defaultValue = {comment} onChange = {(event) => setEditComment(event.currentTarget.value)}/>
                <Typography>Evaluation</Typography>
                  <Rating size="large" name="no-value" defaultValue={evaluation} onChange = {(event) => setEditEvaluation(event.currentTarget.value)}/>
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
                <Typography>Id</Typography>
                <TextField sx = {{width: '100%', mb:2}} variant="filled" defaultValue = {id} label="Read Only" InputProps={{readOnly: true}}/>
                <Typography>Comment</Typography>
                <TextField multiline maxRows={9} sx = {{width: '100%', mb:2}} variant="filled" defaultValue = {comment} label="Read Only" InputProps={{readOnly: true}}/>
                <Typography>Evaluation</Typography>
                  <Rating readOnly size="large" value={evaluation}/>
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
        const [addComment, setAddComment] = useState("");
        const [addEvaluation, setAddEvaluation] = useState(0);
        const [openAdd, setOpenAdd] = useState(false);
        const handleOpenAdd = () => setOpenAdd(true);
        const handleCloseAdd = () => setOpenAdd(false);

        const handleAdd = (e) => {
            e.preventDefault();
            if(addEvaluation == 0) {
              alert("Please select evaluation"); 
              return;
            }

              (async () => {
                  const result = await fetch(`/api/categories/${location.state.categoryName}/sportPrograms/${location.state.sportProgramId}/ratings`, {
                    method:'POST',
                    headers:{
                        'Authorization':"Bearer "+ token,
                        'Accept':'*/*',
                        'Content-Type':'application/json'
                    },
                    body:JSON.stringify({
                        comment:addComment,
                        evaluation:addEvaluation
                    })})
                result.json().then((response) => {if(result.status != 201) alert(`failed with status ${result.status}`);
                else {
                  setData([...data, {
                    "id": response.id,
                    "comment": addComment,
                    "evaluation": addEvaluation }])}});
              })()
          }
  
          return(
              <>
              <Button display= "block" variant="contained" sx = {{width: '100%', mt:3, alignItems: "justify-end", mr:0}} onClick={handleOpenAdd}>Add new rating</Button>
              <Dialog PaperProps={{ sx: { width: "60%" } }}          
                open={openAdd}
                onClose={handleCloseAdd}>
                <DialogContent >
                  <form onSubmit={handleAdd}>
                  <Typography sx ={{textAlign:"center", fontWeight: "bold", fontSize: 22}}>Add rating</Typography>
                  <Typography>Comment</Typography>
                  <TextField sx = {{width: '100%', mb:2}} multiline maxRows={9} variant="filled" value={addComment} onChange={(event) => setAddComment(event.currentTarget.value)}/>
                  <Typography>Evaluation</Typography>
                  <Rating size="large" name="no-value" value={addEvaluation} onChange = {(event) => setAddEvaluation(event.currentTarget.value)}/>
                  <Box display="block"><Button variant="contained" sx ={{display:"block", m:"auto"}} type="submit">Submit</Button></Box>
                  </form>
                  </DialogContent>
              </Dialog>
              </>
          );
      }

    if(!loaded) 
    return <>
    <Box sx={{ width: '100%' }}>
    <LinearProgress sx={{height: 10}}/>
    </Box></>
    return (
        <>
        {userRole != "Guest" && <ItemAdd/>}
        {(loaded && error === "") ?
        <div>
          {data.length < 1 ? <><Typography variant = "h5" mt = {2}>No records to display</Typography></>:
          <Table className="mt-4" striped bordered hover size="sm">
            <TableHead>
              <TableRow>
                <TableCell sx = {{width: '60%', textAlign:"center", fontSize: "19px", fontWeight: "bold"}}>Comment</TableCell>
                <TableCell sx = {{width: '20%', textAlign:"center", fontSize: "19px", fontWeight: "bold"}}>Evaluation</TableCell>
                {userRole != "Guest" && <TableCell sx = {{width: '20%', textAlign:"center", fontSize: "19px", fontWeight: "bold"}}>Options</TableCell>}
              </TableRow>
            </TableHead>
            <TableBody>
            {
            data.map((item) => {
                  return (<RatingEntity id={item.id} comment={item.comment} evaluation={item.evaluation}/>);
              })
            }
            
            </TableBody>
          </Table>
        }
        </div>
        : <Typography>{error}</Typography>
        }
        </>
    );  
    
}
export default RatingEntity;