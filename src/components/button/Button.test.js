require('jsdom-global')();
const Button = require("../../../dist/button.nomin");

document.body.innerHTML = '<div id="app"></div>';

it('renders without crashing', function () {
    console.log(Button)
});
