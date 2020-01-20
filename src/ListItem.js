import React, { useState, useRef } from 'react';
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
`;
const CheckmarkButton = styled(DeleteButton)`
   grid-column-start: 1;
`;
const ItemContainer = styled(motion.div)`
   width: 26rem;
   display: grid;
   grid-template-columns: 5rem ,15rem, 5rem;
   grid-column-gap: .65rem;
   margin-bottom: 1rem;
`;

const ItemInput = styled(motion.input)`
   width: 100%;
   height: 3rem;
   border-radius: 1rem;
   background-color: rgb(90%,90%,90%);
   grid-column-start: 2;
   border: none;
   display: flex;
   justify-content: center;
   align-items: center;
   text-align: center;
   font-size: 1.5rem;
   font-family: "Roboto";
`;

function ListItem(props) {
   const [hover, setHover] = useState(false);
   const [deleted, setDeleted] = useState(false);
   const task = useRef(null);
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
      if(task.current.value != ""){
         task.current.style.setProperty("text-decoration", "line-through");
         task.current.readOnly = true;
      }
   }
   return(
         <ItemContainer initial={{ opacity: .7, y: -30, scale: .1 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, scale: 0.1 }} onHoverStart={() => { setHover(true) }} onHoverEnd={() => { setHover(false) }}>
            <CheckmarkButton src={checkmarkbutton} onClick={()=>{strikeThroughTask()}} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} initial={{ opacity: 0, scale: 0.1 }} animate={hover ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.1 }}></CheckmarkButton>
            <ItemInput ref={task} placeholder="Task" initial={{ y: -30, opacity: 0 }} animate={{ y: 0, opacity: 1 }}></ItemInput>
            <DeleteButton src={deletebutton} onClick={() => { handleDelete() }} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} initial={{ opacity: 0, scale: 0.1 }} animate={hover ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.1 }}></DeleteButton>
         </ItemContainer>
   );
}
export default ListItem;