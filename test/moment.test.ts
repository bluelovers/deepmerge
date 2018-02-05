/**
 * Created by user on 2018/2/6/006.
 */

import { chai, relative, expect, path, assert, util } from './_local-dev';

// @ts-ignore
import { describe, before, beforeEach, it, ITest } from 'mocha';

import * as moment from 'moment';
import * as merge from '..';

// @ts-ignore
describe(relative(__filename), () =>
{
	let currentTest: ITest;

	let options = {
		isMergeableObject(value, isMergeableObject) {
			let bool;

			if (bool = moment.isMoment(value)) {
				return false;
			}
		}
	};

	beforeEach(function ()
	{
		currentTest = this.currentTest as ITest;

		//console.log('it:before', currentTest.title);
		//console.log('it:before', currentTest.fullTitle());
	});

	// @ts-ignore
	describe(`moment`, () =>
	{
		// @ts-ignore
		it('moment should copy correctly in an array', function() {
			var monday = moment('2016-09-27T01:08:12.761Z')
			var tuesday = moment('2016-09-28T01:18:12.761Z')

			var target = [ monday, 'dude' ]
			var source = [ tuesday, 'lol' ]

			var expected = [ monday, 'dude', tuesday, 'lol' ]
			var actual = merge(target, source, options)

			expect(actual).to.be.deep.equal(expected);
		});

		it('moment with options.isMergeableObject', function() {
			var monday = moment('2016-09-27T01:08:12.761Z')
			var tuesday = moment('2016-09-28T01:18:12.761Z')

			var target = {
				date: monday
			}
			var source = {
				date: tuesday
			}

			var expected = {
				date: tuesday
			}
			var actual = merge(target, source, options)

			assert.deepEqual(actual, expected)
			assert.deepEqual(actual.date.get('minutes'), 18)
		});

		it('moment with options.isMergeableObject v2', function() {
			var monday = moment('2016-09-27T01:08:12.761Z')
			var tuesday = moment('2016-09-28T01:18:12.761Z')

			var target = {
				date: monday
			}
			var source = {
				date: tuesday
			}

			var expected = {
				date: tuesday
			}
			var actual = merge(target, source, options)

			assert.deepEqual(actual, expected)
			assert.deepEqual(actual.date.get('minutes'), 18)
		});
	});
});
