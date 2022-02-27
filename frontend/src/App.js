import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Test from './screens/testScreen/Test';
import Home from './screens/homeScreen/Home';
import Signup from './screens/signup/Signup';
import Signin from './screens/signin/Signin';
import Profile from './screens/profile/Profile';
import './App.css';
import TestSeries from './screens/testSeries/TestSeries';
import EditProfile from './screens/profile/EditProfile';
import ResetPassword from './screens/profile/ResetPassword';


function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path='/' element={< Home />}></Route>
          <Route exact path='/test/' element={< Test />}></Route>
          <Route exact path='/signin/' element={< Signin />}></Route>
          <Route exact path='/signup/' element={< Signup />}></Route>
          <Route exact path='/profile/' element={< Profile />}></Route>
          <Route exact path='/edit-profile/' element={< EditProfile />}></Route>
          <Route exact path='/reset-password/' element={< ResetPassword />}></Route>
          <Route exact path='/series:subject' element={< TestSeries />}></Route>
        </Routes>
      </div>
    </Router>
    
    
  );
}

export default App;
