# eslint-plugin-require-jsdoc

This is a plugin for [eslint](http://eslint.org/) for enforcing all FUNCTIONS
should have jsdoc. You may optionally disable this for `anonymous` functions.

I had to write this because the [valid-jsdoc](http://eslint.org/docs/rules/valid-jsdoc)
rule in eslint did not help me to enforce that the functions MSUT have a jsdoc.

Instead it validated the jsdoc. So for the best results **use both together** to
make sure **jsdoc is a must** for all methods and **they are valid**.

## Usage

To enable to plugin, update your `.eslintrc` like so:

```json
  "plugins": [
    "require-jsdoc"
  ],
  "rules": {
    "require-jsdoc/require-jsdoc": [2,{"anonymous": false}]
  }
```

You may also want to enable [valid-jsdoc](http://eslint.org/docs/rules/valid-jsdoc.html)

```json
  "rules": {
    "valid-jsdoc": 2
  }
```

Further information can be found at Eslint's [configuration](http://eslint.org/docs/user-guide/configuring#configuring-plugins)
guide.

The `anonymous` option refers to whether or not you want to validate anonymous
functions such as callbacks or closures.

## Future

In future I hope to add jsdoc validation as well. Hence two rules can be
avoided. Please let me know your feedback.
