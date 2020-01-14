In your ```system.config.js```

Append to ```map```

```js
var map = {
    'ngx-tree-chart': 'node_modules/ngx-tree-chart/bundles',
}
```

and then add to ```packages```

```js
var packages = {
    'ngx-tree-chart': { defaultExtension: 'js', format: 'cjs' },
}
```
