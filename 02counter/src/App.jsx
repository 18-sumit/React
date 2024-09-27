import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  // let Counter = 5 ; 

  let [Counter ,setCounter] = useState(15)

  const addValue = () => {
    console.log("Clicked" ,Counter)
    Counter = Counter+1
    setCounter(Counter);
  }

  const removeValue =()=>{ 
    console.log("removed" , Counter);
    Counter = Counter-1 ;
    setCounter(Counter);
  }

  const addButtonStyle ={
    backgroundColor: Counter === 20? 'red' :'initial',
    color:Counter===20? 'white' :'initial'
  }
  const removeButtonStyle ={
    backgroundColor: Counter === 0 ? 'orange' :'initial',
    color:Counter=== 0 ? 'white' :'initial'
  }


  return (
    <>
      <h1>Chai aur react</h1>
      <h2>Counter Value is : {Counter}</h2>

      <button onClick={addValue} disabled={Counter >=20} style={addButtonStyle}
      >Add value {Counter}</button> 
      <br />
      <button onClick={removeValue} disabled ={Counter <=0} style={removeButtonStyle}
      >Remove value {Counter}</button> 

      <p>Footer : {Counter}</p>
    </>
  )
}

export default App
