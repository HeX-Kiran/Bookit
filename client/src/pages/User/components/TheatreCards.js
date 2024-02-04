import React from 'react'
import { THEATRE_PAGE_SECTION, THEATRE_STATUS, TOAST_STATUS, showToast } from '../../../util'
import { deleteTheatre } from '../../../apicalls/theatre'
import { useDispatch } from 'react-redux'
import { hideLoader, showLoader } from '../../../store/loadingSlice';

function TheatreCards({theatre,getAllTheatres,setSection,setSelectedTheatre}) {

    const dispatcher = useDispatch();

    // FUNCTION TO DELETE A THEATRE
    const handleDeleteBtn = async()=>{
        try{
        dispatcher(showLoader())
        const response   = await deleteTheatre(theatre._id);
        dispatcher(hideLoader());
        if(response.success){
            showToast(TOAST_STATUS.SUCCESS,"Theatre deleted successfully");
            getAllTheatres();
        }
        else{
            showToast(TOAST_STATUS.ERROR,response.message)
        }
  
      } catch (error) {
        showToast(TOAST_STATUS.ERROR,"Something went wrong")
      }
    }


    // FUNCTION TO MOVE TO THE SHOW SECTION OF THE CLICKED THEATRE
    const handleEditBtn = (theatreID)=>{
      // go to section shows
      setSection(THEATRE_PAGE_SECTION.SHOWS);
      // move to the theatre having the theatreID and make it as the view
      setSelectedTheatre(theatre._id)
  }


  return (
    <div className={theatre.isActive === THEATRE_STATUS.PENDING ? 'theatre-cards bg-violet-600 text-white transition-all relative card-disable' : 'theatre-cards  text-white transition-all relative'} >
        <div className='theatre-card-grid'>
            <p className='alphabet bg-white text-xl rounded-xl font-bold text-center text-violet-800 flex items-center justify-center '>{theatre?.name[0]}</p>
            <h1 className='text-lg font-bold uppercase'>{theatre.name}</h1>
            <p className='location text-md font-bold text-violet-200'>{theatre.location.toLowerCase()}</p>
            
        </div>
        {/* Total shows */}
        <p className='show-no font-bold text-xl text-center my-8'>Total shows :- 10</p>
        {/* Delete and edit btn */}
        
        <i className= {theatre.isActive === THEATRE_STATUS.PENDING  ?"btn-disable" :" ri-delete-bin-line py-2  bg-red-500 text-white rounded-xl text-2xl text-center hover:scale-105 " } onClick={handleDeleteBtn}></i>
        <i className={theatre.isActive === THEATRE_STATUS.PENDING || theatre.isActive === THEATRE_STATUS.REJECTED ?"btn-disable" :" ri-pencil-line py-2  bg-green-500 text-white rounded-xl text-2xl text-center hover:scale-105 " } onClick={()=>handleEditBtn(theatre._id)}></i>

        
        {/* Theatre status */}
        {
            theatre.isActive === THEATRE_STATUS.PENDING && <p className='theatre-status font-bold text-xs text-center py-1 px-2 uppercase text-black bg-yellow-400 rounded-xl absolute'> {theatre.isActive}</p>
        }
        {

            theatre.isActive === THEATRE_STATUS.ACTIVE && <p className='theatre-status font-bold text-xs text-center py-1 px-2 uppercase text-white bg-green-500 rounded-xl absolute'> {theatre.isActive}</p>
        }
        {
            theatre.isActive === THEATRE_STATUS.REJECTED && <p className='theatre-status font-bold text-xs text-center py-1 px-2 uppercase text-white bg-red-500 rounded-xl absolute'> {theatre.isActive}</p>
            
        }

        {
             theatre.isActive === THEATRE_STATUS.REJECTED && <p className='font-bold text-white text-sm italic'>Please register again with valid info</p>
        }
        
        
    </div>
  )
}

export default TheatreCards