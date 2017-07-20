import "core-js/es6";
import "core-js/es7/reflect";
import "zone.js/dist/zone";

// enable stack traces for zone when not in production
if (process.env["ENV"] !== "production") {
  Error["stackTraceLimit"] = Infinity;
  require("zone.js/dist/long-stack-trace-zone");
}
