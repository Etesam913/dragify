import React, { useState, useEffect, useRef } from 'react';
import { motion, useTransform, useMotionValue, useAnimation } from 'framer-motion';
import styled from 'styled-components';
import './App.css';
import trashcan from './images/trashcan.png';

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
const Logo = styled.img`
   width: 50%;
   height: 50%;
`
const Button = styled(motion.button)`
   font-size: .75rem;
   font-weight: bold;
   width: 60%;
   height: 1.5rem;
   background-color: rgb(80%, 80%, 80%);
   border: none;
   border-radius: 1rem;
`
function Link(props) {
   const component = useRef(null);
   const [submit, setSubmit] = useState(false);
   const [image, setImage] = useState(null);
   function fileChangedHandler(event){
      setImage(event.target.files[0]);
   }
   function uploadHandler(){
      //axios.post('my-domain.com/file-upload', image)
   }

   if(submit){
      return(
         <Component animate={{borderRadius: "100%"}} transition={{duration: 1}} ref={component} drag dragMomentum={false}>
            <input type="file" onChange={(event)=> {fileChangedHandler(event)}}></input>
            <button onClick={()=> {uploadHandler()}}>Upload!</button>
         </Component>
      );
   }
   else{
      return (
         <Component ref={component} drag dragMomentum={false}>
            <Header>Paste Link Below</Header>
            <LinkInput></LinkInput>
            <Button onClick = {()=>{setSubmit(true)}} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>Submit</Button>
         </Component>
      );
   }
   
}
export default Link;