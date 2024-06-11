import React, { createContext } from 'react'
import { useState } from 'react'
// create context api
 export const addprojectresponsecontext=createContext()
 export const editprojectresponsecontext=createContext()
//  export const isauthtokencontext=createContext()

function Contextshareeee({children}) {
    // children is a predefined prob
    // add to share
    const [addprojectresponse,setaddprojectresponse]=useState({})
    const [editprojectresponse,seteditprojectresponse]=useState({})

    // const [isauthtoken,setisauthtoken]=useState(true)
  return (
    <div>
        {/* only provider can provide the data and value attribute is used to specify data to share */}
     <addprojectresponsecontext.Provider value={{addprojectresponse,setaddprojectresponse}}>
      <editprojectresponsecontext.Provider value={{editprojectresponse,seteditprojectresponse}}>
          {children}
          </editprojectresponsecontext.Provider>
     </addprojectresponsecontext.Provider>
    </div>
  )
}

export default Contextshareeee