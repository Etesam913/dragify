/*
Etesam Ansari
GitHub: Etesam913
A new tab extension that allows the user to drag and drop compounds freely.
Made with React, Styled Components, and Framer Motion.
*/

import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import UIfx from 'uifx';
import CursorBlur from 'react-mouse-blur';
import Text from './Text.js';
import Today from './Today.js';
import Time from './Time.js';
import Link from './Link.js';
import Searchbar from './Searchbar.js';
import Joke from './Joke.js';
import List from './List.js';
import Tutorial from './Tutorial.js';
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
import BackgroundWindow from './BackgroundWindow.js';
import AboutWindow from './AboutWindow.js';
import blopAudio from './images/blop.mp3';
import cursor from './images/autocursor.png';
import trashcan from "./images/trashcan.png";

const Page = styled(motion.div)`
  position: absolute;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  flex-shrink: 0;
  overflow-x:hidden;
  overflow-y: hidden;
  background-image: url(${props => props.backgroundImage});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
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
   @media(max-height: 900px){
     width: 4rem;
     height: 4rem;
   }
   @media(max-height: 600px){
     width: 3rem;
     height: 3rem;
   }
   @media(max-height: 400px){
     width: 1.5rem;
     height: 1.5rem;
   }
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

const blop = new UIfx(
  blopAudio,
  {
    volume: 1
  }
);

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
  const [showBackgroundWindow, setShowBackgroundWindow] = useState(false);
  const [showAboutWindow, setShowAboutWindow] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState("");
  const [backgroundImg, setBackgroundImg] = useState("");
  const [tutorialComplete, setTutorialComplete] = useState(false);
  const [steps, setSteps] = useState([false, false, false, false, false, false, false, false, false, false]); // Steps for tutorial


  const canvas = useRef(null);
  const colors = ['#f2f2f2', '#FF6900', '#FCB900', '#7BDCB5', '#00D084', '#8ED1FC', '#0693E3', '#ABB8C3', '#EB144C', '#F78DA7', '#000000'];

  const textElementsOnPage = textElements.map((props) => <Text key={props.id} soundEffect={blop} identifier={props.id} canEdit={editable}
    elements={textElements} onChange={setTextElements} darkMode={darkMode} canvas={canvas}
    windowResize={moveElements} colorArray={colors} steps={steps} setSteps={setSteps} getTools={getTools} getElementIndex={getElementIndex}/>);

  const dateElementsOnPage = dateElements.map((props) => <Today key={props.id} soundEffect={blop} canEdit={editable} identifier={props.id}
    elements={dateElements} onChange={setDateElements} darkMode={darkMode} canvas={canvas} windowResize={moveElements} colorArray={colors} getTools={getTools}/>);

  const timeElementsOnPage = timeElements.map((props) => <Time key={props.id} soundEffect={blop} canEdit={editable} identifier={props.id} elements={timeElements}
    onChange={setTimeElements} darkMode={darkMode} canvas={canvas} windowResize={moveElements} colorArray={colors} getTools={getTools}/>);

  const linkElementsOnPage = linkElements.map((props) => <Link key={props.id} soundEffect={blop} canEdit={editable} identifier={props.id} elements={linkElements}
    onChange={setLinkElements} darkMode={darkMode} canvas={canvas} windowResize={moveElements} colorArray={colors} getTools={getTools}/>);

  const searchElementsOnPage = searchElements.map((props) => <Searchbar key={props.id} soundEffect={blop} canEdit={editable} identifier={props.id}
    elements={searchElements} onChange={setSearchElements} darkMode={darkMode} canvas={canvas} windowResize={moveElements} colorArray={colors}
    steps={steps} setSteps={setSteps} getTools={getTools}/>);

  const jokeElementsOnPage = jokeElements.map((props) => <Joke key={props.id} soundEffect={blop} canEdit={editable} identifier={props.id} elements={jokeElements}
    onChange={setJokeElements} darkMode={darkMode} canvas={canvas} windowResize={moveElements} colorArray={colors}
    steps={steps} setSteps={setSteps} getTools={getTools}/>);

  const listElementsOnPage = listElements.map((props) => <List key={props.id} soundEffect={blop} canEdit={editable} identifier={props.id} elements={listElements}
    onChange={setListElements} darkMode={darkMode} canvas={canvas} windowResize={moveElements} colorArray={colors} getTools={getTools}/>);

  // Gets states on mount from local storage
  useEffect(() => {
    window.addEventListener('resize', function () {
      if (resizeTimer !== null) {
        this.clearTimeout(resizeTimer);
      }
      setMoveElements(false);
      var resizeTimer = setTimeout(function () {
        setMoveElements(true);
      }, 500);
    });

    if (localStorage.getItem("textElement") !== null) {
      setTextElements(JSON.parse(localStorage.getItem("textElement")));
    }

    if (localStorage.getItem("dateElement") !== null) {
      setDateElements(JSON.parse(localStorage.getItem("dateElement")));
    }

    if (localStorage.getItem("timeElement") !== null) {
      setTimeElements(JSON.parse(localStorage.getItem("timeElement")));
    }

    if (localStorage.getItem("linkElement") !== null) {
      setLinkElements(JSON.parse(localStorage.getItem("linkElement")));
    }

    if (localStorage.getItem("searchElement") !== null) {
      setSearchElements(JSON.parse(localStorage.getItem("searchElement")));
    }

    if (localStorage.getItem("jokeElement") !== null) {
      setJokeElements(JSON.parse(localStorage.getItem("jokeElement")));
    }

    if (localStorage.getItem("listElement") !== null) {
      setListElements(JSON.parse(localStorage.getItem("listElement")));
    }
    if (JSON.parse(localStorage.getItem("editable")) !== null) {
      setEditable(JSON.parse(localStorage.getItem("editable")));
    }
    if ((localStorage.getItem("backgroundColor")) !== null) {

      setBackgroundColor(localStorage.getItem("backgroundColor"));
    }
    if (localStorage.getItem("darkMode") !== null) {
      setDarkMode(JSON.parse(localStorage.getItem("darkMode")));
    }
    if (localStorage.getItem("currentBackgroundImage") !== null) {
      setBackgroundImg(localStorage.getItem("currentBackgroundImage"));
    }
    if (localStorage.getItem("tutorialComplete") !== null) {
      setTutorialComplete(JSON.parse(localStorage.getItem("tutorialComplete")));
    }

    return () => {
      window.removeEventListener("resize", function () { });
    }
  }, []);

  // Modifies state when a new element of a type is added
  useEffect(() => {
    localStorage.setItem("textElement", JSON.stringify(textElements));
    localStorage.setItem("dateElement", JSON.stringify(dateElements));
    localStorage.setItem("timeElement", JSON.stringify(timeElements));
    localStorage.setItem("linkElement", JSON.stringify(linkElements));
    localStorage.setItem("searchElement", JSON.stringify(searchElements));
    localStorage.setItem("jokeElement", JSON.stringify(jokeElements));
    localStorage.setItem("listElement", JSON.stringify(listElements));
  }, [textElements, dateElements, timeElements, linkElements, searchElements, jokeElements, listElements]);

  function changeEditable() {
    localStorage.setItem("editable", JSON.stringify(!editable));
    setEditable(!editable);
  }
  function addElement(type) {
    const elem = [{ id: Math.random() * 1000 }];
    if (type === "text") {
      setTextElements(textElements.concat(elem));
    }
    else if (type === "date") {
      setDateElements(dateElements.concat(elem));
    }
    else if (type === "time") {
      setTimeElements(timeElements.concat(elem));
    }
    else if (type === "link") {
      setLinkElements(linkElements.concat(elem));
    }
    else if (type === "search") {
      setSearchElements(searchElements.concat(elem));
    }
    else if (type === "joke") {
      setJokeElements(jokeElements.concat(elem));
    }
    else if (type === "list") {
      setListElements(listElements.concat(elem));
    }
  }
  function getTools(slidingDone, handleTrashing, x, hover){
    return(
        <motion.div className="tools" initial={{ opacity: 0 }} animate={hover && editable ? { opacity: 1 } : { opacity: 0 }}>
          <div className="slider-container">
            <div className="slider">
              <motion.div className="handle" dragMomentum={false} style={{ x }} drag={editable ? 'x' : false} onDragEnd={(event, info) => { slidingDone(info) }} dragConstraints={{ left: -70, right: 70 }} dragElastic={0}/>
            </div>
          </div>
          <motion.img src={trashcan} className={darkMode ? "delete-button inverted" : "delete-button"} onClick={() => { handleTrashing() }} whileHover={{ scale: 1.15 }} whileTap={{ scale: .9 }}/>
        </motion.div>
    );
  }

  const sidebarContainer = {
    hidden: { scale: 0, transition: { duration: 2 } },
    show: {
      scale: 1,
      transition: { staggerChildren: 0.375 }
    }
  };

  const sidebarItem = { hidden: { opacity: 0, scale: 0 }, show: { opacity: 1, scale: 1 } };

  function handleEdit(){
    changeEditable();
    setSteps([true, true, steps[2], steps[3], steps[4], steps[5], steps[6], steps[7], steps[8], steps[9]]);
    localStorage.setItem("steps", JSON.stringify([true, true, steps[2], steps[3], steps[4], steps[5], steps[6], steps[7], steps[8], steps[9]]));
  }

  function handleText(){
    setSteps([true, true, true, steps[3], steps[4], steps[5], steps[6], steps[7], steps[8], steps[9]]);
    localStorage.setItem("steps", JSON.stringify([true, true, true, steps[3], steps[4], steps[5], steps[6], steps[7], steps[8], steps[9]]));
  }

  function handleSearch(){
    setSteps([true, true, true, true, true, true, steps[6], steps[7], steps[8], steps[9]]);
    localStorage.setItem("steps", JSON.stringify([true, true, true, true, true, true, steps[6], steps[7], steps[8], steps[9]]));
  }

  function handleJoke(){
    setSteps([true, true, true, true, true, true, true, true, steps[8], steps[9]]);
    localStorage.setItem("steps", JSON.stringify([true, true, true, true, true, true, true, true, steps[8], steps[9]]));
  }

  function getElementIndex(identifier, elements) {
    for (let i = 0; i < elements.length; i++) {
      if (identifier === elements[i].id) {
        return i;
      }
    }
    return -1;
  }

  return (
    <Page className="cursor-auto" animate={{ backgroundColor: backgroundColor }} backgroundImage={backgroundImg}>
      <Sidebar>
        <EditButton buttonBackgroundColor={darkMode ? "#434342" : "#e0d9d3"} variants={sidebarItem}
          onClick={() => { handleEdit() }}
          whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <ItemImage invert={darkMode ? "100%" : "0%"} src={editable ? backarrow : pencil} style={{ height: "64.5%", width: "64.5%" }} />
        </EditButton>
        <Itembar variants={sidebarContainer} initial="hidden" animate={editable ? "show" : "hidden"}>
          <ItembarButton img={edit} imgDim={["55%", "35%"]} addElement={() => { addElement("text") }} darkMode={darkMode} variants={sidebarItem}
            setSteps={handleText}/>
          <ItembarButton img={date} imgDim={["60.5%", "63.5%"]} setSteps={() => { }} addElement={() => { addElement("date") }} darkMode={darkMode} variants={sidebarItem}/>
          <ItembarButton img={time} imgDim={["35%", "75%"]} setSteps={() => { }} addElement={() => { addElement("time") }} darkMode={darkMode} variants={sidebarItem}/>
          <ItembarButton img={chain} imgDim={["32%", "75%"]} setSteps={() => { }} addElement={() => { addElement("link") }} darkMode={darkMode} variants={sidebarItem}/>
          <ItembarButton img={searchv2} imgDim={["60%", "60%"]} setSteps={handleSearch} addElement={() => { addElement("search") }} darkMode={darkMode} variants={sidebarItem}/>
          <ItembarButton img={laugh} imgDim={["70%", "70%"]} setSteps={handleJoke} addElement={() => { addElement("joke") }} darkMode={darkMode} variants={sidebarItem}/>
          <ItembarButton img={todolist} imgDim={["70%", "70%"]} setSteps={() => { }} addElement={() => { addElement("list") }} darkMode={darkMode} variants={sidebarItem}/>
        </Itembar>
      </Sidebar>

      <DarkModeButton buttonBackgroundColor={darkMode ? "#434342" : "#e0d9d3"}
        onClick={() => { localStorage.setItem("darkMode", JSON.stringify(!darkMode)); setDarkMode(!darkMode) }}
        whileTap={{ scale: 0.9 }}
        whileHover={{ scale: 1.1 }}>
        <ItemImage src={darkMode ? sun : moon} invert={darkMode ? "100%" : "0%"} style={{ height: "70%", width: "70%" }}/>
      </DarkModeButton>

      <BackgroundWindow
        setBackgroundImg={setBackgroundImg}
        setBackgroundColor={setBackgroundColor}
        setBackgroundWindow={() => { setShowBackgroundWindow(!showBackgroundWindow) }} showBackgroundWindow={showBackgroundWindow}
        constraint={canvas}
        editable={editable} darkMode={darkMode}>
      </BackgroundWindow>

      <AboutWindow
        setAboutWindow={() => { setShowAboutWindow(!showAboutWindow) }} showAboutWindow={showAboutWindow}
        editable={editable} darkMode={darkMode}>
      </AboutWindow>

      {tutorialComplete ? <div/> : <Tutorial darkMode={darkMode} steps={steps} setSteps={setSteps} tutorialComplete={tutorialComplete} setTutorialComplete={setTutorialComplete}/>}
      <CursorBlur image={cursor} intensity={4} transparency = {true} canvas = {canvas}/>
      <Canvas ref={canvas}>
        <Presets>
          <motion.div animate={editable ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }} transition={{ delay: .1 }}>
            <ReactiveButton text="Set Background" darkMode={darkMode} showWindow={() => { setShowBackgroundWindow(!showBackgroundWindow) }}/>
          </motion.div>

          <motion.div animate={editable ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }} transition={{ delay: .3 }}>
            <ReactiveButton text="About" darkMode={darkMode} showWindow={() => { setShowAboutWindow(!showAboutWindow) }}/>
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
