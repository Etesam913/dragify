import React, { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useTransform, useAnimation } from "framer-motion";
import './App.css';
import styled from 'styled-components';
import { CirclePicker } from 'react-color';

const Component = styled(motion.div)`
    position: absolute;
    left: 40%;
    top: 42%;
    display: flex;
    flex-direction: column;
    align-items: center;
    z-index:1;
`;
const Text = styled(motion.div)`
    font-size: 3rem;
    color: ${props => props.fontColor};
`;

const ColorContainer = styled(motion.div)`
   width: 100%;
   display: flex;
   justify-content: center;
   transform: scale(.725);
`;

function Today(props) {
  const [today, setToday] = useState("");
  const [hover, setHover] = useState(false);
  const [color, setColor] = useState("#000000");
  const [drag, setDrag] = useState(false);

  const component = useRef(null);
  let x = useMotionValue(getScalePos());
  const motionRange = [-70, 0, 70];
  const scaleRange = [.5, 1, 1.5];
  const scale = useTransform(x, motionRange, scaleRange);
  const controls = useAnimation();

  useEffect(() => {
    controls.start({ x: getTranslations()[0], y: getTranslations()[1], opacity: 1, transition: { duration: 1.5 } });
    var d = new Date();
    var monthNumber = d.getMonth();
    var day = d.getDate();
    var year = d.getFullYear();

    setToday(getMonth(monthNumber) + " " + day + " " + year);

    if (localStorage.getItem("colorDate" + props.identifier) !== null) {
      setColor(localStorage.getItem("colorDate" + props.identifier));
    }

    const interval = setInterval(() => {
      d = new Date();
      monthNumber = d.getMonth();
      day = d.getDate();
      year = d.getFullYear();
      setToday(getMonth(monthNumber) + " " + day + " " + year);
    }, 30000); // Done every 30 seconds
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    controls.start({ x: getTranslations()[0], y: getTranslations()[1], opacity: 1, transition: { duration: 1.5 } });

  }, [props.windowResize]);

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
    localStorage.setItem("colorDate" + props.identifier, colorVal.hex);
  }

  function slidingDone(info) {
    storeScale();
    localStorage.setItem("scalePosDate" + props.identifier, "" + info.point.x);
  }

  function storeScale() {
    localStorage.setItem("scaleDate" + props.identifier, scale.current);
  }

  function storeTranslations() {
    setTimeout(function () {
      if (component.current !== null) {
        let elem = getComputedStyle(component.current);
        let matrix = new DOMMatrix(elem.transform);
        localStorage.setItem("translateXDate" + props.identifier, "" + matrix.m41);
        localStorage.setItem("translateYDate" + props.identifier, "" + matrix.m42);
        console.log(localStorage.getItem("translateXDate" + props.identifier));
        console.log(localStorage.getItem("translateYDate" + props.identifier));
      }
    }, 1000)
  }

  function getTranslations() {
    if (localStorage.getItem("translateXDate" + props.identifier) !== null) {
      return [parseFloat(localStorage.getItem("translateXDate" + props.identifier)), parseFloat(localStorage.getItem("translateYDate" + props.identifier))]
    }
    else {
      console.log("yeet2");
      return [0, 0];
    }
  }

  function getScalePos() {
    if (localStorage.getItem("scalePosDate" + props.identifier) !== null) {
      console.log(parseInt(localStorage.getItem("scalePosDate" + props.identifier)));
      return parseInt(localStorage.getItem("scalePosDate" + props.identifier));
    }
    else {
      return 0;
    }
  }

  function getMonth(index) {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    for (let i = 0; i < months.length; i++) {
      if (i === index) {
        return months[i];
      }
    }
    return "That month does not exist";
  }

  return (
    <Component ref={component} className={drag ? "cursor-dragging" : "cursor-drag"}
      initial={{ opacity: 0 }} animate={controls} style={{ scale }}
      onHoverStart={() => { setHover(true) }} onHoverEnd={() => { setHover(false) }} dragMomentum={false}
      drag={props.canEdit ? true : false} onDragStart={() => { setDrag(true); props.soundEffect.play(0.5) }} onDragEnd={() => { storeTranslations(); setDrag(false); props.soundEffect.play(0.3) }}
      dragConstraints={props.canvas} dragTransition={{ bounceStiffness: 300, bounceDamping: 10 }}>

      {props.getTools(slidingDone, handleTrashing, x, hover)}
      <Text className={drag ? "text-shadow" : "cursor-text"} animate={{ color: color }} transition={{ duration: 0.5, type: "spring", damping: 300 }}>{today}</Text>
      <ColorContainer initial={{ opacity: 0 }} animate={hover && props.canEdit ? { opacity: 1 } : { opacity: 0 }}>
        <CirclePicker className="cursor-drag" colors={props.colorArray} width="30rem" onChange={handleColorChange} />
      </ColorContainer>

    </Component>
  );

}
export default Today;