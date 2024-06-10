// import axios
import axios from "axios";

 export const commonAPI=async(httprequest,url,reqbody,reqheader)=>{
    const reqconfig={
        method:httprequest,
        url,
        data:reqbody,
        headers:reqheader?reqheader:{"Content-Type":"application/json"}
        // there are two type of content to upoad

    }
    return await axios(reqconfig).then((result)=>{
        return result
    }).catch((err)=>{
        return err
    })

}