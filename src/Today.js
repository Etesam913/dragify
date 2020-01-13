import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useTransform } from "framer-motion";
import './App.css';
import styled from 'styled-components';
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

function Today(props) {
   const [today, setToday] = useState("");
   const [hover, setHover] = useState(false);
   const [deleted, setDeleted] = useState(false);
   const x = useMotionValue(0);
   const motionRange = [-70, 0, 70];
   const scaleRange = [.25, 1, 1.75];
   const scale = useTransform(x, motionRange, scaleRange);

   function handleTrashing() {
      if (props.canEdit) {
         setDeleted(true);
      }
      else {
         return;
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
   useEffect(() => {
      var d = new Date();
      var monthNumber = d.getMonth();
      var day = d.getDate();
      var year = d.getFullYear();
      setToday(getMonth(monthNumber) + " " + day + " " + year);
      const interval = setInterval(() => {
         d = new Date();
         monthNumber = d.getMonth();
         day = d.getDate();
         year = d.getFullYear();
         setToday(getMonth(monthNumber) + " " + day + " " + year);
      }, 30000); // Done every 30 seconds
      return () => clearInterval(interval);
   }, []);
   if (deleted) {
      return (
         <div></div>
      );
   }
   else {
      return (
         <Component style={{ scale }} onHoverStart={() => { setHover(true) }} onHoverEnd={() => { setHover(false) }} drag={props.canEdit ? true : false} dragConstraints={{ left: -500, right: 630, top: -425, bottom: 425 }} dragTransition={{ bounceStiffness: 300, bounceDamping: 10 }}>
            <motion.div className="tools" initial={{ opacity: 0 }} animate={hover && props.canEdit ? { opacity: 1 } : { opacity: 0 }}>
               <div className="slider-container">
                  <div className="slider">
                     <motion.div className="handle" style={{ x }} drag={props.canEdit ? 'x' : false} dragConstraints={{ left: -70, right: 70 }} dragElastic={0}></motion.div>
                  </div>
               </div>
               <motion.img src={trashcan} className="delete-button" onClick={() => { handleTrashing() }} whileHover={{ scale: 1.15 }} whileTap={{ scale: .9 }}></motion.img>
            </motion.div>
            <Text>{today}</Text>
         </Component>
      );
   }
}
export default Today;