import React, { useState, useEffect, useRef } from 'react';
import { motion, useTransform, useMotionValue, useAnimation } from 'framer-motion';
import styled from 'styled-components';
import './App.css';
import trashcan from './images/trashcan.png';

const TextArea = styled(motion.input)`
  font-weight: bold;
  font-size: 3rem;
  font-family: "Roboto";
  text-align: center;
  border-top: none; border-left: none; border-right: none; border-bottom: none;
  background-color: #fff0;
`;
const Component = styled(motion.div)`
    position: absolute;
    left: 32%;
    top: 38%;
    display: flex;
    flex-direction: column;
    width: 40rem;
    z-index: 1
`;
function Text(props) {
   const [hover, setHover] = useState(false);
   const [deleted, setDeleted] = useState(false);
   const textInput = useRef(null);
   const component = useRef(null);
   // Animation
   const controls = useAnimation();
   let x = useMotionValue(getScalePos());
   const motionRange = [-70, 0, 70];
   const scaleRange = [.25, 1, 1.75];
   let scale = useTransform(x, motionRange, scaleRange);
   
   
   useEffect(()=>{
      textInput.current.value = localStorage.getItem("text" + props.identifier);
      console.log(JSON.parse(localStorage.getItem("translateXText" + props.identifier)));
      console.log(JSON.parse(localStorage.getItem("translateYText" + props.identifier)));
      controls.start({x: getTranslations()[0], y: getTranslations()[1], opacity: 1, transition: {duration: 1.5}})
   }, [])

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
         localStorage.setItem("text" + props.identifier,  "");
         localStorage.setItem("scalePosText" + props.identifier, "0");
         let modifiedArray = props.elements.slice(0, getElementIndex(props.identifier)).concat(props.elements.slice(getElementIndex(props.identifier) + 1, props.elements.length));
         console.log("identifier :" + props.identifier);
         //console.log("index: " + getElementIndex(props.identifier));
         console.log("Modified array : " + modifiedArray);
         props.onChange(modifiedArray);
      }
      else {
         return;
      }
   }
   function slidingDone(event, info){
      storeScale();
      console.log(info.point.x);
      localStorage.setItem("scalePosText" + props.identifier, info.point.x);
   }
   function storeTranslations(){
      let elem = getComputedStyle(component.current);
      let matrix = new DOMMatrix(elem.transform);
      
      console.log(matrix.m41 + ", " + matrix.m42);
      localStorage.setItem("translateXText" + props.identifier, matrix.m41);
      localStorage.setItem("translateYText" + props.identifier, matrix.m42);
      console.log(localStorage.getItem("translateXText" + props.identifier));
      console.log(localStorage.getItem("translateYText" + props.identifier));
   }
   function getTranslations(){
      if(localStorage.getItem("translateXText" + props.identifier) !== null){
         console.log(localStorage.getItem("translateXText" + props.identifier));
         console.log(localStorage.getItem("translateYText" + props.identifier));
         return [parseFloat(localStorage.getItem("translateXText" + props.identifier)), parseFloat(localStorage.getItem("translateYText" + props.identifier))]
      }
      else{
         return [0,0];
      }
   }
   function getScalePos(){
      if(localStorage.getItem("scalePosText" + props.identifier) !== null){
         return parseInt(localStorage.getItem("scalePosText" + props.identifier));
      }
      else{
         return 0;
      }
   }
   function storeScale(){
      localStorage.setItem("scaleText" + props.identifier, scale.current);
      console.log(localStorage.getItem("scaleText" + props.identifier));
   }

   if (deleted) {
      return (
         <div></div>
      );
   }
   else {
      return (
         <Component ref={component}  initial = {{x: 0, y: 0, opacity: 0}} animate={controls} style={{scale}} transition={{opacity: {duration: 1}}} onHoverStart={() => { setHover(true) }} dragMomentum = {false} onHoverEnd={() => { setHover(false) }} drag={props.canEdit ? true : false} onDragEnd={()=>{storeTranslations()}} dragConstraints={{ left: -500, right: 500, top: -350, bottom: 475 }}>
            <motion.div className="tools" initial={{ opacity: 0 }} animate={hover && props.canEdit ? { opacity: 1 } : { opacity: 0 }}>
               <div className="slider-container">
                  <div className="slider">
                     <motion.div className="handle" style={{ x }} drag={props.canEdit ? 'x' : false} dragConstraints={{ left: -70, right: 70 }} dragElastic={0} dragMomentum={false}  onDragEnd={(event, info)=>{slidingDone(event, info)}}></motion.div>
                  </div>
               </div>
               <motion.img src={trashcan} className="delete-button" onClick={() => { handleTrashing() }} whileHover={{ scale: 1.15 }} whileTap={{ scale: .9 }}></motion.img>
            </motion.div>
            <TextArea  readOnly={props.canEdit ? false : true}  ref = {textInput} onChange={(event)=>{localStorage.setItem("text" + props.identifier, event.target.value)}} placeholder="placeholder"></TextArea>
         </Component>
      );
   }
}
export default Text;