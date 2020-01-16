import React, { useState, useEffect, useRef } from 'react';
import { motion, useTransform, useMotionValue, useAnimation } from 'framer-motion';
import styled from 'styled-components';
import './App.css';
import trashcan from './images/trashcan.png';
import { link } from 'fs';
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
   margin-bottom: .2rem;
`
const Subtitle = styled.div`
   font-size: .75rem;
   text-align: center;
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
   display: none;
`;
const Logo = styled(motion.img)`
   width: 6.5rem;
   height: 6.5rem;
   object-fit: cover;
   object-position: center;
   border-radius: 100%;
`

function Link(props) {
   const component = useRef(null);
   const linkInput = useRef(null);
   const [stage, setStage] = useState(0);
   const [image, setImage] = useState("");
   const [linkAddress, setLinkAddress] = useState("");
   const [loading, setLoading] = useState(false);
   const [imageError, setImageError] = useState("");

   function imageHandler(e) {
      const files = e.target.files;
      if (files[0].size > 524288) { // 500 kilobytes
         setImageError("File has to be under 500 kilobytes");
      }
      else{
         setImageError("");
         uploadImage(files);
      }
   }

   async function uploadImage(files) {
      
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
      setImage(file.secure_url);
   }


function storeLink() {
   setStage(1);
   if (linkInput.current.value[0] === "w" && linkInput.current.value[1] === "w" && linkInput.current.value[2] === "w") { // Is it a www link
      setLinkAddress("https://" + linkInput.current.value);
   }
   else {
      setLinkAddress(linkInput.current.value);
   }
}

if (stage === 0) {
   return (
      <Component animate={{ borderRadius: "0%" }} transition={{ duration: 1 }} ref={component} drag dragMomentum={false}>
         <Header>Paste Link Below</Header>
         <Subtitle> ex: www.reddit.com </Subtitle>
         <LinkInput ref={linkInput}></LinkInput>
         <Button onClick={() => { storeLink() }} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>Next</Button>
      </Component>
   );
}
else if (stage === 1) {
   return (
      <Component animate={{ borderRadius: "20%" }} transition={{ duration: 1 }} ref={component} drag dragMomentum={false}>
         <FileLabel htmlFor="files">Select Image</FileLabel>
         <FileInput id="files" type="file" onChange={(e) => { imageHandler(e) }}></FileInput>
         <Subtitle style={{marginBottom: ".5rem", marginTop: ".5rem"}}>{imageError}</Subtitle>
         <Button onClick={() => { setStage(2) }} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>Submit</Button>
      </Component>
   );
}
else {
   return (
      <Component animate={{ borderRadius: "100%" }} transition={{ duration: 3 }} ref={component} drag dragMomentum={false}>
         {loading ? <h3> loading </h3> : <a style={{borderRadius: "100%"}} href={linkAddress}><Logo src={image} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}></Logo></a>}
      </Component>
   );
}

}
export default Link;