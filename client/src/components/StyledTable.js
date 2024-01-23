
import { THEATRE_STATUS } from '../util';
import { useDispatch } from 'react-redux';
import { showLoader,hideLoader } from '../store/loadingSlice';
import { TOAST_STATUS ,showToast,} from '../util';
import { deleteTheatre, editTheatre } from '../apicalls/theatre';

function StyledTable(props) {
    const theatres = props.data;
    const getAllTheatres = props.getAllTheatres;
    const dispatcher = useDispatch();

    


    
    //function to sort the theatres based on theatre status 
    const sortTheatreBasedOnStatus = ()=>{
        theatres.sort((a, b) => {
            if (a.isActive === "pending")
              return -1;
            if (b.isActive === "pending")
              return 1;
            return 0;
          });
    }
    
    //function to handle delete button in table
    const handleDeleteBtn = async(id)=>{
        try {
            dispatcher(showLoader());
            const response = await deleteTheatre(id);
            if(response.success){
                showToast(TOAST_STATUS.SUCCESS,response.message);
                //get the updated theatres
                getAllTheatres();
                dispatcher(hideLoader())
            }
            else{
              showToast(TOAST_STATUS.ERROR,response.message)
            } 
          } catch (error) {
              showToast(TOAST_STATUS.ERROR,"Internal error")
          }
    }

    //function to handle active or reject buttons in table
    const handleApproveOrReject = async(updatedTheatreDetails)=>{
        try {
            dispatcher(showLoader());
            const response = await editTheatre(updatedTheatreDetails);
            if(response.success){
                showToast(TOAST_STATUS.SUCCESS,response.message);
                //get the updated theatres
                getAllTheatres();
                dispatcher(hideLoader())
            }
            else{
              showToast(TOAST_STATUS.ERROR,response.message)
            } 
          } catch (error) {
              showToast(TOAST_STATUS.ERROR,"Internal error")
          }
    }



    //sort the theatre array based on status
    sortTheatreBasedOnStatus();

  return (
    <div className='styled-table'>
        <main className="table" id="customers_table">
            <section className="table__header">
                <h1 className='uppercase text-4xl font-medium text-black text-center tracking-widest'>Theatres</h1>
                {/* <div className="input-group">
                    <input type="search" placeholder="Search Data..." />
                    <img src="images/search.png" alt="" />
                </div> */}
                {/* Code for exporting file */}
                {/* <div className="export__file">
                    <label for="export-file" className="export__file-btn" title="Export File"></label>
                    <input type="checkbox" id="export-file" />
                    <div className="export__file-options">
                        <label>Export As &nbsp; &#10140;</label>
                        <label for="export-file" id="toPDF">PDF <img src="images/pdf.png" alt="" /></label>
                        <label for="export-file" id="toJSON">JSON <img src="images/json.png" alt="" /></label>
                        <label for="export-file" id="toCSV">CSV <img src="images/csv.png" alt="" /></label>
                        <label for="export-file" id="toEXCEL">EXCEL <img src="images/excel.png" alt="" /></label>
                    </div>
                </div> */}
            </section>
            <section className="table__body">
                <table>
                    <thead>
                        <tr>
                       
                            <th>Id</th>
                            <th>Name</th>
                            <th>Location</th>
                            <th>Address</th>
                            <th>Owner</th>
                            <th>Status</th>
                            <th></th>
                            <th></th>
                            
                        </tr>
                    </thead>
                    <tbody>
                       {
                            theatres.map((theatre,index)=>{
                                return <tr>
                                    <td>{index+1}</td>
                                    <td>{theatre.name}</td>
                                    <td>{theatre.location}</td>
                                    <td>{theatre.address}</td>
                                    <td>{theatre.owner.name}</td>
                                    <td className=''>
                                        {
                                            theatre.isActive === THEATRE_STATUS.ACTIVE && <p className='status delivered'>ACTIVE</p>
                                        }
                                        {
                                             theatre.isActive === THEATRE_STATUS.REJECTED && <p className='status cancelled'>REJECTED</p>
                                        }
                                        {
                                             theatre.isActive === THEATRE_STATUS.PENDING && <p className='status pending'>PENDING</p>
                                        }
                                    </td>
                                    <td>
                                        <button className='py-2 px-8 bg-red-100 rounded-full' onClick={()=>handleDeleteBtn(theatre._id)}><i className="ri-delete-bin-6-line text-xl" ></i></button>
                                    </td>
                                    <td>
                                        <button className='py-2 px-8 bg-blue-100 rounded-full'>
                                            <div className='flex items-center justify-between gap-8'>
                                                    <i className="ri-check-line text-2xl text-green-800" onClick={()=>handleApproveOrReject({...theatre,isActive:THEATRE_STATUS.ACTIVE})}></i>
                                                    <i className="ri-close-line text-2xl text-red-800" onClick={()=>handleApproveOrReject({...theatre,isActive:THEATRE_STATUS.REJECTED})}></i>
                                            </div>
                                        </button>
                                    </td>
                                </tr>
                            })
                       }
                       
                        
                    </tbody>
                </table>
            </section>
        </main>
    </div>

  )
}

export default StyledTable