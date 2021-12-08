import styled from '@emotion/styled';
import { styled as styledMui } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';

type ContainerProps = {
  padding?: string;
};

type CardsStyleProps = {
  margin?: string;
  width?: string;
};

type RibbonProps = {
  active: boolean;
};

type LabelProps = {
  muted?: boolean;
  bold?: boolean;
};

export const H2Title = styled.h2`
  text-align: center;
  margin: 1rem 0;
`;

export const Ribbon = styled.div`
  position: absolute;
  top: 10px;
  right: 0;
  background-color: ${(props: RibbonProps) => (props.active ? 'green' : 'red')};
  padding: 5px;
  font-size: 12px;
  color: white;
  font-weight: bold;
  border-radius: 5px 0 0 5px;
`;

export const CardsStyle = styled.div`
  margin-right: ${(props: CardsStyleProps) =>
    props.margin ? props.margin : '1rem'};
  margin-bottom: ${(props: CardsStyleProps) =>
    props.margin ? props.margin : '1rem'};
  width: ${(props: CardsStyleProps) => (props.width ? props.width : '30%')};
  position: relative;
`;

export const CardsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: ${(props: ContainerProps) =>
    props.padding ? props.padding : '1rem'};
`;

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
