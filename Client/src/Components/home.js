import React from 'react'
import Dragdrop from './dragdrop';
import Upload from './upload'

const Home = (props) => {

  const viewImages = ()=>{
    console.log("home")
    props.history.push('/viewimages')
    
    
}

    return (
        <React.Fragment>
        <div className="container mt-4">
      <Upload/>
      </div>
      <div className="container mt-4">
      <Dragdrop/>
      <div className="text-center">
      <button type="button" className="btn btn-outline-success mt-4" value="View Uploaded Images" onClick={viewImages}>View Uploaded Images
      </button>
      </div>
      </div>
      </React.Fragment>
    )
}



export default Home;
