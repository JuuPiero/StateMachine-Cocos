import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
export interface IState {
    animationBoolName: string;
    Enter(): void;
    Exit(): void;
    Update(deltaTime: number): void;
    IsMatchingConditions(): boolean;
}
