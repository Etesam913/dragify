import React, { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useTransform, useAnimation } from "framer-motion";
import styled from 'styled-components';
import './App.css';
import { CirclePicker } from 'react-color';

const Component = styled(motion.div)`
    position: absolute;
    left: 43%;
    top: 42%;
    display: flex;
    flex-direction: column;
    align-items: center;
    z-index: 1;
    padding-left: 2rem;
    padding-right: 2rem;
`;
const Text = styled(motion.div)`
    font-size: 3rem;
    font-family: "Inter";
`;

const ColorContainer = styled(motion.div)`
   width: 100%;
   display: flex;
   justify-content: center;
   transform: scale(.6);
`;


function Time(props) {
  const [time, setTime] = useState("");
  const [hover, setHover] = useState(false);
  const [color, setColor] = useState("#000000");
  const [drag, setDrag] = useState(false);
  const component = useRef(null);

  let x = useMotionValue(getScalePos());
  const motionRange = [-70, 0, 70];
  const scaleRange = [.25, 1, 1.75];
  const scale = useTransform(x, motionRange, scaleRange);
  const controls = useAnimation();

  function getTimePeriodName(hourNumber) {
    if (hourNumber > 11 && hourNumber < 24) {
      return "pm";
    }
    else if (hourNumber === 24 || hourNumber < 12) {
      return "am";
    }
  }
  function getTwelveHourTime(hourNumber) {
    if (hourNumber > 12) {
      return hourNumber - 12;
    }
    else if (hourNumber === 0) {
      return 12;
    }
    else {
      return hourNumber;
    }
  }
  useEffect(() => {
    controls.start({ x: getTranslations()[0], y: getTranslations()[1], opacity: 1, transition: { duration: 1.5 } });

    let d = new Date();
    let hour = d.getHours();
    let minutes = d.getMinutes();
    if (minutes < 10) { minutes = "0" + minutes; }
    let seconds = d.getSeconds();
    if (seconds < 10) { seconds = "0" + seconds; }
    setTime(getTwelveHourTime(hour) + ":" + minutes + ":" + seconds + " " + getTimePeriodName(hour));

    if (localStorage.getItem("colorTime" + props.identifier) !== null) {
      setColor(localStorage.getItem("colorTime" + props.identifier));
    }

    const interval = setInterval(() => {
      d = new Date();
      hour = d.getHours();
      minutes = d.getMinutes();
      if (minutes < 10) { minutes = "0" + minutes; }
      seconds = d.getSeconds();
      if (seconds < 10) { seconds = "0" + seconds; }
      setTime(getTwelveHourTime(hour) + ":" + minutes + ":" + seconds + " " + getTimePeriodName(hour));
    }, 1000); // Done every second
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    controls.start({ x: getTranslations()[0], y: getTranslations()[1], opacity: 1, transition: { duration: 1.5 } });
  }, [props.windowResize])

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

  function handleColorChange(colorVal) {
    setColor(colorVal.hex);
    localStorage.setItem("colorTime" + props.identifier, colorVal.hex);
  }

  function slidingDone(info) {
    localStorage.setItem("scalePosTime" + props.identifier, "" + info.point.x);
  }

  function getScalePos() {
    if (localStorage.getItem("scalePosTime" + props.identifier) !== null) {
      console.log(parseInt(localStorage.getItem("scalePosTime" + props.identifier)));
      return parseInt(localStorage.getItem("scalePosTime" + props.identifier));
    }
    else {
      return 0;
    }
  }

  function storeTranslations() {
    setTimeout(function () {
      if (component.current != null) {
        let elem = getComputedStyle(component.current);
        let matrix = new DOMMatrix(elem.transform);
        localStorage.setItem("translateXTime" + props.identifier, "" + matrix.m41);
        localStorage.setItem("translateYTime" + props.identifier, "" + matrix.m42);
      }
    }, 1000)
  }

  function getTranslations() {
    if (localStorage.getItem("translateXTime" + props.identifier) !== null) {
      return [parseFloat(localStorage.getItem("translateXTime" + props.identifier)), parseFloat(localStorage.getItem("translateYTime" + props.identifier))]
    }
    else {
      console.log("yeet2");
      return [0, 0];
    }
  }

  return (
    <Component ref={component} className={drag ? "cursor-dragging" : "cursor-drag"}
      animate={controls} style={{ scale }} onHoverStart={() => { setHover(true) }} onHoverEnd={() => { setHover(false) }}
      drag={props.canEdit ? true : false} dragConstraints={props.canvas} dragMomentum={false}
      onDragStart={() => { setDrag(true); props.soundEffect.play(0.5) }} onDragEnd={() => { storeTranslations(); setDrag(false); props.soundEffect.play(0.3) }}
      dragTransition={{ bounceStiffness: 300, bounceDamping: 10 }}>
      {props.getTools(slidingDone, handleTrashing, x, hover)}
      <Text className={drag ? "text-shadow" : ""} animate={{ color:color}} transition={{ duration: 0.5, type: "spring", damping: 300 }}>{time}</Text>
      <ColorContainer className="cursor-grab" initial={{ opacity: 0 }} animate={hover && props.canEdit ? { opacity: 1 } : { opacity: 0 }}>
        <CirclePicker colors={props.colorArray} width="30rem" onChange={handleColorChange} />
      </ColorContainer>
    </Component>
  );
}
export default Time;