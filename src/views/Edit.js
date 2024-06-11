import React, { useEffect } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import logo from "assets/img/image.png";
import { editProductAPI } from 'services/allAPI';
import { BASE_URL } from 'services/baseurl';
import { deleteProductAPI } from 'services/allAPI';
import Swal from 'sweetalert2';




function Edit({pass}) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [preview,setpreview]=useState("")

    const [productDetails,setproductDetails]=useState({
      id:pass._id,
        productname:pass.productname,
      description:pass.description,
        image:""
        
  


    })

    console.log(productDetails);
    useEffect(()=>{
        if(productDetails.image){
            setpreview(URL.createObjectURL(productDetails.image))
        }
    },[productDetails.image])
    
   

    const handleupdate=async()=>{
        const {id,productname,description,image}=productDetails

        if(!productname || !description){
            alert('please fill the form completely')

        }
        else{
            const reqbody=new FormData()
            reqbody.append("productname",productname)
            reqbody.append("description",description)
            
          preview?reqbody.append("image",image):reqbody.append("image",pass.image)

        
        
        if(preview){
            const reqheader={
                "Content-Type":"multipart/form-data",
               
        
              }
              const result=await editProductAPI(id,reqbody,reqheader)
              console.log(result); 
              if(result.status===200){
                alert('updated successfully')
                handleClose()
                // seteditprojectresponse(result.data)
              }
              else{
                console.log(result.response.data);
              }
            
              
            
        }
        else{
            const reqheader={
                "Content-Type":"application/json",
            }
            const result=await editProductAPI(id,reqbody,reqheader)
            console.log(result); 
            if(result.status===200){
              alert('updated successfully')
              handleClose()
              // seteditprojectresponse(result.data)
            }
            else{
              console.log(result.response.data);
            }
          

        }
    }

    } 
    


    const handleDeleteMenu = async (id) => {
      let reqheader = {
        'Content-Type': 'application/json'
      };
  
      try {
        const result = await deleteProductAPI(id, reqheader);
        if (result.status === 200) {
          handleClose();
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
        <i  class="fa-solid fa-pen-to-square"></i> Edit
        </Button>

<Modal show={show} onHide={handleClose}>
       
        <Modal.Body>

        <center>
  
  <label htmlFor="imag">
<input id='imag' type="file" style={{display:'none'}}   onChange={(e)=>setproductDetails({...productDetails,image:e.target.files[0]})}  />
<img className='' src={preview?preview:`${BASE_URL}/uploads/${pass.image}`} alt=""  width={'160px'} height={'160px'} /></label>

</center>
{/* </div> */}

<br />



{/* <div className='col-7 ms-3'> */}
 
          <div className='mb-3 w-100'>
              <input type="text" className='form-control' value={productDetails.productname}  onChange={(e)=>setproductDetails({...productDetails,productname:e.target.value})}  />
          </div>
          <div className='mb-3 w-100'>
              <input  style={{height:'80px'}} type="text" className='form-control'  value={productDetails.description}  onChange={(e)=>setproductDetails({...productDetails,description:e.target.value})}      />
          </div>
         
         


        </Modal.Body>
        <Modal.Footer>

        <Button  onClick={() => handleConfirmDelete(pass._id)} style={{ float: 'right',backgroundColor:'red' }}  >
            <i class="fa-solid fa-trash"></i> Delete
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleupdate}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>



    </div>
  )
}

export default Edit