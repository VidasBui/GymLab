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


const SportPrograms = () => {
    const [data, setData] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState("");
    const [refresh, setRefresh] = useState(false);
    const navigate = useNavigate();
const location = useLocation();
    useEffect(() => {
       (async () => {
        try{
        fetch(`/api/categories/${location.state.categoryName}/sportPrograms`)        
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

    const ItemAdd = () => {
      const [typeAdd, setTypeAdd] = useState("");
      const [durationAdd, setDurationAdd] = useState("");
      const [intensityAdd, setIntensityAdd] = useState("");
      const [descriptionAdd, setDescriptionAdd] = useState("");
      const [workoutAdd, setWorkoutAdd] = useState("");

      const [openAdd, setOpenAdd] = useState(false);
      const handleOpenAdd = () => setOpenAdd(true);
      const handleCloseAdd = () => setOpenAdd(false);

        const handleAdd = (e) => {
          e.preventDefault();
            (async () => {
                const result = await fetch(`/api/categories/${location.state.categoryName}/sportPrograms`,{
                  method:'POST',
                  headers:{
                      'Accept':'*/*',
                      'Content-Type':'application/json'
                  },
                  body:JSON.stringify({
                      type:typeAdd,
                      duration:durationAdd,
                      intensity:intensityAdd,
                      description:descriptionAdd,
                      workout:workoutAdd
                  })})
              result.json().then((response) => {if(result.status != 201) alert(`failed with status ${result.status}`);
              else {
                setData([...data, {
                  "id":response.id,
                  "type":typeAdd,
                  "duration":durationAdd,
                  "intensity":intensityAdd,
                  "description":descriptionAdd,
                  "workout":workoutAdd,
                  "score": 0 }])
              }});
            })()
        }

        return(
            <>
            <Button display= "block" variant="contained" sx = {{width: '100%', mt:3, alignItems: "justify-end", mr:0}} onClick={handleOpenAdd}>Add new sport program</Button>
            <Dialog PaperProps={{ sx: { width: "60%" } }}          
              open={openAdd}
              onClose={handleCloseAdd}>
              <DialogContent >
                <form onSubmit={handleAdd}>
                <Typography sx ={{textAlign:"center", fontWeight: "bold", fontSize: 22}}>Add Sport Program</Typography>
                <Typography sx = {{mb:1}}>Type</Typography>
                <FormControl sx = {{mb:2}} fullWidth>
                    <Select required
                    value = {typeAdd}
                    onChange = {(event) => setTypeAdd(event.target.value)}
                    >
                    <MenuItem value={0}>Begginer</MenuItem>
                    <MenuItem value={1}>Intermediate</MenuItem>
                    <MenuItem value={2}>Advanced</MenuItem>
                    </Select>
                </FormControl>
                <Typography sx = {{mb:1}}>Duration</Typography>
                <FormControl sx = {{mb:2}} fullWidth>
                    <Select required
                    value = {durationAdd}
                    onChange={(event) => setDurationAdd(event.target.value)}
                    >
                    <MenuItem value={0}>1 week</MenuItem>
                    <MenuItem value={1}>2 weeks</MenuItem>
                    <MenuItem value={2}>3 weeks</MenuItem>
                    <MenuItem value={3}>4 weeks</MenuItem>
                    <MenuItem value={4}>5 weeks</MenuItem>
                    <MenuItem value={5}>6 weeks</MenuItem>
                    <MenuItem value={6}>7 weeks</MenuItem>
                    <MenuItem value={7}>8 or more weeks</MenuItem>
                    </Select>
                </FormControl>
                <Typography sx = {{mb:1}}>Intensity</Typography>
                <FormControl sx = {{mb:2}} fullWidth>
                    <Select required
                    value = {intensityAdd}
                    onChange={(event) => setIntensityAdd(event.target.value)}
                    >
                    <MenuItem value={0}>Low</MenuItem>
                    <MenuItem value={1}>Moderate</MenuItem>
                    <MenuItem value={2}>High</MenuItem>
                    </Select>
                </FormControl>
                <Typography>Description</Typography>
                <TextField sx = {{width: '100%', mb:2}} required multiline maxRows={9} label="Required" variant="filled" defaultValue={descriptionAdd} onChange={(event) => setDescriptionAdd(event.currentTarget.value)}/>
                <Typography>Workout</Typography>
                <TextField sx = {{width: '100%', mb:2}} required multiline maxRows={9} variant="filled" label="Required" defaultValue = {workoutAdd} onChange={(event) => setWorkoutAdd(event.currentTarget.value)}/>
                <Box display="block"><Button variant="contained" sx ={{display:"block", m:"auto"}} type="submit">Submit</Button></Box>
                </form>
                </DialogContent>
            </Dialog>
            </>
        );
    }

    const SportProgram = (props) => {
        const [id, setId] = useState(props.id);
        const [type, setType] = useState(props.type);
        const [duration, setDuration] = useState(props.duration);
        const [intensity, setIntensity] = useState(props.intensity);
        const [description, setDescription] = useState(props.description);
        const [workout, setWorkout] = useState(props.workout);
        const [score, setScore] = useState(props.score);

        const [open, setOpen] = useState(false);
        const handleOpen = () => setOpen(true);
        const handleClose = () => setOpen(false);
        const [typeEdit, setTypeEdit] = useState("");
        const [durationEdit, setDurationEdit] = useState("");
        const [intensityEdit, setIntensityEdit] = useState("");
        const [descriptionEdit, setDescriptionEdit] = useState(props.description);
        const [workoutEdit, setWorkoutEdit] = useState(props.workout);

        const [openDelete, setOpenDelete] = useState(false);
        const handleDeleteOpen = () => setOpenDelete(true);
        const handleDeleteClose = () => setOpenDelete(false);

        const toRatings = () => {
            navigate('/ratings', {state:{categoryName:location.state.categoryName, sportProgramId:id}});
        }

        const handleSubmit = (e) => {
            e.preventDefault();
            (async () => {
              const result = await fetch(`/api/categories/${location.state.categoryName}/sportPrograms/${id}`,{
                method:'PUT',
                headers:{
                    'Accept':'*/*',
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                  type:typeEdit === "" ? type : typeEdit,
                  duration:durationEdit === "" ? duration : durationEdit,
                  intensity:intensityEdit === "" ? intensity : intensityEdit,
                  description:descriptionEdit,
                  workout:workoutEdit
                })
            })
            
            result.json().then((response) => {
                setType(response.type);
                setDuration(response.duration);
                setIntensity(response.intensity);
                setDescription(descriptionEdit); 
                setWorkout(workoutEdit);
                handleClose();
              })
            })()
          }

        const handleDelete = () => {
            let filtered = data.filter(n => n.id != id);
            
            (async () => {
              fetch(`/api/categories/${location.state.categoryName}/sportPrograms/${id}`,{
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
                {type === 0 ? "Beginner" : type === 1 ? "Intermediate" : "Advanced"}
              </TableCell>
              <TableCell>
              {duration === 0 ? "1 week" : duration === 1 ? "2 weeks" : duration === 2 ? "3 weeks" : duration === 3 ? "4 weeks" : duration === 4 ? "5 weeks" : duration === 5 ? "6 weeks" : duration === 6 ? "7 weeks" : "8 or more weeks"}
              </TableCell>
              <TableCell>
              {intensity === 0 ? "Low" : intensity === 1 ? "Moderate" : "High"}
              </TableCell>
              <TableCell>
              {description}
              </TableCell>
              <TableCell>
              {workout}
              </TableCell>
              <TableCell>
              {score}
              </TableCell>
              <TableCell>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Button variant="contained" color = 'primary' onClick={toRatings}>View</Button>
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
                <Typography sx ={{textAlign:"center", fontWeight: "bold", fontSize: 22}}>Edit Sport Program</Typography>
                <form onSubmit = {handleSubmit}>
                <Typography>Id</Typography>
                <TextField sx = {{width: '100%', mb:2}} variant="filled" defaultValue = {id} label="Read Only" InputProps={{readOnly: true}}/>
                <Typography sx = {{mb:1}}>Type</Typography>
                <FormControl sx = {{mb:2}} fullWidth>
                <InputLabel id="demo-multiple-name-label">{type === 0 ? "Beginner" : type === 1 ? "Intermediate" : "Advanced"}</InputLabel>
                    <Select
                    value = {typeEdit}
                    input={<OutlinedInput label={type === 0 ? "Beginner" : type === 1 ? "Intermediate" : "Advanced"}/>}
                    onChange = {(event) => setTypeEdit(event.target.value)}
                    >
                    <MenuItem value={0}>Beginner</MenuItem>
                    <MenuItem value={1}>Intermediate</MenuItem>
                    <MenuItem value={2}>Advanced</MenuItem>
                    </Select>
                </FormControl>
                <Typography sx = {{mb:1}}>Duration</Typography>
                <FormControl sx = {{mb:2}} fullWidth>
                <InputLabel id="demo-multiple-name-label">
                  {duration === 0 ? "1 week" : duration === 1 ? "2 weeks" : duration === 2 ? "3 weeks" : duration === 3 ? "4 weeks" : duration === 4 ? "5 weeks" : duration === 5 ? "6 weeks" : duration === 6 ? "7 weeks" : "8 or more weeks"}
                  </InputLabel>
                    <Select
                    value = {durationEdit}
                    onChange={(event) => setDurationEdit(event.target.value)}
                    input={<OutlinedInput label=
                      {duration === 0 ? "1 week" : duration === 1 ? "2 weeks" : duration === 2 ? "3 weeks" : duration === 3 ? "4 weeks" : duration === 4 ? "5 weeks" : duration === 5 ? "6 weeks" : duration === 6 ? "7 weeks" : "8 or more weeks"}
                       />}
                    >
                    <MenuItem value={0}>1 week</MenuItem>
                    <MenuItem value={1}>2 weeks</MenuItem>
                    <MenuItem value={2}>3 weeks</MenuItem>
                    <MenuItem value={3}>4 weeks</MenuItem>
                    <MenuItem value={4}>5 weeks</MenuItem>
                    <MenuItem value={5}>6 weeks</MenuItem>
                    <MenuItem value={6}>7 weeks</MenuItem>
                    <MenuItem value={7}>8 or more weeks</MenuItem>
                    </Select>
                </FormControl>
                <Typography sx = {{mb:1}}>Intensity</Typography>
                <FormControl sx = {{mb:2}} fullWidth>
                <InputLabel id="demo-multiple-name-label">{intensity === 0 ? "Low" : intensity === 1 ? "Moderate" : "High"}</InputLabel>
                    <Select
                    value = {intensityEdit}
                    onChange={(event) => setIntensityEdit(event.target.value)}
                    input={<OutlinedInput label={intensity === 0 ? "Low" : intensity === 1 ? "Moderate" : "High"} />}
                    >
                    <MenuItem value={0}>Low</MenuItem>
                    <MenuItem value={1}>Moderate</MenuItem>
                    <MenuItem value={2}>High</MenuItem>
                    </Select>
                </FormControl>
                <Typography>Description</Typography>
                <TextField sx = {{width: '100%', mb:2}} required multiline maxRows={9} label="Required" variant="filled" defaultValue={descriptionEdit} onChange={(event) => setDescriptionEdit(event.currentTarget.value) }/>
                <Typography>Workout</Typography>
                <TextField sx = {{width: '100%', mb:2}} required multiline maxRows={9} variant="filled" label="Required" defaultValue = {workoutEdit} onChange={(event) => setWorkoutEdit(event.currentTarget.value)} />
                <Typography>Score</Typography>
                <TextField sx = {{width: '100%', mb:2}} variant="filled" label="Read Only" defaultValue = {score} InputProps={{readOnly: true}}/>
                <Box display="block"><Button variant="contained" sx ={{display:"block", m:"auto"}} type="submit">Save</Button></Box>
                </form>
                </DialogContent>
            </Dialog>
            <Dialog PaperProps={{ sx: { width: "60%" } }} 
                open={openDelete}
                onClose={handleDeleteClose}
            >
                <DialogContent>
                <Typography sx ={{textAlign:"center", fontWeight: "bold", fontSize: 22}}>Delete sport program</Typography>
                <Typography>Id</Typography>
                <TextField sx = {{width: '100%', mb:2, mt:1}} variant="filled" defaultValue = {id} label="Read Only" InputProps={{readOnly: true}}/>
                <Typography>Type</Typography>
                <TextField sx = {{width: '100%', mb:2, mt:1}} variant="filled" defaultValue = {type} label="Read Only" InputProps={{readOnly: true}}/>
                <Typography>Duration</Typography>
                <TextField sx = {{width: '100%', mb:2, mt:1}} variant="filled" defaultValue = {duration} label="Read Only" InputProps={{readOnly: true}}/>
                <Typography>Intensity</Typography>
                <TextField sx = {{width: '100%', mb:2, mt:1}} variant="filled" defaultValue = {intensity} label="Read Only" InputProps={{readOnly: true}}/>
                <Typography>Description</Typography>
                <TextField sx = {{width: '100%', mb:2, mt:1}} variant="filled" multiline maxRows={9} defaultValue = {description} label="Read Only" InputProps={{readOnly: true}}/>
                <Typography>Workout</Typography>
                <TextField sx = {{width: '100%', mb:2, mt:1}} variant="filled" multiline maxRows={9} defaultValue = {workout} label="Read Only" InputProps={{readOnly: true}}/>
                <Typography>Score</Typography>
                <TextField sx = {{width: '100%', mb:2, mt:1}} variant="filled" defaultValue = {score} label="Read Only" InputProps={{readOnly: true}}/>                  <Stack  direction="row" justifyContent="center" spacing={1}>
                    <Button variant="contained" color = 'error' onClick={handleDelete}>Delete</Button>
                    <Button variant="contained" color = 'info' onClick={handleDeleteClose}>Cancel</Button>
                  </Stack>
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
            <TableCell sx = {{width: '10%', textAlign:"center", fontSize: "19px", fontWeight: "bold"}}>Type</TableCell>
            <TableCell sx = {{width: '10%', textAlign:"center", fontSize: "19px", fontWeight: "bold"}}>Duration</TableCell>
            <TableCell sx = {{width: '10%', textAlign:"center", fontSize: "19px", fontWeight: "bold"}}>Intensity</TableCell>
            <TableCell sx = {{width: '15%', textAlign:"center", fontSize: "19px", fontWeight: "bold"}}>Description</TableCell>
            <TableCell sx = {{width: '40%', textAlign:"center", fontSize: "19px", fontWeight: "bold"}}>Workout</TableCell>
            <TableCell sx = {{width: '10%', textAlign:"center", fontSize: "19px", fontWeight: "bold"}}>Score</TableCell>
            <TableCell sx = {{width: '15%', textAlign:"center", fontSize: "19px", fontWeight: "bold"}}>Options</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {
        data.map((item) => {
              return (<SportProgram id={item.id} type={item.type} duration={item.duration} intensity = {item.intensity} description = {item.description} workout = {item.workout} score = {item.score}/>);
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


export default SportPrograms;