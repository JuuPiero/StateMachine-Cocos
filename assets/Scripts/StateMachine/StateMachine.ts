import { _decorator, Component, Node } from 'cc';
import { IState } from './IState';
const { ccclass, property } = _decorator;

@ccclass('StateMachine')
export class StateMachine {
    public states: Map<string, IState> = new Map<string, IState>()

    protected _currentState: IState

   
    public ChangeState(newState: IState) {
        if(this._currentState) {
            this._currentState?.Exit()
        }
        this._currentState = newState
        this._currentState?.Enter()
    }

    public Init(state?: IState) {
        if(state) {
            this.ChangeState(state);
        }
        else {
            this.ChangeState(this.states.values[0]);
        }
    }
    public AddState(animationBoolName: string, state: IState) {
        state.animationBoolName = animationBoolName;
        this.states.set(animationBoolName, state);
    }

    public Update(deltaTime: number) {
        
        for (const state of this.states.values()) {
            if(this._currentState !== state && state.IsMatchingConditions())
            {
                this.ChangeState(state);
                return;
            }
        }
        this._currentState?.Update(deltaTime)
    }
}


