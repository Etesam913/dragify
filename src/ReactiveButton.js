import React, {useState} from 'react';
import styled from 'styled-components';
import { motion} from "framer-motion";
import './App.css'
const Button = styled(motion.div)`
   height: 2rem;
   border-radius: .5rem;
   margin-left: .75rem;
   margin-right: .75rem;
   border-width: 1.5px;
   border-style: solid;
   border-color: rgb(232, 232, 232);
   filter: invert(${props=> props.invert}%);
   font-weight: 300;
   outline: none;
   
`;
const ButtonContent = styled(motion.div)`
   height: 100%;
   width: 100%;
   border-radius: .4rem;
   display:flex;
   justify-content: center;
   align-items: center;
   
`;

const Text = styled.div`
   background: -webkit-linear-gradient(45deg, #2af598, #009efd);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  -moz-user-select: none;
   -khtml-user-select: none;
   -webkit-user-select: none;
  text-align: center;
  padding-left: .5rem;
   padding-right: .5rem;
`;
function ReactiveButton(props){
   const [hover, setHover] = useState(false);
   return(
      <Button className="cursor-drag" invert={props.darkMode ? 100 : 0}> 
         <ButtonContent 
         onHoverStart={()=>{setHover(true)}} onHoverEnd={()=>{setHover(false)}}
         animate={{backgroundColor: hover ? "rgb(232, 232, 232)" : "rgba(224, 217, 211, 0)"}}
         whileHover={{scale: 1.15, boxShadow: props.darkMode ? "0px 16px 10px 0px rgba(232, 232, 232, 0)" : "0px 16px 10px 0px rgba(232, 232, 232, 0.5)"}}
         whileTap={{scale: 1.05, boxShadow: "0px 16px 10px 0px rgba(232, 232, 232, 0)"}}
         transition={{duration: 0.25}}
         onClick={props.showWindow}
         >
            <Text>{props.text}</Text>
         </ButtonContent>
      </Button>
   );
}
export default ReactiveButton;