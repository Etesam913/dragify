import React, { useState } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';

const Button = styled(motion.div)`
  width: 5rem;
  height: 5rem;
  border-radius: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-width: 1.5px;
   border-style: solid;
   border-color: ${props => props.borderColor};
   background-color: rgba(255, 255, 255, 0);
`;

const Image = styled.img`
   filter: invert(${props => props.invert});
`;

function ItembarButton(props) {
  const sidebarItem = { hidden: { opacity: 0, scale: 0 }, show: { opacity: 1, scale: 1 } };

  function handleClick(){
    props.addElement();
    props.setSteps();

  } 

  return (
    <Button
      variants={sidebarItem}
      onClick={handleClick}
      whileHover={{ scale: 1.1, backgroundColor: props.darkMode ? "rgb(200, 200, 200)" : "rgb(232, 232, 232)", boxShadow: props.darkMode ? "rgba(153, 153, 153, 0.4) 0px 0px 0px 0px" : "0px 16px 10px 0px rgba(232, 232, 232, 0.5)" }}
      whileTap={{ scale: 0.9, boxShadow: "rgba(153, 153, 153, 0.4) 0px 0px 0px 0px" }}

      borderColor={props.darkMode ? "rgb(200, 200, 200)" : "rgb(232, 232, 232)"}
    >
      <Image src={props.img} invert={props.darkMode ? "100%" : "0%"} style={{ height: props.imgDim[0], width: props.imgDim[1] }}></Image>
    </Button>
  );

}
export default ItembarButton;