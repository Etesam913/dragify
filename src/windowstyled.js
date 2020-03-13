// Shared Styled Components for Background Window and About Window

import styled from 'styled-components';
import { motion} from "framer-motion";

export const Window = styled(motion.div)`
   position: fixed;
   display: flex;
   flex-direction: column;
   align-items: center;
   top: 15%;
   min-height: 70%;
   width: 35%;
   background-color: blue;
   z-index: 2;
   left: 33.5%;
   border-radius: 3rem;
   -webkit-box-shadow: 10px 10px 58px -21px rgba(0,0,0,0.5);
  -moz-box-shadow: 10px 10px 58px -21px rgba(0,0,0,0.5);
  box-shadow: 10px 10px 58px -21px rgba(0,0,0,0.5);
   background-color: ${props => props.darkMode ? "rgb(39, 39, 39)" : "rgb(232, 232, 232)"};
   color: ${props => props.darkMode ? "white" : "black"};
   -webkit-touch-callout: none; 
    -webkit-user-select: none; 
     -khtml-user-select: none; 
       -moz-user-select: none; 
        -ms-user-select: none; 
            user-select: none; 
`;

export const DeleteButton = styled(motion.img)`
  height: 2rem;
  width: auto;
  filter: invert(${props => props.darkMode ? "100%" : "0%"});
  border-top-right-radius: 3rem;
  padding-right: 2rem;
  @media(max-width: 1600px){
    height: 1.5rem;
    padding-right: 1.5rem;
  }
  @media(max-width: 1200px){
    height: 1rem;
    padding-right: 1.5rem;
  }
`;

export const RowGrid = styled.div`
  display: grid;
  grid-template-columns: 90% 10%;
  width: 100%;
  justify-items: center;
  align-items: center;
`;

export const Title = styled(motion.div)`
  font-size: 2rem;
  margin-top: .5rem;
  margin-bottom: .5rem;
  padding-left: 10%;
  border-top-left-radius: 3rem;
  text-align: center;
  @media(max-width: 1600px){
    font-size:1.5rem;
  }

  @media(max-width: 1200px){
    font-size: 1rem;
  }
`;