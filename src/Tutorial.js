import { motion } from 'framer-motion';
import styled from 'styled-components';
import React, {useState, useEffect} from 'react';
import speechbubbletemplate from './images/speechbubbleTemplate.png';
import flowifyLarge from './images/flowifylarge.png';
import ReactiveButton from './ReactiveButton.js';

const SpeechBubble = styled(motion.div)`
  background-image: url(${speechbubbletemplate});
  background-repeat: no-repeat;
  width: 14.75rem;
  height: 5.375rem;
  position: absolute;
  left: ${props=>props.left};
  top: ${props=>props.top};
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const TitleRow = styled(motion.div)`
  display: flex;
  align-items: center;
  pointer-events: none;
  user-select: none; /* supported by Chrome and Opera */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
`;

const Description = styled(motion.div)`
  font-size: 2rem;
  
  margin-top: 1rem;
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
`;

const TextContainer = styled.div`
  width: 85%;
  border-radius: 2.5rem;
  font-family: "Inter";
  
  font-size: 1rem;
  text-align: center;
  
`;

const ButtonContainer = styled(motion.div)`
  display: flex;
  font-size: 1.25rem;
  margin-top: 1.5rem;
`;

const Logo = styled.img`
  height: 3.5rem;
  width: 3.5rem;
  margin-left: 1rem;
  
`;

const BeginningScreen = styled.div`
  z-index: 3;
  background-color: white;
  position: absolute;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  font-weight: 600;
  text-align: center;
`;

function Tutorial(props){
  const variants = {
    hidden: {opacity: 0, scale: 0},
    show: {opacity: 1, scale: 1}
  }

  useEffect(()=>{
    console.log(props.steps);
  }, [props.steps])

  if(props.steps[0] === false){
    return(
        <BeginningScreen>
          <TitleRow variants={variants} initial="hidden" animate="show">
            <div>Flowify</div>
            <Logo src={flowifyLarge}></Logo>
          </TitleRow>
          
          <Description variants={variants} initial="hidden" animate="show" transition={{delay: .4}}>A Free Flowing Extension</Description>

          <ButtonContainer variants={variants} initial="hidden" animate="show" transition={{delay: .8}}>
            <ReactiveButton showWindow={()=>{props.setSteps([true, true, true, true, true, true, true, true, true, true])}} text="Skip Tutorial"></ReactiveButton>
            <ReactiveButton showWindow={()=>{props.setSteps([true, false, false, false, false, false, false, false, false])}} text="Begin Tutorial"></ReactiveButton>
          </ButtonContainer>
        </BeginningScreen>
      );
  }
  else if(props.steps[1] === false){
    return(
      
      <SpeechBubble left="7rem" top="0" variants={variants} initial="hidden" animate="show">
        <TextContainer>Click the pencil to edit the canvas</TextContainer>
      </SpeechBubble>
      );
  }
  else if(props.steps[2] === false){
    return(
      <SpeechBubble variants={variants} initial="hidden" animate="show" left="7rem" top="4.3rem" >
        <TextContainer>Click this button to create a text element</TextContainer>
      </SpeechBubble>
      );
  }
  else if(props.steps[3] === false){
    return(
      <SpeechBubble left="67rem" top="40%">
        <TextContainer>Click the placeholder text and put your own message in</TextContainer>
      </SpeechBubble>
      );
  }
  else if(props.steps[4] === false){
    return(
      <SpeechBubble left="64rem" top="40%">
        <TextContainer>Move the slider handle to change the scale, and drag the text to move it.</TextContainer>
      </SpeechBubble>
    );
  }

  else{
    return(<div></div>);
  }

}
export default Tutorial;