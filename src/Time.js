import React, { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useTransform, useAnimation} from "framer-motion";
import styled from 'styled-components';
import './App.css';
import trashcan from './images/trashcan.png';
const Component = styled(motion.div)`
    position: absolute;
    left: 43%;
    top: 42%;
    display: flex;
    flex-direction: column;
    z-index: 1;
`;
const Text = styled(motion.div)`
    font-size: 3rem;
    font-weight: bold;
    color: ${props=> props.fontColor};
`;

function Time(props) {
   const [time, setTime] = useState("");
   const [hover, setHover] = useState(false);
   const [deleted, setDeleted] = useState(false);
   const component = useRef(null);

   let x = useMotionValue(getScalePos());
   const motionRange = [-70, 0, 70];
   const scaleRange = [.25, 1, 1.75];
   const scale = useTransform(x, motionRange, scaleRange);
   const controls = useAnimation();

   function getTimePeriodName(hourNumber) {
      if (hourNumber > 11 && hourNumber < 24) {
         return "pm";
      }
      else if (hourNumber === 24 || hourNumber < 12) {
         return "am";
      }
   }
   function getTwelveHourTime(hourNumber) {
      if (hourNumber > 12) {
         return hourNumber - 12;
      }
      else if (hourNumber === 0) {
         return 12;
      }
      else {
         return hourNumber;
      }
   }
   useEffect(() => {
      let d = new Date();
      let hour = d.getHours();
      let minutes = d.getMinutes();
      if (minutes < 10) { minutes = "0" + minutes; }
      let seconds = d.getSeconds();
      if (seconds < 10) { seconds = "0" + seconds; }
      setTime(getTwelveHourTime(hour) + ":" + minutes + ":" + seconds + " " + getTimePeriodName(hour));
      controls.start({x: getTranslations()[0], y: getTranslations()[1], opacity: 1, transition: {duration: 1.5}})

      const interval = setInterval(() => {
         d = new Date();
         hour = d.getHours();
         minutes = d.getMinutes();
         if (minutes < 10) { minutes = "0" + minutes; }
         seconds = d.getSeconds();
         if (seconds < 10) { seconds = "0" + seconds; }
         setTime(getTwelveHourTime(hour) + ":" + minutes + ":" + seconds + " " + getTimePeriodName(hour));
      }, 1000); // Done every second
      return () => clearInterval(interval);
   }, []);


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

   function slidingDone(event, info){
      localStorage.setItem("scalePosTime" + props.identifier, info.point.x);
   }

   function getScalePos(){
      if(localStorage.getItem("scalePosTime" + props.identifier) !== null){
         console.log(parseInt(localStorage.getItem("scalePosTime" + props.identifier)));
         return parseInt(localStorage.getItem("scalePosTime" + props.identifier));
      }
      else{
         return 0;
      }
   }

   function storeTranslations(){
      let elem = getComputedStyle(component.current);
      let matrix = new DOMMatrix(elem.transform);
      localStorage.setItem("translateXTime" + props.identifier, matrix.m41);
      localStorage.setItem("translateYTime" + props.identifier, matrix.m42);
      //console.log(localStorage.getItem("translateXDate") + props.identifier);
   }

   function getTranslations(){
      if(localStorage.getItem("translateXTime" + props.identifier) !== null){
         return [parseFloat(localStorage.getItem("translateXTime" + props.identifier)), parseFloat(localStorage.getItem("translateYTime" + props.identifier))]
      }
      else{
         console.log("yeet2");
         return [0,0];
      }
   }
   if (deleted) {
      return (<div></div>);
   }
   else {
      return (
         <Component ref= {component} animate = {controls} style={{ scale }} onHoverStart={() => { setHover(true) }} onHoverEnd={() => { setHover(false) }} dragMomentum = {false} drag={props.canEdit ? true : false} onDragEnd={()=>{storeTranslations()}} dragConstraints={{ left: -500, right: 775, top: -425, bottom: 425 }} dragTransition={{ bounceStiffness: 300, bounceDamping: 10 }}>
            <motion.div className="tools" initial={{ opacity: 0 }} animate={hover && props.canEdit ? { opacity: 1 } : { opacity: 0 }}>
               <div className="slider-container">
                  <div className="slider">
                     <motion.div className="handle" dragMomentum = {false} style={{ x }} drag={props.canEdit ? 'x' : false} onDragEnd={(event, info)=>{slidingDone(event, info)}} dragConstraints={{ left: -70, right: 70 }} dragElastic={0}></motion.div>
                  </div>
               </div>
               <motion.img src={trashcan} className={props.darkMode ? "delete-button inverted" :"delete-button"} onClick={() => { handleTrashing() }} whileHover={{ scale: 1.15 }} whileTap={{ scale: .9 }}></motion.img>
            </motion.div>
            <Text fontColor={props.darkMode ? "rgb(232, 230, 227)" : "black"}>{time}</Text>
         </Component>
      );
   }
}
export default Time;