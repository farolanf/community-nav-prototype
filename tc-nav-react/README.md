# Topcoder Navigation React

## Demo

Run the following in the `tc-nav-react-demo` folder:

- `yarn`
- `yarn start`

### Troubleshooting

If you encounter invalid hooks error while running the demo, then:

  - delete tc-nav-react-demo/node_modules/tc-nav-react/node_modules/react
  - delete tc-nav-react-demo/node_modules/tc-nav-react/node_modules/react-dom

and try again.

## Getting Started

### Install

```
npm i -D tc-nav-react
```

### Assets

Copy `dist/font` and `dist/img` to web server root folder. You can put them nested in sub folder, but be sure to update `$font-path` and `$img-path` SASS variables in the `src/assets/sass/_global/_variables.scss`.