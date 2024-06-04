import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [loading,setloading]=useState(false)
  const[img,setimg]=useState("")
  const[qrdata,setqrdata]=useState("")
  const[qrsize,setqrsize]=useState("")
  
  async function func1()
  {
   setloading(true)
   try {
    const url=`https://api.qrserver.com/v1/create-qr-code/?
    size=${qrsize}x${qrsize}&data=${encodeURIComponent(qrdata)}`;
    setimg(url)
   } catch (error) {
    console.log("error is ",error)
   }
   finally{
    setloading(false)
   }
  }
  function func2()
  {
    fetch(img)
    .then((response)=>(response.blob()))
    .then((blob)=>{
      const link=document.createElement("a")
      link.href=URL.createObjectURL(blob)
      link.download="qrcode.png"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    })
  }
  return (
    <>
     
<div className="container">
<h1>QR CODE GENERATOR</h1>
        {loading &&<p>Please Wait.....</p>}
        {img && <img src={img} alt="" />}
        <div className="mm">
          <label htmlFor="input1" className="main1">Qr code</label>
          <input type="text" id="main2" value={qrdata} onChange={(e)=>setqrdata(e.target.value)} placeholder="Qr code" />
          <label htmlFor="input2" className="main1">image size(e.g..,140)</label>
          <input type="text" id="main2" value={qrsize} onChange={(e)=>setqrsize(e.target.value)} placeholder="image size" />
          <button onClick={func1} className="GQ" disabled={loading}>Generate Qr code</button>
          <button onClick={func2} className="DQ">Download Qr code</button> 
          </div>
          <footer>Designed By <a href=""></a>MokiMona</footer>
      </div>
    </>
  )
}

export default App
