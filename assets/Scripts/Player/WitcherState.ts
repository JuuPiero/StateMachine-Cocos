import { IState } from "../StateMachine/IState";
import { Witcher } from "./Witcher";
import { StateMachine } from "../StateMachine/StateMachine";
import { animation } from "cc";

export abstract class WitcherState implements IState {
    protected _owner: Witcher;
    protected _animator: animation.AnimationController;
    protected _stateMachine: StateMachine;
    public animationBoolName: string;

    public constructor(owner: Witcher) {
        this._owner = owner;
        this._animator = owner.animator;
        this._stateMachine = owner.stateMachine;
    }

    public IsMatchingConditions(): boolean {
        return false
    }

    public Enter() {
        this._animator.setValue(this.animationBoolName, true)
    }
    public Exit() {
        this._animator.setValue(this.animationBoolName, false)
    }
    public Update(deltaTime: number) {
    }

}