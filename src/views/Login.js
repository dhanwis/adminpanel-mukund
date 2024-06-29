import React from 'react'

import  { useContext, useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from 'react-router-dom';
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    CardTitle,
    FormGroup,
   
    Input,
   
  } from "reactstrap";

  import giff from "assets/img/login-animate.gif";
import { loginAPI } from 'services/allAPI';
import { isauthtokencontext } from 'components/context/ContextShareeee';




function Login() {

  const [userData,setUserData]=useState({
username:"",
password:""


  })

  console.log(userData);


  const {authtoken,setauthtoken}=useContext(isauthtokencontext)


  const navigate=useNavigate()


  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async (e) => {
      e.preventDefault();
      const { username, password } = userData;
      if (!username || !password) {
          setErrorMessage('Please fill the form completely');
      } else {
          try {
              const result = await loginAPI(userData);
              console.log(result);
              if (result.status === 200) {
                setauthtoken(true)
                  sessionStorage.setItem('existinguser', JSON.stringify(result.data.existinguser));
                  sessionStorage.setItem('token', result.data.token);
                  setUserData({
                      username: '',
                      password: ''
                    
                  });
                  navigate('/admin/dashboard');
              } else {
                  setErrorMessage(result.response.data);
              }
          } catch (error) {
              console.error('Error:', error);
              setErrorMessage('An error occurred. Please try again later.');
          }
      }
  };

  return (
    <div>



    
    <br/>
    <br/>
    <br/>
    
<div className='container'>
   <br/>
  


   <div className='row'>

    <div className='col-1'></div>
    <div className='col-10'>
      <br/>
      <br/>
      <Card className="card-user" style={{ backgroundColor: 'white', borderColor: 'rgb(104, 60, 184)', borderWidth: '2px', borderStyle: 'solid' }}>
            <CardBody>
                <div className='row'>
                    <Col data-aos="fade-right" md={6} sm={12} className='me-5'>
                        <img src={giff} height={'100%'} alt="image" />
                    </Col>
                    <Col data-aos="fade-left" className='ms-5'>
                        <h2 style={{ fontWeight: '500' }}>Login</h2>
                        <h5 className='ms-5 mt-4'></h5>
                        <br />
                        <br />
                        <Form>
                            <Form.Group className='mt-5' controlId="validationFormik01">
                                <Form.Control 
                                    style={{ borderRadius: '10px' }} 
                                    type="text" 
                                    placeholder='Enter Yourname' 
                                    value={userData.username} 
                                    onChange={(e) => setUserData({ ...userData, username: e.target.value })} 
                                />
                            </Form.Group>
                            <Form.Group className='mt-3' controlId="validationFormik02">
                                <Form.Control 
                                    style={{ borderRadius: '10px' }} 
                                    type="password" 
                                    placeholder='Enter Your Password' 
                                    value={userData.password} 
                                    onChange={(e) => setUserData({ ...userData, password: e.target.value })} 
                                />
                            </Form.Group>
                            {errorMessage && <div style={{ color: 'red' }} className="error">{errorMessage}</div>}
                            <div className='d-flex align-items-center flex-column mt-4'>
                                <button 
                                    onClick={handleLogin} 
                                    style={{ borderRadius: '10px', backgroundColor: 'rgb(104, 60, 184)' }} 
                                    className='btn btn-dark'
                                >
                                    Login
                                </button>
                            </div>
                        </Form>
                    </Col>
                </div>
            </CardBody>
        </Card>
                    </div>
                    <div className='col-1'></div>
   </div>
</div>


    </div>
  )
}

export default Login