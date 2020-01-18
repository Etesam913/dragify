import React, { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useTransform, useAnimation} from "framer-motion";
import styled from 'styled-components';
import './App.css';
import trashcan from './images/trashcan.png';
import axios from "axios";
import { loadPartialConfig } from '@babel/core';

const Component = styled(motion.div)`
    position: absolute;
    left: 39%;
    top: 47%;
    display: flex;
    flex-direction: column;
    z-index: 1;
`;

const JokeSetup = styled(motion.div)`
   background-color: rgb(90%,90%,90%);
   height: 3.25rem;
   display: flex;
   flex-direction: column;
   justify-content: center;
   text-align: center;
   padding-left: 1rem;
   padding-right: 1rem;
   font-size: 1.25rem;
   border-radius: 1rem;
   margin-bottom: .75rem;
`;
const JokePunchline = styled(JokeSetup)`
   margin-bottom: 0rem;
`

function Joke(props){
   const [jokeSetup, setJokeSetup] = useState("");
   const [jokePunchline, setJokePunchline] = useState("");
   const [loading, setLoading] = useState(true);
   const [showPunchline, setShowPunchline] = useState(false);
   const component = useRef(null);
   useEffect(()=>{
      const fetchData = async () => {
         setLoading(true);
         const result = await axios("https://official-joke-api.appspot.com/random_joke");
         setJokeSetup(result.data.setup);
         setJokePunchline(result.data.punchline);
         setLoading(false);
      }
      fetchData();
   },[])
   
   return(
     <Component ref={component} drag dragMomentum={false}>
        <JokeSetup 
        initial={{opacity: 0}} 
        animate={jokeSetup !== "" ? {opacity: 1} : {opacity: 0}}
        onClick={()=>{setShowPunchline(true)}} whileHover={showPunchline ? {scale: 1} : {scale: 1.05}} whileTap={showPunchline ? {scale: 1} :{scale: 0.95}}> 
        {loading ? "..." : jokeSetup}
        </JokeSetup>
        <JokePunchline initial={{opacity: 0, y: -20}} animate={showPunchline ? {opacity: 1, y: 0} : {opacity: 0}}>{loading ? "..." : jokePunchline}</JokePunchline>
     </Component>
   );
}
export default Joke;