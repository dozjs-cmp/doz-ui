import {define} from 'doz'
import cmp from './Button'

// expose component to global scope
function register() {
    if (typeof window !== 'undefined') {
        define('ui-button', cmp)
    }
}

register();

export default cmp;

if (module.hot) {
    module.hot.dispose(function () {
        register();
    })
}