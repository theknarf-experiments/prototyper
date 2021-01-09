import { dom, fragment } from 'isomorphic-jsx';
dom(); fragment({ children: [] }); // @babel/preset-typescript hack

const PropertyTree = ({ children }) => <>
	<div class="propertytree">
		<h1> Property Tree </h1>
		<div>
			<span>Size</span>
			<input />
			<input />
		</div>
		<div>
			<span>Margin</span>
			<input />
			<input />
			<input />
			<input />
		</div>
		<div> Padding </div>
	</div>
</>;

export default PropertyTree;
