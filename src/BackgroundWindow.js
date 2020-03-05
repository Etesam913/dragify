import React, { useState } from "react";
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { CirclePicker } from 'react-color';
import deletebutton from "./images/deletebutton.png";

const Container = styled(motion.div)`
   position: fixed;
   display: flex;
   flex-direction: column;
   align-items: center;
   top: 20%;
   height: 60%;
   width: 35%;
   background-color: blue;
   z-index: 2;
   left: 33.5%;
   border-radius: 3rem;
   background-color: ${props => props.backgroundColor};
   color: ${props => props.color};
`;

const Title = styled(motion.div)`
  font-size: 2rem;
  margin-top: .5rem;
  margin-bottom: .5rem;
  padding-left: 10%;
  border-top-left-radius: 3rem;
  @media(max-width: 1600px){
    font-size:1.5rem;
  }

  @media(max-width: 1200px){
    font-size: 1rem;
  }
  -webkit-touch-callout: none; 
    -webkit-user-select: none; 
     -khtml-user-select: none; 
       -moz-user-select: none; 
        -ms-user-select: none; 
            user-select: none; 
`;

const DeleteButton = styled(motion.img)`
  height: 2rem;
  width: auto;
  filter: invert(${props => props.invert});
  border-top-right-radius: 3rem;
  padding-right: 2rem;
  @media(max-width: 1600px){
    height: 1.5rem;
    padding-right: 1.5rem;
  }
  @media(max-width: 1200px){
    height: 1rem;
    padding-right: 1.5rem;
  }
`;

const RowTitle = styled(Title)`
  margin-left: .75rem;
  margin-right: 1rem;
  padding-left: 0;
`;

const RowGrid = styled.div`
  display: grid;
  grid-template-columns: 90% 10%;
  width: 100%;
  justify-items: center;
  align-items: center;
`;

const RowFlex = styled(motion.div)`
  width: 100%;
  display: flex;
  margin-top: .5rem;
  margin-bottom: .5rem;
`;

const FileInput = styled.input`
  
`;

const Test = styled.div`
  height: 2rem;
  width: 2rem;
  background-color: red;

`;
function BackgroundWindow(props) {
  const backgroundVariants = {
    show: {
      opacity: 1,
      scale: 1,
    },
    hidden: {
      opacity: 0,
      scale: 0,
    }
  }

  const colors = ['#f2f2f2', '#FF6900', '#FCB900', '#7BDCB5', '#00D084', '#8ED1FC', '#0693E3', '#ABB8C3', '#EB144C', '#F78DA7', '#000000', '#800080', '#CCFF00', '#FFDAB9', '#FFD700', '#0000EE', '#800000', '#1F1F1F']
  const [imageError, setImageError] = useState("");
  const [loading, setLoading] = useState(false);
  //Image uploading
  function imageHandler(e) {
    const files = e.target.files;
    if(files[0].size > 1048576){ // File cannot be greater than a megabyte
      setImageError("File has to be under 1 megabyte.");
    } 
    else{
      setImageError("Submitted Successfully");
      uploadBackgroundImage(files);
    }
    
  }

  async function uploadBackgroundImage(files) {
    const data = new FormData();
    data.append('file', files[0]);
    data.append('upload_preset', 'etesam');
    setLoading(true);
    const res = await fetch('https://api.cloudinary.com/v1_1/dz5ashos1/image/upload',
      {
        method: 'POST',
        body: data
      })
    const file = await res.json();
    setLoading(false);
    props.setBackgroundImg([true, file.secure_url]);
    //localStorage.setItem("image" + props.identifier, file.secure_url);
  }

  function handleColorChange(colorVal) {
    props.setBackgroundColor([true, colorVal.hex]);
    let colorArr = [true, colorVal.hex];
    localStorage.setItem("backgroundColor", JSON.stringify(colorArr));
  }

  return (
    <Container color={props.darkMode ? "white" : "black"} backgroundColor={props.darkMode ? "rgb(39, 39, 39)" : "rgb(232, 232, 232)"} variants={backgroundVariants} initial={{ opacity: 0, scale: 0 }} animate={props.showBackgroundWindow && props.editable ? "show" : "hidden"}>
      <RowGrid>
        <Title> Background Options </Title>
        <DeleteButton src={deletebutton}
          invert={props.darkMode ? "100%" : "0%"}
          whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}
          onClick={() => { props.setBackgroundWindow() }}>
        </DeleteButton>
      </RowGrid>
      <RowFlex>
        <RowTitle>Colors: </RowTitle>
        <CirclePicker width="75%" onChange={handleColorChange} colors={colors} />
      </RowFlex>
      <RowFlex>
        <FileInput id="backgroundFile" type="file" onChange={(e) => { imageHandler(e) }}></FileInput>
        <Test onClick={() => { props.setBackgroundImg([false, ""]) }}>bob</Test>
      </RowFlex>

    </Container>
  );
}
export default BackgroundWindow;