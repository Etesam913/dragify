import React, { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useTransform, useAnimation } from "framer-motion";
import styled from 'styled-components';
import './App.css';
import axios from "axios";

const Component = styled(motion.div)`
    position: absolute;
    left: 39%;
    top: 47%;
    display: flex;
    flex-direction: column;
    z-index: 1;
    color: ${props => props.fontColor};
`;

const JokeSetup = styled(motion.div)`
   background-color: ${props => props.backgroundColor};
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
   background-color: ${props => props.backgroundColor};
`;

function Joke(props) {
  const [jokeSetup, setJokeSetup] = useState("");
  const [jokePunchline, setJokePunchline] = useState("");
  const [loading, setLoading] = useState(true);
  const [showPunchline, setShowPunchline] = useState(false);
  const [error, setError] = useState(false);
  const [hover, setHover] = useState(false);
  const component = useRef(null);

  const x = useMotionValue(getScalePos());
  const motionRange = [-70, 0, 70];
  const scaleRange = [.25, 1, 1.75];
  const scale = useTransform(x, motionRange, scaleRange);
  const controls = useAnimation();

  useEffect(() => {
    controls.start({ x: getTranslations()[0], y: getTranslations()[1], opacity: 1, transition: { duration: 1.5 } });

    const fetchData = async () => {
      setError(false);
      setLoading(true);
      try {
        const result = await axios("https://official-joke-api.appspot.com/random_joke");
        setJokeSetup(result.data.setup);
        setJokePunchline(result.data.punchline);
      }
      catch (error) {
        setError(true);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    controls.start({ x: getTranslations()[0], y: getTranslations()[1], opacity: 1, transition: { duration: 1.5 } });

  }, [props.windowResize]);

  // Trashing
  function getElementIndex(identifier) {
    for (let i = 0; i < props.elements.length; i++) {
      if (identifier === props.elements[i].id) {
        return i;
      }
    }
    return -1;
  }

  function handleTrashing() {
    if (props.canEdit) {
      const modifiedArray = props.elements.slice(0, getElementIndex(props.identifier)).concat(props.elements.slice(getElementIndex(props.identifier) + 1, props.elements.length));
      props.onChange(modifiedArray);
    }
  }

  //Scale
  function slidingDone(info) {
    localStorage.setItem("scalePosJoke" + props.identifier, "" + info.point.x);
  }

  function getScalePos() {
    if (localStorage.getItem("scalePosJoke" + props.identifier) !== null) {
      console.log(parseInt(localStorage.getItem("scalePosJoke" + props.identifier)));
      return parseInt(localStorage.getItem("scalePosJoke" + props.identifier));
    }
    else {
      return 0;
    }
  }
  // Translations
  function storeTranslations() {
    setTimeout(function () {
      if (component.current !== null) {
        let elem = getComputedStyle(component.current);
        let matrix = new DOMMatrix(elem.transform);
        localStorage.setItem("translateXJoke" + props.identifier, "" + matrix.m41);
        localStorage.setItem("translateYJoke" + props.identifier, "" + matrix.m42);
        controls.start({ x: getTranslations()[0], y: getTranslations()[1], opacity: 1, transition: { duration: 1.5 } });

      }
    }, 1000)
  }

  function getTranslations() {
    if (localStorage.getItem("translateXJoke" + props.identifier) !== null) {
      return [parseFloat(localStorage.getItem("translateXJoke" + props.identifier)), parseFloat(localStorage.getItem("translateYJoke" + props.identifier))]
    }
    else {
      return [0, 0];
    }
  }

  function handleSetup(){
    setShowPunchline(!showPunchline);
    setTimeout(function(){
      props.setSteps([true, true, true, true, true, true, true, true, true, props.steps[9]]);
    }, 3000);
    localStorage.setItem("steps", JSON.stringify([true, true, true, true, true, true, true, true, true, props.steps[9]]));
  }

  return (
    <Component fontColor={props.darkMode ? "rgb(232, 230, 227)" : "black"} ref={component} 
      initial={{ opacity: 0 }} animate={controls} style={{ scale }} onHoverStart={() => { setHover(true) }} onHoverEnd={() => { setHover(false) }} 
      drag={props.canEdit ? true : false} onDragEnd={() => { storeTranslations() }} dragMomentum={false}
      dragConstraints={props.canvas} dragTransition={{ bounceStiffness: 300, bounceDamping: 10 }}>
      {props.getTools(slidingDone, handleTrashing, x, hover)}
      <JokeSetup backgroundColor={props.darkMode ? "rgb(32, 34, 35)" : "#e4e4e4"}
        initial={{ opacity: 0 }}
        animate={jokeSetup !== "" ? { opacity: 1 } : { opacity: 0 }}
        onClick={() => { handleSetup() }} whileHover={showPunchline ? { scale: 1 } : { scale: 1.05 }} whileTap={showPunchline ? { scale: 1 } : { scale: 0.95 }}>
        {loading ? "..." : jokeSetup}
      </JokeSetup>
      <JokePunchline backgroundColor={props.darkMode ? "rgb(32, 34, 35)" : "#e4e4e4"}
        initial={{ opacity: 0, y: -20 }}
        animate={showPunchline ? { opacity: 1, y: 0 } : { opacity: 0 }}>{error ? "something went wrong" : jokePunchline}
      </JokePunchline>
    </Component>
  );
}
export default Joke;