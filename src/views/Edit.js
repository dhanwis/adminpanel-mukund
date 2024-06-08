import React from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import logo from "assets/img/image.png";



function Edit() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  return (
  
    <div>
         <Button onClick={handleShow}>
        <i  class="fa-solid fa-pen-to-square"></i> Edit
        </Button>

<Modal show={show} onHide={handleClose}>
       
        <Modal.Body>

        <center>
  
  <label htmlFor="imag">
<input id='imag' type="file" style={{display:'none'}}  />
<img className='' src={logo} alt=""  width={'160px'} height={'160px'} /></label>

</center>
{/* </div> */}

<br />



{/* <div className='col-7 ms-3'> */}
 
          <div className='mb-3 w-100'>
              <input type="text" className='form-control'    />
          </div>
          <div className='mb-3 w-100'>
              <input  style={{height:'80px'}} type="text" className='form-control'      />
          </div>
         
         


        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>



    </div>
  )
}

export default Edit