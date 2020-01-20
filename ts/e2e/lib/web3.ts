import Web3 from 'web3'
import { ganacheProvider } from './ganacheProvider'

export const web3 = new Web3(ganacheProvider)
