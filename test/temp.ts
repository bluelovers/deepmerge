/**
 * Created by user on 2018/2/5/005.
 */

import * as deepmerge from '../index';

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
