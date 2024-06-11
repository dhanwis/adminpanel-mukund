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
  const [product, setProduct] = useState({
    productname: "",
    description: "",
    image: ""
  });


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
  }, [addprojectresponse]);

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
      const reqbody = new FormData();
      reqbody.append("productname", productname);
      reqbody.append("description", description);
      reqbody.append("image", image);

      const reqheader = {
        "Content-Type": "multipart/form-data",
      };

      const result = await addprductAPI(reqbody, reqheader);
      if (result.status === 200) {
        alert('Product added successfully');
        handleClose();
        setaddprojectresponse(result.data);
      } else {
        alert(result.response.data);
      }
    }
  };

  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card className="demo-icons">
              <CardHeader>
                <h2 style={{ textAlign: 'center' }}>Products</h2>
                <div className="container">
                  <Button onClick={handleOpen} className="mb-5" style={{ float: 'right' }}>Add</Button>
                </div>
              </CardHeader>
              <CardBody className="all-icons">
                <div className="container">
                  <div className='row'>
                    {getProduct.length > 0 ? getProduct.map((item) => (
                      <div className='col-12 col-md-6 col-lg-4 mb-4' key={item.id}>
                        <Card>
                          <CardImg
                            alt="image"
                            src={`${BASE_URL}/uploads/${item.image}`}
                            top
                            style={{ height: '200px', width: '200px' }}
                          />
                          <CardBody>
                            <CardTitle tag="h5">
                              {item.productname}
                            </CardTitle>
                            <CardText>
                              {item.description}
                            </CardText>
                            <Edit pass={item} />
                          </CardBody>
                        </Card>
                      </div>
                    )) : null}
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
              <center>
                <label htmlFor="imag">
                  <input id='imag' type="file" style={{ display: 'none' }} onChange={(e) => setProduct({ ...product, image: e.target.files[0] })} />
                  <img src={preview ? preview : logo} alt="" width={'160px'} height={'160px'} />
                </label>
              </center>
              <br />
              <div className='mb-3 w-100'>
                <Form.Control type="text" placeholder="Enter product name" value={product.productname} onChange={(e) => setProduct({ ...product, productname: e.target.value })} />
              </div>
              <div className='mb-3 w-100'>
                <Form.Control style={{ padding: '25px' }} type="text" placeholder="Enter description" value={product.description} onChange={(e) => setProduct({ ...product, description: e.target.value })} />
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
