import { WitcherState } from "./WitcherState";

export class WitcherRunState extends WitcherState {
    public override IsMatchingConditions(): boolean {
        return this._owner.rb.linearVelocity.x != 0;
    }
}