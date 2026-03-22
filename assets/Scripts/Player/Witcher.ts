import { _decorator, animation, CCBoolean, CCFloat, CircleCollider2D, Collider2D, Component, Contact2DType, EventKeyboard, Input, input, KeyCode, Physics2DUtils, RigidBody2D, Vec2, Vec3, } from 'cc';
import { StateMachine } from '../StateMachine/StateMachine';
import { WitcherIdleState } from './WitcherIdleState';
import { WitcherRunState } from './WitcherRunState';
const { ccclass, property } = _decorator;

@ccclass('Witcher')
export class Witcher extends Component {
    @property
    public stateMachine: StateMachine;

    @property(animation.AnimationController)
    public animator: animation.AnimationController;

    @property(RigidBody2D)
    public rb: RigidBody2D;

    @property(CCFloat)
    public speed: number;
    @property(CCFloat)
    public jumpForce: number = 15;
    private _inputX: number = 0;

    @property(CircleCollider2D)
    public footCollider: CircleCollider2D;
    @property(CCBoolean)
    public isGrounded: boolean;
    onLoad() {
        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
        input.on(Input.EventType.KEY_UP, this.onKeyUp, this);

        this.footCollider.on(Contact2DType.BEGIN_CONTACT, (self, other, contact) => {
            console.log("BEGIN CONTACT with:", other.node.name);
            console.log("Other collider type:", other.constructor.name);
            console.log("Is sensor:", this.footCollider.sensor);
            this.isGrounded = true;
        });

        this.footCollider.on(Contact2DType.END_CONTACT, (self, other) => {
            console.log("END CONTACT with:", other.node.name);
            this.isGrounded = false;
        });

        this.footCollider.on(Contact2DType.PRE_SOLVE, (self, other) => {
            console.log("PRE_SOLVE with:", other.node.name);
        });
    }

    onDestroy() {
        input.off(Input.EventType.KEY_DOWN, this.onKeyDown, this);
        input.off(Input.EventType.KEY_UP, this.onKeyUp, this);
    }

    start() {
        this.stateMachine = new StateMachine();
        this.stateMachine.AddState("Idle", new WitcherIdleState(this))
        this.stateMachine.AddState("Run", new WitcherRunState(this))
        this.stateMachine.Init()
    }
    onKeyDown(event: EventKeyboard) {
        switch (event.keyCode) {
            case KeyCode.KEY_A:
            case KeyCode.ARROW_LEFT:
                this._inputX = -1;
                break;

            case KeyCode.KEY_D:
            case KeyCode.ARROW_RIGHT:
                this._inputX = 1;
                break;

            case KeyCode.KEY_W:
            case KeyCode.SPACE:
                this.jump();
                break;
        }
    }

    onKeyUp(event: EventKeyboard) {
        switch (event.keyCode) {
            case KeyCode.KEY_A:
            case KeyCode.ARROW_LEFT:
            case KeyCode.KEY_D:
            case KeyCode.ARROW_RIGHT:
                this._inputX = 0;
                break;
        }
    }

    jump() {
        const velocity = this.rb.linearVelocity;
        velocity.y = this.jumpForce;
        this.rb.linearVelocity = velocity;
    }
    move(dt: number) {
        const velocity = this.rb.linearVelocity;

        velocity.x = this._inputX * this.speed;
        this.rb.linearVelocity = velocity;

        // flip nhân vật
        if (this._inputX !== 0) {
            this.node.setScale(
                Math.sign(this._inputX) * Math.abs(this.node.scale.x),
                this.node.scale.y,
                this.node.scale.z
            );
        }
    }

    update(deltaTime: number) {
        this.move(deltaTime);
        this.stateMachine.Update(deltaTime);

    }
}


