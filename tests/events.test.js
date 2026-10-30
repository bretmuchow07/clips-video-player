import test from 'node:test';
import assert from 'node:assert/strict';
import EventEmitter from '../src/core/Events.js';

test('EventEmitter: registers listeners and emits arguments', () => {
    const emitter = new EventEmitter();
    let received = null;

    emitter.on('play', (data) => {
        received = data;
    });

    emitter.emit('play', { time: 42 });
    assert.deepStrictEqual(received, { time: 42 });
});

test('EventEmitter: unbinds via returned function and off()', () => {
    const emitter = new EventEmitter();
    let count = 0;

    const unbind = emitter.on('tick', () => { count++; });
    emitter.emit('tick');
    assert.strictEqual(count, 1);

    unbind();
    emitter.emit('tick');
    assert.strictEqual(count, 1);

    const fn = () => { count += 10; };
    emitter.on('tick', fn);
    emitter.emit('tick');
    assert.strictEqual(count, 11);

    emitter.off('tick', fn);
    emitter.emit('tick');
    assert.strictEqual(count, 11);
});

test('EventEmitter: onAny registers across multiple events', () => {
    const emitter = new EventEmitter();
    const calls = [];

    const unbind = emitter.onAny(['a', 'b'], (val) => {
        calls.push(val);
    });

    emitter.emit('a', 1);
    emitter.emit('b', 2);
    assert.deepStrictEqual(calls, [1, 2]);

    unbind();
    emitter.emit('a', 3);
    emitter.emit('b', 4);
    assert.deepStrictEqual(calls, [1, 2]);
});

test('EventEmitter: removeAllListeners clears specific or all events', () => {
    const emitter = new EventEmitter();
    let count = 0;

    emitter.on('e1', () => { count++; });
    emitter.on('e2', () => { count++; });

    emitter.removeAllListeners('e1');
    emitter.emit('e1');
    emitter.emit('e2');
    assert.strictEqual(count, 1);

    emitter.removeAllListeners();
    emitter.emit('e2');
    assert.strictEqual(count, 1);
});
