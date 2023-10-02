import React, { useState } from 'react'
import { useFirebase } from '../firebaseContext';
export const Modal = (props) => {

  const firebase = useFirebase();
  // const [modal,setModal] = useState(false);
  const [itrfile,setItrfile] =useState(null);
  const FetchITR = () => {
    console.log("lala")
       firebase.FetchPdf().then((url)=>{setItrfile(url);console.log(url)});
       console.log("kalaak")
  }

  return (
    <div className=''>
     <a href={itrfile} onClick={FetchITR}  target='_blank' >View ITRFile</a>



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