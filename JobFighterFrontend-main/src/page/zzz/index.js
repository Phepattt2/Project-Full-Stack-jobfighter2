import React from 'react'
import {useState , useEffect} from "react";
import axios from 'axios';



const Testzzz = () => {
  const [img,Setimg] = useState()

  var a = document.createElement("a"); //Create <a>

  async function fetchFirstJsonData(){  
    const response = await  axios.get(process.env.REACT_APP_API+`/submitjob`)
    console.log(response.data[1].resume)
    console.log('type',response.data[1].resume.type)

    Setimg(response.data[1].resume)
  }

  useEffect(()=> {
    fetchFirstJsonData()
  },[])

//dowload file ready to use!!!! 
  // console.log('img :',img)
  // a.href = img; //Image Base64 Goes here
  // a.download = "Imagekk.pdf"; //File name Here
  // a.click(); //Downloaded file


  return (
    <div>testzzz
  <h1>Hello world</h1>
   <img class="card-img-top" src={img} alt="Card image cap" />

    
    
    </div>

  )
}

export default Testzzz