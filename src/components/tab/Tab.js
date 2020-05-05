import {Component, tag} from "doz";

@tag('tab')
export default class extends Component{
    template(h) {
        return h`
            <div>Tab</div>
        `
    }
}