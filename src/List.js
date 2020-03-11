import React, { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useTransform, useAnimation, AnimatePresence} from "framer-motion";
import styled from 'styled-components';
import ListItem from './ListItem';
import './App.css';
import trashcan from './images/trashcan.png';
import addbutton from './images/addbutton.png';
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
   width: 26rem;
   text-align: center;
   outline: none;
   margin-bottom: 1rem;
   border-top: none; border-left: none; border-right: none;
   border-bottom-style: solid;
   border-bottom-color: ${props=>props.borderColor};
   border-bottom-width: .13rem;
   background-color: #fff0;
   font-family: "Inter";
   color: ${props => props.fontColor};
`;

const Todo = styled.ul`
   max-height: 25rem;
   display: flex;
   flex-direction: column;
   padding: 0;
   list-style-type: none;
   margin-top: 0rem;
   overflow-y: scroll;
   overflow-x: hidden;
`;
const AddButton = styled(motion.img)`
   height: 3rem;
   width: 3rem;
   filter: invert(${props=> props.invert});
`
function List(props){
   const [items, setItems] = useState([]);
   const [hover, setHover] = useState(false);
   const [deleted, setDeleted] = useState(false);
   const component = useRef(null);
   const header = useRef(null);
   const x = useMotionValue(getScalePos());
   const motionRange = [-70, 0, 70];
   const scaleRange = [.25, 1, 1.75];
   const scale = useTransform(x, motionRange, scaleRange);
   const controls = useAnimation();

   useEffect(()=>{
      if(JSON.parse(localStorage.getItem("listItems" + props.identifier)) !== null){
         setItems(JSON.parse(localStorage.getItem("listItems" + props.identifier)));
      }
      if(localStorage.getItem("listHeader" + props.identifier) != null){
         header.current.value = localStorage.getItem("listHeader" + props.identifier);
      }
      controls.start({x: getTranslations()[0], y: getTranslations()[1], opacity: 1, transition: {duration: 1.5}});

   }, [])

   useEffect(()=>{
      localStorage.setItem("listItems" + props.identifier, JSON.stringify(items));
   }, [items])

   useEffect(()=>{
    controls.start({ x: getTranslations()[0], y: getTranslations()[1], opacity: 1, transition: { duration: 1.5 } });

   }, [props.windowResize])
   
   function addItem(){
      const currentItem = [{id: Math.random() * 100, active: true}];
      localStorage.setItem("listItems" + props.identifier, JSON.stringify(items.concat(currentItem)));
      setItems(items.concat(currentItem));
   }
   const listItems = items.map((data) => {
         return (
            <AnimatePresence>
               {data.active && (<ListItem key={data.id} identifier = {data.id} element={data} darkMode = {props.darkMode} canEdit = {props.canEdit} items={items} setItems={handleItems}></ListItem>)}
            </AnimatePresence>
         );
   })
   function handleItems(arr){
      setItems(arr);
   }

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
      localStorage.setItem("scalePosList" + props.identifier, info.point.x);
   }

   function getScalePos(){
      if(localStorage.getItem("scalePosList" + props.identifier) !== null){
         console.log(parseInt(localStorage.getItem("scalePosList" + props.identifier)));
         return parseInt(localStorage.getItem("scalePosList" + props.identifier));
      }
      else{
         return 0;
      }
   }

   // Translations
   function storeTranslations(){
      setTimeout(function(){
         if(component.current!==null){
            let elem = getComputedStyle(component.current);
            let matrix = new DOMMatrix(elem.transform);
            localStorage.setItem("translateXList" + props.identifier, matrix.m41);
            localStorage.setItem("translateYList" + props.identifier, matrix.m42);
            console.log(localStorage.getItem("translateXList" + props.identifier));
            console.log(localStorage.getItem("translateYList" + props.identifier));
         }
      }, 1000)
   }

   function getTranslations(){
      if(localStorage.getItem("translateXList" + props.identifier) !== null){
         return [parseFloat(localStorage.getItem("translateXList" + props.identifier)), parseFloat(localStorage.getItem("translateYList" + props.identifier))]
      }
      else{
         return [0,0];
      }
   }

   if(deleted){
      return(<div></div>);
   }

   else{
      return(
         <Component ref= {component} initial={{opacity: 0}} animate = {controls} style={{ scale }} onHoverStart={() => { setHover(true) }} onHoverEnd={() => { setHover(false) }} drag={props.canEdit ? true : false} onDragEnd={()=>{storeTranslations()}} dragConstraints={props.canvas} dragTransition={{ bounceStiffness: 300, bounceDamping: 10 }}>
            <motion.div className="tools" initial={{ opacity: 0 }} animate={hover && props.canEdit ? { opacity: 1 } : { opacity: 0 }}>
               <AddButton src={addbutton} invert = {props.darkMode ? "100%" : "0%"} 
               onClick={()=>{addItem()}} initial={{opacity: 0}} animate={hover ? {opacity: 1} : {opacity: 0}} whileHover={{scale: 1.1}} whileTap={{scale: 0.9}}>
               </AddButton>
               <div className="slider-container">
                  <div className="slider">
                     <motion.div className="handle" dragMomentum = {false} style={{ x }} drag={props.canEdit ? 'x' : false} onDragEnd={(event, info)=>{slidingDone(event, info)}} dragConstraints={{ left: -70, right: 70 }} dragElastic={0}></motion.div>
                  </div>
               </div>
               <motion.img src={trashcan} className={props.darkMode ? "delete-button inverted" :"delete-button"} onClick={() => {handleTrashing()}} whileHover={{ scale: 1.15 }} whileTap={{ scale: .9 }}></motion.img>
            </motion.div>
            
            <ListContainer>
               <ListHeader borderColor={props.darkMode ? "white" : "black"} ref = {header} placeholder="Title" fontColor={props.darkMode ? "rgb(232, 230, 227)" : "black"} onChange={(event)=>{localStorage.setItem("listHeader" + props.identifier, event.target.value)}}></ListHeader>
               <Todo>
                  {listItems}
               </Todo>
            </ListContainer>
         </Component>
      );
   }
   
}
export default List;