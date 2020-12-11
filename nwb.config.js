module.exports = {
  type: 'react-component',
  npm: {
    esModules: true,
  },
  webpack: {
    rules: {
      babel: {
        test: /\.jsx?/,
      },
    },
    extra: {
      resolve: {
        extensions: ['.js', 'index.js', '.jsx'],
      },
    },
  },
}
