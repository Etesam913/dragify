import React from "react";
import styled from 'styled-components';
import deletebutton from "./images/deletebutton.png";
import githublogo from './images/GitHubLogo.png';
import './App.css'

import {motion} from 'framer-motion';
import { Window, DeleteButton, RowGrid, Title } from './windowstyled';

const Subtitle = styled(Title)`
  font-size: 1.5rem;
  padding-right: 10%;
  text-decoration: none;
`;

const ModifiedWindow = styled(Window)`
  min-height: 45%;
  width: 25%;
  top: 25%;
  left: 38%;
`;

const Logo = styled(motion.img)`
  margin-top: .75rem;
  margin-bottom: .75rem;
`;

function AboutWindow(props) {
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
  return (
    <ModifiedWindow darkMode={props.darkMode} variants={backgroundVariants} initial={{ opacity: 0, scale: 0 }} animate={props.showAboutWindow && props.editable ? "show" : "hidden"}>
      <RowGrid>
        <Title>About The Project</Title>
        <DeleteButton darkMode={props.darkMode} src={deletebutton}
          whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}
          onClick={() => { props.setAboutWindow() }}></DeleteButton>
      </RowGrid>
      <Subtitle>
        This extension was made using React.js, Styled Components, and Framer Motion.
      </Subtitle>
      <Subtitle>
        You can find the Github Page Below:
      </Subtitle>
      <a href="https://github.com/Etesam913/flow-page" className="cursor-drag"><Logo src={githublogo} whileHover={{scale: 1.1}} whileTap={{scale:.95}}/></a>
      <Subtitle>Cursor icons taken from </Subtitle> 
      <Subtitle as="a" className="cursor-drag" href="https://icons8.com/">
      icons8.com
      </Subtitle>

    </ModifiedWindow>
  );
}
export default AboutWindow;