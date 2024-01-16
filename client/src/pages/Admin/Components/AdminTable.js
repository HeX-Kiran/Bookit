import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import moment from 'moment'

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
    align: "right",
  },
  {
    id: "genre",
    label: "Genre",
    minWidth: 170,
    align: "right",
  },
  {
    id: "language",
    label: "Language",
    minWidth: 170,
    align: "right",
    // format: (value) => value.toFixed(2),
  },
  {
    id: "releaseDate",
    label: "Release Date",
    minWidth: 170,
    align: "right",
    // format: (value) => value.toFixed(2),
  },
];



export default function AdminTable(props) {

    const rows = props.data
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

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
                const releaseDate = row.releaseDate
                row = {...row,id:index+1,releaseDate:moment(releaseDate).format('MMMM Do YYYY')}
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      
                      return column.id === "poster" ? (
                        <TableCell key={column.id} align={column.align} style={{backgroundColor:"rgb(221 214 254)"}}>
                           <img src={value} alt="movie pic" width={"250px"} height={"250px"}  style={{backgroundColor:"rgb(221 214 254)"}}></img>
                        </TableCell>
                     
                      ) : (
                        <TableCell key={column.id} align={column.align} style={{backgroundColor:"rgb(221 214 254)",fontSize:"18px",fontWeight:"600",color:"rgb(75 85 99)"}}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
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


