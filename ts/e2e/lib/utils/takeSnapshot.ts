import { web3 } from '../web3'

export async function takeSnapshot(): Promise<number> {
  return new Promise((resolve, reject) => {
    const currentProvider: any = web3.currentProvider
    currentProvider.sendAsync({
      method: "evm_snapshot",
      params: [],
      jsonrpc: "2.0",
      id: new Date().getTime()
    }, (error, res) => {
      if (error) {
        reject(error)
      } else {
        resolve(res.result)
      }
    })
  })
}
