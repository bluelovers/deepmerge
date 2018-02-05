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
	describe(`merge.all`, () =>
	{
		it('throw error if first argument is not an array', function(done) {
			assert.throws(merge.all.bind(null, { example: true }, { another: '2' }), Error)
			done()
		})

		it('return an empty object if first argument is an array with no elements', function(done) {
			assert.deepEqual(merge.all([]), {})
			done()
		})

		it('Work just fine if first argument is an array with least than two elements', function(done) {
			var actual = merge.all([{ example: true }])
			var expected = { example: true }
			assert.deepEqual(actual, expected)
			done()
		})

		it('execute correctly if options object were not passed', function(done) {
			var arrayToMerge = [{ example: true }, { another: '123' }]
			assert.doesNotThrow(merge.all.bind(null, arrayToMerge))
			done()
		})

		it('execute correctly if options object were passed', function(done) {
			var arrayToMerge = [{ example: true }, { another: '123' }]
			assert.doesNotThrow(merge.all.bind(null, arrayToMerge, { clone: true }))
			done()
		})

		it('invoke merge on every item in array should result with all props', function(done) {
			var firstObject = { first: true }
			var secondObject = { second: false }
			var thirdObject = { third: 123 }
			var fourthObject = { fourth: 'some string' }

			var mergedObject = merge.all([ firstObject, secondObject, thirdObject, fourthObject ])

			assert.ok(mergedObject.first === true)
			assert.ok(mergedObject.second === false)
			assert.ok(mergedObject.third === 123)
			assert.ok(mergedObject.fourth === 'some string')
			done()
		})

		it('invoke merge on every item in array with clone should clone all elements', function(done) {
			var firstObject = { a: { d: 123 } }
			var secondObject = { b: { e: true } }
			var thirdObject = { c: { f: 'string' } }

			var mergedWithClone = merge.all([ firstObject, secondObject, thirdObject ], { clone: true })

			assert.notEqual(mergedWithClone.a, firstObject.a)
			assert.notEqual(mergedWithClone.b, secondObject.b)
			assert.notEqual(mergedWithClone.c, thirdObject.c)

			done()
		})

		it('invoke merge on every item in array clone=false should not clone all elements', function(done) {
			var firstObject = { a: { d: 123 } }
			var secondObject = { b: { e: true } }
			var thirdObject = { c: { f: 'string' } }

			var mergedWithoutClone = merge.all([ firstObject, secondObject, thirdObject ], { clone: false })

			assert.equal(mergedWithoutClone.a, firstObject.a)
			assert.equal(mergedWithoutClone.b, secondObject.b)
			assert.equal(mergedWithoutClone.c, thirdObject.c)

			done()
		})


		it('invoke merge on every item in array without clone should clone all elements', function(done) {
			var firstObject = { a: { d: 123 } }
			var secondObject = { b: { e: true } }
			var thirdObject = { c: { f: 'string' } }

			var mergedWithoutClone = merge.all([ firstObject, secondObject, thirdObject ])

			assert.notEqual(mergedWithoutClone.a, firstObject.a)
			assert.notEqual(mergedWithoutClone.b, secondObject.b)
			assert.notEqual(mergedWithoutClone.c, thirdObject.c)

			done()
		})
	});
});
