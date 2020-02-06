import { OrderInterface } from './Order';
import { Signature } from 'pollenium-ilex';
export interface SignedOrderInterface extends OrderInterface {
    signature: Signature;
}
