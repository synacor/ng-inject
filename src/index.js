
/** Decorator that wraps a class in a DI injector for the given dependneices.
 *	Dependencies are referencable from within the Class as `this.$whatever`
 *
 *	@example
 *	@inject('$scope', 'config')
 *	class ExampleController {
 *		exampleMethod() {
 *			// both `$scope` and `config` are injected via DI:
 *			this.$scope.config = this.config;
 *		}
 *	}
 */
export default function inject(...deps) {
	deps = [].concat(...deps).filter(EXISTS);

	return (Target, name, descriptor) => {
		function diWrapper(...args) {
			let resolved = args.splice(0, deps.length);
			for (let i=0; i<resolved.length; i++) {
				Target.prototype[deps[i]] = resolved[i];
			}
			return new Target(...args);
		}
		diWrapper.prototype = Target.prototype;
		diWrapper.$inject = deps;
		return diWrapper;
	};
}


/** Returns its argument cast to a Boolean. */
const EXISTS = x => !!x;
