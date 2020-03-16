import { motion } from 'framer-motion';
import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import speechbubbletemplate from './images/speechbubbleTemplate.png';
import flowifyLarge from './images/flowifylarge.png';
import ReactiveButton from './ReactiveButton.js';
import deletebutton from './images/deletebutton.png';
import { Window, DeleteButton, RowGrid, Title } from './windowstyled';

const SpeechBubble = styled(motion.div)`
  background-image: url(${speechbubbletemplate});
  background-repeat: no-repeat;
  width: 14.75rem;
  height: 5.375rem;
  position: absolute;
  left: ${props => props.left};
  top: ${props => props.top};
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
  
  font-size: ${props => props.fontSize};
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

const ModifiedWindow = styled(Window)`
  min-height: 45%;
  width: 25%;
  top: 25%;
  left: 38%;
`;

const EmojiContainer = styled.div`
  transform: scale(2.5);
  margin-top: 1rem;
`;

function Tutorial(props) {
  const [open, setOpen] = useState(true);
  const variants = {
    hidden: { opacity: 0, scale: 0 },
    show: { opacity: 1, scale: 1 }
  }

  useEffect(() => {
    if(localStorage.getItem("steps") !== null){
      props.setSteps(JSON.parse(localStorage.getItem("steps")));
    }
    
  }, []);

  useEffect(() => {
    if (localStorage.getItem("steps") !== null) {

      console.log(JSON.parse(localStorage.getItem("steps")));
    }
  }, [props.steps])

  function handleTutorialComplete() {
    props.setSteps([true, true, true, true, true, true, true, true, true, true]);
    props.setTutorialComplete(true);
    localStorage.setItem("tutorialComplete", JSON.stringify(true));
  }

  function handleTutorialStart() {
    props.setSteps([true, false, false, false, false, false, false, false, false, false]);
    localStorage.setItem("steps", JSON.stringify(props.steps));
  }


  if (props.steps[0] === false) {
    return (
      <BeginningScreen>
        <TitleRow variants={variants} initial="hidden" animate="show">
          <div>Flowify</div>
          <Logo src={flowifyLarge}></Logo>
        </TitleRow>

        <Description variants={variants} initial="hidden" animate="show" transition={{ delay: .4 }}>A Free Flowing New Tab Extension</Description>

        <ButtonContainer variants={variants} initial="hidden" animate="show" transition={{ delay: .8 }}>
          <ReactiveButton showWindow={() => { handleTutorialComplete() }} text="Skip Tutorial"></ReactiveButton>
          <ReactiveButton showWindow={() => { handleTutorialStart() }} text="Begin Tutorial"></ReactiveButton>
        </ButtonContainer>
      </BeginningScreen>
    );
  }
  else if (props.steps[1] === false) {
    return (
      <SpeechBubble left="7rem" top="0" variants={variants} initial="hidden" animate="show">
        <TextContainer fontSize="1rem">Click the pencil to edit the canvas</TextContainer>
      </SpeechBubble>
    );
  }
  else if (props.steps[2] === false) {
    return (
      <SpeechBubble variants={variants} initial="hidden" animate="show" left="7rem" top="4%" >
        <TextContainer fontSize="1rem">Click this button to create a text element</TextContainer>
      </SpeechBubble>
    );
  }
  else if (props.steps[3] === false) {
    return (
      <SpeechBubble left="62.5%" top="40%">
        <TextContainer fontSize="1rem">Click the placeholder text and put your own message in</TextContainer>
      </SpeechBubble>
    );
  }
  else if (props.steps[4] === false) {
    return (
      <SpeechBubble left="62.5%" top="40%">
        <TextContainer fontSize="1rem">Move the slider handle to change the scale, and drag the text to move it.</TextContainer>
      </SpeechBubble>
    );
  }

  else if (props.steps[5] === false) {
    return (
      <SpeechBubble left="7rem" top="36rem" variants={variants} initial="hidden" animate="show">
        <TextContainer fontSize="1rem">Click the magnifying glass to create a searchbar</TextContainer>
      </SpeechBubble>
    );
  }

  else if (props.steps[6] === false) {
    return (
      <SpeechBubble left="57.5%" top="40%" variants={variants} initial="hidden" animate="show">
        <TextContainer fontSize=".75rem">You can search the web. Click on the Google icon to see the other search engines you can use.</TextContainer>
      </SpeechBubble>
    );
  }

  else if (props.steps[7] === false) {
    return (
      <SpeechBubble left="7rem" top="73%" variants={variants} initial="hidden" animate="show">
        <TextContainer fontSize="1rem">Click this button to generate a joke</TextContainer>
      </SpeechBubble>
    );
  }

  else if (props.steps[8] === false) {
    return (
      <SpeechBubble left="57.5%" top="43%" variants={variants} initial="hidden" animate="show">
        <TextContainer fontSize="1.25rem">Click on the joke setup to see the punchline</TextContainer>
      </SpeechBubble>
    );

  }
  else if (props.steps[9] === false && !props.tutorialComplete) {
    return (
      <ModifiedWindow darkMode={props.darkMode} variants={variants} initial="hidden" animate={open ? "show" : "hidden" }>
        <RowGrid>
          <Title>Congratulations!</Title>
          <DeleteButton darkMode={props.darkMode} src={deletebutton}
            whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}
            onClick={() => { setOpen(false); props.setTutorialComplete(true); localStorage.setItem("tutorialComplete", JSON.stringify(true)) }}></DeleteButton>
        </RowGrid>
        <Title>You Completed the Tutorial</Title>
        <Title>Play around with the different buttons to see what they can do!</Title>
        <EmojiContainer>😎</EmojiContainer>
      </ModifiedWindow>
    );
  }

  else {
    return (<div></div>);
  }

}
export default Tutorial;