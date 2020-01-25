import React, { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useTransform, useAnimation} from "framer-motion";
import styled from 'styled-components';
import './App.css';
import trashcan from './images/trashcan.png';
import axios from "axios";
import { loadPartialConfig } from '@babel/core';

const Component = styled(motion.div)`
    position: absolute;
    left: 39%;
    top: 47%;
    display: flex;
    flex-direction: column;
    z-index: 1;
    color: ${props=> props.fontColor};
`;

const JokeSetup = styled(motion.div)`
   background-color: ${props=>props.backgroundColor};
   height: 3.25rem;
   display: flex;
   flex-direction: column;
   justify-content: center;
   text-align: center;
   padding-left: 1rem;
   padding-right: 1rem;
   font-size: 1.25rem;
   border-radius: 1rem;
   margin-bottom: .75rem;
`;
const JokePunchline = styled(JokeSetup)`
   margin-bottom: 0rem;
   background-color: ${props=>props.backgroundColor};

`

function Joke(props){
   const [jokeSetup, setJokeSetup] = useState("");
   const [jokePunchline, setJokePunchline] = useState("");
   const [loading, setLoading] = useState(true);
   const [showPunchline, setShowPunchline] = useState(false);
   const [error, setError] = useState(false);
   const [hover, setHover] = useState(false);
   const [deleted, setDeleted] = useState(false);
   const component = useRef(null);

   const x = useMotionValue(getScalePos());
   const motionRange = [-70, 0, 70];
   const scaleRange = [.25, 1, 1.75];
   const scale = useTransform(x, motionRange, scaleRange);
   const controls = useAnimation();

   useEffect(()=>{
      const fetchData = async () => {
         setError(false);
         setLoading(true);
         try{
            const result = await axios("https://official-joke-api.appspot.com/random_joke");
            setJokeSetup(result.data.setup);
            setJokePunchline(result.data.punchline);
         }
         catch(error){
            setError(true);
         }
         setLoading(false);
      }
      fetchData();
      controls.start({x: getTranslations()[0], y: getTranslations()[1], opacity: 1, transition: {duration: 1.5}})
   },[])
   // Trashing
   function getElementIndex(identifier){
      for(let i = 0; i < props.elements.length; i++){
         if(identifier === props.elements[i].id){
            return i;
         }
      }
      return -1;
   }

   function handleTrashing() {
      if (props.canEdit) {
         setDeleted(true);
         let modifiedArray = props.elements.slice(0, getElementIndex(props.identifier)).concat(props.elements.slice(getElementIndex(props.identifier) + 1, props.elements.length));
         props.onChange(modifiedArray);
      }
      else {
         return;
      }
   }

   //Scale
   function slidingDone(event, info){
      localStorage.setItem("scalePosJoke" + props.identifier, info.point.x);
   }

   function getScalePos(){
      if(localStorage.getItem("scalePosJoke" + props.identifier) !== null){
         console.log(parseInt(localStorage.getItem("scalePosJoke" + props.identifier)));
         return parseInt(localStorage.getItem("scalePosJoke" + props.identifier));
      }
      else{
         return 0;
      }
   }
   // Translations
   function storeTranslations(){
      let elem = getComputedStyle(component.current);
      let matrix = new DOMMatrix(elem.transform);
      localStorage.setItem("translateXJoke" + props.identifier, matrix.m41);
      localStorage.setItem("translateYJoke" + props.identifier, matrix.m42);
      //console.log(localStorage.getItem("translateXDate") + props.identifier);
   }

   function getTranslations(){
      if(localStorage.getItem("translateXJoke" + props.identifier) !== null){
         return [parseFloat(localStorage.getItem("translateXJoke" + props.identifier)), parseFloat(localStorage.getItem("translateYJoke" + props.identifier))]
      }
      else{
         return [0,0];
      }
   }

   return(
     <Component fontColor={props.darkMode ? "rgb(232, 230, 227)" : "black"} ref= {component} initial={{opacity: 0}} animate = {controls} style={{ scale }} onHoverStart={() => { setHover(true) }} onHoverEnd={() => { setHover(false) }} dragMomentum = {false} drag={props.canEdit ? true : false} onDragEnd={()=>{storeTranslations()}} dragConstraints={props.canvas} dragTransition={{ bounceStiffness: 300, bounceDamping: 10 }}>
         <motion.div className="tools" initial={{ opacity: 0 }} animate={hover && props.canEdit ? { opacity: 1 } : { opacity: 0 }}>
            <div className="slider-container">
               <div className="slider">
                  <motion.div className="handle" dragMomentum = {false} style={{ x }} drag={props.canEdit ? 'x' : false} onDragEnd={(event, info)=>{slidingDone(event, info)}} dragConstraints={{ left: -70, right: 70 }} dragElastic={0}></motion.div>
               </div>
            </div>
            <motion.img src={trashcan} className={props.darkMode ? "delete-button inverted" :"delete-button"} onClick={() => {handleTrashing()}} whileHover={{ scale: 1.15 }} whileTap={{ scale: .9 }}></motion.img>
         </motion.div>
        <JokeSetup backgroundColor = {props.darkMode ? "rgb(32, 34, 35)" : "#e4e4e4"}
        initial={{opacity: 0}} 
        animate={jokeSetup !== "" ? {opacity: 1} : {opacity: 0}}
        onClick={()=>{setShowPunchline(true)}} whileHover={showPunchline ? {scale: 1} : {scale: 1.05}} whileTap={showPunchline ? {scale: 1} :{scale: 0.95}}> 
        {loading ? "..." : jokeSetup}
        </JokeSetup>
        <JokePunchline backgroundColor = {props.darkMode ? "rgb(32, 34, 35)" : "#e4e4e4"} 
        initial={{opacity: 0, y: -20}} 
        animate={showPunchline ? {opacity: 1, y: 0} : {opacity: 0}}>{error ? "something went wrong" : jokePunchline}
        </JokePunchline>
     </Component>
   );
}
export default Joke;