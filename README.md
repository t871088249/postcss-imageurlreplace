# postcss-backgroundrepleace
css replace background url domain
```javascript
const imageUrlReplace = require('../index');

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



```
### example
``` css

.chart{
    background-image: url('../images/chart_bg.png');
}

```
```
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
