import { useState } from 'react'
import * as Mui from '@mui/material';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { styled as styledMui } from '@mui/material/styles';
import styled from '@emotion/styled'
import { Network } from '../models/Network';

const StyledTableCell = styledMui(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

type LabelProps = {
  muted?: boolean,
  bold?: boolean,

}

const NameCell = styled.div`
  display:flex;
  align-items: center;
  width:30%;
  justify-content: space-between;
`
const Label = styled.p`
  color:${(props: LabelProps) => props.muted ? 'gray' : ''};
  font-weight:${(props: LabelProps) => props.bold ? 'bold' : ''};

`


export function TableNetwork({ data }: any) {
  const _data: Network[] = data;
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (<Mui.Paper sx={{ width: '100%', overflow: 'hidden' }}>
    <Mui.TableContainer sx={{ maxHeight: '90vh' }}>
      <Mui.Table stickyHeader aria-label="sticky table">
        <Mui.TableHead>
          <Mui.TableRow>
            {columns.map((column) => (
              <StyledTableCell
                key={column.id}
                align={column.align}
                style={{ minWidth: column.minWidth }}
              >
                {column.label}
              </StyledTableCell>
            ))}
          </Mui.TableRow>
        </Mui.TableHead>
        <Mui.TableBody>
          {_data
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row: any) => {
              return (
                <Mui.TableRow hover role="checkbox" tabIndex={-1} key={row.name}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <Mui.TableCell key={column.id} align={column.align}>
                        {column.id === 'name' &&
                          (
                            <NameCell>
                              <img src={`${process.env.REACT_APP_NETWORK_API_URL}/icons/${row.icon}`} alt={row.icon} width='30' />
                              {row.name}
                              <Label muted bold> {row.tokenSymbol[0]}</Label>
                            </NameCell>
                          )}
                        {column.id === 'net' &&
                          (
                            <span>{row.network}</span>
                          )}
                        {column.id === 'numeration' &&
                          (
                            <Label bold>{row.numeration}</Label>
                          )}
                      </Mui.TableCell>
                    );
                  })}
                </Mui.TableRow>
              );
            })}
        </Mui.TableBody>
      </Mui.Table>
    </Mui.TableContainer>
    <Mui.TablePagination
      rowsPerPageOptions={[10, 25, 100]}
      component="div"
      count={_data.length}
      rowsPerPage={rowsPerPage}
      page={page}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
  </Mui.Paper>)

}

interface Column {
  id: 'name' | 'net' | 'numeration';
  label: string;
  minWidth?: number;
  width?: number;
  align?: 'right';
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: 'numeration', label: '#' },
  { id: 'name', label: 'Name', width: 100 },
  { id: 'net', label: 'Network Status' },
];

