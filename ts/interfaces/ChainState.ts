import { Uint256 } from 'pollenium-buttercup'

export interface ChainState {
  buyyOrderTokenFilled: Uint256,
  sellOrderTokenFilled: Uint256,
  buyyOrderTokenBalance: Uint256,
  sellOrderTokenBalance: Uint256
}
