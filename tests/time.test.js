import test from 'node:test';
import assert from 'node:assert/strict';
import { formatTime } from '../src/utils/time.js';

test('formatTime: formats minutes and seconds', () => {
    assert.strictEqual(formatTime(0), '00:00');
    assert.strictEqual(formatTime(5), '00:05');
    assert.strictEqual(formatTime(65), '01:05');
    assert.strictEqual(formatTime(599), '09:59');
    assert.strictEqual(formatTime(3599), '59:59');
});

test('formatTime: formats hours when duration >= 1 hour', () => {
    assert.strictEqual(formatTime(3600), '1:00:00');
    assert.strictEqual(formatTime(3665), '1:01:05');
    assert.strictEqual(formatTime(36000), '10:00:00');
    assert.strictEqual(formatTime(90000), '25:00:00'); // > 24 hours handled correctly
});

test('formatTime: handles edge cases safely without throwing', () => {
    assert.strictEqual(formatTime(NaN), '00:00');
    assert.strictEqual(formatTime(null), '00:00');
    assert.strictEqual(formatTime(undefined), '00:00');
    assert.strictEqual(formatTime(-10), '00:00');
    assert.strictEqual(formatTime(Infinity), 'LIVE');
});
