import { expand } from '@emmetio/expand-abbreviation';
import { dom } from 'isomorphic-jsx';
import { selector as $, escapeHtml } from './helper';
import { parseSync } from "@babel/core";
//import babelrc from '../.babelrc';
import Elements from './elements';
import Pane from './pane';

document.head.innerHTML = <style>{`
	header {
		background: #001;
		top: 0;
		left: 0;
		right: 0;
		height: 50px;
		color: white;
		position: fixed;
		padding: 10px 0px 30px 50px;
	}
	body > section {
		margin-top: 100px;
	}
`}</style>;

document.body.innerHTML =
	<header>
		<h1> Prototyper </h1>
	</header> +
	<section>
		<input id="test" placeholder="emmet" />
	{/*<iframe id="content" width="300px" height="400px" />*/}
		<Pane title="output">
			<div id="output" />
		</Pane>
	</section>;

$('#test').addEventListener('keypress', e => {
	if((e.witch||e.keyCode) == 13) {
		var html = expand(e.target.value, {
			profile: {
				selfClosingStyle: 'xhtml'
			}
		});

		const output = `const Component = ({children}) => \n ${html};`;

		console.log('output:', output);
		const presets = [
			require('@babel/preset-react'),
			require('@babel/preset-env')
		];
		const parsed = parseSync(output, {
//			...babelrc,
			presets
		});
		console.log('parsed:', parsed.program.body)

		//$('#content').src = "data:text/html;charset=utf-8," + html;
		$('#output').innerHTML = <Elements parsed={parsed} />
	}
});
