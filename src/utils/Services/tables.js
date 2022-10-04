import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useState, useEffect } from 'react';
import useGoogleSheets from 'use-google-sheets';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));



export default function TableIO() {
    const { data, loading, error } = useGoogleSheets({
        apiKey: "AIzaSyCPhOfXbi2xFLx39JsvQhvxbE1wAvA2z3w",
        sheetId: "16SHBdFK4pzCgPBokeCxueF2mxpgoFo1BU_lLxI1c-Iw",
      });
    const [rows, setRows] = useState()
    useEffect(() => {

    }, [rows])
    
    

    
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error!</div>;
  }

  return <div>
    

    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell  align="right">Date</StyledTableCell>
            <StyledTableCell align="right">Designation</StyledTableCell>
            <StyledTableCell align="right">n° Recu</StyledTableCell>
            <StyledTableCell align="right">Cheuqe/Espece</StyledTableCell>
            <StyledTableCell align="right">Moyen de Paiement</StyledTableCell>
            <StyledTableCell align="right">Montant</StyledTableCell>
            <StyledTableCell align="right">Type De paiement</StyledTableCell>
            <StyledTableCell align="right">Agent</StyledTableCell>
            <StyledTableCell align="right">Remarque</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data[0].data.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell align="right">
                {row.date}
              </StyledTableCell>
              <StyledTableCell align="right">{row.Num_cli}</StyledTableCell>
              <StyledTableCell align="right">{row.nRecu}</StyledTableCell>
              <StyledTableCell align="right">{row.Des}</StyledTableCell>
              <StyledTableCell align="right">{row.Moy_Paiement}</StyledTableCell><StyledTableCell align="right">{row.calories}</StyledTableCell>
              <StyledTableCell align="right">{row.Montant}</StyledTableCell>
              <StyledTableCell align="right">{row.TypeDepaiment}</StyledTableCell>
              <StyledTableCell align="right">{row.agent}</StyledTableCell>
              <StyledTableCell align="right">{row.Remarque}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>;
    
  ;
}