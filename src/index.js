import { expand } from '@emmetio/expand-abbreviation';
import { dom } from 'isomorphic-jsx';
import { parse } from 'acorn-jsx';
import { generate } from 'escodegen'; // TODO: reimplement escodegen since it doesn't support jsx
import { selector as $, escapeHtml } from './helper';

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
	section {
		margin-top: 100px;
	}
`}</style>;

document.body.innerHTML = [
	<header>
		<h1> Prototyper </h1>
	</header>,
	<section>
		<input id="test" />
		<iframe id="content" width="300px" height="400px" />
		<div id="output">

		</div>
	</section>
];

$('#test').addEventListener('keypress', e => {
	if((e.witch||e.keyCode) == 13) {
		const html = expand(e.target.value, {
			profile: {
				selfClosingStyle: 'xhtml'
			}
		});

		const output = 'const Component = ({children}) => \n' + html + ';';

		console.log(output);
		const parsed = parse(output, { plugins: { jsx: true } });
		console.log(parsed)

		$('#content').src = "data:text/html;charset=utf-8," + html;
		$('#output').innerHTML = <pre>{escapeHtml(generate(parsed))}</pre>;
	}
});
