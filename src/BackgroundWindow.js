import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { CirclePicker } from 'react-color';
import deletebutton from "./images/deletebutton.png";
import placeholderBackground from "./images/placeholderBackground.jpg";
import checkmarkbutton from "./images/checkmarkbutton.png";
import { pipelineTopicExpression } from "@babel/types";
const Container = styled(motion.div)`
   position: fixed;
   display: flex;
   flex-direction: column;
   align-items: center;
   top: 15%;
   min-height: 70%;
   width: 35%;
   background-color: blue;
   z-index: 2;
   left: 33.5%;
   border-radius: 3rem;
   -webkit-box-shadow: 10px 10px 58px -21px rgba(0,0,0,0.5);
  -moz-box-shadow: 10px 10px 58px -21px rgba(0,0,0,0.5);
  box-shadow: 10px 10px 58px -21px rgba(0,0,0,0.5);
   background-color: ${props => props.backgroundColor};
   color: ${props => props.color};
   -webkit-touch-callout: none; 
    -webkit-user-select: none; 
     -khtml-user-select: none; 
       -moz-user-select: none; 
        -ms-user-select: none; 
            user-select: none; 
`;

const Title = styled(motion.div)`
  font-size: 2rem;
  margin-top: .5rem;
  margin-bottom: .5rem;
  padding-left: 10%;
  border-top-left-radius: 3rem;
  text-align: center;
  @media(max-width: 1600px){
    font-size:1.5rem;
  }

  @media(max-width: 1200px){
    font-size: 1rem;
  }
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

const PreviousImages = styled.div`
  display: grid;
  width: 90%;
  height: 35%;
  grid-template-columns: 30% 30% 30%;
  justify-content: space-evenly;
  align-items: center;
`;

const RowFlex = styled(motion.div)`
  width: 90%;
  display: flex;
  margin-top: .5rem;
  margin-bottom: .5rem;
  justify-content: center;
`;

const ImageThumbnail = styled(motion.img)`
  height: 5rem;
  border-radius: .25rem;
  display: flex;
  align-self: center;
  justify-self: center;
`;

const FileInput = styled.input`
  display: none;
`;

const FileLabel = styled(motion.label)`
  border-radius: 2rem;
  font-size: .9rem;
  text-align: center;
  width: 7rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.buttonBackgroundColor};
  @media(max-width: 1200px){
    font-size: .657rem;
    height: 1.5rem;
  }
  
`;

const RemoveImage = styled(FileLabel)`
  border-radius: 2rem;
  margin-left: 1rem;
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
  const [prevImgs, setPrevImgs] = useState(["", "", "", "", "", ""]);


  useEffect(()=>{
    if(localStorage.getItem("prevImgs") !== null){
      console.log(localStorage.getItem("prevImgs"));
      setPrevImgs(JSON.parse(localStorage.getItem("prevImgs")));
    }
  }, [])

  //Image uploading
  function imageHandler(e) {
    const files = e.target.files;
    if(files[0].size > 1048576){ // File cannot be greater than a megabyte
      setImageError("File has to be under 1 megabyte.");
    } 
    else{
      uploadBackgroundImage(files);
    }
  }

  function updateImages(fileAddress){
    const imgs = prevImgs.slice();
    // Check for empty space
    for(let i = 0; i< prevImgs.length; i++){
      if(imgs[i] === ""){
        imgs[i] = fileAddress;
        setPrevImgs(imgs);
        localStorage.setItem("prevImgs", JSON.stringify(imgs));
        return;
      }
    }
    imgs[5] = fileAddress;
    localStorage.setItem("prevImgs", imgs);
    setPrevImgs(imgs);
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
    localStorage.setItem("currentBackgroundImage", file.secure_url);
    updateImages(file.secure_url);
  }

  function handleColorChange(colorVal) {
    props.setBackgroundColor([true, colorVal.hex]);
    localStorage.setItem("backgroundColor", JSON.stringify([true, colorVal.hex]));
  }

  return (
    <Container color={props.darkMode ? "white" : "black"} backgroundColor={props.darkMode ? "rgb(39, 39, 39)" : "rgb(232, 232, 232)"} variants={backgroundVariants} initial={{ opacity: 0, scale: 0 }}  animate={props.showBackgroundWindow && props.editable ? "show" : "hidden"}>
      <RowGrid>
        <Title> Background Options </Title>
        <DeleteButton src={deletebutton}
          invert={props.darkMode ? "100%" : "0%"}
          whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}
          onClick={() => { props.setBackgroundWindow() }}>
        </DeleteButton>
      </RowGrid>
      <RowTitle>Colors</RowTitle>
      <RowFlex>
        <CirclePicker width="100%" marginLeft="1rem" onChange={handleColorChange} colors={colors} />
      </RowFlex>
      <RowTitle>Upload Background Image</RowTitle>
      <RowFlex>

        <FileLabel 
        buttonBackgroundColor = {props.darkMode ? "rgb(32, 34, 35)" : "rgb(80%, 80%, 80%)"} 
        htmlFor="backgroundFile"
        whileHover={{scale: 1.1}} whileTap={{scale: 0.95}}>
        Upload Image
        </FileLabel>

        <FileInput id="backgroundFile" type="file" onChange={(e) => { imageHandler(e) }}></FileInput>
  
        <RemoveImage 
        buttonBackgroundColor = {props.darkMode ? "rgb(32, 34, 35)" : "rgb(80%, 80%, 80%)"} 
        onClick={() => { localStorage.setItem("currentBackgroundImage", [false, ""]); props.setBackgroundImg([false, ""])}}
        whileHover={{scale: 1.1}} whileTap={{scale: 0.95}}>
        Remove Image
        </RemoveImage>

      </RowFlex>
      <RowFlex>{imageError}</RowFlex>
      <RowTitle>Previous Background Images</RowTitle>
      <PreviousImages>
        <ImageThumbnail src={prevImgs[0]} onClick={()=>{props.setBackgroundImg([true, prevImgs[0]])}} whileHover={{scale: 1.1}} whileTap={{scale: .95}}></ImageThumbnail>
        <ImageThumbnail src={prevImgs[1]} onClick={()=>{props.setBackgroundImg([true, prevImgs[1]])}} whileHover={{scale: 1.1}} whileTap={{scale: .95}}></ImageThumbnail>
        <ImageThumbnail src={prevImgs[2]} onClick={()=>{props.setBackgroundImg([true, prevImgs[2]])}} whileHover={{scale: 1.1}} whileTap={{scale: .95}}></ImageThumbnail>
        <ImageThumbnail src={prevImgs[3]} onClick={()=>{props.setBackgroundImg([true, prevImgs[3]])}} whileHover={{scale: 1.1}} whileTap={{scale: .95}}></ImageThumbnail>
        <ImageThumbnail src={prevImgs[4]} onClick={()=>{props.setBackgroundImg([true, prevImgs[4]])}} whileHover={{scale: 1.1}} whileTap={{scale: .95}}></ImageThumbnail>
        <ImageThumbnail src={prevImgs[5]} onClick={()=>{props.setBackgroundImg([true, prevImgs[5]])}} whileHover={{scale: 1.1}} whileTap={{scale: .95}}></ImageThumbnail>
      </PreviousImages>
    </Container>
  );
}
export default BackgroundWindow;