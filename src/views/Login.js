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




function Login() {

  const [userData,setuserData]=useState({
username:"",
password:""


  })

  console.log(userData);

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
                  sessionStorage.setItem('existinguser', JSON.stringify(result.data.existinguser));
                  sessionStorage.setItem('token', result.data.token);
                  setuserData({
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
        <Card className="card-user">
                      <CardHeader>
                        {/* <CardTitle tag="h5">Edit Profile</CardTitle> */}
                      </CardHeader>
                      <CardBody>

                        <div className='row'>

                        <Col  data-aos="fade-right" md={6} sm={12} className='me-5'>
                <img  className='mt-5 ' src={giff} alt="" width={'110%'}  />

                </Col>
                <Col  data-aos="fade-left" className='ms-5'>
                <h2 style={{fontWeight:'500'}}>Login</h2>
                <h5 className='ms-5 mt-4'>{
                   
                    }</h5>
                    <br />
                    <br />
                  
                    <Form>
                               
                                  
                                    <Form.Group className='mt-5' controlId="validationFormik01">
                                    <Form.Control style={{borderRadius:'10px'}} type="text" placeholder='Enter Yourname' value={userData.username} onChange={(e)=>setuserData({...userData,username:e.target.value})} /> 
                                    </Form.Group>
                                
                           
                            <Form.Group className='mt-3' controlId="validationFormik01">
                            <Form.Control style={{borderRadius:'10px'}} type="text" placeholder='Enter Your Password'  value={userData.password} onChange={(e)=>setuserData({...userData,password:e.target.value})}  />
                            </Form.Group>
                            {errorMessage && <div style={{color:'red'}} className="error">{errorMessage}</div>}
                           
                                <div className='d-flex align-items-center flex-column mt-4'>
                                    <button onClick={handleLogin}   style={{borderRadius:'10px',backgroundColor:'FFD400'}} className='btn btn-dark'>Login</button>

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