import generate from '@babel/generator';
import { selector as $, escapeHtml } from './helper';

import { dom } from 'isomorphic-jsx';
dom(); // @babel/preset-typescript hack

const Elements = ({ parsed }) => {
	const { code } = generate(parsed);

	return <pre><code>
		{ escapeHtml(code) }
	</code></pre>
};

export default Elements;
