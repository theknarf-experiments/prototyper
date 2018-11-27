import { expand } from '@emmetio/expand-abbreviation';
import { selector as $, escapeHtml } from './helper';
import { parseSync } from '@babel/core';
//import babelrc from '../.babelrc';
import Elements from './elements';
import Pane from './pane';
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

const Emmet = ({ id, onReady }) => {
	
	onReady.then(() => {
		const divEl = $(`#${id}`);
		const inputEl = $(`#${id} input`) as HTMLInputElement;

		var visible = false;
		const makeVisible = () => {
			visible = true;
			divEl.style.display = 'block';
			inputEl.focus();
		};
		const makeInvisible = () => {
			visible = false;
			divEl.style.display = 'none';
			inputEl.value = '';
		};
		const flipVisible = () =>
			(visible ? makeInvisible : makeVisible)();

		document.addEventListener('keyup', e => {
			if((e.which||e.keyCode) == 187) { // the ´ key
				e.preventDefault();
				flipVisible();
				return 0;
			}
		});

		inputEl.addEventListener('keypress', e => {
			if((e.which||e.keyCode) == 13) {
				const el = e.target as HTMLInputElement;

				var html = expand(el.value, {
					profile: {
						selfClosingStyle: 'xhtml'
					}
				});
				makeInvisible();

				const output = `const Component = ({children}) => \n <>${html}</>;`;

				//console.log('output:', output);
				const presets = [
					require('@babel/preset-react'),
					require('@babel/preset-env')
				];
				const parsed = parseSync(output, {
					//...babelrc,
					presets
				});
				//console.log('parsed:', parsed.program.body)

				//$('#content').src = "data:text/html;charset=utf-8," + html;
				$('#output').innerHTML = <Elements parsed={parsed} />
			}
		});
		inputEl.addEventListener('keyup', e => {	
			if(e.key === 'Escape') {
				makeInvisible();
			}
		});	
	});

	return <div id={id} style={{
		display: 'none',
		position: 'fixed',
		left: 0,
		right: 0,
		top: '50px',
		background: 'grey',
		padding: '50px',
		'z-index': 100000,
	}}>
		<input placeholder="emmet" style={{
			padding: '20px'
		}} />
	</div>;
};

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

