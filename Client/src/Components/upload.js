import React, {Fragment, useState} from 'react';
import ProgressBar from './progressbar';
import axios from 'axios';


const Upload = () => {

    const [files, setfiles] = useState(''); 
    const [message, setmessage] = useState('');
    const [uploadPercentage, setuploadPercentage] = useState(0);

    const onFileChaged = (e) =>{
        setfiles(e.target.files); 
        }

    const  onSubmit = (e) =>{
        e.preventDefault();
        if(files.length>0)
        {
        const formData = new FormData();
        for(var i=0;i<files.length;i++)
        {
            formData.append('image',files[i]);
        }
        
        axios.post('/upload',formData,{
            headers:{
                'Content-Type':'multipart/form-data'
            },
            onUploadProgress: progress=>{
                setuploadPercentage(parseInt(Math.round((progress.loaded*100)/progress.total)));
                if(progress.loaded===progress.total)
                {
                    setTimeout(()=>{
                        setuploadPercentage(0);
                    },5000)
                }
                
            }
        }).then((result)=>{
            setmessage("Files Uploaded");
            setTimeout(()=>{
                setmessage("");
            },5000);
        }).catch((err)=>{
            console.log(err);
            setmessage("Some error occured");
            setTimeout(()=>{
                setmessage("");
            },5000);
        })
    }
    }

    return (
        <Fragment>
            
            <form onSubmit={onSubmit}>
            <div className="custom-file">
                <input type="file"  multiple className="custom-file-input mt-4" id="customFile" onChange={onFileChaged}/>
    {files.length===0?<label className="custom-file-label" htmlFor="customFile">Select Files</label>:<label className="custom-file-label" htmlFor="customFile">{files.length>1?<span>{files.length} Files Selected</span>:<span>{files.length} File Selected</span>}</label>}
            </div>

            

            <input type="submit" className="btn btn-primary btn-block mt-4" value="Upload" />
            </form>

            {uploadPercentage!==0?<div className='mt-4'> <ProgressBar percentage={uploadPercentage}/></div>:null}

            {message? <div className="alert alert-info alert-dismissible fade show mt-4" role="alert">
            {message}
            <button type="button" className="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
            </button>
            </div> : null}

        </Fragment>
    )
}

export default Upload;
