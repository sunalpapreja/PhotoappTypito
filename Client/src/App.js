import React from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';

import './App.css';

import View from './Components/view';
import Home from './Components/home';
import FullImage from './Components/fullImage';
import {Provider} from 'react-redux';
import {createStore} from 'redux';

const initialState = {
  img: '',
  images:[]
}

const reducer = (state = initialState,action)=>{
  if(action.type==='Set_Image')
  {
    var allImages = action.images;
    var img = action.img; 
    return {
      img:img,
      images:allImages
      }
  }
}

const store = createStore(reducer);



function App() {


  return (
    <React.Fragment>
    <Provider store={store}>
    <Router>
    <Route exact path = "/" component = {Home} />
    <Route path = "/viewimages" component = {View} />
    <Route path = "/fullimage" component = {FullImage} />
    
    </Router>
    </Provider>
    

    </React.Fragment>
  );
}

export default App;