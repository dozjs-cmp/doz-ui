import {Component, tag} from "doz";

@tag('button')
export default class extends Component {
    template(h) {
        return h`
            <button>Button ooo</button>
        `
    }
}