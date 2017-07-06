# Angular Project Configuration

The following configuration files are used to configure the project.

## Application Configuration

The following configuration information pertains to the configuration of the application once development has been completed.

### Configuration Files

- **/package.json** - Contains information about the project, including application and development dependencies. The command line scripts are defined here. The web server configuration is located at the end of the file. To change protocol, port number, domain and root folder, please edit these values in this file.

### Process Flow

Run **npm start** from a terminal, the web server configuration is loaded from **/package.json**, and the Webpack Development web server is started. Based upon the default configuration, the web site can be loaded from http://localhost:5000, and the widgets REST service provided by **json-server** is available via http://localhost:3010/widgets.

#### Widgets REST Endponts

__Resource Collection URI__

- GET http://localhost:3010/widgets -> returns a JSON formatted array of widget objects
- POST http://localhost:3010/widgets -> the request body should contain a JSON formatted widget object,
returns a JSON formatted widget object with the id, created and modified fields updated

__Resource Element URI__

- GET http://localhost:3010/widgets/:widgetId -> a JSON formatted widget object
- PUT http://localhost:3010/widgets/:widgetId -> the request body should contain a JSON formatted widget object, returns a JSON formatted widget objects with the modified field updated
- DELETE http://localhost:3010/widgets/:widgetId -> returns a JSON formatted widget object of the widget deleted

Replace ":widgetId" with the actual widget id.

## Development Configuration

The following configuration information pertains to the development of the application.

### Configuration Files

- **/.gitignore** - Indicates which files are to be ignored by Git. Generally, this includes downloaded packages, and the output files of the development processes such as Webpack and TypeScript compilation.
- **/.bootstraprc** - Indicates the Bootstrap CSS library configuration for the Typescript bootstrap loader used by **/src/vendor.ts** and outputed with the Webpack vendor bundle. Only the CSS portions of Bootstrap are loaded, not the JavaScript components. Therefore, jQuery is not included. 
- **/.htmlhintrc** - Configuration file for HTML linting for the Atom editor. May work with other editors.
- **/.npmrc** - Used to configure **npm** for the project. Typically, used to configure proxy servers.
- **/tsconfig.json** - Used to configure the TypeScript compiler for the command line tool, WebPack, and the Visual Studio Code and Atom editors. Compile on save and build are disabled because Webpack does the compilation for the project through the TypeScript loader. Also, the file is configured to prevent Atom's TypeScript package from modifying the file.
- **/config/webpack.common.js** - Common Webpack settings which can be imported into various environment specific Webpack configuration files.
- **/config/webpack.dev.js** - Webpack configuration for development.
- **/config/webpack.prod.js** - Webpack configuration for production.

There is no staging or other environment configuration file for Webpack at the moment (except for testing but it does not use the common Webpack configuration file).

### Process Flow

To develop the application, the project is opened in an editor such as Visual Studio Code or Atom. From a terminal, run the command **npm start** is executed. As part of the stating the application, Webpack fires up and produces an output of the web application to the **dist** folder which is then available to the web server for deliver to a web browser. Webpack then enters watch mode, and watches for changes to the files, so that new bundles can be produced when file changes are saved. The advantage to this approach is that each developer can use the editor of their choice even if its not TypeScript friendly. Webpack runs by running the many application files through a pre-processor called a loader to ultimately produce ES5 JavaScript CommonJS modules which are then bundled together.

TypeScript files (ending in .ts) are processed by the TypeScript loader to produce ES5 compliant JavaScript code. HTML files are processed by the HTML loader. SASS files are processed by the SASS loader to produce CSS.  All of the HTML, CSS, and JavaScript are all combined into JavaScript bundle files.

Three bundles are produced: polyfills, vendors and the application. Polyfills plug feature gaps in web browsers to allow Angular to use the latest technologies to render a web page. Vendors includes third-party vendor files such as Angular, Reactive Extensions for JS, and Bootstrap. The application bundle is the actual application being developed for this project.

## Testing Configuration

The following configuration information pertains to running the unit testing and code coverage tools of the application.

### Configuration Files

- **/config/custom-launchers.js** - Contains a list of web browsers which Karma can use to execute the unit tests.
- **/config/karma-test-shim.js** - Loads up the Angular.io unit testing environments, and loads up the *.spec.ts files which contain the unit tests.
- **/config/webpack.test.js** - Prepares the Webpack file for unit testing. This is a special configuration for preparing source maps, inserting code coverage and such...
- **/config/karma.conf.js** - Configures the Karma test runner. This file uses the three files above to complete the configuration.

### Process Flow

The command **npm test** is executed from the terminal to launch Karma. Karma reads the Karma configuration file which loads the **karma-test-shim.js** file.  Code coverage is added to the source code, and then Webpack packages the source code for testing. Then Karma launches the web browser instance to run the tests. Once the tests are complete, reports are generated including code coverage reports.

## Useful Configuration Resources

### Angular

- [Angular Quick Start Configuarion](https://angular.io/docs/ts/latest/quickstart.html)
- [Angular Webpack Configuration](https://angular.io/docs/ts/latest/guide/webpack.html)
- [Angular TypeScript Configuration](https://angular.io/docs/ts/latest/guide/typescript-configuration.html)

### Atom Html Linter

- [Html Hint](https://atom.io/packages/linter-htmlhint)

### Bootstrap Loader

- [Bootstrap Loader](https://www.npmjs.com/package/bootstrap-loader)

### Karma

- [Karma Configuration File](http://karma-runner.github.io/1.0/config/configuration-file.html)
- [Karma Code Coverage Configuration](https://karma-runner.github.io/0.8/config/coverage.html)
- [Karma Coverage](https://github.com/karma-runner/karma-coverage)
- [JUnit Reporter](https://github.com/karma-runner/karma-junit-reporter)
- [Jenkins JUnit Reporter Plugin](https://wiki.jenkins-ci.org/display/JENKINS/JUnit+Plugin)

### Istanbul

- [Istanbul](https://github.com/gotwarlost/istanbul)

### NPM Configuation

- [Config Command](https://docs.npmjs.com/misc/config)
- [Configuration Options](https://docs.npmjs.com/files/npmrc)

### TypeScript

- [TypeScript Configuration](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html)
- [Typings for NPM Packages](https://www.typescriptlang.org/docs/handbook/typings-for-npm-packages.html)
- [Compiler Options](https://www.typescriptlang.org/docs/handbook/compiler-options.html)
- [Integrating with Build Tools](https://www.typescriptlang.org/docs/handbook/integrating-with-build-tools.html)
- [TypeScript Webpack Loader](https://github.com/TypeStrong/ts-loader)

### PostCSS

- [PostCSS](https://github.com/postcss/postcss)
- [Autoprefixer](https://github.com/postcss/autoprefixer)

### SASS

- [SASS](http://sass-lang.com/)
- [SASS Loader](https://github.com/jtangelder/sass-loader)

### Webpack

- [Webpack Configuration](https://webpack.github.io/docs/configuration.html)
- [Webpack Loaders](https://webpack.github.io/docs/using-loaders.html)
- [HTML Webpack Plugin](https://github.com/ampedandwired/html-webpack-plugin)
