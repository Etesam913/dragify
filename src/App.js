import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import Text from './Text.js';
import Today from './Today.js';
import Time from './Time.js';
import Link from './Link.js';
import Searchbar from './Searchbar.js';
import Joke from './Joke.js';
import List from './List.js';
import pencil from "./images/pencil.png";
import edit from "./images/edit.png";
import date from "./images/date.png";
import time from "./images/time.png";
import chain from "./images/chain.png";
import searchv2 from './images/searchv2.png';
import laugh from './images/laugh.png';

const Page = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  flex-shrink: 0;
`;
const Sidebar = styled.div`
   position: relative;
   top: 10%;
   height: 90%;
   width: 10rem;
   background-color: #dfe6e3;
   z-index: 1;
   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: space-around;
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
  top: 1rem;
  left: 2.3rem;
`;
const Canvas = styled.div`
  height: 100%;
  width: 100%;
  background-color: white;
  z-index: 0;
`;
function App() {
   const [editable, setEditable] = useState(false);
   const [textElements, setTextElements] = useState([]);
   const [dateElements, setDateElements] = useState([]);
   const [timeElements, setTimeElements] = useState([]);
   const [linkElements, setLinkElements] = useState([]);
   const [searchElements, setSearchElements] = useState([]);
   const [jokeElements, setJokeElements] = useState([]);

   const textElementsOnPage = textElements.map((props) => <Text key={props.id} identifier={props.id} canEdit={editable} elements={textElements} onChange={handleTextElementChange}></Text>);
   const dateElementsOnPage = dateElements.map((props) => <Today key={props.id} canEdit={editable} identifier={props.id} elements={dateElements} onChange={handleDateElementChange}></Today>)
   const timeElementsOnPage = timeElements.map((props) => <Time key={props.id} canEdit={editable} identifier={props.id} elements={timeElements} onChange={handleTimeElementChange}></Time>)
   const linkElementsOnPage = linkElements.map((props) => <Link key={props.id} canEdit={editable} identifier={props.id} elements={linkElements} onChange={handleLinkElementChange}></Link>)
   const searchElementsOnPage = searchElements.map((props) => <Searchbar key={props.id} canEdit={editable} identifier={props.id} elements={searchElements} onChange={handleSearchElementChange}></Searchbar>)
   const jokeElementsOnPage = jokeElements.map((props) => <Joke key={props.id} canEdit={editable} identifier={props.id} elements={jokeElements} onChange={handleJokeElementChange}></Joke>)

   useEffect(() => {
      if (localStorage.getItem("textElements") === "" || localStorage.getItem("dateElements") === "") {
         console.log("it is a string");
      }
      else {
         /*
         setTextElements([]);
         setDateElements([]);
         setTimeElements([]);
         setLinkElements([]);
         setSearchElements([]);
         setJokeElements([]);*/
         setTextElements(JSON.parse(localStorage.getItem("textElement")));
         setDateElements(JSON.parse(localStorage.getItem("dateElement")));
         setTimeElements(JSON.parse(localStorage.getItem("timeElement")));
         setLinkElements(JSON.parse(localStorage.getItem("linkElement")));
         setSearchElements(JSON.parse(localStorage.getItem("searchElement")));
         setJokeElements(JSON.parse(localStorage.getItem("jokeElement")));
         if (JSON.parse(localStorage.getItem("editable")) !== null) {
            setEditable(JSON.parse(localStorage.getItem("editable")));
         }
      }
   }, [])
   useEffect(() => {
      localStorage.setItem("textElement", JSON.stringify(textElements));
      localStorage.setItem("dateElement", JSON.stringify(dateElements));
      localStorage.setItem("timeElement", JSON.stringify(timeElements));
      localStorage.setItem("linkElement", JSON.stringify(linkElements));
      localStorage.setItem("searchElement", JSON.stringify(searchElements));
      localStorage.setItem("jokeElement", JSON.stringify(jokeElements));

      console.log(JSON.parse(localStorage.getItem("textElement")));
   }, [textElements, dateElements, timeElements, linkElements, searchElements, jokeElements])

   function handleTextElementChange(arr) {
      setTextElements(arr);
   }
   function handleDateElementChange(arr) {
      setDateElements(arr);
   }
   function handleTimeElementChange(arr) {
      setTimeElements(arr);
   }
   function handleLinkElementChange(arr) {
      setLinkElements(arr);
   }
   function handleSearchElementChange(arr) {
      setSearchElements(arr);
   }
   function handleJokeElementChange(arr) {
      setJokeElements(arr);
   }
   function changeEditable() {
      localStorage.setItem("editable", JSON.stringify(!editable));
      setEditable(!editable);
   }
   function AddElement(type) {
      if (type === "text") {
         const elem = [{ id: Math.random() * 200 }];
         console.log(textElements.length);
         setTextElements(textElements.concat(elem));
      }
      else if (type === "date") {
         const elem = [{ id: Math.random() * 200 }];
         setDateElements(dateElements.concat(elem));
      }
      else if (type === "time") {
         const elem = [{ id: Math.random() * 200 }];
         setTimeElements(timeElements.concat(elem));
      }
      else if (type === "link") {
         const elem = [{ id: Math.random() * 200 }];
         setLinkElements(linkElements.concat(elem));
      }
      else if (type === "search") {
         const elem = [{ id: Math.random() * 200 }];
         setSearchElements(searchElements.concat(elem));
      }
      else if (type === "joke") {
         const elem = [{ id: Math.random() * 200 }];
         setJokeElements(jokeElements.concat(elem));
      }
   }
   return (
      <Page>
         <EditButton onClick={() => { changeEditable() }} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
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
            <SidebarButton onClick={() => { AddElement("link") }} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
               <img src={chain} style={{ height: "15", width: "75%" }} />
            </SidebarButton>
            <SidebarButton onClick={() => { AddElement("search") }} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
               <img src={searchv2} style={{ height: "60%", width: "60%" }} />
            </SidebarButton>
            <SidebarButton onClick={() => { AddElement("joke") }} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
               <img src={laugh} style={{ height: "70%", width: "70%" }} />
            </SidebarButton>
         </Sidebar>
         <Canvas>
            {textElementsOnPage}
            {dateElementsOnPage}
            {timeElementsOnPage}
            {linkElementsOnPage}
            {searchElementsOnPage}
            {jokeElementsOnPage}
            <List></List>
         </Canvas>
      </Page>
   );
}

export default App;
