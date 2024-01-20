import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import moment from 'moment';
import { deleteMovie } from "../../../apicalls/movies";
import {useDispatch} from "react-redux";
import {showLoader,hideLoader} from "../../../store/loadingSlice"
import { TOAST_STATUS, showToast } from "../../../util";


const columns = [
  {
    id: "id",
    label: "ID",
    minWidth: 60,
    align: "left",
    // format: (value) => value.toFixed(2),
  },
  {
    id: "poster",
    label: "Poster",
    minWidth: 170,
    align: "left",
    // format: (value) => value.toFixed(2),
  },
  { id: "title", label: "Title", minWidth: 170 },
  { id: "description", label: "Description", minWidth: 100 },
  {
    id: "duration",
    label: "Duration",
    minWidth: 170,
    align: "center",
  },
  {
    id: "genre",
    label: "Genre",
    minWidth: 170,
    align: "center",
  },
  {
    id: "language",
    label: "Language",
    minWidth: 170,
    align: "center",
    // format: (value) => value.toFixed(2),
  },
  {
    id: "releaseDate",
    label: "Release Date",
    minWidth: 170,
    align: "center",
    // format: (value) => value.toFixed(2),
  },
  {
    id: "delete",
    label: "",
    minWidth: 50,
    align: "center",
    // format: (value) => value.toFixed(2),
  },
  {
    id: "edit",
    label: "",
    minWidth: 50,
    align: "center",
    // format: (value) => value.toFixed(2),
  },
];



export default function AdminTable(props) {

    const rows = props.data;
    const {getAllMovies,setCurrMovie,setIsOpen,setType} = props;
   
  const dispatcher = useDispatch();  
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);


  // Handle delete button
  const handleDeleteBtn = async(id)=>{
    try {
      dispatcher(showLoader());
      const response = await deleteMovie(id);
      if(response.success){
          showToast(TOAST_STATUS.SUCCESS,response.message);
          //get the updated movies
          getAllMovies();
          dispatcher(hideLoader())
      }
      else{
        showToast(TOAST_STATUS.ERROR,response.message)
      } 
    } catch (error) {
        showToast(TOAST_STATUS.ERROR,"Internal error")
    }
    
  }

  // Handle edit button
  const handleEditBtn = (movie)=>{
    // set curr movie as the clicked movie
    setCurrMovie(movie);
    // open modalk box
    setIsOpen(true);
    // set the type as edit
    setType("edit")

  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  
  

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }} className="mt-10">
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table" className="">
          <TableHead >
            <TableRow >
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth ,backgroundColor:"rgb(196 181 253)",fontWeight:"bold", textTransform:"uppercase",color:"rgb(76 29 149)",fontSize:"16px"}}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row,index) => {
                const id = row._id;
                const releaseDate = row.releaseDate
                row = {...row,id:index+1,releaseDate:moment(releaseDate).format('MMMM Do YYYY')}
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      
                      return column.id === "poster" ?  (
                         <TableCell key={column.id} align={column.align} style={{backgroundColor:"rgb(221 214 254)"}}>
                           <img src={value} alt="movie pic" width={"200px"} height={"200px"}  style={{backgroundColor:"rgb(221 214 254)"}}></img>
                        </TableCell>
                     
                      ) : (
                        column.id === "delete" || column.id === "edit"
                        ? 
                        <TableCell style={{backgroundColor:"rgb(221 214 254)",fontSize:"16px",fontWeight:"600",color:"black"}}>
                          {column.id === "delete" 
                          ?
                           <button><i className="ri-delete-bin-6-line text-xl" onClick={()=>handleDeleteBtn(id)}></i></button>
                           : 
                           <button><i className="ri-pencil-line text-xl" onClick={()=> handleEditBtn({...row,_id:id,releaseDate:moment(releaseDate).format('YYYY-MM-DD')})}></i></button>}
                          
                          </TableCell>
                        
                        : 
                        <>
                        <TableCell key={column.id} align={column.align} style={{backgroundColor:"rgb(221 214 254)",fontSize:"16px",fontWeight:"500",color:"black"}}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                        </>
                      );
                    })}
                   
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}


