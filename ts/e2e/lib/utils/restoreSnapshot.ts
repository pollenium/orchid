import { web3 } from '../web3'

export async function restoreSnapshot(id: number): Promise<void> {
  return new Promise((resolve, reject) => {
    const currentProvider: any = web3.currentProvider
    currentProvider.sendAsync({
      method: "evm_revert",
      params: [id],
      jsonrpc: "2.0",
      id: new Date().getTime()
    }, (error, res) => {
      if (error) {
        return reject(error)
      } else {
        if (res.result === true) {
          resolve()
        } else {
          reject(new Error('Failed to Restore'))
        }
      }
    })
  })
}
