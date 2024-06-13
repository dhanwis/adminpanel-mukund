import React, { useContext, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { editProductAPI, deleteProductAPI } from 'services/allAPI';
import { BASE_URL } from 'services/baseurl';
import Swal from 'sweetalert2';
import { editprojectresponsecontext } from 'components/context/ContextShareeee';

function Edit({ pass }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { editprojectresponse, seteditprojectresponse } = useContext(editprojectresponsecontext);
  const [preview, setpreview] = useState("");

  const [productDetails, setproductDetails] = useState({
    id: pass._id,
    productname: pass.productname,
    description: pass.description,
    image: ""
  });

  useEffect(() => {
    if (productDetails.image) {
      setpreview(URL.createObjectURL(productDetails.image));
    }
  }, [productDetails.image]);

  const handleupdate = async () => {
    const { id, productname, description, image } = productDetails;

    if (!productname || !description) {
      alert('please fill the form completely');
    } else {
      const reqbody = new FormData();
      reqbody.append("productname", productname);
      reqbody.append("description", description);

      if (preview) {
        reqbody.append("image", image);
      } else {
        reqbody.append("image", pass.image);
      }

      const reqheader = {
        "Content-Type": preview ? "multipart/form-data" : "application/json"
      };
      
      const result = await editProductAPI(id, reqbody, reqheader);
      if (result.status === 200) {
        Swal.fire({
          icon:'success',
          title: 'Updated Successfully',
          showClass: {
            popup: 'animate__animated animate__fadeInDown'
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
          }
        })
       
        handleClose();
        seteditprojectresponse(prevResponse => Array.isArray(prevResponse) 
          ? prevResponse.map(item => item._id === id ? result.data : item)
          : []);
      } else {
        console.log(result.response.data);
      }
    }
  };

  const handleDeleteMenu = async (id) => {
    let reqheader = {
      'Content-Type': 'application/json'
    };

    try {
      const result = await deleteProductAPI(id, reqheader);
      if (result.status === 200) {
        handleClose();
        // Remove the deleted product from the context/state
        seteditprojectresponse(prevResponse => Array.isArray(prevResponse) 
          ? prevResponse.filter(item => item._id !== id) 
          : []);
      } else {
        console.log(result.response.data);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleConfirmDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        handleDeleteMenu(id);
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
      }
    });
  };

  return (
    <div>
      <Button onClick={handleShow}>
        <i className="fa-solid fa-pen-to-square"></i> Edit
      </Button>

     
<Modal show={show} onHide={handleClose}>
  <Modal.Header>
  <i onClick={handleClose} style={{float:'left'}} class="fa-solid fa-xmark"></i>
  </Modal.Header>
  <Modal.Body>
    <center>
      <label htmlFor="imag">
        <input 
          id='imag' 
          type="file" 
          style={{ display: 'none' }} 
          onChange={(e) => setproductDetails({ ...productDetails, image: e.target.files[0] })} 
        />
        <img 
          className='' 
          src={preview ? preview : `${BASE_URL}/uploads/${pass.image}`} 
          alt=""  
          width={'160px'} 
          height={'160px'} 
        />
      </label>
    </center>
    <br />
    <div className='mb-3 w-100'>
      <input 
        type="text" 
        className='form-control' 
        value={productDetails.productname} 
        onChange={(e) => setproductDetails({ ...productDetails, productname: e.target.value })} 
      />
    </div>
    <div className='mb-3 w-100'>
      <input 
        style={{ height: '80px' }} 
        type="text" 
        className='form-control'  
        value={productDetails.description} 
        onChange={(e) => setproductDetails({ ...productDetails, description: e.target.value })} 
      />
    </div>
  </Modal.Body>
  <Modal.Footer>
    <Button onClick={() => handleConfirmDelete(pass._id)} style={{ backgroundColor: 'rgb(221, 21, 61)' }}>
      <i className="fa-solid fa-trash"></i> Delete
    </Button>
   
    <Button variant="primary" onClick={handleupdate}>
      Save Changes
    </Button>
  </Modal.Footer>
</Modal>
    </div>
  );
}

export default Edit;
