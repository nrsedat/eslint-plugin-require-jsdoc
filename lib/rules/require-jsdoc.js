'use strict';

module.exports = function (context) {

  var RETURN_REGEX = /@return(s)?/;
  var PARAM_REGEX = /@param/g;

  /**
   * Checks the function name against the list of ignored functions
   * @param  {Object}  node AST node
   * @returns {Boolean}      Returns true if the function should be ignored
   */
  function isIgnored(node) {
    if (node && node.id && node.id.name) {
      var funcName = node.id.name;
      var configuration = context.options[0] || {};
      var ignored = configuration.ignore || [];
      return ignored.indexOf(funcName) >= 0;
    } else {
      return false;
    }
  }

  /**
   * Check for the existence for the @return statement
   * @param  {String}  comment jsdoc comment
   * @returns {Boolean} Returns true if @return/returns exists in the comment
   */
  function hasReturnStatement(comment) {
    return RETURN_REGEX.test(comment);
  }

  /**
   * Checks whether minimum number of parameters are existing in jsdoc
   * @param  {String}  comment   jsdoc comment
   * @param  {[type]}  numParams number of parameters in the function
   * @returns {Boolean}           Returns true if enough parameters are defined
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
   * Display Warning for validation erros
   * @param  {String} error string code
   * @param  {Object} node  AST node where error occured
   * @param  {String} id    Id of the node which should be displayed.
   * @returns {undefined}    undefined
   */
  function displayWarning(error, node, id) {
    switch (error) {
      case 'no-return':
            context.report(node, 'Missing @return description in the jsdoc for ' + id.name);
            break;
      case 'no-param':
            context.report(node, 'Missing @param description in the jsdoc for ' + id.name);
            break;
      default: context.report(node, 'Missing @jsdoc for ' + id.name);
    }
  }

  /**
   * Get Comment for a particular node
   * @param  {Node} node AST node
   * @returns {String} extracted comment for node
   */
  function getCommentText(node) {
    var comment;
    var blockComment;
    var lineComment;
    context.getComments(node).leading.forEach(function(item) {
      if (item.type === 'Block' && item.value) {
        blockComment = item.value;
      };
       if (item.type === 'Line' && item.value) {
        lineComment = item.value;
      };
    });
    comment = blockComment || lineComment || '';
    comment = comment.replace(/\s/g, '');
    return comment;
  }

  return {
    'FunctionDeclaration': function(node){
      if (isIgnored(node)) return;
      var comment = getCommentText(node);
      var numParams;
      if (!comment) {
        return displayWarning('no-jsdoc', node, node.id);
      }
      if (!hasReturnStatement(comment)){
        displayWarning('no-return', node, node.id);
      }
      numParams = node.params ? node.params.length : 0;
      if (!hasEnoughParamStatements(comment, numParams)) {
        displayWarning('no-param', node, node.id);
      }
    },
    'FunctionExpression': function(node){
      if (isIgnored(node)) return;
      var comment;
      var numParams;
      var commentNode;
      var refNode;
      var key;

      numParams = node.params ? node.params.length : 0;

      if (node.parent) {
        if (node.parent.type === 'AssignmentExpression') {
           return true;
        }
        refNode = node.parent;
        if (node.parent.type === 'VariableDeclarator') {
          commentNode = node.parent.parent;
          key = 'id';
        }
        else if (node.parent.type === 'Property') {
          commentNode = node.parent;
          key = 'key';
        }
      }

      if (typeof commentNode === 'undefined') {
        return true;
      }

      comment = getCommentText(commentNode);

      if (!comment) {
        return displayWarning('no-jsdoc', node, refNode[key]);
      }

      if (!hasReturnStatement(comment)){
        displayWarning('no-return', node, refNode[key]);
      }

      if (!hasEnoughParamStatements(comment, numParams)) {
        displayWarning('no-param', node, refNode[key]);
      }
    }
  };
};
