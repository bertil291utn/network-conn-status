import styled from '@emotion/styled';
import { styled as styledMui } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';

type LabelProps = {
  muted?: boolean;
  bold?: boolean;
};

export const Centered = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90vh;
`;

export const NameCell = styled.div`
  display: flex;
  align-items: center;
  width: 30%;
  justify-content: space-between;
`;

export const Label = styled.p`
  color: ${(props: LabelProps) => (props.muted ? 'gray' : '')};
  font-weight: ${(props: LabelProps) => (props.bold ? 'bold' : '')};
`;

export const StyledTableCell = styledMui(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));
