/**
 * Created by user on 2018/2/6/006.
 */

import { chai, relative, expect, path, assert, util } from './_local-dev';

// @ts-ignore
import { describe, before, beforeEach, it, ITest } from 'mocha';

import * as merge from '..';

// @ts-ignore
describe(relative(__filename), () =>
{
	let currentTest: ITest;

	beforeEach(function ()
	{
		currentTest = this.currentTest as ITest;

		//console.log('it:before', currentTest.title);
		//console.log('it:before', currentTest.fullTitle());
	});

	// @ts-ignore
	describe(`custom merge`, () =>
	{
		it('custom merge array', function(done) {
			var mergeFunctionCalled = false
			function overwriteMerge(target, source, options) {
				mergeFunctionCalled = true
				assert.equal(options.arrayMerge, overwriteMerge)

				return source
			}
			const destination = {
				someArray: [ 1, 2 ],
				someObject: { what: 'yes' },
			}
			const source = {
				someArray: [ 1, 2, 3 ],
			}

			const actual = merge(destination, source, { arrayMerge: overwriteMerge })
			const expected = {
				someArray: [ 1, 2, 3 ],
				someObject: { what: 'yes' },
			}

			assert.ok(mergeFunctionCalled)
			assert.deepEqual(actual, expected)
			done()
		})

		it('merge top-level arrays', function(done) {
			function overwriteMerge(a, b) {
				return b
			}
			var actual = merge([ 1, 2 ], [ 1, 2 ], { arrayMerge: overwriteMerge })
			var expected = [ 1, 2 ]

			assert.deepEqual(actual, expected)
			done()
		})

	});
});
