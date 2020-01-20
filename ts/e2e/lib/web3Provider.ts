import { providers } from 'ethers'
import { ganacheProvider } from './ganacheProvider'

export const web3Provider = new providers.Web3Provider(ganacheProvider, { name: 'ganache', chainId: 1 })
