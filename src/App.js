import logo from './logo.svg';
import './App.css';
import web3 from './web3';
import { useState } from 'react';
import { Web3Storage } from 'web3.storage';
import lottery from './lottery';
function App() {
  
  const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDJFOGEyREY3MTJGMzdCNTk1NzYwNzQ0YmZCQzlFRTI1NDZhYTBCMjgiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NTM0MjA2ODc2MDAsIm5hbWUiOiJUZXN0X0FwaSJ9.CyrPRZBq4Dj0WvrNBOCCn7hBZUAblnKN13ILSz--ipw"
  const storage = new Web3Storage({ token });
  const[file,setfile]=useState("")
  const [fileReturn,setfileReturn]=useState("file before upload")
  const [cid,setCid]=useState("")
  const onLoadFile=async(event)=>{
    event.stopPropagation()
    event.preventDefault()

    console.log("in assign file  ")
    const file=event.target.files
    console.log("on set file ")
    
    setfile(file)

  }
  const onSubmit=async(event)=>{
    event.preventDefault()
    console.log(file.name)
    console.log("On essaye d'envoyer les données au web3 ")
    const cid = await storage.put(file);
    console.log(cid)
    setCid(cid)
    const accounts=await web3.eth.getAccounts()
    
    console.log(accounts[0])
  
    lottery.methods.setHash(cid).send(
      {
        from:accounts[0]
      }
    )

  }
    const onGetFile=async()=>{
      const accounts=await web3.eth.getAccounts()
      console.log("The add of first account " +accounts[0])
      const res=await storage.get(cid)
      console.log(res)
      const files=await res.files()
      const cid_res=await lottery.methods.getHash().call({
        from:accounts[0]
      })
      console.log("le hash from contract est "+cid_res)
      console.log(files)
      const lien=cid_res +".ipfs.dweb.link/"+files[0].name
      setfileReturn(lien)
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
