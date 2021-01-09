import Emmet from './Emmet';

//@ts-ignore
import GoldenLayout from 'golden-layout';
import 'golden-layout/src/css/goldenlayout-base.css';
import 'golden-layout/src/css/goldenlayout-dark-theme.css';
import './default.css';
import PropertyTree from './propertytree';

import { dom, fragment } from 'isomorphic-jsx';
dom(); fragment({ children: [] }); // @babel/preset-typescript hack

//@ts-ignore
let promise = new Promise((resolve, reject) => setTimeout(resolve, 0));

document.body.innerHTML = <>
	<header>
		<h1> Prototyper </h1>
	</header>
	<Emmet id="test" onReady={promise} />
</>;

var config = {
	content: [{
		type: 'row',
		content:[
			{
				type: 'component',
				width: 20,
				title: 'File viewer',
				componentName: 'testComponent',
				componentState: { label: 'file viewer' }
			},
			{
				type: 'column',
				content: [
					{
						type: 'component',
						isClosable: false,
						componentName: 'testComponent',
						title: 'Design view',
						componentState: { func: () =>
							<iframe id="content" width="300px" height="400px" style={{ background: 'white' }} />
						}
					},
					{
						type: 'stack',
						height: 40,
						content: [
							{
								type: 'component',
								componentName: 'testComponent',
								title: 'Source view',
								componentState: { func: () => <div id='output' class='output' /> }
							},
							{
								type: 'component',
								componentName: 'testComponent',
								title: 'Compiled code (Babel)',
								componentState: { func: () => <div id='output_compiled' class='output' /> }
							}
						]
					},
				]
			},
			{
				type: 'component',
				width: 20,
				componentName: 'propertytree',
				title: 'Property tree',
				componentState: { label: 'property tree' }
			},
		]
	}]
};
let myLayout = new GoldenLayout( config );
myLayout.registerComponent( 'testComponent', ( container, state ) => {
	const Func = state.func;
	container.getElement().html(
		(typeof Func == 'function') ?
		<Func /> :
		<h2 style={{ color: 'white', padding: '0 20px' }}>{ state.label }</h2>
	);
});
myLayout.registerComponent( 'propertytree', ( container, state ) => {
	container.getElement().html(
		<PropertyTree />			
	);
});
myLayout.init();

