import inject from '../src';
import { expect, use } from 'chai';
import { spy } from 'sinon';
import sinonChai from 'sinon-chai';
use(sinonChai);

// create a fake dependency
let dep = name => ({ name });

describe('ng-inject', () => {
	describe('inject()', () => {
		it('should assign dependencies to $inject property', () => {

			@inject('$foo', '$bar', 'baz')
			class Foo {}

			expect(Foo)
				.to.be.a('function')
				.with.property('$inject')
				.that.deep.equals(['$foo', '$bar', 'baz']);
		});

		it('should intercept constructor and assign dependencies to prototype', () => {
			let ctor = spy();

			@inject('$foo', '$bar', 'baz')
			class Foo {
				// proxy constructor to spy constructor
				constructor(...args) { ctor(...args); }
			}

			let inst = new Foo(...Foo.$inject.map(dep));

			expect(ctor)
				.to.have.been.calledOnce
				.and.calledWithExactly();

			expect(inst).to.have.property('$foo').that.deep.equals(dep('$foo'));
			expect(inst).to.have.property('$bar').that.deep.equals(dep('$bar'));
			expect(inst).to.have.property('baz').that.deep.equals(dep('baz'));
		});

		it('should flatten dependencies and prune empties', () => {

			@inject(['a', 'b'], ['c'], [null], null, 'd')
			class Foo {}

			expect(Foo)
				.to.have.property('$inject')
				.that.deep.equals(['a', 'b', 'c', 'd']);
		});
	});
});
