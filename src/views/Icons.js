import React, { useContext, useEffect, useState } from "react";
import { Card, CardHeader, CardBody, CardTitle, Row, Col, CardText, CardImg } from "reactstrap";
import Button from 'react-bootstrap/Button';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import logo from "assets/img/image.png";
import Edit from "./Edit";
import Form from 'react-bootstrap/Form';
import { addprductAPI, allproductAPI } from "services/allAPI";
import { BASE_URL } from "services/baseurl";
import { addprojectresponsecontext } from "components/context/ContextShareeee";
import { editprojectresponsecontext } from "components/context/ContextShareeee";
import Swal from "sweetalert2";
import nodata from "assets/img/no-data2.1.gif";
import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';

// Register the plugins
registerPlugin(FilePondPluginImagePreview, FilePondPluginImageExifOrientation);



const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: 3,
  boxShadow: 24,
  p: 4,
};

function Icons() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [preview, setPreview] = useState("");
  const { addprojectresponse, setaddprojectresponse } = useContext(addprojectresponsecontext);
  const {editprojectresponse,seteditprojectresponse}=useContext(editprojectresponsecontext)
  const [product, setProduct] = useState({
    productname: "",
    description: "",
    image: []
  });
  console.log(product);


  const [getProduct, setgetProduct] = useState([]);

  useEffect(() => {
    if (product.image) {
      setPreview(URL.createObjectURL(product.image));
    } else {
      setPreview("");
    }
  }, [product.image]);

  useEffect(() => {
    getProducts();
  }, [addprojectresponse,editprojectresponse]);

  const getProducts = async () => {
    const reqheader = {
      "Content-Type": "application/json",
    };
    const result = await allproductAPI(reqheader);
    setgetProduct(result.data);
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    const { productname, description, image } = product;
  
    if (!productname || !description || !image) {
      alert('Please fill the form completely');
    } else {
      // Check the file type of the image
      const validImageTypes = ['image/jpeg', 'image/png', 'image/jpg'];
      if (!validImageTypes.includes(image.type)) {
        alert('Please upload an image file (png, jpg, jpeg)');
        return;
      }
  
      // Check the file size of the image (2MB = 2 * 1024 * 1024 bytes)
      const maxSizeInBytes = 2 * 1024 * 1024;
      if (image.size > maxSizeInBytes) {
        alert('Please upload an image file smaller than 2MB');
        return;
      }
  
      const reqbody = new FormData();
      reqbody.append("productname", productname);
      reqbody.append("description", description);
      reqbody.append("image", image);
  
      const reqheader = {
        "Content-Type": "multipart/form-data",
      };
  
      const result = await addprductAPI(reqbody, reqheader);
      if (result.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Product added Successfully',
          showClass: {
            popup: 'animate__animated animate__fadeInDown'
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
          }
        });
        handleClose();
        setaddprojectresponse(result.data);
      } else {
        alert(result.response.data);
      }
  
      setProduct({
        productname: "",
        description: "",
        image: ""
      });
    }
  };


  const handleFilePondUpdate = (fileItems) => {
    // Set currently active file objects to state
    setProduct({
      ...product,
      image: fileItems.map(fileItem => fileItem.file) // Store file objects in the state
    });
  };
  
  
  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card className="demo-icons" >   
              <CardHeader>
                <h2 style={{ textAlign: 'center' }}>Products</h2>
                <div className="container">
                  <Button onClick={handleOpen} className="mb-5" style={{ float: 'right' }}>Add</Button>
                </div>
              </CardHeader>
              <CardBody className="all-icons">
                <div className="container">
                <div className="row">
  {getProduct && getProduct.length > 0 ? getProduct.map((item) => (
    <div className="col-12 col-sm-6 col-md-4 col-lg-4 mb-4" key={item.id}>
      <Card style={{ width: '100%', border: '1px solid rgb(52, 181, 184)', borderRadius: '10px', overflow: 'hidden' }}>
        <CardImg
          alt="image"
          src={`${BASE_URL}/uploads/${item.image}`}
          top
          style={{ height: '200px', width: '100%' }}
        />
        <CardBody>
          <CardTitle tag="h5">
            {item.productname}
          </CardTitle>
          <CardText style={{ width: '100%', height: '11rem', whiteSpace: 'pre-wrap' }}>
            {item.description}
          </CardText>
          <Edit pass={item} />
        </CardBody>
      </Card>
    </div>
  )) : (
    <div className="col-12 d-flex flex-column align-items-center">
      <img className="mb-5" style={{ width: '35%' }} src={nodata} alt="Description of the image" />
      <h4 className="mb-5" style={{ color: '#d22127', textAlign: 'center' }}>No products found!</h4>
    </div>
  )}
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
              <h3 className="mb-5" style={{ textAlign: 'center' }}>Add Products</h3>
              
              {/* <center>
                <label htmlFor="imag">
                  <input id='imag' type="file" style={{ display: 'none' }} onChange={(e) => setProduct({ ...product, image: e.target.files[0] })} />
                  <img src={preview ? preview : logo} alt="" width={'160px'} height={'160px'} />
                </label>
              </center> */}
               <div className="App">
               <FilePond
        allowMultiple={true}
        maxFiles={5}
        name="images"
        labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
        onupdatefiles={handleFilePondUpdate}
      />
    </div>
              <br />
              <div className='mb-3 w-100'>
                <Form.Control type="text" placeholder="Enter product name"  value={product.productname} onChange={(e) => setProduct({ ...product, productname: e.target.value })}  maxLength={25}/>
              </div>
              <div className='mb-3 w-100'>
  <Form.Control 
    as="textarea" 
    rows={3} 
    style={{ padding: '20px' }} 
    placeholder="Enter description" 
    value={product.description} 
    onChange={(e) => {
      const inputValue = e.target.value;
      if (inputValue.length <= 250) {
        setProduct({
          ...product,
          description: inputValue,
        });
      } else {
        // Truncate the input to 250 characters
        setProduct({
          ...product,
          description: inputValue.substring(0, 250),
        });
      }
    }} 
  />
</div>
              <center>
                <Button onClick={handleAdd}>
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




