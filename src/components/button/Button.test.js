import Doz from 'doz'
import Button from '../../components/button/index'

document.body.innerHTML = '<div id="app"></div>';

it('renders without crashing', function () {
    console.log(Button);
    new Doz({
        root: '#app',
        template(h) {
            return h`
                <${Button}/>
            `
        }
    });

    setTimeout(() => {
        console.log(document.body.innerHTML)
    }, 100);
});
