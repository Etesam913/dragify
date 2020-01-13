import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import Text from './Text.js';
import Today from './Today.js';
import Time from './Time.js';
import pencil from "./images/pencil.png";
import edit from "./images/edit.png";
import date from "./images/date.png";
import time from "./images/time.png";

const Page = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  flex-shrink: 0;
`;
const Sidebar = styled.div`
  height: 100%;
  width: 10rem;
  background-color: #dfe6e3;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
`;
const SidebarButton = styled(motion.div)`
  width: 5rem;
  height: 5rem;
  background-color: #b3b3b3;
  border-radius: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
`

const EditButton = styled(SidebarButton)`
  position: absolute;
  z-index: 2;
  top: 3rem;
  left: 2.3rem;
`;
const Canvas = styled.div`
  height: 100%;
  width: 100%;
  background-color: white;
  z-index: 0;
`;
function App() {
   const [editable, setEditable] = useState(true);
   const [textElements, setTextElements] = useState([]);
   const [dateElements, setDateElements] = useState([]);
   const [timeElements, setTimeElements] = useState([]);

   const textElementsOnPage = textElements.map((props) => <Text key={props.id} test = {props.id} canEdit={editable} elements= {textElements} onChange={handleTextElementChange}></Text>);
   const dateElementsOnPage = dateElements.map((props) => <Today key={props.id} canEdit={editable}></Today>)
   const timeElementsOnPage = timeElements.map((props) => <Time key={props.id} canEdit={editable}></Time>)

   useEffect(()=>{
      if(localStorage.getItem("textElements") === ""){
         console.log("it is a string");
      }
      else{
         console.log(JSON.parse(localStorage.getItem("textElement")));
         //localStorage.setItem("textElement", JSON.stringify([]));
         setTextElements(JSON.parse(localStorage.getItem("textElement")));
      }
   }, [])
   useEffect(()=>{
      localStorage.setItem("textElement", JSON.stringify(textElements));
      console.log(JSON.parse(localStorage.getItem("textElement")));
   }, [textElements])
   function save(){
      localStorage.setItem("textElement", JSON.stringify(textElements));
      console.log(localStorage.getItem("textElement"));
   }
   function handleTextElementChange(arr){
      setTextElements(arr);
   }
   function recalibrateIndex(){
      for(let i = 0; i< textElements.length; i++){
         textElements[i].number = i;
      }
   }
   function AddElement(type) {
      if (type === "text") {
         const elem = [{ id: Math.random() * 200}];
         console.log(textElements.length);
         setTextElements(textElements.concat(elem));
      }
      else if (type === "date") {
         const elem = [{ id: Math.random() * 200, number: dateElements.length}];
         setDateElements(dateElements.concat(elem));
      }
      else if (type === "time") {
         const elem = [{ id: Math.random() * 200, number: timeElements.length}];
         setTimeElements(timeElements.concat(elem));
      }
   }

   return (
      <Page>
         <EditButton onClick={() => { setEditable(!editable) }} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <img src={pencil} style={{ height: "64.5%", width: "64.5%" }} />
         </EditButton>
         <Sidebar>
            <SidebarButton onClick={() => { AddElement("text") }} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
               <img src={edit} style={{ height: "55%", width: "35%" }} />
            </SidebarButton>
            <SidebarButton onClick={() => { AddElement("date") }} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
               <img src={date} style={{ height: "60.5%", width: "63.5%" }} />
            </SidebarButton>
            <SidebarButton onClick={() => { AddElement("time") }} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
               <img src={time} style={{ height: "35%", width: "75%" }} />
            </SidebarButton>
         </Sidebar>
         <Canvas>
         <button /*onClick={()=>{save()}}*/> placeholder</button>
            {textElementsOnPage}
            {dateElementsOnPage}
            {timeElementsOnPage}
         </Canvas>
      </Page>
   );
}

export default App;
