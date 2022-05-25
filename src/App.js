import logo from './logo.svg';
import './App.css';
import web3 from './web3';
import { useState } from 'react';
import { Web3Storage } from 'web3.storage';
import lottery from './lottery';
function App() {
  const[file,setfile]=useState("")
  const onLoadFile=async(event)=>{
    event.stopPropagation()
    event.preventDefault()
    const file=event.target.files
    setfile(file)
  }
  const onSubmit=async(event)=>{
    event.preventDefault()
    const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDJFOGEyREY3MTJGMzdCNTk1NzYwNzQ0YmZCQzlFRTI1NDZhYTBCMjgiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NTM0MjA2ODc2MDAsIm5hbWUiOiJUZXN0X0FwaSJ9.CyrPRZBq4Dj0WvrNBOCCn7hBZUAblnKN13ILSz--ipw";
    const storage = new Web3Storage({ token });

    const cid = await storage.put(file);
    console.log(cid)
    const accounts=await web3.eth.getAccounts()

    console.log(accounts[0])
    lottery.methods.sendHash(cid).send(
      {
        from:accounts[0]
      }
    )
    
  }
  return (
    <div className="App">
      <form onSubmit={onSubmit}>
        <input type="file" onChange={onLoadFile} />
        <button type="submit"> sendIt</button>
      </form>
    </div>
  );
}

export default App;
