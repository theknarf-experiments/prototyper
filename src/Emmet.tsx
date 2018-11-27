//import babelrc from '../.babelrc';
import { expand } from '@emmetio/expand-abbreviation';
import { selector as $, escapeHtml } from './helper';
import { parseSync } from '@babel/core';
import Elements from './elements';

import { dom } from 'isomorphic-jsx';
dom(); // @babel/preset-typescript hack

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

export default Emmet;
