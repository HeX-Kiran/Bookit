import React from 'react'
import HashLoader from "react-spinners/HashLoader";
import RotateLoader from "react-spinners/RotateLoader"

function Loader({isLoading}) {

    // const override  = ({
    //     height: '100vh'
    //   })
  return (

    <div className=''>
        {
        isLoading && <div className='flex items-center justify-center  w-[100%]  loader z-20  '>
        
        <RotateLoader color={"rgb(190, 157, 243)"}

            
            loading={true}
            
            // cssOverride={override}
            size={15}
            aria-label="Loading Spinner"
            data-testid="loader" />
        </div>
        }
    </div>
     
  )
}

export default Loader