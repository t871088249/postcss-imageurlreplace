const postcss = require('postcss');
const path = require('path');


function makeRootUrl(url, relativePath) {
    if (url.indexOf('/') == 0) {
        return path.join('/', url).replace(/\\/g, '/')
    } else {
        return path.join(relativePath, url).replace(/\\/g, '/')
    }
}

module.exports = postcss.plugin('imageUrlReplace', (opts = { domains: [], dir: "" }) => {

    let { domains, domain, dir } = opts;

    console.log(opts)

    // 传入配置相关的代码
    return function (root, result) {
        // 转化CSS 的功能代码

        // console.log(root, result.opts.from)
        if (!domains && !domain) {
            return
        }


        let relativePath = path.dirname(path.relative(path.join(__dirname, dir), result.opts.from));

        root.walkRules(rule => {
            // console.log(rule.selector)
            let flag = false;
            rule.walkDecls(/^background|mask-image/, decl => {
                let value = decl.value;
                if (value.indexOf('url') != -1) {
                    flag = true;
                    decl.value = value.replace(/url\((?:'|")?(.*?)(?:'|")?\)/g, function ($0, $1, $2) {
                        return `url('${makeRootUrl($1, dir)}')`
                    })
                }
            })
            if (flag) {
                if (domains) {
                    createPubBackground(rule, opts)
                    rule.walkDecls(/^background|mask-image/, decl => {
                        let value = decl.value;
                        if (value.indexOf('url') != -1) {
                            decl.remove()
                        }
                    })
                } else {
                    rule.walkDecls(/^background|mask-image/, decl => {
                        let value = decl.value;
                        if (value.indexOf('url') != -1) {
                            decl.value = addUrlDomain(decl.value, domain)
                        }
                    })
                }
            }

        })
    };
});

function addUrlDomain(value, domain) {
    return value.replace(/url\((?:'|")?((?:(?:http(?:s)?:)?\/\/)?.*?)\/(.*?)(?:'|")?\)/, function ($0, $1, $2) {
        return `url('${domain}/${$2}')`
    })
}


function createDomainImg(rule, domain) {
    let r = rule.cloneBefore();
    let { selector } = r;
    if (selector !== 'body') {
        r.selector = `body${domain.site != '' ? '.' + domain.site : ''} ${selector}`;
    } else {
        r.selector = `${selector}.${domain.site != '' ? '.' + domain.site : ''}`;
    }

    r.walkDecls(decl => {
        if (!/^background|mask-image/.test(decl.prop) || decl.value.indexOf('url') == -1) {
            decl.remove()
        } else {
            if (decl.value.indexOf('url') != -1) {
                decl.value = addUrlDomain(decl.value, domain.host)
            }
        }
    })
}

function createPubBackground(rule, config) {
    var defaultDomain = {
        site: '',
        host: config.domains[0].host
    }
    createDomainImg(rule, defaultDomain)
    config.domains.forEach(item => {
        createDomainImg(rule, item)
    })
}
