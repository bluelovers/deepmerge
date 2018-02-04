/**
 * Created by user on 2018/2/5/005.
 */

import * as deepmerge from '../index';
const merge = deepmerge;

let r = deepmerge({
	key: 0,
	key2: 1,
	key3: {},
}, {
	key: 1,
	key2: 0,
	key3: {
		a: 777,
	},
}, {
	keyValueOrMode: true,
});

console.log(r);

const isMergeableObject = require('is-mergeable-object')
const emptyTarget = value => Array.isArray(value) ? [] : {}
const clone = (value, options) => merge(emptyTarget(value), value, options)

function oldArrayMerge(target, source, optionsArgument) {
	const destination = target.slice()

	source.forEach(function(e, i) {
		if (typeof destination[i] === 'undefined') {
			const cloneRequested = !optionsArgument || optionsArgument.clone !== false
			const shouldClone = cloneRequested && isMergeableObject(e)
			destination[i] = shouldClone ? clone(e, optionsArgument) : e
		} else if (isMergeableObject(e)) {
			destination[i] = merge(target[i], e, optionsArgument)
		} else if (target.indexOf(e) === -1) {
			destination.push(e)
		}
	})
	return destination
}

console.log(deepmerge(
	[{ a: true }],
	[{ b: true }, 'ah yup'],
	{ arrayMerge: oldArrayMerge }
));
