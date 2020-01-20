import { output } from 'pollenium-alchemilla'
import { Bytes } from 'pollenium-buttercup'

export class ContractOutput {
  readonly abi: any
  readonly bytecode: Bytes

  constructor(readonly fileName: string, readonly contractName: string) {
    this.abi = output.contracts[fileName][contractName].abi
    this.bytecode = Bytes.fromHexish(
      output.contracts[fileName][contractName].evm.bytecode.object
    )
  }
}
