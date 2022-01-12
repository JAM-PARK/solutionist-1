import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './reset.css';
import './App.css';
import LoginModalContainer from './containers/LoginModalContainer';
import NavContainer from './containers/NavContainer';
import Landing from './pages/Landing';
import MySet from './pages/MySet';
import Make from './pages/Make';
import Solve from './pages/Solve';
import Setting from './pages/Setting';
import styled from 'styled-components';
import Result from './pages/Result';
import Edit from './pages/Edit';

const BG = styled.div`
  background-color: var(--very-light-pink);
  width: 100vw;
  height: 100vh;
  overflow: scroll;
`;

const App = () => {
  return (
    <BG>
      <NavContainer />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/make" element={<Make />} />
        <Route path="/solve/:setId" element={<Solve />} />
        <Route path="/myset" element={<MySet />} />
        <Route path="/solve" element={<Solve />} />
        <Route path="/setting" element={<Setting />} />
        <Route path="/result/:setId" element={<Result />} />
        <Route path="/edit/:setId" element={<Edit />} />
      </Routes>
      <LoginModalContainer />
    </BG>
  );
};

export default App;
