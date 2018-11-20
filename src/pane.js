import { dom } from 'isomorphic-jsx';

const Pane = ({ title, children }) =>
	<div class="pane">
		<span class="header">{title}</span>
		<section>
			{ children }
		</section>
	</div>;

export default Pane;
