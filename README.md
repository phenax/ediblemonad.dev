# My Portfolio

My static portfolio website

### Build
* Building html ```npm run build:html``` 
* Building css ```npm run build:css``` 
* Building js ```npm run build:js``` 

### Directory structure
* `/about, /contact, /skills, /index.html` - Dynamically built html files (because pushState routing is messy for github pages and some browsers dont support pushState)
* `/src/components` - All the react components that get rendered into the static html pages
* `/src/dist` - Static js, css and image files
* `/src/js` - All js files(ES2015)
* `/src/scss` - All SCSS files
* `/src/builder.js` - A small implementation for building html files out of react components
