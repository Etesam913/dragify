import React, { useState, useEffect, useRef } from 'react';
import { motion, useTransform, useMotionValue, useAnimation } from 'framer-motion';
import styled from 'styled-components';
import './App.css';
import { CirclePicker } from 'react-color';


const TextArea = styled(motion.input)`
  font-size: 3rem;
  font-family: "Inter";
  outline: none;
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
    z-index: 1;	

`;
const ColorContainer = styled(motion.div)`
   width: 100%;
   display: flex;
   justify-content: center;
   transform: scale(.8);
`;

function Text(props) {
   const [hover, setHover] = useState(false);
   const [drag, setDrag] = useState(false);
   const [color, setColor] = useState("#000000");
   const textInput = useRef(null);
   const component = useRef(null);
   // Animation
   const controls = useAnimation();
   let x = useMotionValue(getScalePos());
   const motionRange = [-70, 0, 70];
   const scaleRange = [.25, 1, 1.75];
   let scale = useTransform(x, motionRange, scaleRange);

   useEffect(() => {
      textInput.current.value = localStorage.getItem("text" + props.identifier);
      controls.start({ x: getTranslations()[0], y: getTranslations()[1], opacity: 1, transition: { duration: 1.5 } });
      console.log(props.canvas.current.offsetWidth + ", " + props.canvas.current.offsetHeight);

      if(localStorage.getItem("colorText" + props.identifier) !== null){
         setColor(localStorage.getItem("colorText" + props.identifier));
      }
 
   }, []);

   
   useEffect(()=>{
    controls.start({ x: getTranslations()[0], y: getTranslations()[1], opacity: 1, transition: { duration: 1.5 } });

   }, [props.windowResize]);

   function handleTrashing() {
      if (props.canEdit) {
         localStorage.setItem("text" + props.identifier, "");
         localStorage.setItem("scalePosText" + props.identifier, "0");
         const modifiedArray = props.elements.slice(0, props.getElementIndex(props.identifier, props.elements)).concat(props.elements.slice(props.getElementIndex(props.identifier, props.elements) + 1, props.elements.length));
         props.onChange(modifiedArray);
      }
   }
   function handleColorChange(colorVal){
      setColor(colorVal.hex);
      localStorage.setItem("colorText" + props.identifier, colorVal.hex);
   }
   function slidingDone(info) {
      storeScale();
      localStorage.setItem("scalePosText" + props.identifier, "" + info.point.x);
   }
   function storeTranslations() {
      setTimeout(function () {
         if (component.current !== null) {
            let elem = getComputedStyle(component.current);
            let matrix = new DOMMatrix(elem.transform);

            localStorage.setItem("translateXText" + props.identifier, "" + matrix.m41);
            localStorage.setItem("translateYText" + props.identifier, "" + matrix.m42);
            //console.log(localStorage.getItem("translateXText" + props.identifier));
            //console.log(localStorage.getItem("translateYText" + props.identifier));
         }
      },1000)
   }
   function getTranslations() {
      if (localStorage.getItem("translateXText" + props.identifier) !== null) {
         return [parseFloat((localStorage.getItem("translateXText" + props.identifier))), parseFloat(localStorage.getItem("translateYText" + props.identifier))]
      }
      else {
         return [0, 0];
      }
   }
   function getScalePos() {
      if (localStorage.getItem("scalePosText" + props.identifier) !== null) {
         return parseInt(localStorage.getItem("scalePosText" + props.identifier));
      }
      else {
         return 0;
      }
   }
   function storeScale() {
      localStorage.setItem("scaleText" + props.identifier, scale.current);
      //console.log(localStorage.getItem("scaleText" + props.identifier));
   }

   function handleTextChange(event){
    localStorage.setItem("text" + props.identifier, event.target.value);
    if(textInput.current.value !== ""){
      props.setSteps([true, true, true, true, props.steps[4], props.steps[5], props.steps[6], props.steps[7], props.steps[8], props.steps[9]]);
      localStorage.setItem("steps", JSON.stringify([true, true, true, true, props.steps[4], props.steps[5], props.steps[6], props.steps[7], props.steps[8], props.steps[9]]));
    }
   }

   function handleDragStart(){
    setDrag(true);
    props.soundEffect.play(0.5);
    props.setSteps([true, true, true, true, true, props.steps[5], props.steps[6], props.steps[7], props.steps[8], props.steps[9]]);
    localStorage.setItem("steps", JSON.stringify([true, true, true, true, true, props.steps[5], props.steps[6], props.steps[7], props.steps[8], props.steps[9]]));
  }
   return (
      <Component className={drag ? "cursor-dragging" : "cursor-drag"} ref={component}
       initial={{ x: 0, y: 0, opacity: 0 }} animate={controls} style={{ scale }} transition={{ opacity: { duration: 1 } }}
       onHoverStart={() => { setHover(true) }} onHoverEnd={() => { setHover(false) }}
       dragMomentum={false} onDragStart={()=>{handleDragStart()}}
       drag={props.canEdit && props.steps[3] ? true : false}
       onDragEnd={() => { storeTranslations(); setDrag(false); props.soundEffect.play(0.3)}}
       dragConstraints={props.canvas}>
         {props.getTools(slidingDone, handleTrashing, x, hover)}
         <TextArea className= {drag ? "text-shadow" : "cursor-text"} ref={textInput}
            animate={{color: color}} transition={{duration: 0.5, type: "spring", damping: 300}} readOnly={props.canEdit ? false : true}
            onChange={(event) => { handleTextChange(event) }} placeholder="Enter Text Here"></TextArea>
         <ColorContainer initial={{ opacity: 0}} animate={hover && props.canEdit ? { opacity: 1} : { opacity: 0 }}>
            <CirclePicker colors={props.colorArray} width="30rem" onChange={handleColorChange}/>
         </ColorContainer>
      </Component>
   );

}
export default Text;