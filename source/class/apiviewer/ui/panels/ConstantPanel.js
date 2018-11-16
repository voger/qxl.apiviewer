/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2008 1&1 Internet AG, Germany, http://www.1und1.de
     2018 Zenesis Limited, http://www.zenesis.com

   License:
     MIT: https://opensource.org/licenses/MIT
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Til Schneider (til132)
     * Sebastian Werner (wpbasti)
     * Andreas Ecker (ecker)
     * Fabian Jakobs (fjakobs)
     * John Spackman (johnspackman) of Zenesis Ltd (http://www.zenesis.com)

************************************************************************ */
qx.Class.define("apiviewer.ui.panels.ConstantPanel", {

  extend: apiviewer.ui.panels.InfoPanel,

  construct: function() {
    this.base(arguments, "Constants", "apiviewer/image/constant18.gif");
  },

  members : {

    /**
     * @Override
     */
    canDisplayItem: function(dao) {
      return dao instanceof apiviewer.dao.Constant; 
    },
    
    getPanelItemObjects: function(daoClass, showInherited) {
      return daoClass.getConstants();
    },
        
    /**
     * Checks whether a constant has details.
     *
     * @param node {Map} the doc node of the constant.
     * @param currentClassDocNode {Map} the doc node of the currently displayed class
     * @return {Boolean} whether the constant has details.
     */
    itemHasDetails : function(node, currentClassDocNode) {
      return (
        node.getSee().length > 0 ||
        node.getErrors().length > 0 ||
        apiviewer.ui.panels.InfoPanel.descriptionHasDetails(node) ||
        this.__hasConstantValueHtml(node)
      );
    },


    getItemTypeHtml : function(node)
    {
      return apiviewer.ui.panels.InfoPanel.createTypeHtml(node, "var");
    },


    getItemTitleHtml : function(node)
    {
       return apiviewer.ui.panels.InfoPanel.setTitleClass(node, node.getName());
    },


    /**
     * Creates the HTML showing the information about a constant.
     *
     * @param node {Map} the doc node of the constant.
     * @param currentClassDocNode {Map} the doc node of the currently displayed class
     * @param showDetails {Boolean} whether to show the details.
     * @return {String} the HTML showing the information about the constant.
     */
    getItemTextHtml : function(node, currentClassDocNode, showDetails)
    {

      var textHtml = apiviewer.ui.panels.InfoPanel.createDescriptionHtml(node, node.getClass(), showDetails);

      if (showDetails)
      {
        textHtml += this.__createConstantValueHtml(node);
        textHtml += apiviewer.ui.panels.InfoPanel.createSeeAlsoHtml(node);
        textHtml += apiviewer.ui.panels.InfoPanel.createErrorHtml(node, currentClassDocNode);
        textHtml += apiviewer.ui.panels.InfoPanel.createDeprecationHtml(node, "constant");
      }

      return textHtml;
    },


    /**
     * Checks whether a constant value is provided
     *
     * @param node {Map} the doc node of the item.
     * @return {Boolean} whether the constant provides a value
     */
    __hasConstantValueHtml : function(node) {
      return node.getValue() ? true : false;
    },


    /**
     * Creates the HTML showing the value of a constant
     *
     * @param node {Map} the doc node of the item.
     * @return {String} the HTML showing the value of the constant
     */
    __createConstantValueHtml : function(node)
    {
      if (this.__hasConstantValueHtml(node)) {
        var value = node.getValue();
        if (typeof value !== "string") {
          value = qx.lang.Json.stringify(value);
        }
        value = qx.bom.String.escape(value);
        var html = new qx.util.StringBuilder(
          '<div class="item-detail-headline">', "Value: ",
          '</div>', '<div class="item-detail-text">',
          value,
          '</div>'
        )
        return html.get();
      } else {
        return "";
      }
    }

  }

});
