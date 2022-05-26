import logo from './logo.svg';
import './App.css';
import web3 from './web3';
import { useState } from 'react';
import { Web3Storage } from 'web3.storage';
import lottery from './lottery';
function App() {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDJFOGEyREY3MTJGMzdCNTk1NzYwNzQ0YmZCQzlFRTI1NDZhYTBCMjgiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NTM0MjA2ODc2MDAsIm5hbWUiOiJUZXN0X0FwaSJ9.CyrPRZBq4Dj0WvrNBOCCn7hBZUAblnKN13ILSz--ipw";
    const storage = new Web3Storage({ token });

  const[file,setfile]=useState(":")
  const [fileReturn,setfileReturn]=useState("file before upload")
  const [cid,setCid]=useState("")
  const onLoadFile=async(event)=>{
    event.stopPropagation()
    event.preventDefault()
    const file=event.target.files
    setfile(file)
  }
  const onSubmit=async(event)=>{
    event.preventDefault()
    

    const cid = await storage.put(file);
    console.log(cid)
    setCid(cid)
    const accounts=await web3.eth.getAccounts()

    console.log(accounts[0])
    // lottery.methods.sendHash(cid).send(
    //   {
    //     from:accounts[0]
    //   }
    // )

  }
    const onGetFile=async()=>{
      const accounts=await web3.eth.getAccounts()
      const res=await storage.get("bafybeihfdeo2dq56w2c6zrg3ietkd4olx44tpa3l5l44yfmdjgz3jia5qi")
      console.log(res)
      const files=await res.files()
      const cid=await lottery.methods.getHash().call({
        from:accounts[0]
      })
      console.log("le hash from contract est "+cid)
      console.log(files)
      console.log("bafybeihfdeo2dq56w2c6zrg3ietkd4olx44tpa3l5l44yfmdjgz3jia5qi" +".ipfs.dweb.link/"+files[0].name)
      //   console.log(files[0])
      //   console.log(`${files.cid} -- ${files.path} -- ${files.size}`)
      
      // setfileReturn(files[0])
      // const json=JSON.parse(files[0])
    }

  return (
    <div className="App">
      <form onSubmit={onSubmit}>
        <input type="file" onChange={onLoadFile} />
        <button type="submit"> sendIt</button>
      </form>
       <hr/> 
      <button onClick={onGetFile}> get the file from web3 storage    </button>
      <h1> {fileReturn}</h1>
    </div>
  );
}

export default App;
