# `ng-inject`

[![NPM](http://img.shields.io/npm/v/ng-inject.svg)](https://www.npmjs.com/package/ng-inject)
[![travis-ci](https://travis-ci.org/synacorinc/ng-inject.svg)](https://travis-ci.org/synacorinc/ng-inject)

Decorator that wraps a class in a DI injector for the given dependencies.

Dependencies are assigned to the prototype, and can be referenced from within the Class as `this.$name`.


---


### Usage

```js
import inject from 'ng-inject';

// decorator takes a list of angular dependency names:
@inject('$scope', 'config')
class ExampleController {

	constructor() {
		// both `$scope` and `config` are injected via DI:
		this.$scope.config = this.config;
	}

	otherMethod() {
		this.$scope.value = 1;
	}

}
```


---


### License

BSD 3-Clause
