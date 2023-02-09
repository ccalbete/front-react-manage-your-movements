
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import FixedExpenseItems from './FixedExpenseItems';
import categoryService from "./../../../../services/categories"

function FixedExpenses() {
    const [columnToDo, setColumnToDo] = React.useState([]);
    const [columnDone, setColumnDone] = React.useState([]);

    React.useEffect(() => {
        async function getFixedExpenses() {
            try {
                //Fetch
                const fixedExpenses = await categoryService.getUserFixedExpensesCategories();

                const fixedExpensesToDo = fixedExpenses.filter(fixedExpense => fixedExpense.spent === 0);
                const fixedExpensesDone = fixedExpenses.filter(fixedExpense => fixedExpense.spent > 0);

                setColumnToDo(fixedExpensesToDo);
                setColumnDone(fixedExpensesDone)
            } catch (error) { throw new Error(error); }
        }
        getFixedExpenses();
    }, []);

    return (
        <>
            <TableContainer component={Paper}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center" colSpan={2} style={{ backgroundColor: "#1c73d3", color: "#fff" }}>
                                Fixed expenses
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align="center" colSpan={1}>TO DO</TableCell>
                            <TableCell align="center" colSpan={1}>DONE</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        <TableRow scope="row" align="center" colSpan={1}>
                            <TableCell align="center" colSpan={1}>  <FixedExpenseItems itemsList={columnToDo} /> </TableCell>
                            <TableCell align="center" colSpan={1}> <FixedExpenseItems itemsList={columnDone} /> </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer >
        </>);
}

export default FixedExpenses;


