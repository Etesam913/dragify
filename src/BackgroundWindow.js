import React from "react";
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { CirclePicker } from 'react-color';
import deletebutton from "./images/deletebutton.png";

const Container = styled(motion.div)`
   position: fixed;
   display: flex;
   flex-direction: column;
   align-items: center;
   top: 20%;
   height: 60%;
   width: 35%;
   background-color: blue;
   z-index: 2;
   left: 33.5%;
   border-radius: 3rem;
   background-color: ${props=>props.backgroundColor};
   color: ${props=>props.color};
`;

const Title = styled(motion.div)`
  font-size: 2rem;
  margin-top: .5rem;
  margin-bottom: .5rem;
  padding-left: 10%;
  -webkit-touch-callout: none; 
    -webkit-user-select: none; 
     -khtml-user-select: none; 
       -moz-user-select: none; 
        -ms-user-select: none; 
            user-select: none; 
`;

const DeleteButton = styled(motion.img)`
  height: 2rem;
  width: 2rem;
  filter: invert(${props => props.invert});
`;

const RowTitle = styled(Title)`
  margin-left: .75rem;
  margin-right: 1rem;
  padding-left: 0;
`;

const RowGrid = styled.div`
  display: grid;
  grid-template-columns: 90% 10%;
  width: 100%;
  justify-items: center;
  align-items: center;
`;

const RowFlex = styled(motion.div)`
  width: 100%;
  display: flex;
  margin-top: .5rem;
  margin-bottom: .5rem;
`;

function BackgroundWindow(props){
  const backgroundVariants = {
    show: {
      opacity: 1,
      scale: 1,
    },
    hidden: {
      opacity: 0,
      scale: 0,
    }
  }

  const colors= ['#f2f2f2', '#FF6900', '#FCB900', '#7BDCB5', '#00D084', '#8ED1FC', '#0693E3', '#ABB8C3', '#EB144C', '#F78DA7', '#000000', '#800080','#CCFF00', '#FFDAB9', '#FFD700', '#0000EE' ,'#800000', '#1F1F1F']

  function handleColorChange(colorVal){
    props.setBackgroundColor(colorVal.hex);
    localStorage.setItem("backgroundColor", colorVal.hex);
  }

  return(
    <Container color={props.darkMode ? "white" : "black"} backgroundColor={props.darkMode ? "rgb(39, 39, 39)" : "rgb(232, 232, 232)"} variants={backgroundVariants} initial={{ opacity: 0, scale: 0 }} animate={props.showBackgroundWindow && props.editable ? "show": "hidden"}>
      <RowGrid>
        <Title> Background Options </Title>
        <DeleteButton src={deletebutton}
        invert={props.darkMode ? "100%" : "0%"}
        whileHover={{scale: 1.1}} whileTap={{scale:0.95}}
        onClick={()=>{props.setBackgroundWindow()}}>
        </DeleteButton>
      </RowGrid>
      <RowFlex>
        <RowTitle>Colors: </RowTitle> 
        <CirclePicker width="75%"  onChange={handleColorChange} colors={colors}/>
      </RowFlex>
        
    </Container>
  );
}
export default BackgroundWindow;