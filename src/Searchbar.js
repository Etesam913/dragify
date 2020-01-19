import React, { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useTransform, useAnimation} from "framer-motion";
import styled from 'styled-components';
import './App.css';
import trashcan from './images/trashcan.png';
import search from './images/search.png';
import google from './images/google.png';
import duckduckgo from './images/duckduckgo.png';
import bing from './images/bing.png';
const Component = styled(motion.div)`
    position: absolute;
    left: 43%;
    top: 42%;
    display: flex;
    flex-direction: column;
    z-index: 1;
    width: 15rem;
`;

const BarContainer = styled.form`
   border: none;
   background-color: #e4e4e4;
   height: 2rem;
   border-radius: 2rem;
   
   font-family: "Public Sans";
   width: 20rem;
   margin-top: .5rem;
   display: flex;
   align-items: center;
`

const Bar = styled.input`
   width: 15rem;
   font-family: "Public Sans";
   border: none;
   font-size: 1rem;
   background: transparent;
   
`
const MagnifyingGlass = styled(motion.button)`
   border: none;
   width: 1.5rem;
   margin-left: .5rem;
   height: 100%;
   background-color: transparent;
   background-image: url(${search});
   background-size: 1.25rem, 1.25rem;
   background-position-y: 50%;
   background-repeat: no-repeat;
`;
const SearchLogo = styled(motion.img)`
   height: 1.2rem;
   margin-right: .3rem;
   margin-left: .5rem;
`
const SearchLogoListItem = styled(SearchLogo)`
   margin-right: 0rem;

`;
function Searchbar(props){
   const component = useRef(null);
   const [engine, setEngine] = useState({image: google, placeholder: "Search Google", action: "https://www.google.com/search"});
   const [otherEngines, setOtherEngines] = useState([]);
   const [showList, setShowList] = useState(false);

   // Animation
   const x = useMotionValue(getScalePos());
   const [hover, setHover] = useState(false);
   const motionRange = [-70, 0, 70];
   const scaleRange = [.25, 1, 1.75];
   const [deleted, setDeleted] = useState(false);
   const scale = useTransform(x, motionRange, scaleRange);
   const controls = useAnimation();

   useEffect(()=>{
      if(JSON.parse(localStorage.getItem("engine" + props.identifier)) !== null){
         setEngine(JSON.parse(localStorage.getItem("engine" + props.identifier)));
      }
      controls.start({x: getTranslations()[0], y: getTranslations()[1], opacity: 1, transition: {duration: 1.5}})
   }, [])

   // Trashing
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

   // Scale
   function slidingDone(event, info){
      localStorage.setItem("scalePosSearch" + props.identifier, info.point.x);
   }

   function getScalePos(){
      if(localStorage.getItem("scalePosSearch" + props.identifier) !== null){
         console.log(parseInt(localStorage.getItem("scalePosSearch" + props.identifier)));
         return parseInt(localStorage.getItem("scalePosSearch" + props.identifier));
      }
      else{
         return 0;
      }
   }
   // Translations
   function storeTranslations(){
      let elem = getComputedStyle(component.current);
      let matrix = new DOMMatrix(elem.transform);
      localStorage.setItem("translateXSearch" + props.identifier, matrix.m41);
      localStorage.setItem("translateYSearch" + props.identifier, matrix.m42);
      //console.log(localStorage.getItem("translateXDate") + props.identifier);
   }

   function getTranslations(){
      if(localStorage.getItem("translateXSearch" + props.identifier) !== null){
         return [parseFloat(localStorage.getItem("translateXSearch" + props.identifier)), parseFloat(localStorage.getItem("translateYSearch" + props.identifier))]
      }
      else{
         return [0,0];
      }
   }
   //Search Engines
   function storeOtherEngines(){
      setShowList(!showList)
      if(engine.image === google){
         setOtherEngines([{image: duckduckgo, placeholder: "Search DuckDuckGo", action: "https://www.duckduckgo.com"},
         {image: bing, placeholder: "Search Bing", action: "https://www.bing.com/search"}]);
      }
      else if(engine.image === duckduckgo){
         setOtherEngines([{image: google, placeholder: "Search Google", action: "https://www.google.com/search"},
         {image: bing, placeholder: "Search Bing", action: "https://www.bing.com/search"}]);
      }
      else if(engine.image === bing){
         setOtherEngines([{image: duckduckgo, placeholder: "Search DuckDuckGo", action: "https://www.duckduckgo.com"},
         {image: google, placeholder: "Search Google", action: "https://www.google.com/search"}
         ]);
      }
   }
   function otherEngineOnClick(engineClicked){
      setEngine(engineClicked);
      localStorage.setItem("engine" + props.identifier, JSON.stringify(engineClicked));
      storeOtherEngines();
   }
   function engineList(){
      if(showList){
         return(
            <div style={{marginTop: "-2rem"}}>
               <div>
                  <SearchLogoListItem src={otherEngines[0].image} onClick={()=>{otherEngineOnClick(otherEngines[0])}}
                  initial={{opacity: 0, y: 0}} 
                  animate={{opacity: 1, y: 35}}
                  whileHover={{scale: 1.1}}
                  whileTap={{scale: 0.9}}>
                  </SearchLogoListItem>
               </div>
               <div>
                  <SearchLogoListItem src={otherEngines[1].image} onClick={()=>{otherEngineOnClick(otherEngines[1])}}
                  initial={{opacity: 0, y: 0}} 
                  animate={{opacity: 1, y: 35}} 
                  whileHover={{scale: 1.1}}
                  whileTap={{scale: 0.9}}>
                  </SearchLogoListItem>
               </div>
            </div>
         );
      }
   }
   if(deleted){
      return(<div></div>);
   }
   else{
      return(
         <Component ref= {component} initial={{opacity: 0}} animate = {controls} style={{ scale }} onHoverStart={() => { setHover(true) }} onHoverEnd={() => { setHover(false) }} dragMomentum = {false} drag={props.canEdit ? true : false} onDragEnd={()=>{storeTranslations()}} dragConstraints={{ left: -500, right: 775, top: -425, bottom: 425 }} dragTransition={{ bounceStiffness: 300, bounceDamping: 10 }}>
            <motion.div className="tools" initial={{ opacity: 0 }} animate={hover && props.canEdit ? { opacity: 1 } : { opacity: 0 }}>
               <div className="slider-container">
                  <div className="slider">
                     <motion.div className="handle" dragMomentum = {false} style={{ x }} drag={props.canEdit ? 'x' : false} onDragEnd={(event, info)=>{slidingDone(event, info)}} dragConstraints={{ left: -70, right: 70 }} dragElastic={0}></motion.div>
                  </div>
               </div>
               <motion.img src={trashcan} className="delete-button" onClick={() => {handleTrashing()}} whileHover={{ scale: 1.15 }} whileTap={{ scale: .9 }}></motion.img>
            </motion.div>
            <BarContainer method="get" action={engine.action}>
               <SearchLogo whileHover={{scale: 1.1}} whileTap={{scale: 0.9}} onClick={()=>{storeOtherEngines()}} src={engine.image}></SearchLogo>
               <Bar type="text" placeholder={engine.placeholder} name="q" size="31" autoComplete="off"></Bar>
               <MagnifyingGlass type="submit" whileHover={{scale:1.1}} whileTap={{scale: 0.9}}></MagnifyingGlass>
            </BarContainer>
            {engineList()}
         </Component>
      );
   }
   
}
export default Searchbar;