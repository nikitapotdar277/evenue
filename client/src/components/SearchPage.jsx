import "./SearchPage.css";
import React, { useEffect, useState, useRef } from "react";
import {useNavigate} from 'react-router-dom';
import axios from "axios";
import Table from 'react-bootstrap/Table'
import TopNav from "./Navbar";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Spinner from 'react-bootstrap/Spinner';
import { ChatEngine, getOrCreateChat } from 'react-chat-engine';
import { ChatEngineCore } from 'chat-engine';
//import Sidebar from "./Sidebar";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


let baseURL = "http://localhost:8080/data?";
let reactURL = "?";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate=useNavigate();
  const [data, setData] = useState(null);
  const [chatData,setchatData] = useState(null);

  // venues
  const nameFilterRef = useRef([]);
  const costFilterRef = useRef([]);
  const cityFilterRef = useRef([]);
  const stateFilterRef = useRef([]);
  const venuenameFilterRef = useRef([]);

  // events
  const age_rangeFilterRef = useRef([]);
  const activityNameFilterRef = useRef([]);

  // players
  const interestFilterRef = useRef([]);
  const genderFilterRef = useRef([]);
  const skill_levelFilterRef = useRef([]);

  // type of filter
  const [venueCheck,setvenueCheck] = useState(false);
  const [eventCheck,seteventCheck] = useState(true);
  const [playerCheck,setplayerCheck] = useState(false);
  const [typeFilter,settypeFilter] = useState("Events");

  const URL="http://localhost:3000/Search"

  useEffect(()=>{
    axios.get("/profile_data")
      .then(response => {
        //console.log(response)
        setchatData(response.data);
      })
      .catch(error => {
        console.error(error);
      })},[URL]);

  
  function setfilterType(value){

    if(value=="Events"){
        seteventCheck(true);
        setvenueCheck(false);
        setplayerCheck(false);
        settypeFilter(value);

        baseURL = "http://localhost:8080/dataa?";
        reactURL = "?";
    }
    else if(value=="Venues"){
        setvenueCheck(true);
        seteventCheck(false);
        setplayerCheck(false);
        settypeFilter(value);

        baseURL = "http://localhost:8080/data?";
        reactURL = "?";
    }
    else if(value=="Players"){
        setplayerCheck(true);
        seteventCheck(false);
        setvenueCheck(false);
        settypeFilter(value);


        baseURL = "http://localhost:8080/datap?";
        reactURL = "?";
    }

  }

  function handleCreateChat(email){

    const creds = {
      userName: chatData["email"],
      userSecret: chatData["password"],
      projectID: "ec68f4f3-6dd4-481c-a361-d22931b1db7d"
    };
  
  
    const options = {
      is_direct_chat: true,
      usernames: [email]
    };
  
  
    getOrCreateChat(creds, options, () => {
      navigate('/chat');
    });

  }


  function setcostFilters(event){
    const value=event.target.value;
    const checked=event.target.checked;  
    if (checked) {
      costFilterRef.current = [...costFilterRef.current, value];
    } else {
        costFilterRef.current = costFilterRef.current.filter((option) => option !== value);
    }    
    if (baseURL.indexOf("cost=") !== -1) {
      const st="cost"+"="+costFilterRef.current
      // to update backend URL
      const updatedBaseURL = baseURL.replace(
        new RegExp(`${"cost="}[^&]*`),
        st
      );
      // to update frontend URL
      const updatedReactURL = reactURL.replace(
        new RegExp(`${"cost="}[^&]*`),
        st
      );     
      baseURL=updatedBaseURL
      reactURL=updatedReactURL
    } else {
      // backend URL
      baseURL=baseURL+"&"+"cost"+"="+costFilterRef.current;
      // frontend URL
      reactURL=reactURL+"&"+"cost"+"="+costFilterRef.current;
    }
    navigate(reactURL)
  }



  function setinterestFilters(event){
    const value=event.target.value;
    const checked=event.target.checked;  
    if (checked) {
      interestFilterRef.current = [...interestFilterRef.current, value];
    } else {
        interestFilterRef.current = interestFilterRef.current.filter((option) => option !== value);
    }    
    if (baseURL.indexOf("interest=") !== -1) {
      const st="interest"+"="+interestFilterRef.current
      // to update backend URL
      const updatedBaseURL = baseURL.replace(
        new RegExp(`${"interest="}[^&]*`),
        st
      );
      // to update frontend URL
      const updatedReactURL = reactURL.replace(
        new RegExp(`${"interest="}[^&]*`),
        st
      );     
      baseURL=updatedBaseURL
      reactURL=updatedReactURL
    } else {
      // backend URL
      baseURL=baseURL+"&"+"interest"+"="+interestFilterRef.current;
      // frontend URL
      reactURL=reactURL+"&"+"interest"+"="+interestFilterRef.current;
    }
    navigate(reactURL)
  }

  function setgenderFilters(event){
    const value=event.target.value;
    const checked=event.target.checked;  
    if (checked) {
      genderFilterRef.current = [...genderFilterRef.current, value];
    } else {
        genderFilterRef.current = genderFilterRef.current.filter((option) => option !== value);
    }    
    if (baseURL.indexOf("gender=") !== -1) {
      const st="gender"+"="+genderFilterRef.current
      // to update backend URL
      const updatedBaseURL = baseURL.replace(
        new RegExp(`${"gender="}[^&]*`),
        st
      );
      // to update frontend URL
      const updatedReactURL = reactURL.replace(
        new RegExp(`${"gender="}[^&]*`),
        st
      );     
      baseURL=updatedBaseURL
      reactURL=updatedReactURL
    } else {
      // backend URL
      baseURL=baseURL+"&"+"gender"+"="+genderFilterRef.current;
      // frontend URL
      reactURL=reactURL+"&"+"gender"+"="+genderFilterRef.current;
    }
    navigate(reactURL)
  }

  function setskilllevelFilters(event){
    const value=event.target.value;
      const checked=event.target.checked;    
      if (checked) {
        skill_levelFilterRef.current = [...skill_levelFilterRef.current, value];
      } else {
        skill_levelFilterRef.current = skill_levelFilterRef.current.filter((option) => option !== value);
      }      
      if (baseURL.indexOf("skill_level=") !== -1) {
        const st="skill_level"+"="+skill_levelFilterRef.current
        // to update backend URL
        const updatedBaseURL = baseURL.replace(
          new RegExp(`${"skill_level="}[^&]*`),
          st
        );
        // to update frontend URL
        const updatedReactURL = reactURL.replace(
          new RegExp(`${"skill_level="}[^&]*`),
          st
        );       
        
        baseURL=updatedBaseURL
        reactURL=updatedReactURL

      } else {
        // backend URL
        baseURL=baseURL+"&"+"skill_level"+"="+skill_levelFilterRef.current;
        // frontend URL
        reactURL=reactURL+"&"+"skill_level"+"="+skill_levelFilterRef.current;
      }  
    navigate(reactURL)
  }



  function setagerangeFilters(event){
    const value=event.target.value;
      const checked=event.target.checked;    
      if (checked) {
        age_rangeFilterRef.current = [...age_rangeFilterRef.current, value];
      } else {
        age_rangeFilterRef.current = age_rangeFilterRef.current.filter((option) => option !== value);
      }      
      if (baseURL.indexOf("age_range=") !== -1) {
        const st="age_range"+"="+age_rangeFilterRef.current
        // to update backend URL
        const updatedBaseURL = baseURL.replace(
          new RegExp(`${"age_range="}[^&]*`),
          st
        );
        // to update frontend URL
        const updatedReactURL = reactURL.replace(
          new RegExp(`${"age_range="}[^&]*`),
          st
        );      
        
        baseURL=updatedBaseURL
        reactURL=updatedReactURL
      } else {
        // backend URL
        baseURL=baseURL+"&"+"age_range"+"="+age_rangeFilterRef.current;

        // frontend URL
        reactURL=reactURL+"&"+"age_range"+"="+age_rangeFilterRef.current;
      }  
    navigate(reactURL)
  }

  function setactivitynameFilters(event){
    const value=event.target.value;
    const checked=event.target.checked;  
    if (checked) {
      activityNameFilterRef.current = [...activityNameFilterRef.current, value];
    } else {
        activityNameFilterRef.current = activityNameFilterRef.current.filter((option) => option !== value);
    }    
    if (baseURL.indexOf("activityName=") !== -1) {
      const st="activityName"+"="+activityNameFilterRef.current
      // to update backend URL
      const updatedBaseURL = baseURL.replace(
        new RegExp(`${"activityName="}[^&]*`),
        st
      );
      // to update frontend URL
      const updatedReactURL = reactURL.replace(
        new RegExp(`${"activityName="}[^&]*`),
        st
      );     
      baseURL=updatedBaseURL
      reactURL=updatedReactURL
    } else {
      // backend URL
      baseURL=baseURL+"&"+"activityName"+"="+activityNameFilterRef.current;
      // frontend URL
      reactURL=reactURL+"&"+"activityName"+"="+activityNameFilterRef.current;
    }
    navigate(reactURL)
  }


  

  function setSearchTerms(value){

    if (baseURL.indexOf("search_query=") !== -1) {
        const st="search_query"+"="+value

        // update backend URL
        const updatedBaseURL = baseURL.replace(
          new RegExp(`${"search_query="}[^&]*`),
          st
        );

        // update frontend URL
        const updatedReactURL = reactURL.replace(
          new RegExp(`${"search_query="}[^&]*`),
          st
        );

        baseURL=updatedBaseURL
        reactURL=updatedReactURL

        setSearchTerm(value);
      } else {
        baseURL=baseURL+"&"+"search_query"+"="+value;
        reactURL=reactURL+"&"+"search_query"+"="+value;
        setSearchTerm(value);
      }

      navigate(reactURL)
      
  }

  function setnameFilters(event){

      const value=event.target.value;
      const checked=event.target.checked;
    
      if (checked) {
        nameFilterRef.current = [...nameFilterRef.current, value];
      } else {
        nameFilterRef.current = nameFilterRef.current.filter((option) => option !== value);
      }

      
      if (baseURL.indexOf("name=") !== -1) {

        const st="name"+"="+nameFilterRef.current

        // to update backend URL
        const updatedBaseURL = baseURL.replace(
          new RegExp(`${"name="}[^&]*`),
          st
        );

        // to update frontend URL
        const updatedReactURL = reactURL.replace(
          new RegExp(`${"name="}[^&]*`),
          st
        );
        
        
        baseURL=updatedBaseURL
        reactURL=updatedReactURL

      } else {

        // backend URL
        baseURL=baseURL+"&"+"name"+"="+nameFilterRef.current;

        // frontend URL
        reactURL=reactURL+"&"+"name"+"="+nameFilterRef.current;
      }
  
    navigate(reactURL)

  }

  function setcityFilters(event){

    const value=event.target.value;
      const checked=event.target.checked;
    
      if (checked) {
        cityFilterRef.current = [...cityFilterRef.current, value];
      } else {
        cityFilterRef.current = cityFilterRef.current.filter((option) => option !== value);
      }

      
      if (baseURL.indexOf("city=") !== -1) {

        const st="city"+"="+cityFilterRef.current

        // to update backend URL
        const updatedBaseURL = baseURL.replace(
          new RegExp(`${"city="}[^&]*`),
          st
        );

        // to update frontend URL
        const updatedReactURL = reactURL.replace(
          new RegExp(`${"city="}[^&]*`),
          st
        );
        
        
        baseURL=updatedBaseURL
        reactURL=updatedReactURL

      } else {

        // backend URL
        baseURL=baseURL+"&"+"city"+"="+cityFilterRef.current;

        // frontend URL
        reactURL=reactURL+"&"+"city"+"="+cityFilterRef.current;
      }
  
    navigate(reactURL)
  }


  function setstateFilters(event){

    const value=event.target.value;
      const checked=event.target.checked;
    
      if (checked) {
        stateFilterRef.current = [...stateFilterRef.current, value];
      } else {
        stateFilterRef.current = stateFilterRef.current.filter((option) => option !== value);
      }

      
      if (baseURL.indexOf("state=") !== -1) {

        const st="state"+"="+stateFilterRef.current

        // to update backend URL
        const updatedBaseURL = baseURL.replace(
          new RegExp(`${"state="}[^&]*`),
          st
        );

        // to update frontend URL
        const updatedReactURL = reactURL.replace(
          new RegExp(`${"state="}[^&]*`),
          st
        );
        
        
        baseURL=updatedBaseURL
        reactURL=updatedReactURL

      } else {

        // backend URL
        baseURL=baseURL+"&"+"state"+"="+stateFilterRef.current;

        // frontend URL
        reactURL=reactURL+"&"+"state"+"="+stateFilterRef.current;
      }
  
    navigate(reactURL)
  }
  

  function setvenuenameFilters(event){
    const value=event.target.value;
      const checked=event.target.checked;
    
      if (checked) {
        venuenameFilterRef.current = [...venuenameFilterRef.current, value];
      } else {
        venuenameFilterRef.current = venuenameFilterRef.current.filter((option) => option !== value);
      }

      
      if (baseURL.indexOf("venueName=") !== -1) {

        const st="venueName"+"="+venuenameFilterRef.current

        // to update backend URL
        const updatedBaseURL = baseURL.replace(
          new RegExp(`${"venueName="}[^&]*`),
          st
        );

        // to update frontend URL
        const updatedReactURL = reactURL.replace(
          new RegExp(`${"venueName="}[^&]*`),
          st
        );
        
        
        baseURL=updatedBaseURL
        reactURL=updatedReactURL

      } else {

        // backend URL
        baseURL=baseURL+"&"+"venueName"+"="+venuenameFilterRef.current;

        // frontend URL
        reactURL=reactURL+"&"+"venueName"+"="+venuenameFilterRef.current;
      }
  
    navigate(reactURL)
  }

  const [sidebarOpen, setSidebarOpen] = useState(false);

  function toggleSidebar() {
    setSidebarOpen(!sidebarOpen);
  }

  function setSearchTerms(value){

    if (baseURL.indexOf("search_query=") !== -1) {
        const st="search_query"+"="+value

        // update backend URL
        const updatedBaseURL = baseURL.replace(
          new RegExp(`${"search_query="}[^&]*`),
          st
        );

        // update frontend URL
        const updatedReactURL = reactURL.replace(
          new RegExp(`${"search_query="}[^&]*`),
          st
        );

        baseURL=updatedBaseURL
        reactURL=updatedReactURL

        setSearchTerm(value);
      } else {
        baseURL=baseURL+"&"+"search_query"+"="+value;
        reactURL=reactURL+"&"+"search_query"+"="+value;
        setSearchTerm(value);
      }

      navigate(reactURL)
      
  }

  useEffect(() => {
                      if(venueCheck){
                      axios.get(baseURL)
                        .then(res => {
                          if (res.status >= 200 && res.status < 300) {
                            return res.data;
                          } else {
                            throw new Error("Server responded with an error status: " + res.status);
                          }
                        })
                        .then(data => {
                          setData(data);
                          console.log(data);
                        })
                        .catch(handleError);}
  }, [venueCheck,nameFilterRef.current,stateFilterRef.current,cityFilterRef.current,venuenameFilterRef.current,searchTerm]);


  useEffect(() => {
    if(eventCheck){
                axios.get(baseURL)
                  .then(res => {
                    if (res.status >= 200 && res.status < 300) {
                      return res.data;
                    } else {
                      throw new Error("Server responded with an error status: " + res.status);
                    }
                  })
                  .then(data => {
                    setData(data);
                    console.log(data);
                  })
                  .catch(handleError);
              }
            }, [eventCheck,costFilterRef.current,cityFilterRef.current,stateFilterRef.current,age_rangeFilterRef.current,interestFilterRef.current, genderFilterRef.current, skill_levelFilterRef.current,searchTerm]);
            
  

  useEffect(() => {
          if(playerCheck){
                axios.get(baseURL)
                  .then(res => {
                    if (res.status >= 200 && res.status < 300) {
                      return res.data;
                    } else {
                      throw new Error("Server responded with an error status: " + res.status);
                    }
                  })
                  .then(data => {
                    setData(data);
                    console.log(data);
                  })
                  .catch(handleError);
              }
              
            }, [playerCheck,age_rangeFilterRef.current,activityNameFilterRef.current, costFilterRef.current, cityFilterRef.current,stateFilterRef.current, searchTerm]);
            
  
function handleError(error) {
    console.error("Axios error:", error);
                                // handle the error here, e.g. show an error message to the user
  }
            
if (!data) return <div>Loading...</div>;
            

  return (
  <div className="bag">
      <TopNav/>
      
    <div>
      <Row>
      <div className="searchbox">        
        <input 
          //style={{backgroundColor: 'white', width: '100%', height: '50px'}}
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={(event) => setSearchTerms(event.target.value)}
        />
        <div>
          <button onClick={toggleSidebar} className='btn-search' >Filters</button>
        </div>        
      </div>  
      </Row>
      {venueCheck && (
                    <Row>
                    <Col className="col-md-2">
                    <div className="sidebar-container">
                      <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>

                      <div class="checkbox-container" style={{ display: 'flex', flexDirection: 'column' }}>
                        <h5 className="search-h4">Filter by type</h5>
                        <select id="dropdown" value={typeFilter} onChange={(event) => setfilterType(event.target.value)}>
                                                  <option value="Events">Events</option>
                                                  <option value="Venues">Venues</option>
                                                  <option value="Players">Players</option>
                        </select>
                      </div>


                      
                        <div class="checkbox-container" style={{ display: 'flex', flexDirection: 'column' }}>
                        <h5 className="search-h4">Filter by Sports Name</h5>
                          <label class="checkbox-label">
                            <input type="checkbox" value="tennis" onChange={(event) => setnameFilters(event)} />
                              <span class="checkmark">Tennis</span>
                          </label>
                          <label class="checkbox-label">
                            <input type="checkbox" value="badminton" onChange={(event) => setnameFilters(event)} />
                                <span class="checkmark">Badminton</span>
                          </label>
                          <label class="checkbox-label">
                            <input type="checkbox" value="football" onChange={(event) => setnameFilters(event)} />
                              <span class="checkmark">Football</span>
                          </label>
                          <label class="checkbox-label">
                            <input type="checkbox" value="basketball" onChange={(event) => setnameFilters(event)} />
                              <span class="checkmark">Basketball </span>
                          </label>
                          <label class="checkbox-label">
                            <input type="checkbox" value="table tennis" onChange={(event) => setnameFilters(event)} />
                              <span class="checkmark">Table Tennis </span>
                          </label>
                          <label class="checkbox-label">
                            <input type="checkbox" value="volleyball" onChange={(event) => setnameFilters(event)} />
                              <span class="checkmark">Volleyball </span>
                          </label>
                          <label class="checkbox-label">
                            <input type="checkbox" value="squash" onChange={(event) => setnameFilters(event)} />
                              <span class="checkmark">Squash</span> 
                          </label>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <h5 className="search-h4">Filter by Venue Name</h5>
                          <label class="checkbox-label">
                            <input type="checkbox" value="srsc" onChange={(event) => setvenuenameFilters(event)} />
                            <span class="checkmark">SRSC </span>
                          </label>
                          <label class="checkbox-label">
                            <input type="checkbox" value="north" onChange={(event) => setvenuenameFilters(event)} />
                            <span class="checkmark">North </span>
                          </label>
                          <label class="checkbox-label">
                            <input type="checkbox" value="south" onChange={(event) => setvenuenameFilters(event)} />
                            <span class="checkmark">South </span>
                          </label>
                          <label class="checkbox-label">
                            <input type="checkbox" value="east" onChange={(event) => setvenuenameFilters(event)} />
                            <span class="checkmark">East </span>
                          </label>
                          <label class="checkbox-label">
                            <input type="checkbox" value="west" onChange={(event) => setvenuenameFilters(event)} />
                            <span class="checkmark">West </span>
                          </label>
                          <label class="checkbox-label">
                            <input type="checkbox" value="downtown" onChange={(event) => setvenuenameFilters(event)} />
                            <span class="checkmark">Downtown </span>
                          </label>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <h5 className="search-h4">Filter by City</h5>
                        <label class="checkbox-label">
                            <input type="checkbox" value="bloomington" onChange={(event) => setcityFilters(event)} />
                            <span class="checkmark">Bloomington </span>
                          </label>
                          <label class="checkbox-label">
                            <input type="checkbox" value="anderson" onChange={(event) => setcityFilters(event)} />
                            <span class="checkmark">Anderson </span>
                          </label>
                          <label class="checkbox-label">
                            <input type="checkbox" value="greenwood" onChange={(event) => setcityFilters(event)} />
                            <span class="checkmark">Greenwood </span>
                          </label>
                          <label class="checkbox-label">
                            <input type="checkbox" value="indianapolis" onChange={(event) => setcityFilters(event)} />
                            <span class="checkmark">Indianapolis </span>
                          </label>
                          <label class="checkbox-label">
                            <input type="checkbox" value="chicago" onChange={(event) => setcityFilters(event)} />
                            <span class="checkmark">Chicago </span>
                          </label>
                          <label class="checkbox-label">
                            <input type="checkbox" value="springfield" onChange={(event) => setcityFilters(event)} />
                            <span class="checkmark">Springfield </span>
                          </label>
                          <label class="checkbox-label">
                            <input type="checkbox" value="champaign" onChange={(event) => setcityFilters(event)} />
                            <span class="checkmark">Champaign </span>
                          </label>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <h5 className="search-h4">Filter by State</h5>
                        <label class="checkbox-label">
                            <input type="checkbox" value="indiana" onChange={(event) => setstateFilters(event)} />
                            <span class="checkmark">Indiana </span>
                          </label>
                          <label class="checkbox-label">
                            <input type="checkbox" value="illinois" onChange={(event) => setstateFilters(event)} />
                            <span class="checkmark">Illinois </span>
                          </label>
                          </div>
                      </div>        
                    </div>
                    </Col>
                  <Col classname="col-md-8">
                  

<div className="filter-container">
      <h2 style={{ color: 'white' }}>Results</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between'  }}>
        {data ? (
          data.map((json) => (
            <Card sx={{ maxWidth: 345 }} key={json._id} style={{ margin: '1rem 0', flex: '0 0 calc(33.33% - 2rem)' }}>
              <CardMedia
                component="img"
                height="140"
                image="https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2948&q=80"
                alt="Contemplative Reptile"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {json.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {json.city}, {json.state}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {json.venueName}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Book now</Button>
              </CardActions>
            </Card>
          ))
        ) : (
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        )}
      </div>
    </div>


                  </Col>
                  <Col className="col-md-2"></Col>
                  </Row>)}
      
      {eventCheck && (


                            <Row>
                            <Col className="col-md-2">
                            <div className="sidebar-container">
                              <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>   

                              <h5 className="search-h4">Filter by type</h5>
                        <select id="dropdown" value={typeFilter} onChange={(event) => setfilterType(event.target.value)}>
                                                  <option defaultValue="Events">Events</option>
                                                  <option value="Venues">Venues</option>
                                                  <option value="Players">Players</option>
                        </select>

                                <div class="checkbox-container" style={{ display: 'flex', flexDirection: 'column' }}>
                                  <h5 className="search-h4">Filter by Activity type</h5>
                                  <label class="checkbox-label">
                                    <input type="checkbox" value="tennis" onChange={(event) => setactivitynameFilters(event)} />
                                      <span class="checkmark">Tennis</span>
                                  </label>
                                  <label class="checkbox-label">
                                    <input type="checkbox" value="badminton" onChange={(event) => setactivitynameFilters(event)} />
                                        <span class="checkmark">Badminton</span>
                                  </label>
                                  <label class="checkbox-label">
                                    <input type="checkbox" value="football" onChange={(event) => setactivitynameFilters(event)} />
                                      <span class="checkmark">Football</span>
                                  </label>
                                  <label class="checkbox-label">
                                    <input type="checkbox" value="basketball" onChange={(event) => setactivitynameFilters(event)} />
                                      <span class="checkmark">Basketball </span>
                                  </label>
                                  <label class="checkbox-label">
                                    <input type="checkbox" value="table tennis" onChange={(event) => setactivitynameFilters(event)} />
                                      <span class="checkmark">Table Tennis </span>
                                  </label>
                                  <label class="checkbox-label">
                                    <input type="checkbox" value="volleyball" onChange={(event) => setactivitynameFilters(event)} />
                                      <span class="checkmark">Volleyball </span>
                                  </label>
                                  <label class="checkbox-label">
                                    <input type="checkbox" value="squash" onChange={(event) => setactivitynameFilters(event)} />
                                      <span class="checkmark">Squash</span> 
                                  </label>
                                  <label class="checkbox-label">
                                    <input type="checkbox" value="other" onChange={(event) => setactivitynameFilters(event)} />
                                      <span class="checkmark">other</span> 
                                  </label>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <h5 className="search-h4">Filter by Age Range</h5>
                                  <label class="checkbox-label">
                                    <input type="checkbox" value="all" onChange={(event) => setagerangeFilters(event)} />
                                    <span class="checkmark">all </span>
                                  </label>
                                  <label class="checkbox-label">
                                    <input type="checkbox" value="under 18" onChange={(event) => setagerangeFilters(event)} />
                                    <span class="checkmark">under 18</span>
                                  </label>
                                  <label class="checkbox-label">
                                    <input type="checkbox" value="18 and above" onChange={(event) => setagerangeFilters(event)} />
                                    <span class="checkmark">18 and above </span>
                                  </label>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <h5 className="search-h4">Filter by cost</h5>
                                  <label class="checkbox-label">
                                    <input type="checkbox" value="paid" onChange={(event) => setcostFilters(event)} />
                                    <span class="checkmark">Paid</span>
                                  </label>
                                  <label class="checkbox-label">
                                    <input type="checkbox" value="free" onChange={(event) => setcostFilters(event)} />
                                    <span class="checkmark">Free</span>
                                  </label>
                                </div> 
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <h5 className="search-h4">Filter by City</h5>
                                <label class="checkbox-label">
                                    <input type="checkbox" value="bloomington" onChange={(event) => setcityFilters(event)} />
                                    <span class="checkmark">Bloomington </span>
                                  </label>
                                  <label class="checkbox-label">
                                    <input type="checkbox" value="anderson" onChange={(event) => setcityFilters(event)} />
                                    <span class="checkmark">Anderson </span>
                                  </label>
                                  <label class="checkbox-label">
                                    <input type="checkbox" value="greenwood" onChange={(event) => setcityFilters(event)} />
                                    <span class="checkmark">Greenwood </span>
                                  </label>
                                  <label class="checkbox-label">
                                    <input type="checkbox" value="indianapolis" onChange={(event) => setcityFilters(event)} />
                                    <span class="checkmark">Indianapolis </span>
                                  </label>
                                  <label class="checkbox-label">
                                    <input type="checkbox" value="chicago" onChange={(event) => setcityFilters(event)} />
                                    <span class="checkmark">Chicago</span>
                                  </label>
                                  <label class="checkbox-label">
                                    <input type="checkbox" value="springfield" onChange={(event) => setcityFilters(event)} />
                                    <span class="checkmark">Springfield</span>
                                  </label>
                                  <label class="checkbox-label">
                                    <input type="checkbox" value="champaign" onChange={(event) => setcityFilters(event)} />
                                    <span class="checkmark">Champaign </span>
                                  </label>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <h5 className="search-h4">Filter by State</h5>
                                <label class="checkbox-label">
                                    <input type="checkbox" value="indiana" onChange={(event) => setstateFilters(event)} />
                                    <span class="checkmark">Indiana </span>
                                  </label>
                                  <label class="checkbox-label">
                                    <input type="checkbox" value="illinois" onChange={(event) => setstateFilters(event)} />
                                    <span class="checkmark">Illinois </span>
                                  </label>
                                </div>        
                              </div>        
                            </div>
                            </Col>
                            <Col classname="col-md-8">

                            <div className="filter-container">
                            <h2 style={{color:'white'}}>Results</h2>
                              <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between'  }}>
                                  {data ? (
                                    data.map((json) => (
                                    
                                      <Card sx={{ maxWidth: 345 }} key={json._id} style={{ margin: '1rem 0', flex: '0 0 calc(33.33% - 2rem)' }}>
                                      <CardMedia
                                          component="img"
                                          height="140"
                                          image="https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2948&q=80"
                                          alt="Contemplative Reptile"
                                        />
                                      <CardContent>
                                          <Typography gutterBottom variant="h5" component="div">
                                            {json.name}
                                          </Typography>
                                          <Typography gutterBottom variant="h5" component="div">
                                            {json.age_range}
                                          </Typography>
                                          <Typography gutterBottom variant="h5" component="div">
                                            {json.city}
                                          </Typography>
                                          <Typography gutterBottom variant="h5" component="div">
                                            {json.state}
                                          </Typography>
                                          <Typography gutterBottom variant="h5" component="div">
                                            {json.cost}
                                          </Typography>
                                    </CardContent>
                                    <CardActions>
                                      <Button size="small">Book now</Button>
                                    </CardActions>
                                    </Card>
                                  ))
                                  ) : (
                                  <Spinner animation="border" role="status">
                                      <span className="visually-hidden">Loading...</span>
                                  </Spinner>
                                  )}
                                </div>
                                </div>
                                
                                            

                            </Col>
                            <Col className="col-md-2"></Col>
                            </Row>


      ) 
      
    }
                              
    {playerCheck &&(


                        <Row>
                        <Col className="col-md-2">
                        <div className="sidebar-container">
                          <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>   
                            <div class="checkbox-container" style={{ display: 'flex', flexDirection: 'column' }}>

                            <h5 className="search-h4">Filter by type</h5>
                        <select id="dropdown" value={typeFilter} onChange={(event) => setfilterType(event.target.value)}>
                                                  <option value="Events">Events</option>
                                                  <option value="Venues">Venues</option>
                                                  <option value="Players">Players</option>
                        </select>



                              <h5 className="search-h4">Filter by Interested Activity</h5>
                              <label class="checkbox-label">
                                <input type="checkbox" value="tennis" onChange={(event) => setinterestFilters(event)} />
                                  <span class="checkmark">Tennis</span>
                              </label>
                              <label class="checkbox-label">
                                <input type="checkbox" value="badminton" onChange={(event) => setinterestFilters(event)} />
                                    <span class="checkmark">Badminton</span>
                              </label>
                              <label class="checkbox-label">
                                <input type="checkbox" value="football" onChange={(event) => setinterestFilters(event)} />
                                  <span class="checkmark">Football</span>
                              </label>
                              <label class="checkbox-label">
                                <input type="checkbox" value="basketball" onChange={(event) => setinterestFilters(event)} />
                                  <span class="checkmark">Basketball </span>
                              </label>
                              <label class="checkbox-label">
                                <input type="checkbox" value="table tennis" onChange={(event) => setinterestFilters(event)} />
                                  <span class="checkmark">Table Tennis </span>
                              </label>
                              <label class="checkbox-label">
                                <input type="checkbox" value="volleyball" onChange={(event) => setinterestFilters(event)} />
                                  <span class="checkmark">Volleyball </span>
                              </label>
                              <label class="checkbox-label">
                                <input type="checkbox" value="squash" onChange={(event) => setinterestFilters(event)} />
                                  <span class="checkmark">Squash</span> 
                              </label>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <h5 className="search-h4">Filter by Age Range</h5>
                              <label class="checkbox-label">
                                <input type="checkbox" value="all" onChange={(event) => setagerangeFilters(event)} />
                                <span class="checkmark">all </span>
                              </label>
                              <label class="checkbox-label">
                                <input type="checkbox" value="under 18" onChange={(event) => setagerangeFilters(event)} />
                                <span class="checkmark">under 18 </span>
                              </label>
                              <label class="checkbox-label">
                                <input type="checkbox" value="18 and above" onChange={(event) => setagerangeFilters(event)} />
                                <span class="checkmark">18 and above </span>
                              </label>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <h5 className="search-h4">Filter by Gender</h5>
                              <label class="checkbox-label">
                                <input type="checkbox" value="male" onChange={(event) => setgenderFilters(event)} />
                                <span class="checkmark">Male</span>
                              </label>
                              <label class="checkbox-label">
                                <input type="checkbox" value="female" onChange={(event) => setgenderFilters(event)} />
                                <span class="checkmark">Female</span>
                              </label>
                            </div> 
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <h5 className="search-h4">Filter by Skill Level</h5>
                              <label class="checkbox-label">
                                <input type="checkbox" value="beginner" onChange={(event) => setskilllevelFilters(event)} />
                                <span class="checkmark">Beginner</span>
                              </label>
                              <label class="checkbox-label">
                                <input type="checkbox" value="intermediate" onChange={(event) => setskilllevelFilters(event)} />
                                <span class="checkmark">Intermediate</span>
                              </label>
                              <label class="checkbox-label">
                                <input type="checkbox" value="expert" onChange={(event) => setskilllevelFilters(event)} />
                                <span class="checkmark">Expert</span>
                              </label>
                            </div>        
                          </div>        
                        </div>
                        </Col>
                        <Col classname="col-md-8">
                        <div className="filter-container">
                        <h2 style={{color:'white'}}>Results</h2>
                        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between'  }}>
                        {data ? (
                                data.map((json) => (
                        <Card sx={{ maxWidth: 345 }} key={json._id} style={{ margin: '1rem 0', flex: '0 0 calc(33.33% - 2rem)' }}>
                                      <CardMedia
                                          component="img"
                                          height="140"
                                          image="https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2948&q=80"
                                          alt="Contemplative Reptile"
                                        />
                                      <CardContent>
                                          <Typography gutterBottom variant="h5" component="div">
                                          {json.firstname} {json.lastname}
                                          </Typography>
                                          <Typography gutterBottom variant="h5" component="div">
                                          {json.age}
                                          </Typography>
                                          <Typography gutterBottom variant="h5" component="div">
                                          {json.sports}
                                          </Typography>
                                          <Typography gutterBottom variant="h5" component="div">
                                          {json.skill_level}
                                          </Typography>
                                          <Typography gutterBottom variant="h5" component="div">
                                          {json.gender}
                                          </Typography>
                                          </CardContent>
                                    <CardActions>
                                      <Button size="small" onClick={()=>handleCreateChat(json.email)}>Message</Button>
                                    </CardActions>
                                    </Card>
                                    ))
                                  ) : (
                                  <Spinner animation="border" role="status">
                                      <span className="visually-hidden">Loading...</span>
                                  </Spinner>
                                  )}
                        </div>
                        </div>
                        
                        </Col>
                        <Col className="col-md-2"></Col>
                        </Row>

    )

    }  

    </div>
  </div>
  );
}

export default App;
