const noPx2Unit = {
  meta: {
    type: "problem", // 'problem' | 'suggestion' | 'layout'
    docs: {
      description: "Ensure no px2unit is used",
      category: "Best Practices",
      recommended: false,
    },
    schema: [],
  },
  create(context) {
    return {
      CallExpression(node) {
        if (node.callee?.name === "px2Unit") {
          context.report({
            node,
            message: "px2Unit is not allowed",
          });
        }
      },
    };
  },
};

module.exports = noPx2Unit
