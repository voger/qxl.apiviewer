/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2008 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     MIT: https://opensource.org/licenses/MIT
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Til Schneider (til132)
     * Sebastian Werner (wpbasti)
     * Andreas Ecker (ecker)
     * Fabian Jakobs (fjakobs)

************************************************************************ */

qx.Class.define("apiviewer.ui.panels.MethodPanel", {
  extend: apiviewer.ui.panels.AbstractMethodPanel,

  construct: function() {
    this.base(arguments, "Members", "apiviewer/image/member18.gif");
  },

  members : {
    /**
     * @Override
     */
    canDisplayItem: function(dao) {
      return dao instanceof apiviewer.dao.Method && !dao.isStatic(); 
    }
  }

});
