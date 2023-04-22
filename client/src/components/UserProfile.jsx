import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams  } from 'react-router-dom';
import "./UserProfile.css"; 
import axios from 'axios';
import TopNav from './Navbar';
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";

function UserProfile () {

  const[data,setData]=useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [organizeEdit,setOrganizeEdit] = useState(false);

  const URL="http://localhost:3000/Profile";
  
  useEffect(()=>{
    axios.get("/profile_data")
      .then(response => {
        //console.log(response)
        setData(response.data);
      })
      .catch(error => {
        console.error(error);
      })},[URL]);
  
  

  console.log("->"+data);
  
  const [firstName,setFirstName] = useState("");
  const [lastName,setLastName] = useState("");

  const [age,setAge] = useState("");
  const [gender,setGender] = useState("");
  const [city,setCity] = useState("");
  const [state,setState] = useState("");
  const [skilllevel,setSkillLevel] = useState("");
  const [availability,setAvailability] = useState("");
  const [sports,setSports] = useState([]);
  const [jsonData, setJsonData] = useState({});
  const sports_name=["tennis","badminton","squash","football","basketball","table tennis","volleyball","other"];
  const [searchText, setSearchText] = useState('');
  

  function handleSaveUpdate(){
    
    axios.post('/update_user_details',jsonData)
    .then(response => {
      console.log(response.data);
    })
    .catch(error => {
      console.log(error);
    })
    .finally(() => {
      setIsEditing(false);
    });
  }

  function updateFirstName(event){
      setFirstName(event.target.value);
        setJsonData({
          ...jsonData,
          "firstname": event.target.value
        });
  }

  function updateLastName(event){
        setLastName(event.target.value);
        setJsonData({
          ...jsonData,
          "lastname": event.target.value
        });
  }

  function updateAge(event){
      setAge(event.target.value);
      setJsonData({
        ...jsonData,
        "age": event.target.value
      });
  }

  function updateGender(event){
      setGender(event.target.value);
      setJsonData({
        ...jsonData,
        "gender": event.target.value
      });
  }
    
  function updateCity(event){
      setCity(event.target.value);
      setJsonData({
        ...jsonData,
        "city": event.target.value
      });
  }
  
  function updateState(event){
      setState(event.target.value);
      setJsonData({
        ...jsonData,
        "state": event.target.value
      });
  }

  function updateSkillLevel(event){
      setSkillLevel(event.target.value);
      setJsonData({
        ...jsonData,
        "skill_level": event.target.value
      });
  }

  function updateAvailability(event){
      setAvailability(event.target.value);
      setJsonData({
        ...jsonData,
        "availability": event.target.value
      });
  }

  function updateSports(event){
      setSports(event.target.value);
      setJsonData({
        ...jsonData,
        "sports": event.target.value
      });
  }

  const handleSearchTextChange = (event) => {
    setSearchText(event.target.value);
  };

  let age_set="";
  let gender_set="";
  let city_set="";
  let state_set="";
  let skill_set="";
  let availability_set="";
  let sports_set="";

  if(data.hasOwnProperty("age")){
  
    age_set=data["age"];
  }

  if(data.hasOwnProperty("gender")){
    gender_set=data["gender"];
  }

  if(data.hasOwnProperty("city")){
    city_set=data["city"];
  }

  if(data.hasOwnProperty("state")){
    state_set=data["state"];
  }

  if(data.hasOwnProperty("skill_level")){
    skill_set=data["skill_level"];
  }

  if(data.hasOwnProperty("availability")){
    availability_set=data["availability"];
  }

  if(data.hasOwnProperty("sports")){
    sports_set=data["sports"];
  }

  function handleViewUsers(){

  }

  function HandleCancelEvent(id){

      axios.post('/cancel_event',{"_id":id})
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
      
      alert("event has been cancelled successfully");

  }

  const filteredSports = sports_name.filter((sport) =>
  sport.toLowerCase().includes(searchText.toLowerCase())
);
const handleAddFavoriteSport = (sport) => {
  if (sports.length < 3 && !sports.includes(sport)) {
    setSports([...sports, sport]);
    setJsonData({
      ...jsonData,
      "sports": sports
    });
  }
};

function handleDeleteSport(sportToRemove){
  const newSports = sports.filter((sport) => sport !== sportToRemove);
  setSports(newSports);
}


  return (
      
    <div className="profile-container"> 
     <TopNav/>
    
    <div className="user-profile-container">      
      <div className="profile-content">
        <div >
          <div className="user-picture">
            <img src="https://via.placeholder.com/150" alt="User" />            
            {isEditing ? (
              <input type="text" id="firstNameEdit" name="firstNameEdit" value={firstName} onChange={updateFirstName} />
            ) :(
            <h2>{data["firstname"]}</h2>
            )}
            {isEditing ? (
              <input type="text" id="lastName" name="lastName" value={lastName} disabled={!isEditing} onChange={updateLastName} />
            ) :(
            <h2>{data["lastname"]}</h2>
            )}
          </div>
        </div>      
         
      <div >
        <div className="user-basic-data">
          {/*<h2>Personal Details</h2>  */}          
          <div >
            <div >
              <p>Email:</p>
              <p>{data["email"]}</p>
              <p>Age: </p>
              {isEditing ? (
                <input type="text" id="age" name="age" value={age}  disabled={!isEditing} onChange={updateAge} />
              ) :(
              <p>{age_set}</p>
              )}
              <p>Gender:</p>
              {isEditing ? (
                <select id="dropdown" value={gender} onChange={updateGender}>
                <option value="">--Please choose an option--</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                </select>
              ) :(
              <p>{gender_set}</p>
              )}
              <p>City:</p>
              {isEditing ? (
                <input type="text" id="city" name="city" value={city}  disabled={!isEditing} onChange={updateCity} />
              ) :(
              <p>{city_set}</p>
              )}
              <p>State:</p>
              {isEditing ? (
                <input type="text" id="state" name="state" value={state}  disabled={!isEditing} onChange={updateState} />
              ) :(
              <p>{state_set}</p>
              )}
            </div>              
          </div>
        </div>
      </div> 
           
      <div >
        <div className="user-other-interests">
          {/*<h2>Other Details</h2>*/}
          <div>
            <div >
              <p>Skill level:</p>
                {isEditing ? (
                  <select id="dropdown" value={skilllevel} onChange={updateSkillLevel}>
                  <option value="">--Please choose an option--</option>
                  <option value="Basic">Basic</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                  </select>
                ) :(
                <p>{skill_set}</p>
                )}
              <p>Availability:</p>
                {isEditing ? (
                  <select id="dropdown" value={availability} onChange={updateAvailability}>
                  <option value="">--Please choose an option--</option>
                  <option value="Available any time">Available any time</option>
                  <option value="Not available">Not available</option>
                  </select>
                ) :(
              <p>{availability_set}</p>
              )}
              <p>Favourite Sports:</p>
                {isEditing ? (
                  <input value={searchText} onChange={handleSearchTextChange} disabled={sports.length >= 3}/>
                ) :(
              <p> {sports_set}</p>
              )}
                {isEditing ? (
                  searchText && (
                <ul>
                  {filteredSports.map((sport) => (
                    <li><button onClick={() => handleAddFavoriteSport(sport)}>{sport}</button></li>
                  ))}
                </ul>
                )
              ) : (
              <h2></h2>
              )}
                {isEditing ? (
                <ul>
                  {sports.map((sport) => (
                  <li key={sport}>
                    <button onClick={() => handleDeleteSport(sport)}>{sport}</button>
                  </li>
                ))}
                </ul>
              ) : (
              <h2></h2>
              )}
            </div>
          </div>
        </div>
      </div>
      </div> 
      <div>
        <div className="user-registered-events">
          <h3 style={{color:'black'}}>Events Organized by you</h3><br></br>
          {/*<h2>no events</h2>*/}
          {data?(
                  data["organized_events"].map((json) => (
                    <tr key={json._id}>
                      <td style={{color:'black',fontSize:'1rem'}}>{json.name}</td>
                      <td style={{color:'black',fontSize:'1rem'}}>{json.event_type}</td>
                      {/*<td style={{color:'black',fontSize:'1rem'}}>{json.description}</td>*/}
                      <td style={{color:'black',fontSize:'1rem'}}>{json.age_range}</td>
                      <td style={{color:'black',fontSize:'1rem'}}>{json.address}</td>
                      <td style={{color:'black',fontSize:'1rem'}}>{json.location}</td>
                      <td style={{color:'black',fontSize:'1rem'}}>{json.date}</td>
                      <td style={{color:'black',fontSize:'1rem'}}>{json.starttime}</td>
                      <td style={{color:'black',fontSize:'1rem'}}>{json.endtime}</td>
                      <td style={{color:'black',fontSize:'1rem'}}>{json.capacity}</td>
                      <td style={{color:'black',fontSize:'1rem'}}>{json.cost}</td>
                      {/*<td style={{color:'black',fontSize:'1rem'}}>{json.organizer}</td>*/}
                      <td><button style={{fontSize:'1rem'}} onClick={handleViewUsers}>View participants</button></td>
                      <td><button style={{fontSize:'1rem'}} onClick={() => HandleCancelEvent(json._id)}>Cancel event</button></td>
                      <td><button style={{fontSize:'1rem'}} onClick={() => setOrganizeEdit(true)}>Edit</button></td>
                      <td><button style={{fontSize:'1rem'}}>Chat with participants</button></td>
                    </tr> 
                                       
                  ))
                ):(console.log("error"))}
            <div>
              <div >
              </div>
            </div>
        </div>
      </div>
    <div>
    {isEditing ? (
          <button className='btn-uprofile' onClick={handleSaveUpdate}>Save Update</button>
        ) :(
          <button className='btn-uprofile' onClick={() => setIsEditing(true)}>Update</button>
        )}
    </div>
  </div>  
  </div>
);
  
  };

  export default UserProfile;