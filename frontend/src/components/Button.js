import React from 'react'
import { AiFillPlusCircle } from "react-icons/ai";
import axios from "axios";

const Button = ({setUpdateFrontend }) => {

    const handleChange = (e) =>{
        e.preventDefault()
    

    const formData = new FormData()
    formData.append("photo",e.target.files[0])

    axios.post("http://localhost:5000/api/allSaved",formData).then((res) =>{
        console.log(res.data);
        setUpdateFrontend(res.data._id);
    })
    .catch((err)=>console.log(err));
};

  return (
    <label className="button" htmlFor="file_picker">
      <AiFillPlusCircle />
      <input
        hidden
        type="file"
        name="file_picker"
        id="file_picker"
        onChange={(e) => handleChange(e)}
      />
    </label>
  )
}

export default Button