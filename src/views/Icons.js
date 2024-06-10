
import React, { useEffect, useState } from "react";

// reactstrap components
import { Card, CardHeader, CardBody, CardTitle, Row, Col, CardText, CardImg } from "reactstrap";
import Button from 'react-bootstrap/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import logo from "assets/img/image.png";
import Edit from "./Edit";
import Form from 'react-bootstrap/Form';
import { addprductAPI } from "services/allAPI";
import { allproductAPI } from "services/allAPI";


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: 3, // Example value, adjust as needed
  boxShadow: 24,
  p: 4,
};

 


function Icons() {

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [preview,setpreview]=useState("")


  const [product,setProduct]=useState({

productname:"",
description:"",
image:""


  })

  useEffect(()=>{
    if(product.image)
    {(setpreview(URL.createObjectURL(product.image)))}
    else{
      setpreview("")
    }
  },[product.image])


  console.log(preview);

  console.log(product);



  // add product
  const handleadd=async(e)=>{
    e.preventDefault()
  
    const {productname,description,image}=product
  
    if(!productname || !description || !image){
      alert('please fill the form completely')
    }
    else{
      // reqbody
      // 1)create object for formdata--since we  have uploaded the content--new method is used to create a object
      const reqbody=new FormData()
      // 2)add data to formdata-append()
      reqbody.append("productname",productname)
      reqbody.append("description",description)
      reqbody.append("image",image)
  
        const reqheader={
          "Content-Type":"multipart/form-data",
         
  
        }


       
  
      
  
  
  
  
  
  
  
      const result=await addprductAPI(reqbody,reqheader)
      console.log(result);
      if(result.status===200){
  
        console.log(result.data);
        alert('product added succesfully')
        handleClose()
        //  setaddprojectresponse(result.data)
      }
      else{
        alert(result.response.data);
      }
    
  
    }
  
    
  
  
      }

      const [useproject,setuserproject]=useState([])



       // get products
       const getproducts=async()=>{
         
        const reqheader={
            "Content-Type":"application/json",
          
        }
        const result=await allproductAPI (reqheader)
        console.log(result.data);
         setuserproject(result.data)


    }
    useEffect(()=>{
        getproducts()
    },[])

  

  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card className="demo-icons">
              <CardHeader>
                <h2 style={{textAlign:'center'}}>Products</h2>
<div className="container">
                  <Button onClick={handleOpen} className="mb-5"   style={{float:'right'}}>Add</Button>
  
</div>
              </CardHeader>
              <CardBody className="all-icons">
              <div className="container">
                <div className='row'>
                <div className='col-12 col-md-6 col-lg-4 mb-4'>
  
  
                <Card>
      <CardImg
        alt="Card image cap"
        src="https://dummyimage.com/600x400/000/fff"
        top
        width="100%"
      />
      <CardBody>
        <CardTitle tag="h5">
          Card title
        </CardTitle>
       
        
       <Edit/>
      </CardBody>
    </Card>
    </div>
  
    <div className='col-12 col-md-6 col-lg-4 mb-4'>
  
  
  <Card>
  <CardImg
  alt="Card image cap"
  src="https://dummyimage.com/600x400/000/fff"
  top
  width="100%"
  />
  <CardBody>
  <CardTitle tag="h5">
  Card title
  </CardTitle>
  
  <Button>
        <i  class="fa-solid fa-pen-to-square"></i> Edit
        </Button>
  </CardBody>
  </Card>
  </div>
  
  <div className='col-12 col-md-6 col-lg-4 mb-4'>
  
  
  <Card>
  <CardImg
  alt="Card image cap"
  src="https://dummyimage.com/600x400/000/fff"
  top
  width="100%"
  />
  <CardBody>
  <CardTitle tag="h5">
  Card title
  </CardTitle>
  
  
  <Button>
        <i  class="fa-solid fa-pen-to-square"></i> Edit
        </Button>
  </CardBody>
  </Card>
  </div>
  <div className='col-12 col-md-6 col-lg-4 mb-4'>
  
  
  <Card>
  <CardImg
  alt="Card image cap"
  src="https://dummyimage.com/600x400/000/fff"
  top
  width="200px"
  />
  <CardBody>
  <CardTitle tag="h5">
  Card title
  </CardTitle>
  
  
  <Button>
        <i  class="fa-solid fa-pen-to-square"></i> Edit
        </Button>
  </CardBody>
  </Card>
  </div>
    </div>
          </div>

                            </CardBody>
            </Card>
          </Col>
        </Row>

        <div>
     
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <h3 className="mb-5" style={{textAlign:'center'}}>Add Products</h3>
<center>
  
            <label htmlFor="imag">
         <input id='imag' type="file" style={{display:'none'}}  onChange={(e)=>setProduct({...product,image:e.target.files[0]})}  />
  <img className='' src={preview?preview:logo} alt=""  width={'160px'} height={'160px'} /></label>
  
</center>
{/* </div> */}



<br />

       

      {/* <div className='col-7 ms-3'> */}
           
                    <div className='mb-3 w-100'>
                    <Form.Control type="text" placeholder="Enter your pet name" value={product.productname} onChange={(e)=>setProduct({...product,productname:e.target.value})} />

                    </div>
                    <div className='mb-3 w-100'>
                    <Form.Control type="text" placeholder="Enter description" value={product.description} onChange={(e)=>setProduct({...product,description:e.target.value})} />

                    </div>
                  
                   
        <center>
            <Button onClick={handleadd} >
           Add
          </Button>
        </center>
         
        </Box>
      </Modal>
    </div>
      </div>
    </>
  );
}

export default Icons;
