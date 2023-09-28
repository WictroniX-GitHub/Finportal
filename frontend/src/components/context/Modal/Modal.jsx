import React, { useState } from 'react'
import { Worker } from '@react-pdf-viewer/core';
// Import the main component
import { Viewer } from '@react-pdf-viewer/core';
import { useFirebase } from '../context/firebaseContext';


// Import the styles
import '@react-pdf-viewer/core/lib/styles/index.css';

import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';

// Import styles
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

export const Modal = () => {
  const firebase = useFirebase();
  // const [modal,setModal] = useState(false);
  const [itrfile,setItrfile] =useState(null);
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  const FetchITR = () => {
       const pdfurl = firebase.FetchPdf().then((url)=>{setItrfile(url);console.log(url)});
       
            //  setModal(true);
  }

  return (
    <div className=''>
<button className='btn btn-primary btn-md'
    onClick={FetchITR} ><a href={itrfile} target='_blank'>View ITRFile</a></button>



        {/* {modal && 
        <div className="backshadow">
        <div className='custom-modal'>

            <div className='delete-icon'
            onClick={()=>setModal(false)}>
              x
            </div>

            {itrfile &&(
              <Worker  workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                <Viewer fileUrl={itrfile} plugins={[defaultLayoutPluginInstance]}/>;
              </Worker>

              
            )}
            </div>
        </div>} */}

    </div>
  )
}