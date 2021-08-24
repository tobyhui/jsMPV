const Koa = require('koa');
const app = new Koa();

const fs = require('fs');
const path = require('path');

const compilerSfc = require('@vue/compiler-sfc')
const compilerDom = require('@vue/compiler-dom')
app.use(async ctx => {
  const { url, query } = ctx.request;
  console.log("url: " + url)

  if (url === '/') {
    ctx.type = 'text/html';

    let content = fs.readFileSync('./index.html', 'utf-8')

    // entry file, add process
    content = content.replace("<script", `
      <script>
        window.process = {env: { NODE_ENV:'dev'  }}
      </script>
      <script`)

    ctx.body = content;
  }

  else if (url.endsWith('.js')) {
    const p = path.resolve(__dirname, url.slice(1))
    const content = fs.readFileSync(p, 'utf-8')

    ctx.type = 'application/javascript'
    ctx.body = rewriteImport(content);
  }

  else if (url.startsWith('/@modules')) {
    const prefix = path.resolve(__dirname, 'node_modules', url.replace("/@modules/", ""))

    // read npm package.json
    const module = require(prefix + '/package.json').module;

    const p = path.resolve(prefix, module)

    const ret = fs.readFileSync(p, 'utf-8')
    ctx.type = 'application/javascript'
    ctx.body = rewriteImport(ret)
  }

  // support vue SFC
  else if (url.indexOf('.vue') > -1) {
    const p = path.resolve(__dirname, url.split("?")[0].slice(1))
    const { descriptor } = compilerSfc.parse(fs.readFileSync(p, 'utf-8'), { filename: p })
    console.log(descriptor)

    // descriptor.script => js + render
    if (!query.type) {
      ctx.type = "application/javascript"
      // equivalent vue-loader 
      ctx.body = `
        ${rewriteImport(descriptor.script.content.replace("export default ", "const __script = "))}
  
        import {render as __render} from "${url}?type=template"
        __script.render = __render
        export default __script
      `
    } else if (query.type === 'template') {
      const template = descriptor.template;

      const render = compilerDom.compile(template.content, {
        mode: "module"
      }).code;

      ctx.type = "application/javascript"
      ctx.body = rewriteImport(render)
    }

  }

  // css file
  else if (url.endsWith('css')) {
    const p = path.resolve(__dirname, url.slice(1))
    const file = fs.readFileSync(p, 'utf-8')

    // css trans2js
    const content = `
      const css = "${file.replace(/\n/g, '')}"
      let link = document.createElement('style')
      link.setAttribute('type', 'text/css')
      document.head.appendChild(link)
      link.innerHTML = css 
      export default css
    `

    ctx.type = "application/javascript"
    ctx.body = content
  }

  // jsx file
  // ts file


  function rewriteImport(content) {
    return content.replace(/from ['"]([^'"]+)['"]/g, function (s0, s1) {
      if (s1[0] !== '.' && s1[1] !== '/') {
        return ` from '/@modules/${s1}'`
      } else {
        return s0;
      }
    })
  }

})

app.listen(3000, () => {
  console.log('listening on 3000, http://localhost:3000')
})