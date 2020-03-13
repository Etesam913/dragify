import { motion } from 'framer-motion';
import styled from 'styled-components';
import React, {useState} from 'react';
import speechbubbletemplate from './images/speechbubbleTemplate.png';
import flowifyLarge from './images/flowifylarge.png';
import ReactiveButton from './ReactiveButton.js';

const SpeechBubble = styled.div`
  background-image: url(${speechbubbletemplate});
  background-repeat: no-repeat;
  width: 14.75rem;
  height: 5.375rem;
  position: absolute;
  left: 50%;
  top: 50%;
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
  height: 80%;
  width: 85%;
  border-radius: 2.5rem;
  font-family: "Inter";
  margin-left: 1rem;
  font-size: 1rem;
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
  const [steps, setSteps] = useState([false, false, false, false]);

  const variants = {
    hidden: {opacity: 0, scale: 0},
    show: {opacity: 1, scale: 1}
  }

  if(steps[0] === false){
    return(
        <BeginningScreen>
          <TitleRow variants={variants} initial="hidden" animate="show">
            <div>Flowify</div>
            <Logo src={flowifyLarge}></Logo>
          </TitleRow>
          
          <Description variants={variants} initial="hidden" animate="show" transition={{delay: .4}}>A Free Flowing Extension</Description>

          <ButtonContainer variants={variants} initial="hidden" animate="show" transition={{delay: .8}}>
            <ReactiveButton showWindow={()=>{setSteps([true, true, true, true])}} text="Skip Tutorial"></ReactiveButton>
            <ReactiveButton text="Begin Tutorial"></ReactiveButton>
          </ButtonContainer>
        </BeginningScreen>
      );
  }
  else if(steps[1] === false){
    return(
      <SpeechBubble>
        <TextContainer>Bob is my name. Lorem Ipsum Dolor. Etesam was here yoloololo</TextContainer>
      </SpeechBubble>
      );
  }
  else if(steps[2] === false){
    return(
      <SpeechBubble>
        <TextContainer>Bob is my name. Lorem Ipsum Dolor. Etesam was here yoloololo</TextContainer>
      </SpeechBubble>
      );
  }
  else if(steps[3] === false){
    return(
      <SpeechBubble>
        <TextContainer>Bob is my name. Lorem Ipsum Dolor. Etesam was here yoloololo</TextContainer>
      </SpeechBubble>
      );
  }
  else{
    return(
      <div></div>
    );
  }
}
export default Tutorial;