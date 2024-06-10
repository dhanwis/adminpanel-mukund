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








