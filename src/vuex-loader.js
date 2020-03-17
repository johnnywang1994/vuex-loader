function getStr(source, startText, endText) {
  const startIndex = source.indexOf(startText);
  const endIndex = source.indexOf(endText);
  return source.substring(startIndex + startText.length, endIndex);
}

module.exports = function(source, map) {
  const wholeScript = getStr(source, '<script>', '</script>');
  const importScript = getStr(source, '<script>', 'export default');
  const objectScript = getStr(source, 'export default', '</script>');
  let output = source;
  if (/\'?\"?vuex\'?\"?\:?\s?\{/gi.test(objectScript)) {
    output = output.replace(
      wholeScript,
      `
        ${importScript}
        import { bindVuex } from '${require.resolve('./bindVuex')}';
        export default bindVuex(${
          objectScript.trim().endsWith(';')
            ? objectScript.trim().slice(0, -1)
            : objectScript
        });
      `,
    );
  }
  this.callback(null, output, map);
};
