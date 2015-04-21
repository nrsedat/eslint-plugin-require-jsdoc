'use strict';

module.exports = function (context) {

  var RETURN_REGEX = /@return(s)?/;
  var PARAM_REGEX = /@param/g;

  /**
   * Check for the existence for the @return statement
   * @param  {String}  comment jsdoc comment
   * @return {Boolean} Returns true if @return/returns exists in the comment
   */
  function hasReturnStatement(comment) {
    return RETURN_REGEX.test(comment);
  }

  /**
   * Checks whether minimum number of parameters are existing in jsdoc
   * @param  {String}  comment   jsdoc comment
   * @param  {[type]}  numParams number of parameters in the function
   * @return {Boolean}           Returns true if enough parameters are defined
   */
  function hasEnoughParamStatements(comment, numParams) {
    var paramsFound = comment.match(PARAM_REGEX) || [];
        numParams = numParams || 0;

    if (paramsFound.length >= numParams) {
      return true;
    }
    return false;
  }

  /**
   * Get Comment for a particular node
   * @param  {Node} node
   * @return {String} extracted comment for node
   */
  function getCommentText(node) {
    var comment = context.getComments(node).leading[0] && context.getComments(node).leading[0].value || '';
    comment = comment.replace(/\s/g, '');
    return comment;
  }

  return {
    'FunctionDeclaration': function(node){
      var comment = getCommentText(node);
      var numParams;
      if (!comment) {
        return context.report(node, 'Missing @jsdoc for ' + node.id.name);
      }
      if (!hasReturnStatement(comment)){
        context.report(node, 'Missing @return statement in jsdoc');
      }
      numParams = node.params ? node.params.length : 0;
      if (!hasEnoughParamStatements(comment, numParams)) {
        context.report(node, 'Missing @param definitions');
      }
    },
    'FunctionExpression': function(node){
      var comment;
      var numParams;
      if (node.parent.type === 'VariableDeclarator'){
        comment = getCommentText(node.parent.parent);
        if (!comment) {
          return context.report(node, 'Missing @jsdoc for ' + node.parent.id.name);
        }

        if (!hasReturnStatement(comment)){
          context.report(node, 'Missing @return statement');
        }
        numParams = node.params ? node.params.length : 0;
        if (!hasEnoughParamStatements(comment, numParams)) {
          context.report(node, 'Missing @param definitions');
        }
        return true;
      }

      comment = node.parent && node.parent.type === 'Property' ? getCommentText(node.parent) : getCommentText(node);
      if (!comment) {
        if (node.parent.type === 'Property') {
          return context.report(node, 'Missing @jsdoc for ' + node.parent.key.name);
        }
        return context.report(node, 'Missing @jsdoc for ' + node.id);
      }
      if (!hasReturnStatement(comment)){
        context.report(node, 'Missing @return statement in jsdoc');
      }
    }
  };
};
