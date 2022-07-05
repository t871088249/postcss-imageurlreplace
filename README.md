# postcss-backgroundrepleace
css replace background url domain
```javascript
const imageUrlReplace = require('../index');

postcss([
  imageUrlReplace({
        domains: [
            {
                site: "up",
                host: "//p1.yunshuren.com"
            },
            {
                site: "ali",
                host: "//papu.yunshuren.com"
            },
        ]
    })

```
