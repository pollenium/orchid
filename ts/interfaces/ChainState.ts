import { Uint256 } from 'pollenium-buttercup'

export interface ChainStateInterface {
  buyyOrderTokenFilled: Uint256,
  sellOrderTokenFilled: Uint256,
  buyyOrderTokenBalance: Uint256,
  sellOrderTokenBalance: Uint256
}
