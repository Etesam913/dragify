import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import Text from './Text.js';
import Today from './Today.js';
import Time from './Time.js';
import Link from './Link.js';
import Searchbar from './Searchbar.js';
import Joke from './Joke.js';
import List from './List.js';
import ReactiveButton from './ReactiveButton.js';
import ItembarButton from './ItembarButton.js';
import pencil from "./images/pencil.png";
import edit from "./images/edit.png";
import date from "./images/date.png";
import time from "./images/time.png";
import chain from "./images/chain.png";
import searchv2 from './images/searchv2.png';
import laugh from './images/laugh.png';
import todolist from './images/todolist.png';
import moon from './images/moon.png';
import sun from './images/sun.png';
import backarrow from './images/backarrow.png';


const Page = styled.div`
   background-color: ${props => props.backgroundColor};
  position: absolute;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  flex-shrink: 0;
  overflow-x:hidden;
`;
const Sidebar = styled.div`
   display: flex;
   flex-direction: column;
   align-items: center;
   width: 8rem;
   margin-top: .5rem;

`;
const Itembar = styled(motion.div)`
   position: relative;
   height: 100%;
   z-index: 1;
   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: space-around;
`;
/*const ItembarButton = styled(motion.div)`
  width: 5rem;
  height: 5rem;
  background-color: ${props=>props.buttonBackgroundColor};
  border-radius: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
`*/
const ItemImage = styled.img`
   filter: invert(${props => props.invert});
`;

const EditButton = styled(motion.div)`
 width: 5rem;
  height: 5rem;
  border-radius: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
   background-color: ${props => props.buttonBackgroundColor};
`;

const DarkModeButton = styled(EditButton)`
   position: absolute;
   z-index: 1;
   left: 95%;
   top: 2%;
   background-color: ${props => props.buttonBackgroundColor};
`;
const Presets = styled(motion.div)`
   display: flex;
   margin-top: 1.7rem;
`;
const Canvas = styled.div`
  height: 100%;
  width: 100%;
  z-index: 0;
`;
function App() {
   const [editable, setEditable] = useState(false);
   const [darkMode, setDarkMode] = useState(false);
   const [textElements, setTextElements] = useState([]);
   const [dateElements, setDateElements] = useState([]);
   const [timeElements, setTimeElements] = useState([]);
   const [linkElements, setLinkElements] = useState([]);
   const [searchElements, setSearchElements] = useState([]);
   const [jokeElements, setJokeElements] = useState([]);
   const [listElements, setListElements] = useState([]);
   const [moveElements, setMoveElements] = useState(true);
   const canvas = useRef(null);
   const colors = ['#f2f2f2', '#FF6900', '#FCB900', '#7BDCB5', '#00D084', '#8ED1FC', '#0693E3', '#ABB8C3', '#EB144C', '#F78DA7', '#000000'];

   const textElementsOnPage = textElements.map((props) => <Text key={props.id} identifier={props.id} canEdit={editable} elements={textElements} onChange={handleTextElementChange} darkMode={darkMode} canvas={canvas} windowResize={moveElements} colorArray={colors}></Text>);
   const dateElementsOnPage = dateElements.map((props) => <Today key={props.id} canEdit={editable} identifier={props.id} elements={dateElements} onChange={handleDateElementChange} darkMode={darkMode} canvas={canvas} windowResize={moveElements} colorArray={colors}></Today>)
   const timeElementsOnPage = timeElements.map((props) => <Time key={props.id} canEdit={editable} identifier={props.id} elements={timeElements} onChange={handleTimeElementChange} darkMode={darkMode} canvas={canvas} windowResize={moveElements} colorArray={colors}></Time>)
   const linkElementsOnPage = linkElements.map((props) => <Link key={props.id} canEdit={editable} identifier={props.id} elements={linkElements} onChange={handleLinkElementChange} darkMode={darkMode} canvas={canvas} windowResize={moveElements} colorArray={colors}></Link>)
   const searchElementsOnPage = searchElements.map((props) => <Searchbar key={props.id} canEdit={editable} identifier={props.id} elements={searchElements} onChange={handleSearchElementChange} darkMode={darkMode} canvas={canvas} windowResize={moveElements} colorArray={colors}></Searchbar>)
   const jokeElementsOnPage = jokeElements.map((props) => <Joke key={props.id} canEdit={editable} identifier={props.id} elements={jokeElements} onChange={handleJokeElementChange} darkMode={darkMode} canvas={canvas} windowResize={moveElements} colorArray={colors}></Joke>)
   const listElementsOnPage = listElements.map((props) => <List key={props.id} canEdit={editable} identifier={props.id} elements={listElements} onChange={handleListElementChange} darkMode={darkMode} canvas={canvas} windowResize={moveElements} colorArray={colors}></List>)


   useEffect(() => {
      window.addEventListener('resize', function (event) {
         if (resizeTimer !== null) {
            this.clearTimeout(resizeTimer);
         }
         setMoveElements(false);
         var resizeTimer = setTimeout(function () {
            setMoveElements(true);
         }, 500);
      })
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
         setListElements(JSON.parse(localStorage.getItem("listElement")));

         if (JSON.parse(localStorage.getItem("editable")) !== null) {
            setEditable(JSON.parse(localStorage.getItem("editable")));
         }
      }
      return () => {
         window.removeEventListener("resize", function () { });
      }
   }, []);

   useEffect(() => {

      console.log(editable);
   }, [editable])

   useEffect(() => {
      localStorage.setItem("textElement", JSON.stringify(textElements));
      localStorage.setItem("dateElement", JSON.stringify(dateElements));
      localStorage.setItem("timeElement", JSON.stringify(timeElements));
      localStorage.setItem("linkElement", JSON.stringify(linkElements));
      localStorage.setItem("searchElement", JSON.stringify(searchElements));
      localStorage.setItem("jokeElement", JSON.stringify(jokeElements));
      localStorage.setItem("listElement", JSON.stringify(listElements));
      console.log(JSON.parse(localStorage.getItem("textElement")));
   }, [textElements, dateElements, timeElements, linkElements, searchElements, jokeElements, listElements])

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
   function handleListElementChange(arr) {
      setListElements(arr);
   }
   function changeEditable() {
      console.log("bob");
      localStorage.setItem("editable", JSON.stringify(!editable));
      setEditable(!editable);
   }
   function addElement(type) {
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
      else if (type === "list") {
         const elem = [{ id: Math.random() * 200 }];
         setListElements(listElements.concat(elem));
      }
   }

   const sidebarContainer = {
      hidden: { opacity: 0, scale: 0 },
      show: {
         opacity: 1, scale: 1,
         transition: { staggerChildren: 0.375 }
      }
   }

   const sidebarItem = { hidden: { opacity: 0, scale: 0 }, show: { opacity: 1, scale: 1 } };

   return (
      <Page backgroundColor={darkMode ? "rgb(24, 26, 27);" : "white"}>
         <Sidebar>
            <EditButton buttonBackgroundColor={darkMode ? "#434342" : "#e0d9d3"} variants={sidebarItem} onClick={() => { changeEditable() }} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
               <ItemImage invert={darkMode ? "100%" : "0%"} src={editable ? backarrow : pencil} style={{ height: "64.5%", width: "64.5%" }} />
            </EditButton>
            <Itembar variants={sidebarContainer} initial="hidden" animate={editable ? "show" : "hidden"}>
               {/*<ItembarButton buttonBackgroundColor = {darkMode ? "#434342" : "#e0d9d3"} variants={sidebarItem} onClick={() => { AddElement("text") }} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <ItemImage src={edit} invert = {darkMode ? "100%" : "0%"} style={{ height: "55%", width: "35%" }} />
               </ItembarButton>
               <ItembarButton buttonBackgroundColor = {darkMode ? "#434342" : "#e0d9d3"} variants={sidebarItem} onClick={() => { AddElement("date") }} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <ItemImage src={date} invert = {darkMode ? "100%" : "0%"} style={{ height: "60.5%", width: "63.5%" }} />
               </ItembarButton>
               <ItembarButton buttonBackgroundColor = {darkMode ? "#434342" : "#e0d9d3"} variants={sidebarItem} onClick={() => { AddElement("time") }} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <ItemImage src={time} invert = {darkMode ? "100%" : "0%"} style={{ height: "35%", width: "75%" }} />
               </ItembarButton>
               <ItembarButton buttonBackgroundColor = {darkMode ? "#434342" : "#e0d9d3"} variants={sidebarItem} onClick={() => { AddElement("link") }} whileHover={{ scale: 1.1, boxShadow: darkMode ? "0px 16px 10px 0px rgba(232, 232, 232, 0)" : "0px 16px 10px 0px rgba(232, 232, 232, 0.5)" }} whileTap={{ scale: 0.9 }}>
                  <ItemImage src={chain} invert = {darkMode ? "100%" : "0%"} style={{ height: "15", width: "75%" }} />
               </ItembarButton>
               <ItembarButton buttonBackgroundColor = {darkMode ? "#434342" : "#e0d9d3"} variants={sidebarItem} onClick={() => { AddElement("search") }} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <ItemImage src={searchv2} invert = {darkMode ? "100%" : "0%"} style={{ height: "60%", width: "60%" }} />
               </ItembarButton>
               <ItembarButton buttonBackgroundColor = {darkMode ? "#434342" : "#e0d9d3"} variants={sidebarItem} onClick={() => { AddElement("joke") }} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <ItemImage src={laugh} invert = {darkMode ? "100%" : "0%"} style={{ height: "70%", width: "70%" }} />
               </ItembarButton>
               <ItembarButton buttonBackgroundColor = {darkMode ? "#434342" : "#e0d9d3"} variants={sidebarItem} onClick={() => { AddElement("list") }} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <ItemImage src={todolist} invert = {darkMode ? "100%" : "0%"} style={{ height: "70%", width: "70%" }} />
               </ItembarButton>*/}
               <ItembarButton img={edit} imgDim={["55%", "35%"]} addElement={() => { addElement("text") }} darkMode={darkMode} variants={sidebarItem}></ItembarButton>
               <ItembarButton img={date} imgDim={["60.5%", "63.5%"]} addElement={() => { addElement("date") }} darkMode={darkMode} variants={sidebarItem}></ItembarButton>
               <ItembarButton img={time} imgDim={["35%", "75%"]} addElement={() => { addElement("time") }} darkMode={darkMode} variants={sidebarItem}></ItembarButton>
               <ItembarButton img={chain} imgDim={["32%", "75%"]} addElement={() => { addElement("link") }} darkMode={darkMode} variants={sidebarItem}></ItembarButton>
               <ItembarButton img={searchv2} imgDim={["60%", "60%"]} addElement={() => { addElement("search") }} darkMode={darkMode} variants={sidebarItem}></ItembarButton>
               <ItembarButton img={laugh} imgDim={["70%", "70%"]} addElement={() => { addElement("joke") }} darkMode={darkMode} variants={sidebarItem}></ItembarButton>
               <ItembarButton img={todolist} imgDim={["70%", "70%"]} addElement={() => { addElement("list") }} darkMode={darkMode} variants={sidebarItem}></ItembarButton>


            </Itembar>
         </Sidebar>

         <DarkModeButton buttonBackgroundColor={darkMode ? "#434342" : "#e0d9d3"} onClick={() => { setDarkMode(!darkMode) }} whileTap={{ scale: 0.9 }} whileHover={{ scale: 1.1 }}>
            <ItemImage src={darkMode ? sun : moon} invert={darkMode ? "100%" : "0%"} style={{ height: "70%", width: "70%" }}></ItemImage>
         </DarkModeButton>
         <Canvas ref={canvas}>
            <Presets>
               <motion.div animate={editable ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }} transition={editable ? { delay: 0 } : { delay: .4 }}>
                  <ReactiveButton text="Preset 1" darkMode={darkMode}></ReactiveButton>
               </motion.div>
               <motion.div animate={editable ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }} transition={{ delay: .2 }}>
                  <ReactiveButton text="Preset 2" darkMode={darkMode}></ReactiveButton>
               </motion.div>
               <motion.div animate={editable ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }} transition={editable ? { delay: .4 } : { delay: 0 }}>
                  <ReactiveButton text="Preset 3" darkMode={darkMode}></ReactiveButton>
               </motion.div>
            </Presets>
            {textElementsOnPage}
            {dateElementsOnPage}
            {timeElementsOnPage}
            {linkElementsOnPage}
            {searchElementsOnPage}
            {jokeElementsOnPage}
            {listElementsOnPage}
         </Canvas>
      </Page>
   );
}

export default App;
