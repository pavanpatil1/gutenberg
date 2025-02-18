# Commands

Commands is a generic package that allows registering and modifying commands to be displayed using the commands menu (Also called cmd+k).

## Installation

Install the module

```bash
npm install @wordpress/commands --save
```

_This package assumes that your code will run in an **ES2015+** environment. If you're using an environment that has limited or no support for such language features and APIs, you should include [the polyfill shipped in `@wordpress/babel-preset-default`](https://github.com/WordPress/gutenberg/tree/HEAD/packages/babel-preset-default#polyfill) in your code._

## API

<!-- START TOKEN(Autogenerated API docs) -->

### CommandMenu

Undocumented declaration.

### privateApis

Undocumented declaration.

### useCommand

Attach a command to the Global command menu.

_Parameters_

-   _command_ `import('../store/actions').WPCommandConfig`: command config.

### useCommandLoader

Attach a command loader to the Global command menu.

_Parameters_

-   _loader_ `import('../store/actions').WPCommandLoaderConfig`: command loader config.

<!-- END TOKEN(Autogenerated API docs) -->

## Contributing to this package

This is an individual package that's part of the Gutenberg project. The project is organized as a monorepo. It's made up of multiple self-contained software packages, each with a specific purpose. The packages in this monorepo are published to [npm](https://www.npmjs.com/) and used by [WordPress](https://make.wordpress.org/core/) as well as other software projects.

To find out more about contributing to this package or Gutenberg as a whole, please read the project's main [contributor guide](https://github.com/WordPress/gutenberg/tree/HEAD/CONTRIBUTING.md).

<br /><br /><p align="center"><img src="https://s.w.org/style/images/codeispoetry.png?1" alt="Code is Poetry." /></p>
