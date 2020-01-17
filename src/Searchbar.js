import React, { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useTransform, useAnimation} from "framer-motion";
import styled from 'styled-components';
import './App.css';
import trashcan from './images/trashcan.png';
import search from './images/search.png';
import google from './images/google.png';
const Component = styled(motion.div)`
    position: absolute;
    left: 43%;
    top: 42%;
    display: flex;
    flex-direction: column;
    z-index: 1;
`;

const BarContainer = styled.form`
   height: 2rem;
   width: 15rem;
`

const Bar = styled.input`
   border: none;
   background-color: #e4e4e4;
   height: 2rem;
   border-radius: .5rem;
   padding-left:2rem;
   font-size: 1rem;
   font-family: "Public Sans";
   width: 15rem;
`
const MagnifyingGlass = styled(motion.button)`
   position: relative;
   bottom: 120%;
   border: none;
   width: 1.5rem;
   left: 2%;
   height: 100%;
   background-color: transparent;
   background-image: url(${search});
   background-size: 1.25rem, 1.25rem;
   background-position-y: 70%;
   background-repeat: no-repeat;
`;
const SearchLogo = styled.img`
   position: relative;
   top: -85%;
   left: 92.5%;
   height: 60%;
   
`

function Searchbar(props){
   const component = useRef(null);

   return(
      <Component ref= {component} /*animate = {controls} style={{ scale }} onHoverStart={() => { setHover(true) }} onHoverEnd={() => { setHover(false) }}*/ dragMomentum = {false} drag/*={props.canEdit ? true : false}*/ /*onDragEnd={()=>{storeTranslations()}}*/ dragConstraints={{ left: -500, right: 775, top: -425, bottom: 425 }} dragTransition={{ bounceStiffness: 300, bounceDamping: 10 }}>
         <BarContainer method="get" action="https://www.google.com/search">
            <Bar type="text" placeholder="Search" name="q" size="31" autoComplete="off"></Bar>
            <MagnifyingGlass type="submit" whileHover={{scale:1.1}} whileTap={{scale: 0.9}}></MagnifyingGlass>
            <SearchLogo src={google}></SearchLogo>
            
         </BarContainer>
      </Component>
     
      /*
      <form method="get" action="https://duckduckgo.com/">
         <input type="text" name="q" size="31"></input>
      </form>
      */
   );
}
export default Searchbar;