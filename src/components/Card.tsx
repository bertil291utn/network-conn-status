import * as Mui from '@mui/material';
import { Network } from '../models/Network';
import { CardsStyle, Ribbon } from '../styles';

export function NetworkCard({ n }: any) {
  const _network: Network = n;
  return (
    <CardsStyle >
      <Mui.Card sx={{ maxWidth: 345 }}>
        <Mui.CardHeader
          avatar={
            <Mui.Avatar src={`${process.env.REACT_APP_NETWORK_API_URL}/icons/${_network.icon}`}
              aria-label={_network.icon} />
          }
          action={
            <Mui.IconButton aria-label="settings">
              {/* <Mui.MoreVertIcon /> */}
            </Mui.IconButton>
          }
          title={_network.name}
          subheader={_network.tokenSymbol[0]}
        />
      </Mui.Card>
      <Ribbon active={_network.network}>{`${_network.network ? 'Connected' : 'Disconnected'}`}</Ribbon>
    </CardsStyle>
  )
}