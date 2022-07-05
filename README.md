# postcss-imageurlreplace
css replace background url domain
```javascript
const imageUrlReplace = require('imageurlreplace');

postcss([
  imageUrlReplace({
        domains: [
            {
                site: "up",
                host: "//p1.xxx.com"
            },
            {
                site: "ali",
                host: "//pu.xxx.com"
            },
        ]
    })
])
```

## option
* domain
* domains

### example-domain
```js
imageUrlReplace({domain: '//p.xxx.com'})
```
```css
/*src*/
.chart{
    background-image: url('../images/chart_bg.png');
}
/*dest*/
.chart {
    background-image: url('//p.xxx.com/images/chart_bg.png');
}

```

### example-domains
```js
  imageUrlReplace({
        domains: [
            {
                site: "up",
                host: "//p1.xxx.com"
            },
            {
                site: "ali",
                host: "//pu.xxx.com"
            },
        ]
    })
```
``` css
/*src*/
.chart{
    background-image: url('../images/chart_bg.png');
}
/*dest*/
body .chart_container {
    background-image: url('//p1.xxx.com/images/chart_bg.png');
}
body.up .chart_container {
    background-image: url('//p1.xxx.com/images/chart_bg.png');
}
body.ali .chart_container {
    background-image: url('//pu.xxx.com/images/chart_bg.png');
}
```
