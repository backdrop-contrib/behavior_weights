# Behavior Weights

This is an API module. Only enable it if another module requires it, or if you
want to use the API with your own custom code.

## Installation and Usage

- Install this module using the [official Backdrop CMS instructions](https://backdropcms.org/guide/modules).
- Enable it.

## Usage

In your own module's Javascript, you can write something like this:

```
(function(){
  Backdrop.behaviors.mymodule_early = {
    attach: function (context, settings) {..},
    weight: -11
  };
})();
```

or

```
(function(){
  Backdrop.behaviors.mymodule_early.weight = -9;
})();

```

The default weight is 0. Anything with a smaller weight will run earlier.
Anything with a higher weight will run later.

## Issues

Bugs and Feature requests should be reported in the [Issue Queue](https://github.com/backdrop-contrib/behavior_weights/issues)

## Current Maintainers

- [Laryn Kragt Bakker](https://github.com/laryn/)

## Credits

- Ported to Backdrop CMS by [Laryn Kragt Bakker](https://github.com/laryn/)
- The Drupal 7 version is created and maintained by [Andreas Hennings](https://github.com/donquixote)

## License

This project is GPL v2 software. See the LICENSE.txt file in this directory for
complete text.
