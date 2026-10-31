/*
 * +----------------------------------------------------------------+
 * |                                                                |
 * |     __  __    ___    _____                                     |
 * |    |  \/  |  / _ \  |  ___|                                    |
 * |    | |\/| | | | | | | |_                                       |
 * |    | |  | | | |_| | |  _|                                      |
 * |    |_|  |_|  \__\_\ |_|                                        |
 * |                                                                |
 * |    M I X   Q U E U E   F I X                                   |
 * |    ~~~~~~~~~~~~~~~~~~~~~~~~~                                   |
 * |                                                                |
 * |    [ SYS: MQF-01 ]       [ MODE: QUEUE RESTORE ]               |
 * |    [ EST: 2026  ]       [ SIGNAL: ACTIVE     ]                 |
 * |                                                                |
 * |    "The queue was never gone. Just hidden."                    |
 * |                                                                |
 * +----------------------------------------------------------------+
 *  FILE    : tests/smoke.test.cjs
 *  MODULE  : SOURCE REGRESSION TESTS
 *  VERSION : 1.1.0
 *  LICENSE : MIT
 *  -----------------------------------------------------------------
 */

/* MQF test suite: tests execute only in Node.js and are not shipped with the store extension. */
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const source = fs.readFileSync(path.join(root, 'content.js'), 'utf8');
const manifest = JSON.parse(fs.readFileSync(path.join(root, 'manifest.json'), 'utf8'));

function makeEnvironment({pathname='/watch', search='?v=abc&list=RD1234', stored=true, hidden=true}={}) {
  let changeListener;
  const events = {};
  const playlist = {
    isConnected: true,
    attributes: new Set(hidden ? ['hidden'] : []),
    hasAttribute(name) { return this.attributes.has(name); },
    removeAttribute(name) { this.attributes.delete(name); },
    setAttribute(name) { this.attributes.add(name); }
  };
  let currentPathname = pathname;
  let currentSearch = search;
  class MutationObserver {
    constructor(callback) { this.callback = callback; }
    observe() {}
    disconnect() {}
  }
  const context = {
    location: {get pathname(){return currentPathname;}, get search(){return currentSearch;}},
    URLSearchParams,
    document: {
      getElementById(id) { return id === 'playlist' ? playlist : null; },
      addEventListener(name,fn) { events[name]=fn; }
    },
    window: {addEventListener(name,fn) {events[name]=fn;}},
    MutationObserver,
    setTimeout() {},
    setInterval() {},
    chrome: {storage: {
      onChanged: {addListener(fn){ changeListener=fn; }},
      local: {get(_defaults,callback) {callback({enabled:stored});}}
    }}
  };
  vm.runInNewContext(source,context);
  return {
    playlist, events,
    navigate(path,query){ currentPathname=path;currentSearch=query;events['yt-navigate-finish'](); },
    switchTo(enabled){changeListener({enabled:{newValue:enabled}},'local');}
  };
}

test('Manifest V3 lists only storage permission',()=>{
  assert.equal(manifest.manifest_version,3);
  assert.deepEqual(manifest.permissions,['storage']);
  assert.equal(manifest.version,'1.1.0');
});

test('Shows a hidden queue on an RD Mix page',()=>{
  const page=makeEnvironment();
  assert.equal(page.playlist.hasAttribute('hidden'),false);
});

test('Does not alter an ordinary playlist',()=>{
  const page=makeEnvironment({search:'?list=PL12345'});
  assert.equal(page.playlist.hasAttribute('hidden'),true);
});

test('Does not alter a regular video without a Mix',()=>{
  const page=makeEnvironment({search:'?v=xyz'});
  assert.equal(page.playlist.hasAttribute('hidden'),true);
});

test('Initially OFF leaves the queue hidden; ON restores it',()=>{
  const page=makeEnvironment({stored:false});
  assert.equal(page.playlist.hasAttribute('hidden'),true);
  page.switchTo(true);
  assert.equal(page.playlist.hasAttribute('hidden'),false);
});

test('Turning OFF undoes the most recent restoration',()=>{
  const page=makeEnvironment();
  assert.equal(page.playlist.hasAttribute('hidden'),false);
  page.switchTo(false);
  assert.equal(page.playlist.hasAttribute('hidden'),true);
});

test('Recognises in-page navigation to an RD Mix',()=>{
  const page=makeEnvironment({search:'?list=PL1234'});
  assert.equal(page.playlist.hasAttribute('hidden'),true);
  page.navigate('/watch','?v=abc&list=RD5678');
  assert.equal(page.playlist.hasAttribute('hidden'),false);
});
