const parser = require('postcss-selector-parser')

console.log('-----------------------------')

module.exports = {
  postcssPlugin: 'foobarity',
  Rule(dec) {
    if (dec?.selector?.includes(':where')) {
      /** @type {import('postcss-selector-parser').Selector} */
      let selector
      parser(p => selector = p.nodes[0]).processSync(dec.selector)
      selector.walkPseudos(p => {
        if (p.value === ':where') {
          const selectors = p.nodes.map(n => p.clone().replaceWith(n).toString())
          console.log(selectors)
        }
        return true
      })
    }

    return dec
  },
}
