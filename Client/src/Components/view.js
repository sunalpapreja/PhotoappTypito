import React, { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
var flag = false;

const View = (props) => {

    const [loading, setloading] = useState(true);
    const [url, seturl] = useState([]);
    const [page,setpage] = useState(1);
    const [more, setmore] = useState(false);
    var imgdate = [];

    var observer = useRef();
    var lastRowRef = useCallback(
        (lastTag) => {
            if(loading)
            {
                return
            }
            if(observer.current)
            {
                observer.current.disconnect();
            }
            observer.current = new IntersectionObserver((entries) =>{
                if(entries[0].isIntersecting)
                {
                    if(flag && more)
                    {
                        var x = page;
                        setpage(x+1);
                    }
                    else
                    {
                        flag = true;
                    }
                }
            })
            if(lastTag)
            {
                observer.current.observe(lastTag);
            }
        },[loading,more]
    )

    
    useEffect(() => {

        setloading(true);
        var fileDates = [];
        axios({
            method:'GET',
            url: '/view',
            params:{
                page:page
            }
        }).then(res=>{
            if(!res)
            {
                console.log("Request failed")
            }
            var images = res.data;
            setmore(images.length>0);
            images.forEach((filename, index)=>{
                filename = filename.split('-');
                var date = Number(filename[1]);
                date = new Date(date);
                date = date.toString();
                date = date.substr(4,11);
                fileDates.push(date);
            });
            fileDates.sort().reverse();
            fileDates = fileDates.filter((value,index)=>{
                return fileDates.indexOf(value)===index
            })
            images = images.map(filename=>{

                return 'https://typitophotoapp.herokuapp.com/' + filename
            });
            console.log(images);

            fileDates.forEach((date, index)=>{
                imgdate.push({
                    date:date,
                    img:[]
                });
                images.forEach((filename, index2)=>{
                    var splitfilename = filename.split('-');
                    var d = Number(splitfilename[1]);
                    d = new Date(d);
                    d = d.toString();
                    d = d.substr(4,11);
                    if(d===imgdate[index].date)
                    {
                        imgdate[index].img.push(filename);
                    }
                });
            });

            seturl((url)=>{
                if(url.length>0 && imgdate.length>0)
                {
                    if(url[url.length-1].date===imgdate[0].date)
                    {
                    var temp = url;
                    temp[temp.length-1].img = temp[temp.length-1].img.concat(imgdate[0].img);
                    imgdate.splice(0,1);
                    
                    temp = temp.concat(imgdate);
                    return temp;
                    }
                }
                else
                {
                    return [...url, ...imgdate];
                }
                
                
                
            } );
            setloading(false)
        }).catch(err=>{
            setloading(false)
        });

    },[page]);



    

    const showFullImage = (e)=>{
        var fullimage = e.target.src;
        props.setselectedImage(fullimage, url);
        props.history.push('/fullimage');
    }

    const showImages = () => {
        var UI = [];
        var count = 0;
        for(var i=0; i<url.length;i++)
        {
        UI.push(<div className="d-flex justify-content-center bg-info mt-4"><strong>----{url[i].date}----</strong></div>)
            for (var j = 0; j<url[i].img.length;j=j+6)
            {   
                if(count>=24)
                {  
                    count = 0;
                UI.push(<div className="row row-cols-8 mt-5" ref={lastRowRef} key={i}>
            <div className="col-sm">
                    <img
                        src={url[i].img[j]}  
                        alt=""
                        onClick={showFullImage}
                        className="img-thumbnail"
                        />
            </div>
            <div className="col-sm">
            <img
                        src={url[i].img[j+1]}
                        alt=""
                        className="img-thumbnail"
                        onClick={showFullImage}/>
            </div>
            <div className="col-sm">
            <img
                        src={url[i].img[j+2]}
                        alt=""  
                        className="img-thumbnail"
                        onClick={showFullImage}/>
            </div>
            <div className="col-sm">
            <img
                        src={url[i].img[j+3]}
                        alt="" 
                        className="img-thumbnail" 
                        onClick={showFullImage}/>
            </div>
            <div className="col-sm">
            <img
                        src={url[i].img[j+4]}
                        alt="" 
                        className="img-thumbnail" 
                        onClick={showFullImage}/>
            </div>
            <div className="col-sm">
            <img
                        src={url[i].img[j+5]}
                        alt="" 
                        className="img-thumbnail" 
                        onClick={showFullImage}/>
            </div>
            
          </div>)
        }
        else
        {
            count = count+6;
            UI.push(<div className="row row-cols-8 mt-5" key={i}>
            <div className="col-sm">
                    <img
                        src={url[i].img[j]}
                        alt=""  
                        onClick={showFullImage}
                        className="img-thumbnail"
                        />
            </div>
            <div className="col-sm">
            <img
                        src={url[i].img[j+1]}
                        alt=""
                        className="img-thumbnail"
                        onClick={showFullImage}/>
            </div>
            <div className="col-sm">
            <img
                        src={url[i].img[j+2]}  
                        alt=""
                        className="img-thumbnail"
                        onClick={showFullImage}/>
            </div>
            <div className="col-sm">
            <img
                        src={url[i].img[j+3]}
                        alt="" 
                        className="img-thumbnail" 
                        onClick={showFullImage}/>
            </div>
            <div className="col-sm">
            <img
                        src={url[i].img[j+4]}
                        alt="" 
                        className="img-thumbnail" 
                        onClick={showFullImage}/>
            </div>
            <div className="col-sm">
            <img
                        src={url[i].img[j+5]}
                        alt="" 
                        className="img-thumbnail" 
                        onClick={showFullImage}/>
            </div>
            
          </div>)
        }
            }
            
    }  
        return UI;  

    }


    
    return (
        
        <div>
        <div className="container mt-4" >
            {showImages()}
        </div>
        <div className="container mt-4">
        {loading?<div className = "container mt-4 d-flex justify-content-center"><strong>Loading...</strong></div>:null}
        </div>
        </div>
        
    )
}

 

const mapDispatchToProps = (dispatch)=>{
    return {
        setselectedImage: (selectedImage, allImages)=>{
            var images = [];
            allImages.forEach((item, index)=>{
                item.img.forEach((item2, index)=>{
                    item2 = item2.substr(0,37) + "720/" + item2.substr(37,);
                    images.push(item2);
                });
            })
            selectedImage = selectedImage.substr(0,37) + "720/" + selectedImage.substr(37,);
            dispatch({
                type:'Set_Image',
                img:selectedImage,
                images:images
            });
        }
    }
}

export default connect(null,mapDispatchToProps)(View);