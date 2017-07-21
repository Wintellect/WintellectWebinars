'use strict';

Error.stackTraceLimit = 0;

require('core-js/es6');
require('core-js/es7/reflect');

// Typescript emit helpers polyfill
require('ts-helpers');

require('zone.js/dist/zone');
require('zone.js/dist/long-stack-trace-zone');
require('zone.js/dist/proxy');
require('zone.js/dist/sync-test');
require('zone.js/dist/jasmine-patch');
require('zone.js/dist/async-test');
require('zone.js/dist/fake-async-test');

// RxJS
require('rxjs/Rx');

// specifies the location of the application files, and the pattern for the unit testing files
var appContext = require.context('../src/ts', true, /\.spec\.tsx?/);

appContext.keys().forEach(appContext);

// loads the providers need for performing Angular 2 unit testing
var coreTesting = require('@angular/core/testing');
var browserTesting = require('@angular/platform-browser-dynamic/testing');

// may only be called once, providers in the actual unit tests should be loaded
// using addProvider in the unit test files
coreTesting.TestBed.initTestEnvironment(
  browserTesting.BrowserDynamicTestingModule,
  browserTesting.platformBrowserDynamicTesting()
);
