import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';

const Button = styled(motion.div)`
  width: 5rem;
  height: 5rem;
  background-color: ${props => props.backgroundColor};
  border-radius: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Image = styled.img`
   filter: invert(${props => props.invert});
`;

function ItembarButton(props) {
   const sidebarItem = { hidden: { opacity: 0, scale: 0 }, show: { opacity: 1, scale: 1 } };


   return (
      <Button backgroundColor={props.darkMode ? "#434342" : "#e0d9d3"}
         variants={sidebarItem}
         onClick={props.addElement}
         whileHover={{ scale: 1.1, boxShadow: props.darkMode ? "rgba(153, 153, 153, 0.4) 0px 0px 0px 0px" : "0px 16px 10px 0px rgba(232, 232, 232, 0.5)" }}
         whileTap={{ scale: 0.9, boxShadow: "rgba(153, 153, 153, 0.4) 0px 0px 0px 0px"}}
      >
         <Image src={props.img} invert={props.darkMode ? "100%" : "0%"} style={{height: props.imgDim[0], width: props.imgDim[1]}}></Image>
      </Button>
   );

}
export default ItembarButton;