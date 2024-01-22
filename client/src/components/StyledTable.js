import React from 'react'
import { THEATRE_STATUS } from '../util';
import { useDispatch } from 'react-redux';
import { showLoader,hideLoader } from '../store/loadingSlice';
import { TOAST_STATUS ,showToast,} from '../util';
import { deleteTheatre } from '../apicalls/theatre';

function StyledTable(props) {
    const theatres = props.data;
    const getAllTheatres = props.getAllTheatres;
    const dispatcher = useDispatch();
    
    const handleDeleteBtn = async(id)=>{
        try {
            dispatcher(showLoader());
            const response = await deleteTheatre(id);
            if(response.success){
                showToast(TOAST_STATUS.SUCCESS,response.message);
                //get the updated movies
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
                            {/* <th> Id <span classNameName="icon-arrow">&UpArrow;</span></th>
                            <th> Customer <span classNameName="icon-arrow">&UpArrow;</span></th>
                            <th> Location <span classNameName="icon-arrow">&UpArrow;</span></th>
                            <th> Order Date <span classNameName="icon-arrow">&UpArrow;</span></th>
                            <th> Status <span classNameName="icon-arrow">&UpArrow;</span></th>
                            <th> Amount <span classNameName="icon-arrow">&UpArrow;</span></th> */}
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
                                        <button className='py-2 px-8 bg-blue-100 rounded-full'><i className="ri-pencil-line text-xl" ></i></button>
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