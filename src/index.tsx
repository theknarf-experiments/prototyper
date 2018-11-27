import Emmet from './Emmet';

//@ts-ignore
import GoldenLayout from 'golden-layout';
import 'golden-layout/src/css/goldenlayout-base.css';
import 'golden-layout/src/css/goldenlayout-dark-theme.css';

import { dom } from 'isomorphic-jsx';
dom(); // @babel/preset-typescript hack

document.head.innerHTML += <style>{`
	header {
		background: #001;
		top: 0;
		left: 0;
		right: 0;
		height: 20px;
		color: white;
		position: fixed;
		padding: 0px 0px 50px 10px;
		font-family: sans-serif;
	}
	header > h1 {
		font-size: 30px;
	}
	body > section {
		margin-top: 70px;
	}
	.output {
		background: lightgrey;
		padding: 20px;
	}
`}</style>;

//@ts-ignore
let promise = new Promise((resolve, reject) => setTimeout(resolve, 0));

document.body.innerHTML =
	<header>
		<h1> Prototyper </h1>
	</header> +
	<section>
		<Emmet id="test" onReady={promise} />
	{/*<iframe id="content" width="300px" height="400px" />*/}
	</section>;

var config = {
    content: [{
        type: 'row',
        content:[{
            type: 'component',
            componentName: 'testComponent',
            componentState: { func: () => <div id='output' class='output' /> }
        },{
            type: 'column',
            content:[{
                type: 'component',
                componentName: 'testComponent',
                componentState: { label: 'B' }
            },{
                type: 'component',
                componentName: 'testComponent',
                componentState: { label: 'C' }
            }]
        }]
    }]
};
let myLayout = new GoldenLayout( config );
myLayout.registerComponent( 'testComponent', ( container, state ) => {
	const Func = state.func;
	container.getElement().html(
		(typeof Func == 'function') ?
		<Func /> :
		<h2>{ state.label }</h2>
	);
});
myLayout.init();

