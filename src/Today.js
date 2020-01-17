import React, { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useTransform, useAnimation } from "framer-motion";
import './App.css';
import styled from 'styled-components';
import trashcan from './images/trashcan.png';

const Component = styled(motion.div)`
    position: absolute;
    left: 40%;
    top: 42%;
    display: flex;
    flex-direction: column;
    z-index:1;
`;
const Text = styled(motion.div)`
    font-size: 3rem;
    font-weight: bold;
`;

function Today(props) {
   const [today, setToday] = useState("");
   const [hover, setHover] = useState(false);
   const [deleted, setDeleted] = useState(false);
   const component = useRef(null);
   let x = useMotionValue(getScalePos());
   const motionRange = [-70, 0, 70];
   const scaleRange = [.25, 1, 1.75];
   const scale = useTransform(x, motionRange, scaleRange);
   const controls = useAnimation();

   useEffect(() => {
      var d = new Date();
      var monthNumber = d.getMonth();
      var day = d.getDate();
      var year = d.getFullYear();
      setToday(getMonth(monthNumber) + " " + day + " " + year);
      controls.start({x: getTranslations()[0], y: getTranslations()[1], opacity: 1, transition: {duration: 1.5}})
      const interval = setInterval(() => {
         d = new Date();
         monthNumber = d.getMonth();
         day = d.getDate();
         year = d.getFullYear();
         setToday(getMonth(monthNumber) + " " + day + " " + year);
      }, 30000); // Done every 30 seconds
      return () => clearInterval(interval);
   }, []);
   
   function getElementIndex(identifier){
      for(let i = 0; i < props.elements.length; i++){
         //console.log(props.elements[i]);
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
      storeScale();
      //console.log(info.point.x);
      localStorage.setItem("scalePosDate" + props.identifier, info.point.x);
   }

   function storeScale(){
      localStorage.setItem("scaleDate" + props.identifier, scale.current);
      //console.log(localStorage.getItem("scaleDate" + props.identifier));
   }

   function storeTranslations(){
      let elem = getComputedStyle(component.current);
      let matrix = new DOMMatrix(elem.transform);
      localStorage.setItem("translateXDate" + props.identifier, matrix.m41);
      localStorage.setItem("translateYDate" + props.identifier, matrix.m42);
      //console.log(localStorage.getItem("translateXDate") + props.identifier);
   }

   function getTranslations(){
      if(localStorage.getItem("translateXDate" + props.identifier) !== null){
         return [parseFloat(localStorage.getItem("translateXDate" + props.identifier)), parseFloat(localStorage.getItem("translateYDate" + props.identifier))]
      }
      else{
         console.log("yeet2");
         return [0,0];
      }
   }

   function getScalePos(){
      if(localStorage.getItem("scalePosDate" + props.identifier) !== null){
         console.log(parseInt(localStorage.getItem("scalePosDate" + props.identifier)));
         return parseInt(localStorage.getItem("scalePosDate" + props.identifier));
      }
      else{
         return 0;
      }
   }

   function getMonth(index) {
      let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      for (let i = 0; i < months.length; i++) {
         if (i === index) {
            return months[i];
         }
      }
      return "That month does not exist";
   }
   
   if (deleted) {
      return (
         <div></div>
      );
   }
   else {
      return (
         <Component ref= {component} initial = {{opacity: 0}}animate={controls} style={{ scale }} onHoverStart={() => { setHover(true) }} dragMomentum = {false} onHoverEnd={() => { setHover(false) }} drag={props.canEdit ? true : false} onDragEnd={()=>{storeTranslations()}} dragConstraints={{ left: -500, right: 630, top: -425, bottom: 425 }} dragTransition={{ bounceStiffness: 300, bounceDamping: 10 }}>
            <motion.div className="tools" initial={{ opacity: 0 }} animate={hover && props.canEdit ? { opacity: 1 } : { opacity: 0 }}>
               <div className="slider-container">
                  <div className="slider">
                     <motion.div className="handle" style={{ x }} drag={props.canEdit ? 'x' : false} dragConstraints={{ left: -70, right: 70 }} dragElastic={0} onDragEnd={(event, info)=>{slidingDone(event, info)}}></motion.div>
                  </div>
               </div>
               <motion.img src={trashcan} className="delete-button" onClick={() => { handleTrashing() }} whileHover={{ scale: 1.15 }} whileTap={{ scale: .9 }}></motion.img>
            </motion.div>
            <Text>{today}</Text>
         </Component>
      );
   }
}
export default Today;