import React, {useState} from 'react';
import {connect} from 'react-redux';




const FullImage = (props) => {
    const [displayImage, setdisplayImage] = useState(props.img);
    var allImages = props.images;


    const handleCloseEvent = (e)=>{
        props.history.goBack();
    }

    const handlePrevious = (e) =>{
        var index = allImages.indexOf(displayImage);

        if(index!==0)
        {
            setdisplayImage(allImages[index-1]);
        }
        
    }
    const handleNext = (e) =>{
        var index = allImages.indexOf(displayImage);
        if(index!==(allImages.length-1))
        {
            setdisplayImage(allImages[index+1])
        }
        
    }
    
    return (
        <div style={{'text-align': 'center', backgroundColor:'#97908E', height:'100%'}}>
        <div style={{display:'inline-block'}}>
        <div className="container d-flex alert-dismissible mt-4 mb-4">
        <div className="jumbotron mr-4 btn-round" style={{backgroundColor:'#0000',
    display: "flex",
    justifyContent: "center",
    alignItems: "center"}}>
    <button className="btn btn-dark" onClick={handlePrevious}>&laquo;</button>
    </div>
    <div style={{display: 'grid',
            height: '100%',}}>
            <img src = {displayImage} alt="Loading" className="img-fluid" style={{'max-width': '100%',
            'max-height': '100vh',
            margin: 'auto'}}/>
            </div>
            <div>
            <button type="button" className="close" aria-label="Close" onClick={handleCloseEvent}>
            <span aria-hidden="true">&times;</span>
            </button>
    </div>
    <div className = "jumbotron vertical-center ml-4" style={{backgroundColor:'#0000',
    display: "flex",
    justifyContent: "center",
    alignItems: "center"}}>
    <button className="btn btn-dark " onClick={handleNext}>&raquo;</button>
    </div>
    </div>
    
    </div>
    </div>

        
    )
}

const mapStateToProps = (state)=>{
    return {
            img:state.img,
            images:state.images
        }
    }


export default connect(mapStateToProps)(FullImage);
