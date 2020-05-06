import React, {useMemo, useState} from 'react';
import {useDropzone} from 'react-dropzone';
import axios from 'axios';
import ProgressBar from './progressbar';

const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  transition: 'border .24s ease-in-out'
};

const activeStyle = {
  borderColor: '#2196f3'
};

const acceptStyle = {
  borderColor: '#00e676'
};

const rejectStyle = {
  borderColor: '#ff1744'
};

function Dragdrop(props) {

    const [message, setmessage] = useState('');
    const [uploadPercentage, setuploadPercentage] = useState(0);
  const {
    acceptedFiles,
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject
  } = useDropzone({
      accept: 'image/*',
      noClick:true,
      noKeyboard:true
});


  const style = useMemo(() => ({
    ...baseStyle,
    ...(isDragActive ? activeStyle : {}),
    ...(isDragAccept ? acceptStyle : {}),
    ...(isDragReject ? rejectStyle : {})
  }), [
    isDragActive,
    isDragReject
  ]);

const upload = (e)=>{

    const formData = new FormData();
    if(acceptedFiles.length>0)
    {


    for(var i=0;i<acceptedFiles.length;i++)
      {
          formData.append('image',acceptedFiles[i]);
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
            console.log(result.data);
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
    <div className="container mt-4">
      <div {...getRootProps({style})}>
        <input {...getInputProps()} />
  {acceptedFiles.length>0?<strong>{acceptedFiles.length} {acceptedFiles.length===1?<span>File</span>:<span>Files</span>} Selected</strong>:<p>Drag 'n' drop files here to uploaad</p>}
        <button onClick={upload}  
            type="button" className="btn btn-primary mt-2">
            Upload
          </button>
          
      </div>

      {uploadPercentage!==0?<div className='mt-4'> <ProgressBar percentage={uploadPercentage}/></div>:null}

{message? <div className="alert alert-info alert-dismissible fade show mt-4" role="alert">
{message}
<button type="button" className="close" data-dismiss="alert" aria-label="Close">
<span aria-hidden="true">&times;</span>
</button>
</div> : null}

    </div>
  );
}

export default Dragdrop;