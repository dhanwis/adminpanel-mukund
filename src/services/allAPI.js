import { BASE_URL } from "./baseurl"
import { commonAPI } from "./commonAPI"


//login
export const loginAPI=async(user)=>{
    return await commonAPI('POST',`${BASE_URL}/user/login`,user,"")
}


// add products
export const addprductAPI=async(reqbody,reqheader)=>{
    return await commonAPI(`POST`,`${BASE_URL}/products/add`,reqbody,reqheader)
}

// get product
export const allproductAPI=async(reqheader)=>{
    return await commonAPI(`GET`,`${BASE_URL}/product/all-product`,"",reqheader)
}


// edit product
export const editProductAPI = async(productId,reqBody,reqheader)=>{
    
    return await commonAPI('PUT',`${BASE_URL}/product/edit/${productId}`,reqBody,reqheader)
 }


 //  delete project
export const deleteProductAPI = async(productId,reqheader)=>{
    return await commonAPI('DELETE',`${BASE_URL}/product/remove/${productId}`,{},reqheader)
 }








