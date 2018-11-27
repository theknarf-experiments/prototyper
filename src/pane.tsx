import { dom } from 'isomorphic-jsx';
dom(); // @babel/preset-typescript hack

interface tmp {
	title: string,
	children?: string,
}

const Pane : (t: tmp) => string = ({ title, children }) =>
	<div class="pane">
		<span class="header">{title}</span>
		<section>
			{ children }
		</section>
	</div>;

export default Pane;
