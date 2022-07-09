import './App.css';
import {useState,useReducer, useRef} from "react";

function App() {
  const [emotion,setEmotion] = useState("happy");
  const [checked,setChecked] = useState(false);
  const [select,setSelect] = useReducer((select) => !select, false);
  const txtTitle = useRef();
  const hexColor = useRef();
  const [colorName,setColorName] = useState("");
  const [colorValue,setColorValue] = useState("");
  const [titleProps,resetTitle] = useInput("");
  const [colorProps,resetColor] = useInput("#000000");


  const submitColor = (e) => {
    e.preventDefault(); //for not refreshing the page
    const title = txtTitle.current.value;
    const color = hexColor.current.value;
    alert(`${title},${color}`);
    // setting back to null
    txtTitle.current.value= null; 
    hexColor.current.value= null;
  }
  const submitColorValue = (e) => {
    e.preventDefault();
    alert(`${colorName},${colorValue}`);
    // setting back to null
    setColorName("");
    setColorValue("#000000");
  }

  // custom hook
  function useInput(initialValue){
    const [value,setValue] = useState(initialValue);
    return [
      { value, onChange: (e) => setValue(e.target.value)},
      () => setValue(initialValue)
    ];
  }

  const customSubmit = (e) => {
    e.preventDefault();
    alert(`${titleProps.value},${colorProps.value}`);
    resetTitle(); 
    resetColor();
  }

  return (
    <div className="App">
      {/* useState hook example */}
      <h1>Current emotion is {emotion}</h1>
      <button onClick={() => setEmotion("sad")}>Change emotion</button>

    {/* implementing checkbox using useState hook */}
      <div>
      <h4>checkbox using useState hook</h4>
        <input type={"checkbox"} value={checked} onChange={() => setChecked((checked) => !checked)} />
        <label>{checked ? "Box is checked" : "Box is NOT checked"}</label>
      </div>

      {/* implementing checkbox with useReducer hook */}
      <div>
        <h4>checkbox using useReducer hook</h4>
        <input type={"checkbox"} value={select} onChange={setSelect} />
        <label>{select ? "Box is checked" : "Box is NOT checked"}</label>
      </div>

      {/* implementing using useRef hook */}
      <div>
      <h4>color using useRef hook</h4>
        <form >
          <input type={"text"} placeholder="select color ..." ref={txtTitle}/>
          <input type={"color"} ref={hexColor} />
          <button onClick={submitColor}>ADD</button>
        </form>
      </div>

      {/* implementing using useState hook */}
      <div>
        <h4>color using useState hook</h4>
        <form >
          <input type={"text"} placeholder="select color ..." value={colorName}
          onChange={(event) => setColorName(event.target.value)} />
          <input type={"color"} value={colorValue} 
          onChange={(event) => setColorValue(event.target.value)} />
          <button onClick={submitColorValue}>ADD</button>
        </form>
      </div>

       {/* implementing using customProps hook */}
       <div>
      <h4>color using custom hook</h4>
        <form >
          <input {...titleProps} type={"text"} placeholder="select color ..."/>
          <input {...colorProps} type={"color"}  />
          <button onClick={customSubmit}>ADD</button>
        </form>
      </div>

    </div>
  );
}

export default App;
