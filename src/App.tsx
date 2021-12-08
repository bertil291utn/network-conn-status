import { useEffect, useState } from 'react'
import axios from 'axios'
import { Network } from './models/Network'

function App() {
  const initNetwork: Network[] = [];
  const [network, setNetwork] = useState(initNetwork)
  useEffect(() => {
    const getNetworkConn = async () => {
      const { data } = await axios(`${process.env.REACT_APP_NETWORK_API_URL}/chains/properties`)
      let resp: any = Object.entries(data)
      resp = resp.map((e: any) => ({ ...e[1] }))
      let _network: Network[] = resp.filter((e: Network) => e.tokenSymbol && e.tokenDecimals)
      _network = _network.sort((a: Network, b: Network) => {
        const textA = a.name.toLowerCase();
        const textB = b.name.toLowerCase();
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      })
      setNetwork(_network)
    }
    getNetworkConn()
  }, [])
  return (network.length > 0
    ?
    <div>
      <h1>This is app.tsx</h1>
    </div>
    :
    <p>Loading ...</p>

  );
}

export default App;
