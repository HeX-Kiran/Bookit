import React, {  useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import ShowCard from './ShowCard'
import showImage from '../../../assets/images/show.webp'
import ShowModal from './ShowModal'

function Show({theatres,selectedTheatre,setSelectedTheatre}) {
    // type of modal box either edit or add
    const[type,setType] = useState("add");
    //if a show is selected for edit,store the data of that show in a state
    const [currShow,setCurrShow] = useState({})
    //state that manages open/close of show modal
    const[isOpen,setIsOpen] = useState(false);
    //state to hold the currTheatre
    const[currTheatre,setCurrentTheatre] = useState("");
    //state to trigger a render on shows when a show is edited or added
    const[render,setRender] = useState(true);

    const user = useSelector(state=>state.user) || "user";

    const setPageFreeze = ()=>{
        // to make overflow hidden while the modal box is open
        window.scrollTo({ top: 0, behavior: 'smooth' });
        if(isOpen)document.body.style.overflow = "hidden";
        
    }
  
    const setPageFree = ()=>{
      document.body.style.overflow = "visible";
    }
  
  
    if(isOpen)setPageFreeze();
    else setPageFree();

    const filteredTheatre = useMemo(()=>{
        // filter out the theatres according to the selectedTheatre
        if(selectedTheatre === "") return theatres;

        return theatres.filter(theatre =>{
            return theatre._id === selectedTheatre
        })
    },[theatres,selectedTheatre])

    
    
  return (
    <section className='shows my-16'>
        <div className=' welcome-msg my-16 flex items-start flex-col gap-4 w-[70%] m-auto p-8 bg-violet-200 rounded-2xl relative' >
                    <div className='w-[70%]'>
                        <h1 className='text-lg text-violet-700 font-bold mb-4'>Hi {user.name}</h1>
                        <p className='text-md font-medium'>More shows means more bussiness.Customize and add new shows to your theatres.</p>
                    </div>
                    <img src={showImage} alt='welcome person' className=' show-img'/>
        </div>
        <div className='show-cards flex items-center justify-between flex-col gap-8'>
            {
                filteredTheatre.map(theatre=>{
                    
                    return <ShowCard theatre={theatre} setIsOpen={setIsOpen} setType={setType} setCurrentTheatre={setCurrentTheatre} setCurrShow={setCurrShow} render={render} setRender={setRender}/>
                })
            }
        </div>

       {isOpen && <ShowModal type={type} currShow={currShow} setSelectedTheatre={setSelectedTheatre} setIsOpen={setIsOpen} theatreID={currTheatre} setRender={setRender}/>} 
    </section>
  )
}

export default Show