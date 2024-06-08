import React from 'react'

import  { useContext, useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
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



function Login() {
  return (
    <div>


 {/* <div className='imgg scroll-container '>
       <div className='d-flex justify-content-center align-items-center' style={{width:'100%',height:'100vh'}}>
        
        <div className='w-75 container' >
            <Row >
                <Col  data-aos="fade-right" md={6} sm={12} className='me-5'>
                <img  className='mt-5 ' src="https://images.pexels.com/photos/2965260/pexels-photo-2965260.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" width={'110%'}  />

                </Col>
                <Col  data-aos="fade-left" className='ms-5'>
                <h1  style={{color:'#FFD700'}} className='ms-5'>Login</h1>
                <h5 className='ms-5 mt-4'>{
                   
                    }</h5>
                    <br />
                    <br />
                  
                    <Form>
                               
                                  
                                    <Form.Group className='mt-5' controlId="validationFormik01">
                                    <Form.Control style={{borderRadius:'10px'}} type="text" placeholder='Enter Yourname' /> 
                                    </Form.Group>
                                
                            <Form.Group className='mt-3' controlId="validationFormik01">
                            <Form.Control style={{borderRadius:'10px'}} type="email" placeholder='Enter Your Email'   />
                            </Form.Group>
                            <Form.Group className='mt-3' controlId="validationFormik01">
                            <Form.Control style={{borderRadius:'10px'}} type="text" placeholder='Enter Your Password'  />
                            </Form.Group>
                           
                                <div className='d-flex align-items-center flex-column mt-4'>
                                    <button   style={{borderRadius:'10px',backgroundColor:'FFD400'}} className='btn btn-dark'>Login</button>

                                </div>
                               
                            

                            </Form>
                            

                
                </Col>
            </Row>
        </div>
       
         
    </div>
    </div>  */}

    
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
                <img  className='mt-5 ' src="https://images.pexels.com/photos/2965260/pexels-photo-2965260.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" width={'110%'}  />

                </Col>
                <Col  data-aos="fade-left" className='ms-5'>
                <h5 className='ms-5 mt-4'>{
                   
                    }</h5>
                    <br />
                    <br />
                  
                    <Form>
                               
                                  
                                    <Form.Group className='mt-5' controlId="validationFormik01">
                                    <Form.Control style={{borderRadius:'10px'}} type="text" placeholder='Enter Yourname' /> 
                                    </Form.Group>
                                
                            <Form.Group className='mt-3' controlId="validationFormik01">
                            <Form.Control style={{borderRadius:'10px'}} type="email" placeholder='Enter Your Email'   />
                            </Form.Group>
                            <Form.Group className='mt-3' controlId="validationFormik01">
                            <Form.Control style={{borderRadius:'10px'}} type="text" placeholder='Enter Your Password'  />
                            </Form.Group>
                           
                                <div className='d-flex align-items-center flex-column mt-4'>
                                    <button   style={{borderRadius:'10px',backgroundColor:'FFD400'}} className='btn btn-dark'>Login</button>

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