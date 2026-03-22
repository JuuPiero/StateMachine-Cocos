import { WitcherState } from "./WitcherState";

export class WitcherIdleState extends WitcherState {
    public override IsMatchingConditions(): boolean {
        return this._owner.rb.linearVelocity.x == 0;
    }
}