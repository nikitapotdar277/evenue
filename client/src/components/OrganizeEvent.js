import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import TopNav from './Navbar';
import "./OrganizeEvent.css"; 
import TimePicker from 'react-time-picker';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
//import Box from '@mui/material/Box';
//import TextField from '@mui/material/TextField';
//import MenuItem from '@mui/material/MenuItem';
//import { Input, Select } from '@mui/material';
//import { DatePicker } from '@mui/x-date-pickers/DatePicker';
//import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
//import dayjs from 'dayjs';
//import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
//import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
//import { DesktopTimePicker } from '@mui/x-date-pickers/DesktopTimePicker';
//import InputAdornment from '@mui/material/InputAdornment';
import Alert from '@mui/material/Alert';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

function OrganizeEvent(){

    const [eventName,setEventName]=useState("");
    const [description,setDescription]=useState("");
    const [address,setAddress]=useState("");
    //const [location,setLocation]=useState("");
    const [city,setCity]=useState("");
    const [state,setState]=useState("");
    const [date,setDate]=useState(new Date());
    const [starttime,setStartTime]=useState('09:00 AM');
    const [endtime,setEndTime]=useState('06:00 PM');
    const [capacity,setCapacity]=useState("");
    const [ageRange,setAgeRange]=useState("");
    const [cost,setCost]=useState("");
    const [eventType,setEventType]=useState("");
    const [data,setData]=useState("");
    const [jsonData, setJsonData] = useState({});
    const locations = useLocation();
    const editId = new URLSearchParams(locations.search).get('edit');
    const userId = new URLSearchParams(locations.search).get('userid');
    const [showAlert, setShowAlert] = useState(false);
    const [showSaveAlert, setSaveShowAlert] = useState(false);
    const [profileData, setProfileData] = useState({});


    console.log(editId);
    console.log(userId);
    
    const URL="http://localhost:3000/organize_event"

    useEffect(()=>{
        axios.get("/profile")
        .then(response => {
            setProfileData(response.data["user_details"]);
            console.log(response.data["user_details"]);
        })
        .catch(error => {
            console.log(error);
            })
    },[URL])

   


    function handleName(event){
        setEventName(event.target.value);
        setJsonData({
            ...jsonData,
            "name": event.target.value
          });
    }

    function handleDescription(event){
        setDescription(event.target.value);
        setJsonData({
            ...jsonData,
            "description": event.target.value
          });
    }

    function handleAddress(event){
        setAddress(event.target.value);
        setJsonData({
            ...jsonData,
            "address": event.target.value
          });
    }

    function handleCity(event){
        setCity(event.target.value);
        setJsonData({
            ...jsonData,
            "city": event.target.value
          });
    }

    function handleState(event){
        setState(event.target.value);
        setJsonData({
            ...jsonData,
            "state": event.target.value
          });
    }

    function handleDate(date){
        setDate(date);
        setJsonData({
            ...jsonData,
            "date": date
          });
    }

    function handleStartTime(time){
        setStartTime(time);
        setJsonData({
            ...jsonData,
            "start_time": time
          });
    }

    function handleEndTime(time){
        setEndTime(time);
        setJsonData({
            ...jsonData,
            "end_time": time
          });
    }

    function handleCapacity(event){
        setCapacity(event.target.value);
        setJsonData({
            ...jsonData,
            "capacity": event.target.value
          });
    }

    function handleAgeRange(event){
        setAgeRange(event.target.value);
        setJsonData({
            ...jsonData,
            "age": event.target.value
          });
    }

    function handleCost(event){
        setCost(event.target.value);
        setJsonData({
            ...jsonData,
            "cost": event.target.value
          });
    }

    function handleEventType(event){
        setEventType(event.target.value);
        setJsonData({
            ...jsonData,
            "event_type": event.target.value
          });
    }

    function handleSubmit(){
        axios.post('/create_events', {
            "name":eventName,
            "event_type":eventType,
            "description":description,
            "age_range":ageRange,
            "address":address,
            "city":city,
            "state":state,
            "date":date,
            "start_time":starttime,
            "end_time":endtime,
            "capacity":capacity,
            "cost":cost,
            "organizer": profileData["email"]
        })
         .then(response => {
            console.log(response.data);
        })
        .catch(error => {
            console.log(error);
            });
        
        setShowAlert(true);
    }

    useEffect(()=>{
    if(editId!=null){
            axios.get('/get_event_details',{
                params: {
                    _id: userId,
                    e_id: editId
                }
            })
            .then(response => {
                setData(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.log(error);
                })
        
        
        setJsonData({
                ...jsonData,
                "_id": userId
        });
        
        setJsonData({
            ...jsonData,
            "e_id": editId
    });
        
    }
},[userId,editId]);

    function handleSaveEdit(){
        axios.post('update_event_details',jsonData)
        .then(response => {
            console.log(response.data);
        })
        .catch(error => {
            console.log(error);
            });
        //editId="";
        
        setSaveShowAlert(true);
    }

    


    return(
        
        <div className="bgs" >
                <div style={{ alignSelf: 'center', alignContent:'center'}}>
                <TopNav />
                    <div>
                    {/*
                    <Box
                        component="form"
                        sx={{
                            '& .MuiTextField-root': { m: 1, width: '25ch' },
                        }}
                        noValidate
                        autoComplete="off"
                    >*/}
                        <div class="input-container">
                            <h2>Name of event:</h2>
                            <input type="text" defaultValue={data["name"] || eventName} 
                                onChange={(event) => handleName(event)} />
                            {/*
                            <TextField
                                required
                                id="outlined-required"
                                label="Enter the event name"
                                defaultValue={data["name"] || eventName} 
                                onChange={(event) => handleName(event)}
                    />*/}
                        </div>
                      {/*</Box>*/}  
                        <div class="input-container">
                            <h2>Event Type:</h2>
                            <select id="dropdown" defaultValue={data["event_type"] || eventType} 
                            onChange={handleEventType}>

                                    <option value="">--Please choose an option--</option>
                                    <option value="tennis">tennis</option>
                                    <option value="badminton">badminton</option>
                                    <option value="football">football</option>
                                    <option value="basketball">basketball</option>
                                    <option value="table tennis">table tennis</option>
                                    <option value="squash">squash</option>
                                    <option value="yoga">yoga</option>
                                    <option value="dance">dance</option>
                                    <option value="exercise">exercise</option>
                                    <option value="other">other</option>

                            </select>
                                


                            {/*
                                <Select id="demo-simple-select" 
                                defaultValue={data["event_type"] || eventType} 
                                onChange={handleEventType}
                                labelId="demo-simple-select-label"
                                style={{ width: '200px', height: '50px' }}
                                >
                                    <MenuItem value="">--Please choose an option--</MenuItem>
                                    <MenuItem value="tennis">tennis</MenuItem>
                                    <MenuItem value="badminton">badminton</MenuItem>
                                    <MenuItem value="football">football</MenuItem>
                                    <MenuItem value="basketball">basketball</MenuItem>
                                    <MenuItem value="table tennis">table tennis</MenuItem>
                                    <MenuItem value="squash">squash</MenuItem>
                                    <MenuItem value="yoga">yoga</MenuItem>
                                    <MenuItem value="dance">dance</MenuItem>
                                    <MenuItem value="exercise">exercise</MenuItem>
                                    <MenuItem value="other">other</MenuItem>
                                </Select>
                            */}
                        </div>
                        {/*
                        <Box
                            component="form"
                            sx={{
                                '& .MuiTextField-root': { m: 1, width: '25ch'},
                            }}
                            noValidate
                            autoComplete="off"
                        >*/}
                            <div class="input-container">
                                <h2>Description:</h2>

                                <textarea defaultValue={data["description"] || description} 
                                    onChange={(event) => handleDescription(event)}
                                     />

                                {/*
                                <TextField
                                    id="outlined-multiline-flexible"
                                    label="Enter a description"
                                    multiline
                                    defaultValue={data["description"] || description} 
                                    onChange={(event) => handleDescription(event)}
                                    maxRows={4}
                                />*/}
                            
                            </div>
                        {/*</Box>*/}
                        <div class="input-container">
                            <h2>Age range:</h2>

                            <select id="dropdown" defaultValue={data["age_range"] || ageRange} 
                            onChange={handleAgeRange}>
                                    <option value="">--Please choose an option--</option>
                                    <option value="all">all</option>
                                    <option value="under 18">under 18</option>
                                    <option value="18 and above">18 and above</option>
                            </select>

                            {/*
                            <Select id="demo-simple-select"
                            labelId="demo-simple-select-label" 
                            defaultValue={data["age_range"] || ageRange} 
                            onChange={handleAgeRange}
                            style={{ width: '200px', height: '50px' }}
                            >
                                    <MenuItem value="">--Please choose an option--</MenuItem>
                                    <MenuItem value="all">all</MenuItem>
                                    <MenuItem value="under 18">under 18</MenuItem>
                                    <MenuItem value="18 and above">18 and above</MenuItem>

                            </Select>
                            */}
                        </div>
                        {/*
                        <Box
                            component="form"
                            sx={{
                                '& .MuiTextField-root': { m: 1, width: '20ch'},
                            }}
                            noValidate
                            autoComplete="off"
                        >*/}
                            <div class="input-container">
                                <h2>Address:</h2>
                                <input type="text" defaultValue={data["address"] || address} 
                                        onChange={(event) => handleAddress(event)} />
                                
                                {/*
                                <TextField
                                        id="outlined-multiline-flexible"
                                        label="Enter address"
                                        multiline
                                        defaultValue={data["address"] || address} 
                                        onChange={(event) => handleAddress(event)}
                                        maxRows={4}
                                />*/}
                            
                            </div>
                        {/*</Box>*/}
                        {/*
                        <Box
                        component="form"
                        sx={{
                            '& .MuiTextField-root': { m: 1, width: '25ch' },
                        }}
                        noValidate
                        autoComplete="off"
                    >*/}
                            <div class="input-container">
                                <h2>City:</h2>
                                <input type="text" defaultValue={data["city"] || city} 
                                    onChange={(event) => handleCity(event)} />
                                
                                {/*
                                <TextField
                                    required
                                    id="outlined-required"
                                    label="Enter city and state"
                                    defaultValue={data["location"] || location} 
                                    onChange={(event) => handleLocation(event)}
                                />*/}
                            
                            </div>
                        {/*</Box>*/}
                        <div class="input-container">
                                <h2>State:</h2>
                                <input type="text" defaultValue={data["state"] || state} 
                                    onChange={(event) => handleState(event)} />
                        </div>

                        <div class="input-container">
                            <h2>Date:</h2>

                            <DatePicker 
                                selected={date} 
                                onChange={(date) => handleDate(date)} 
                                dateFormat="MM/dd/yyyy" 
                                showYearDropdown
                                showMonthDropdown
                                minDate={new Date()}
                                maxDate={new Date("2030-12-31")}
                            />


                        {/*
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer
                                components={[
                                'DatePicker'
                                ]}
                            >

                                <DemoItem>
                                <DatePicker
                                selected={date} 
                                onChange={(date) => handleDate(date)} 
                                dateFormat="MM/dd/yyyy"
                                disablePast  
                                 />
                                </DemoItem>
                            </DemoContainer>
                            </LocalizationProvider>
                            */}
                        </div>
                        <div class="input-container">
                            <h2>Start Time:</h2>
                            <TimePicker
                                disableClock={true}
                                format="h:m a"
                                defaultValue={data["start_time"] || starttime}
                                onChange={handleStartTime}
                            />

                            
                            
                            {/*
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer
                                    components={[
                                    'DesktopTimePicker'
                                    ]}
                                >
                                    <DemoItem>
                                    <DesktopTimePicker 
                                    onChange={handleStartTime}
                                    defaultValue={data["start_time"] || starttime} />
                                    </DemoItem>
                                </DemoContainer>
                                </LocalizationProvider>*/}
                            
                        </div>
                        <div class="input-container">
                            <h2>End Time:</h2>

                            <TimePicker
                                disableClock={true}
                                format="h:m a"
                                defaultValue={data["end_time"] || endtime}
                                onChange={handleEndTime}
                            />

                            {/*
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer
                                    components={[
                                    'DesktopTimePicker'
                                    ]}
                                >
                                    <DemoItem>
                                    <DesktopTimePicker 
                                    defaultValue={data["end_time"] || endtime}
                                    onChange={handleEndTime} />
                                    </DemoItem>
                                </DemoContainer>
                                </LocalizationProvider>*/}
                            
                        </div>
                        {/*
                        <Box
                        component="form"
                        sx={{
                            '& .MuiTextField-root': { m: 1, width: '25ch' },
                        }}
                        noValidate
                        autoComplete="off"
                    >*/}
                            <div class="input-container">
                                <h2>Capacity:</h2>
                                <input type="text" defaultValue={data["capacity"] || capacity} 
                                        onChange={(event) => handleCapacity(event)} />
                                
                                {/*
                                <TextField
                                        required
                                        id="outlined-required"
                                        label="Enter capacity"
                                        defaultValue={data["capacity"] || capacity} 
                                        onChange={(event) => handleCapacity(event)}
                                />    
                                */}
                            </div>
                        {/*
                        </Box>
                        <Box
                        component="form"
                        sx={{
                            '& .MuiTextField-root': { m: 1, width: '25ch' },
                        }}
                        noValidate
                        autoComplete="off"
                    >*/}
                            <div class="input-container">
                                <h2>Cost:</h2>
                                <input type="text" defaultValue={data["cost"] || cost} 
                                            onChange={(event) => handleCost(event)} />
                                
                                {/*
                                <TextField
                                            required
                                            id="outlined-required"
                                            label="Enter cost"
                                            defaultValue={data["cost"] || cost} 
                                            onChange={(event) => handleCost(event)}
                                            InputProps={{
                                                startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                              }}
                                />*/}    
                            </div>
                        {/*</Box>*/}
                        <div class="input-container">
                            <h2 style={{color:"black"}}>Organizer: {profileData["firstname"]+" "+profileData["lastname"]+" "+"("+profileData["email"]+")"}</h2>
                        </div>
                        {editId ? (
                            <button class="event_button" onClick={handleSaveEdit}>Save Edit</button>
                        ) : (
                            <button class="event_button" onClick={handleSubmit}>Create Event</button>
                        )}

                        {showAlert && (
                                <Alert
                                severity="success"
                                iconMapping={{ success: <CheckCircleOutlineIcon fontSize="inherit" /> }}
                                >
                                Event Created
                                </Alert>
                        )}

                        {showSaveAlert && (
                                <Alert
                                severity="success"
                                iconMapping={{ success: <CheckCircleOutlineIcon fontSize="inherit" /> }}
                                >
                                Event edited successfully
                                </Alert>
                        )}
                    </div>
                </div>
        </div>
    
    );

}

export default OrganizeEvent;