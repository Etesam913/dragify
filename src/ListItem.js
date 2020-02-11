import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { motion} from "framer-motion";
import deletebutton from './images/deletebutton.png';
import checkmarkbutton from './images/checkmarkbutton.png';

const DeleteButton = styled(motion.img)`
   height: 2.5rem;
   width: 2.5rem;
   justify-self: center;
   align-self: center;
   grid-column-start: 3;
   padding-right: .40rem;
   filter: invert(${props=> props.invert});

`;
const CheckmarkButton = styled(DeleteButton)`
   grid-column-start: 1;
   justify-self: center;
   align-self: center;
   padding-left: .40rem;
   filter: invert(${props=> props.invert});

`;
const ItemContainer = styled(motion.div)`
   display: inline-grid;
   grid-template-columns: 5rem, 15rem, 5rem;
   column-gap: 1rem;
   margin-bottom: 1rem;
`;

const ItemInput = styled(motion.input)`
   width: 16rem;
   height: 3rem;
   border-radius: 1rem;
   background-color: ${props=>props.backgroundColor};
   color: ${props=>props.fontColor};
   grid-column-start: 2;
   border: none;
   justify-content: center;
   align-items: center;
   text-align: center;
   font-size: 1.5rem;
   font-family: "Gothic A1";
   padding-left: 1rem;
   padding-right: 1rem;
`;

function ListItem(props) {
   const [hover, setHover] = useState(false);
   const task = useRef(null);

   useEffect(()=>{
      if(localStorage.getItem("task" + props.identifier) !== null){
         task.current.value = localStorage.getItem("task" + props.identifier);
      }
      if(JSON.parse(localStorage.getItem("isDone" + props.identifier)) === true){
         task.current.style.setProperty("text-decoration", "line-through");
         task.current.readOnly = true;
      }
      console.log(props.canEdit);
   }, [])

   function handleDelete(){
      let indexToTrack = 0;
      let tempArr = [];
      for(let i = 0; i < props.items.length; i++){
         tempArr.push(props.items[i]);
         if(props.items[i] === props.element){
            indexToTrack = i;
         }
      }
      tempArr[indexToTrack].active = false;
      props.setItems(tempArr);
   }
   function strikeThroughTask(){
      if(task.current.value !== ""){
         task.current.style.setProperty("text-decoration", "line-through");
         localStorage.setItem("isDone" + props.identifier, JSON.stringify(true));
         task.current.readOnly = true;
      }
   }
   return(
         <ItemContainer initial={{ opacity: .7, y: -30, scale: .1 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, scale: 0.1 }} onHoverStart={() => { setHover(true) }} onHoverEnd={() => { setHover(false) }}>
            <CheckmarkButton invert = {props.darkMode ? "100%" : "0%"} src={checkmarkbutton} onClick={()=>{strikeThroughTask()}} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} initial={{ opacity: 0, scale: 0.1 }} animate={hover && props.canEdit ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.1 }}></CheckmarkButton>
            <ItemInput backgroundColor = {props.darkMode ? "rgb(32, 34, 35)" : "#e4e4e4"} fontColor={props.darkMode ? "rgb(232, 230, 227)" : "black"} ref={task} onChange={(event)=>{localStorage.setItem("task" + props.identifier, event.target.value)}} placeholder="Task" initial={{ y: -30, opacity: 0 }} animate={{ y: 0, opacity: 1 }}></ItemInput>
            <DeleteButton invert = {props.darkMode ? "100%" : "0%"} src={deletebutton} onClick={() => {handleDelete()}}  whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} initial={{ opacity: 0, scale: 0.1 }} animate={hover && props.canEdit ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.1 }}></DeleteButton>
         </ItemContainer>
   );
}
export default ListItem;