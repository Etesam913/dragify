import React, { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useTransform, useAnimation} from "framer-motion";
import styled from 'styled-components';
import './App.css';
import trashcan from './images/trashcan.png';

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
`;

const Todo = styled.ul`
   padding: 0;
   list-style-type: none;
   margin-top: 0rem;
`;
const Test = styled.div`
   height: 2rem;
   width: 2rem;
   background-color: red;
`
const Item = styled.input`
   width: 20rem;
   height: 3rem;
   border-radius: 1rem;
   background-color: rgb(90%,90%,90%);
   border: none;
   margin-bottom: 1rem;
   display: flex;
   justify-content: center;
   align-items: center;
   text-align: center;
   font-size: 1.5rem;
`;

function List(props){
   const [items, setItems] = useState([]);

   function addItem(){
      const currentItem = [{id: Math.random() * 100, active: true}];
      setItems(items.concat(currentItem));
   }
   const listItems = items.map((props) => {
      if(props.active){
         return <Item key={props.id} placeholder="Task"></Item>
      }
      else{
         return <p>bob</p> // needs to be changed
      }
   })
   return(
      <Component drag dragMomentum={false}>
         <ListContainer>
            <ListHeader placeholder="Title" ></ListHeader>
            <Test onClick={()=>{addItem()}}></Test>
            <Todo>
               {listItems}
            </Todo>
         </ListContainer>
      </Component>
     
   );
}
export default List;