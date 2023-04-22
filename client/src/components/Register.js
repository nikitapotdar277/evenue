import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
//import FlashMessage from 'react-flash-message';
import ReCAPTCHA from 'react-google-recaptcha';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import Alert from 'react-bootstrap/Alert'
import axios from "axios";

import {
	TextField,
	InputAdornment,
	IconButton,
	OutlinedInput,
	FormControl,
	InputLabel,
	FormHelperText,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

function Register() {
  const navigate = useNavigate();
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  //const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  //const [registerError,setRegisterError] = useState(null);
  const [phone, setPhoneNumber] = useState('');
  const [usertype, setUsertype] = useState('1');
  const [captchaValue, setCaptchaValue] = useState(null);
  const [type, setType] = useState("success");
  const [message, setMessage] = useState("");
  const [show, setShow] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const organize=[]
  const events_booked=[]
  const venues_booked=[]

  let hasSixChar = password.length >= 6;
	let hasLowerChar = /(.*[a-z].*)/.test(password);
	let hasUpperChar = /(.*[A-Z].*)/.test(password);
	let hasNumber = /(.*[0-9].*)/.test(password);
	let hasSpecialChar = /(.*[^a-zA-Z0-9].*)/.test(password);
  let phoneNumberCheck = /^(\(\d{3}\) \d{3}\-\d{4}|\d{3}\-\d{3}\-\d{4}|\d{10})$/.test(phone);
  let emailCheck = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);

  const radios = [
    { name: 'User', value: '1' },
    { name: 'Venue Owner', value: '2' },
  ];

  function handleCaptchaChange(value) {
    setCaptchaValue(value);
    console.log(captchaValue)
  }
  
  function handleRegister(event) {
    event.preventDefault();
    console.log("OKAY IM HERE")
    axios({
      method : "POST",
      url: '/register',
      data: {
        firstname: firstname,
        lastname: lastname,
        phone: phone,
        email: email,
        password: password,
        usertype: usertype,
        organized_events:organize,
        events_booked:events_booked,
        venues_booked:venues_booked,
        withCredentials: true
      }
    })
    .then((response) => {
      const res = response.data
      setMessage(res.message)
      setShow(true)
      if(res.message === "Registration successful"){
        setType("success")
      }
      if(res.message === "User already exists"){
        setType("warning")
      }
      console.log(res.message)
    })
    .catch((error) => {
      console.log(error.response)
    })
  }

return (
  <Card>
    {show && type && message && 
      <div>
        <Alert variant={type} onClose={() => {setShow(false); setType("")}} dismissible>
          {message}
        </Alert>
      </div>
      }    
        <Card.Header>
          <Nav variant="tabs" defaultActiveKey="#first">
            <Nav.Item>
            <Nav.Link style={{color: 'black'}} onClick={() => navigate('/Login')}>Login</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link style={{color: 'black'}} onClick={() => navigate('/Register')}>SignUp</Nav.Link>
            </Nav.Item>
          </Nav>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={handleRegister}>
          <Form.Group className="mb-3" controlId="firstname">
        <Form.Label>First Name</Form.Label>
        <Form.Control type="firstname" name='firstname' placeholder="Enter first name" value={firstname} onChange={(event) => setFirstname(event.target.value)} required />
        <Form.Text className="text-muted">
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" controlId="lastname">
        <Form.Label>Last Name</Form.Label>
        <Form.Control type="lastname" name='lastname' placeholder="Enter last name" value={lastname} onChange={(event) => setLastname(event.target.value)} required />
        <Form.Text className="text-muted">
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" name='email' placeholder="Enter email" value={email} onChange={(event) => setEmail(event.target.value)} required />
        <Form.Text className="text-muted">
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" name='password' placeholder="Password" value={password} onChange={(event) => setPassword(event.target.value)} required 
        endAdornment={
          <InputAdornment>
            <IconButton
              edge="end"
              onClick={() =>
                setShowPassword(!showPassword)
              }
            >
              {showPassword ? (
                <VisibilityIcon />
              ) : (
                <VisibilityOffIcon />
              )}
            </IconButton>
          </InputAdornment>
        }
        />
        {password && (
					<div className="ml-1" style={{ columns: 2 }}>
						<div>
							{hasSixChar ? (
								<span className="text-success">
									<CheckCircleIcon
										className="mr-1"
										fontSize="small"
									/>
									<small>at least 6 characters</small>
								</span>
							) : (
								<span className="text-danger">
									<CancelIcon
										className="mr-1"
										fontSize="small"
									/>
									<small>at least 6 characters</small>
								</span>
							)}
						</div>
						<div>
							{hasLowerChar ? (
								<span className="text-success">
									<CheckCircleIcon
										className="mr-1"
										fontSize="small"
									/>
									<small>one lowercase</small>
								</span>
							) : (
								<span className="text-danger">
									<CancelIcon
										className="mr-1"
										fontSize="small"
									/>
									<small>one lowercase</small>
								</span>
							)}
						</div>
						<div>
							{hasUpperChar ? (
								<span className="text-success">
									<CheckCircleIcon
										className="mr-1"
										fontSize="small"
									/>
									<small>one uppercase</small>
								</span>
							) : (
								<span className="text-danger">
									<CancelIcon
										className="mr-1"
										fontSize="small"
									/>
									<small>one uppercase</small>
								</span>
							)}
						</div>
						<div>
							{hasNumber ? (
								<span className="text-success">
									<CheckCircleIcon
										className="mr-1"
										fontSize="small"
									/>
									<small>one number</small>
								</span>
							) : (
								<span className="text-danger">
									<CancelIcon
										className="mr-1"
										fontSize="small"
									/>
									<small>one number</small>
								</span>
							)}
						</div>
						<div>
							{hasSpecialChar ? (
								<span className="text-success">
									<CheckCircleIcon
										className="mr-1"
										fontSize="small"
									/>
									<small>one special symbol</small>
								</span>
							) : (
								<span className="text-danger">
									<CancelIcon
										className="mr-1"
										fontSize="small"
									/>
									<small>one special symbol</small>
								</span>
							)}
						</div>
					</div>
				)}
      </Form.Group>
      <Form.Group className="mb-3" controlId="formConfirmPassword">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control type="password" value={confirmPassword} placeholder="Confirm Password" onChange={(event) => setConfirmPassword(event.target.value)} 
        required 
        />
        {password && confirmPassword && (
					<FormHelperText className="ml-1 mt-1">
						{password === confirmPassword ? (
							<span className="text-success">
								Password does match
							</span>
						) : (
							<span className="text-danger">
								Password does not match
							</span>
						)}
					</FormHelperText>
				)}
      </Form.Group>
      <Form.Group className="mb-3" controlId="formPhone">
        <Form.Label>Phone</Form.Label>
        <Form.Control type="tel" name='phone' value={phone} placeholder="Phone" onChange={(event) => setPhoneNumber(event.target.value)} required />
      </Form.Group>
      <ButtonGroup>
        
        {radios.map((radio, idx) => (
          <ToggleButton
            key={idx}
            id={`radio-${idx}`}
            type="radio"
            variant={idx % 2 ? '#ffbd59' : '#ffbd59'}
            name="radio"
            value={radio.value}
            checked={usertype === radio.value}
            onChange={(event) => setUsertype(event.target.value)}
          >
            {radio.name}
          </ToggleButton>
        ))}
      </ButtonGroup>
      <ReCAPTCHA onChange={handleCaptchaChange} sitekey="6LcyQo8kAAAAAI99slVWg8WGEjGFE7QneFvb-wew"></ReCAPTCHA>
      <Button style={{backgroundColor: '#ffbd59', color: 'black'}} type='submit' disabled={
						!firstname ||
            !lastname ||
						!email ||
						!password ||
						!confirmPassword ||
						password != confirmPassword ||
            !phone ||
            !phoneNumberCheck ||
						!hasSixChar ||
						!hasLowerChar ||
						!hasUpperChar ||
						!hasNumber ||
						!hasSpecialChar
					}>Register</Button>
      <p><Link to='/'>Home</Link> </p>

    </Form>
        </Card.Body>
      </Card>
    );
  }
  
  export default Register;