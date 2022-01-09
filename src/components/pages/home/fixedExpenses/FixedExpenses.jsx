
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Done from './Done';
import ToDo from './ToDo';




function FixedExpenses() {



    const toDos = ['Booking', 'Apartmaneto', 'otraCosapending'];


    const dones = ['compras', 'comida', 'cama',];

    return (
        <>
            <div>Mostrando FixedExpenses</div>
            <TableContainer component={Paper}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>

                        <TableRow>
                            <TableCell align="center" colSpan={2}>
                                FixedExpenses
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align="center" colSpan={1} >TO DO</TableCell>
                            <TableCell align="center" colSpan={1}> DONE</TableCell>
                        </TableRow>

                    </TableHead>

                    <TableBody>

                        <TableRow component="th" scope="row" align="center" colSpan={1}>
                            <TableCell align="center" colSpan={1}>  <ToDo /> </TableCell>
                            <TableCell align="center" colSpan={1}> <Done /> </TableCell>
                        </TableRow>

                    </TableBody>
                </Table>
            </TableContainer >

        </>);
}

export default FixedExpenses;


