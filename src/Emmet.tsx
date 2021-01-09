//@ts-ignore
import babelrc from '../.babelrc';
import { expand } from '@emmetio/expand-abbreviation';
import { selector as $, escapeHtml } from './helper';
import { parseSync, transform } from '@babel/core';
import Elements from './elements';

import { dom, fragment } from 'isomorphic-jsx';
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

				const output = `const Component = ({children}) => \n <>\n${html}\n</>;`;

				const parsed = parseSync(output, babelrc);

				transform(output, babelrc, (err, result) => {
					const code = "import { dom, fragment } from 'isomorphic-jsx';\n\n" + result.code;
					$('#output_compiled').innerHTML = <pre><code>{escapeHtml(code)}</code></pre>;
					// Adding functions to the window variable so that they are available in the eval-function
					//@ts-ignore
					window.dom = dom;
					//@ts-ignore
					window.fragment = fragment;
					//@ts-ignore
					const iframe = $('#content');
					iframe.src = "data:text/html;charset=utf-8," + <html>
						<body>
							<div id="content"></div>
							<script>
								window.addEventListener('message', data =>
									document.getElementById("content").innerHTML = data.data
								, false);
							</script>
						</body>
					</html>;

					window.update = data =>
    					setTimeout( () => iframe.contentWindow.postMessage(data || 'test', '*'), 100);

					eval(result.code + "\n\n var result = dom(Component); update(result);");
					// At this point we could set window.dom, window.fragment, etc to null; but it really doesn't matter.
				});
				
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
