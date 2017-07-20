import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { enableProdMode } from "@angular/core";
import { AppModule } from "./app/app.module";

// output the current execution mode
// this mode is set via webpack
console.info(`Running in ${process.env["ENV"]} mode.`);

// if production more, then turn off debugging
// information
if (process.env["ENV"] === "production") {
    enableProdMode();
}

// bootstrap the specified module
// defined in the module is a bootstrap option which
// determines the top level component to be loaded
platformBrowserDynamic().bootstrapModule(AppModule);
