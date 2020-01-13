import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useTransform } from "framer-motion";
import styled from 'styled-components';
import './App.css';
import trashcan from './images/trashcan.png';
const Component = styled(motion.div)`
    position: absolute;
    left: 40%;
    top: 42%;
    display: flex;
    flex-direction: column;
`;
const Text = styled(motion.div)`
    font-size: 3rem;
    font-weight: bold;
`;

function Time(props) {
   const [time, setTime] = useState("");
   const [hover, setHover] = useState(false);
   const [deleted, setDeleted] = useState(false);
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
      let d = new Date();
      let hour = d.getHours();
      let minutes = d.getMinutes();
      if (minutes < 10) { minutes = "0" + minutes; }
      let seconds = d.getSeconds();
      if (seconds < 10) { seconds = "0" + seconds; }
      setTime(getTwelveHourTime(hour) + ":" + minutes + ":" + seconds + " " + getTimePeriodName(hour));
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

   function handleTrashing() {
      if (props.canEdit) {
         setDeleted(true);
      }
      else {
         return;
      }
   }
   const x = useMotionValue(0);
   const motionRange = [-70, 0, 70];
   const scaleRange = [.25, 1, 1.75];
   const scale = useTransform(x, motionRange, scaleRange);

   if (deleted) {
      return (<div></div>);
   }
   else {
      return (
         <Component style={{ scale }} onHoverStart={() => { setHover(true) }} onHoverEnd={() => { setHover(false) }} drag={props.canEdit ? true : false} dragConstraints={{ left: -500, right: 775, top: -425, bottom: 425 }} dragTransition={{ bounceStiffness: 300, bounceDamping: 10 }}>
            <motion.div className="tools" initial={{ opacity: 0 }} animate={hover && props.canEdit ? { opacity: 1 } : { opacity: 0 }}>
               <div className="slider-container">
                  <div className="slider">
                     <motion.div className="handle" style={{ x }} drag={props.canEdit ? 'x' : false} dragConstraints={{ left: -70, right: 70 }} dragElastic={0}></motion.div>
                  </div>
               </div>
               <motion.img src={trashcan} className="delete-button" onClick={() => { handleTrashing() }} whileHover={{ scale: 1.15 }} whileTap={{ scale: .9 }}></motion.img>
            </motion.div>
            <Text>{time}</Text>
         </Component>
      );
   }
}
export default Time;