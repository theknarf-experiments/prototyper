import { dom } from 'isomorphic-jsx';
import generate from '@babel/generator';
import { selector as $, escapeHtml } from './helper';

const presets = [
	require('@babel/preset-react'),
	require('@babel/preset-env')
];

const Elements = ({ parsed }) => {
	const { code } = generate(parsed, presets);

	return <pre><code>
		{ escapeHtml(code) }
	</code></pre>
};

export default Elements;
