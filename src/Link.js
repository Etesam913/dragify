import React, { useState, useEffect, useRef } from 'react';
import { motion, useTransform, useMotionValue, useAnimation } from 'framer-motion';
import styled from 'styled-components';
import './App.css';
import trashcan from './images/trashcan.png';
import axios from "axios";
const Component = styled(motion.div)`
   width: 10rem;
   height: 10rem;
   background-color: rgb(90%, 90%, 90%);
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
   /*border-radius: 8rem; make this animatable*/
`;
const Header = styled.div`
   font-size: 1rem;
   font-weight: bold;
`
const LinkInput = styled.input`
   background-color: rgb(80%, 80%, 80%);
   width: 85%;
   height: 1.5rem;
   border: none;
   border-radius: 2rem;
   padding-left: .5rem;
   margin-bottom: .5rem;
   margin-top: .5rem;
`;
const Button = styled(motion.button)`
   font-size: .75rem;
   font-weight: bold;
   width: 60%;
   height: 1.5rem;
   background-color: rgb(80%, 80%, 80%);
   border: none;
   border-radius: 1rem;
`
const FileLabel = styled(motion.label)`
   font-size: 1rem;
   font-weight: bold;
   width: 70%;
   height: 2.5rem;
   background-color: rgb(80%, 80%, 80%);
   border: none;
   border-radius: 1rem;
   
   display: flex;
   align-items: center;
   justify-content: center;
`;
const FileInput = styled.input`
   visibility: hidden;
`;
const Logo = styled.img`
   width: 7.5rem;
   height: 7.5rem;
   border-radius: 100%;
`

function Link(props) {
   const component = useRef(null);
   const [stage, setStage] = useState(0);
   const [image, setImage] = useState("");
   const [loading, setLoading] = useState(false);

   const uploadImage = async e => {
      const files = e.target.files;
      const data = new FormData();
      data.append('file', files[0]);
      data.append('upload_preset', 'etesam');
      setLoading(true);
      const res= await fetch('https://api.cloudinary.com/v1_1/dz5ashos1/image/upload', 
      {
         method: 'POST',
         body: data
      })
      const file = await res.json();
      setLoading(false);
      setImage(file.secure_url);
   }

   if(stage === 0){
      return(
         <Component ref={component} drag dragMomentum={false}>
            <Header>Paste Link Below</Header>
            <LinkInput></LinkInput>
            <Button onClick = {()=>{setStage(1)}} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>Next</Button>
         </Component>
      );
   }
   else if(stage === 1){
      return (
         <Component animate={{borderRadius: "50%"}} transition={{duration: 1}} ref={component} drag dragMomentum={false}>
            <FileLabel for="files">Select Image</FileLabel>
            <FileInput id="files" type="file" onChange={uploadImage}></FileInput>
            <Button onClick = {()=>{setStage(2)}} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>Submit</Button>
         </Component>
      );
   }
   else{
      return(
         <Component animate={{borderRadius: "100%"}} transition={{duration: 1}} ref={component} drag dragMomentum={false}>
            {loading ? <h3> loading </h3> : <Logo src={image}></Logo> }
         </Component>
      );
   }
   
}
export default Link;