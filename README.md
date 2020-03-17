# vuex-loader

This is a simple webpack loader which helps import vuex data without using any mapState, mapActions...


## Install

```
$ npm install @johnnywang/vuex-loader
```

then just use right below(which will load before) your webpack's vue-loader:

it will automatically import all the vuex data you want to each components.

```js
module.exports = {
  modules: {
    test: /\.vue$/,
    loader: [
      'vue-loader',
      '@johnnywang/vuex-loader',
    ],
  },
}
```

## Usage

Use `vuex` option in each vue component:

No matter `vuex` or `Vuex`, it is case-insensitive.

```js
export default {
  name: 'SampleComponent',
  vuex: {
    state: ['profile', 'todoList'],
    actions: ['getProfile', 'getTodos'],
    Login: {
      state: ['loginStatus'],
      actions: ['postLogin'],
    }
  },
};
```


## Params in vuex options

moduleName below is the module name which you had registered in your vuex.

this plugin will not check anything, which totally relys on vuex. so totally without any side effect.

|Param|Type|Description|
| --- | -- | --------- |
|state|array or object|rootState of vuex|
|getters|array or object|rootGetters of vuex|
|mutations|array or object|rootMutations of vuex|
|actions|array or object|rootActions of vuex|
|moduleName|object|modules registered in vuex|


## License

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2020-present, Johnny Wang