import { _decorator, Component } from 'cc';
import { installDependencies } from './GameInstaller';

const { ccclass } = _decorator;

@ccclass('GameEntry')
export class GameEntry extends Component {

    onLoad() {
        installDependencies();
    }
}