import { useEffect, useState } from 'react'
import axios from 'axios'
import { Network } from './models/Network'
import { TableNetwork } from './components/Table';

function App() {
  const initNetwork: Network[] = [];
  const [network, setNetwork] = useState(initNetwork)
  const [networkNoStatus, setNetworkNoStatus] = useState(initNetwork)

  const getStatus = (_network: Network[]) => {
    return Promise.all(_network.map(async (e: Network, index: number) => {
      const { data } = await axios(`${process.env.REACT_APP_NETWORK_API_URL}/api/v1/check/${e.name.toLowerCase()}`)
      return { ...e, numeration: index + 1, network: data }
    }))
  }

  useEffect(() => {
    const getNetworkConn = async () => {
      const { data } = await axios(`${process.env.REACT_APP_NETWORK_API_URL}/api/v1/chains/properties`)
      const resp: any = Object.entries(data)
        .map((e: any) => ({ ...e[1] }))
      const _network: Network[] = resp.filter((e: Network) => e.tokenSymbol && e.tokenDecimals)
        .sort((a: Network, b: Network) => {
          const textA = a.name.toLowerCase();
          const textB = b.name.toLowerCase();
          return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
        })
      setNetworkNoStatus(_network);
      setNetwork(await getStatus(_network))
    }
    getNetworkConn();

  }, [])

  useEffect(() => {
    const setConnection = setInterval(async () => {
      setNetwork(await getStatus(networkNoStatus))
    }, 1000 * 300);

    return () => {
      clearInterval(setConnection)
    }

  }, [networkNoStatus])


  return (network.length > 0
    ?
    <div>
      <TableNetwork data={network} />
    </div>
    :
    <p>Loading ...</p>

  );
}

export default App;
