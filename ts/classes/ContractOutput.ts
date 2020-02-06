import { output } from 'pollenium-alchemilla'
import { Bytes } from 'pollenium-buttercup'
import { Uu } from 'pollenium-uvaursi'

export class ContractOutput {
  readonly abi: any
  readonly bytecode: Bytes

  constructor(readonly fileName: string, readonly contractName: string) {
    this.abi = output.contracts[fileName][contractName].abi
    this.bytecode = new Bytes(Uu.fromHexish(
      output.contracts[fileName][contractName].evm.bytecode.object
    ))
  }
}
