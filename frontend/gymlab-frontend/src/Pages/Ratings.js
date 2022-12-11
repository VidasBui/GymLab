import React,{ useEffect, useState } from "react";
import {Table, Form} from 'react-bootstrap';
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import {
    Box,
    Button,
    TextField,
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

  const Ratings = () => {
    const [data, setData] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState("");
    const [refresh, setRefresh] = useState(false);
    const navigate = useNavigate();

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

    const Rating = (props) => {
        const [id, setId] = useState(props.id);
        const [comment, setComment] = useState(props.comment);
        const [evaluation, setEvaluation] = useState(props.evaluation);
        const [open, setOpen] = useState(false);

        const handleOpen = () => setOpen(true);
        const handleClose = () => setOpen(false);

        const [openDelete, setOpenDelete] = useState(false);
        const handleDeleteOpen = () => setOpenDelete(true);
        const handleDeleteClose = () => setOpenDelete(false);
    
        const [input, setInput] = useState(props.description);

        return (
            <>
            <TableRow>
              <TableCell>
                {comment}
              </TableCell>
              <TableCell>
                {evaluation}
              </TableCell>
              <TableCell>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Button variant="contained" color = 'info' onClick={handleOpen}>Edit</Button>
                  <Button variant="contained" color = 'error' onClick={handleDeleteOpen}>Delete</Button>
                </Stack>
              </TableCell>
            </TableRow>
            </>
        );
    }
    const ItemAdd = () => {
        const [addComment, setAddComment] = useState("");
        const [addEvaluation, setAddEvaluation] = useState("");
        const [openAdd, setOpenAdd] = useState(false);
        const handleOpenAdd = () => setOpenAdd(true);
        const handleCloseAdd = () => setOpenAdd(false);

        const handleAdd = (e) => {
            e.preventDefault();
              (async () => {
                  const result = await fetch(`/api/categories/${location.state.categoryName}/sportPrograms/${location.state.sportProgramId}/ratings`, {
                    method:'POST',
                    headers:{
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
                    "evaluation": addEvaluation }])
                }});
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
                  <Typography>Evaluation</Typography>
                  <TextField sx = {{width: '100%', mb:2}} required multiline maxRows={9} label="Required" variant="filled" value={addEvaluation} onChange={(event) => setAddEvaluation(event.currentTarget.value)}/>
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
                <TableCell sx = {{width: '60%', textAlign:"center", fontSize: "19px", fontWeight: "bold"}}>Comment</TableCell>
                <TableCell sx = {{width: '10%', textAlign:"center", fontSize: "19px", fontWeight: "bold"}}>Evaluation</TableCell>
                <TableCell sx = {{width: '20%', textAlign:"center", fontSize: "19px", fontWeight: "bold"}}>Options</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            {
            data.map((item) => {
                  return (<Rating id={item.id} comment={item.comment} evaluation={item.evaluation}/>);
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
export default Ratings;
    

