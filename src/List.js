import React, { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useTransform, useAnimation, AnimatePresence} from "framer-motion";
import styled from 'styled-components';
import ListItem from './ListItem';
import './App.css';
import trashcan from './images/trashcan.png';
import addbutton from './images/addbutton.png';
import deletebutton from './images/deletebutton.png';
const Component = styled(motion.div)`
    position: absolute;
    left: 39%;
    top: 47%;
    display: flex;
    flex-direction: column;
    z-index: 1;
`;
const ListContainer = styled.div`
   display: flex;
   flex-direction: column;
   align-items: center;
`;
const ListHeader = styled.input`
   font-size: 2rem;
   font-weight: bold;
   width: 25rem;
   text-align: center;
   margin-bottom: 1rem;
   border-top: none; border-left: none; border-right: none;
   border-bottom-style: solid;
   border-bottom-color: black;
   border-bottom-width: .13rem;
   background-color: #fff0;
`;

const Todo = styled.ul`
   padding: 0;
   list-style-type: none;
   margin-top: 0rem;
`;
const AddButton = styled(motion.img)`
   height: 3rem;
   width: 3rem;
`
const DeleteButton = styled(AddButton)`
   height: 2.5rem;
   width: 2.5rem;
   justify-self: center;
   align-self: center;
   grid-column-start: ${props => props.column};
`;
const ItemContainer=styled.div`
   width: 25rem;
   display: grid;
   grid-template-columns: 5rem ,15rem, 5rem;
   margin-bottom: 1rem;
`;
const Item = styled(motion.div)`
   grid-column-start: 2;
   border-radius: 1rem;
`;

const ItemInput = styled(motion.input)`
   width: 100%;
   height: 3rem;
   border-radius: 1rem;
   background-color: rgb(90%,90%,90%);
   border: none;
   display: flex;
   justify-content: center;
   align-items: center;
   text-align: center;
   font-size: 1.5rem;
`;

function List(props){
   const [items, setItems] = useState([]);
   const [hover, setHover] = useState(false);
   function addItem(){
      const currentItem = [{id: Math.random() * 100, active: true}];
      setItems(items.concat(currentItem));
   }
   const listItems = items.map((props) => {
         return (
            <AnimatePresence>
               {props.active && (<ListItem key={props.id} element={props} items={items} setItems={handleItems}></ListItem>)}
            </AnimatePresence>
         );
   })
   function handleItems(arr){
      setItems(arr);
   }
   return(
      <Component drag dragMomentum={false} onHoverStart={()=> {setHover(true)}} onHoverEnd={()=> {setHover(false)}}>
         <AddButton src={addbutton} 
         onClick={()=>{addItem()}} initial={{opacity: 0}} animate={hover ? {opacity: 1} : {opacity: 0}} whileHover={{scale: 1.1}} whileTap={{scale: 0.9}}>
         </AddButton>
         <ListContainer>
            <ListHeader placeholder="Title" ></ListHeader>
            <Todo>
               {listItems}
            </Todo>
         </ListContainer>
      </Component>
   );
}
export default List;