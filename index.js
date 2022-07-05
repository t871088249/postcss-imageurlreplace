const postcss = require('postcss');
const path = require('path');

const replaceProps = ["backgroudn", 'mask-image']

const config = {
    domains: [
        {
            site: "up",
            host: "//p.yunshuren.com"
        },
        {
            site: "ali",
            host: "//papu.yunshuren.com"
        },
    ]
}


function makeRootUrl(url, relativePath){
    if(url.indexOf('/') == 0){
        return path.join('/', url)
    }else{
        return path.join(relativePath, url)
    }
}

module.exports = postcss.plugin('bgChecker', function (opts) {
    opts = opts || {};
    // 传入配置相关的代码
    return function (root, result) {
        // 转化CSS 的功能代码

        // console.log(root, result.opts.from)

        let relativePath =  path.dirname(path.relative(path.join(__dirname , 'code/'), result.opts.from));

        // console.log(relativePath)
        root.walkRules(rule=>{
            // console.log(rule.selector)
            let flag = false;
            rule.walkDecls(/^background|mask-image/, decl=>{
                // console.log(decl.value)
                let value = decl.value;
                if(value.indexOf('url') != -1){
                    flag = true;
                    value = value.replace(/url\((?:'|")?(.*?)(?:'|")?\)/g, function($0, $1, $2){
                        return `url('${makeRootUrl($1, relativePath)}')`
                    })
                }
            })
            createPubBackground(rule)
            rule.walkDecls(/^background|mask-image/, decl=>{
                let value = decl.value;
                if(value.indexOf('url') != -1){
                    decl.remove()
                }
            })
        })
    };
});




function createDomainImg(rule, domain){
    let r = rule.cloneBefore();
        let {selector} = r;
        if(selector !== 'body') {
            r.selector = `body${domain.site != '' ? '.'+domain.site : ''} ${selector}`;
        }else{
            r.selector = `${selector}.${domain.site != '' ? '.'+domain.site : ''}`;
        }

        r.walkDecls(decl=>{
            if( !/^background|mask-image/.test(decl.prop) || decl.value.indexOf('url') == -1){
                decl.remove()
            }else{
                if(decl.value.indexOf('url') != -1){
                    decl.value =  decl.value.replace(/url\((?:'|")?((?:(?:http(?:s)?:)?\/\/)?.*?)\/(.*?)(?:'|")?\)/, function($0, $1, $2){
                        return `url('${domain.host}/${$2}')`
                    })
                }
            }
        })
}

function createPubBackground(rule){
    var defaultDomain = {
        site: '',
        host: config.domains[0].host
    }
    createDomainImg(rule, defaultDomain)
    config.domains.forEach(item=>{
        createDomainImg(rule, item)
    })
}
