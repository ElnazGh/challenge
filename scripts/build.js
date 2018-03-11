const fse = require('fs-extra')
const path = require('path')
const ejs = require('ejs')
const { promisify } = require('util')
const marked = require('marked')
const frontMatter = require('front-matter')
const globP = promisify(require('glob'))
const config = require('../site.config')

const ejsRenderFile = promisify(ejs.renderFile)
const srcPath = './src'
const distPath = config.build.outputPath

// Clear destination folder
fse.emptyDirSync(distPath)

// Copy assets folder
fse.copy(`${srcPath}/assets`, `${distPath}/assets`)

// Read pages
globP('**/*.@(md|ejs|html)', { cwd: `${srcPath}/pages` })
  .then((files) => {
    files.forEach((file) => {
      const fileData = path.parse(file)
      const destPath = path.join(distPath, fileData.dir)

      // Create destination directory
      fse.mkdirs(destPath)
        .then(() => {
          // Read page file
          return fse.readFile(`${srcPath}/pages/${file}`, 'utf-8')
        })
        .then((data) => {
          // Render page
          const pageData = frontMatter(data)
          const templateConfig = Object.assign({}, config, { page: pageData.attributes })
          let pageContent

          // Generate page content according to file type
          switch (fileData.ext) {
            case '.md':
              pageContent = marked(pageData.body)
              break
            case '.ejs':
              pageContent = ejs.render(pageData.body, templateConfig)
              break
            default:
              pageContent = pageData.body
          }

          // Render layout with page contents
          const layout = pageData.attributes.layout || 'default'

          return ejsRenderFile(`${srcPath}/layouts/${layout}.ejs`, Object.assign({}, templateConfig, { body: pageContent }))
        })
        .then((str) => {
          // Save the html file
          fse.writeFile(`${destPath}/${fileData.name}.html`, str)
        })
        .catch((err) => { console.error(err) })
    })
  })
  .catch((err) => { console.error(err) })
