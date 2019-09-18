// Compiled using marko@4.13.4-1 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/src/html").t(__filename),
    marko_componentType = "/simple-node$1.0.0/src/app/views/users/form/form.marko",
    components_helpers = require("marko/src/components/helpers"),
    marko_renderer = components_helpers.r,
    marko_defineComponent = components_helpers.c,
    marko_helpers = require("marko/src/runtime/html/helpers"),
    marko_loadTag = marko_helpers.t,
    component_globals_tag = marko_loadTag(require("marko/src/components/taglib/component-globals-tag")),
    marko_forEach = marko_helpers.f,
    marko_escapeXml = marko_helpers.x,
    marko_escapeXmlAttr = marko_helpers.xa,
    init_components_tag = marko_loadTag(require("marko/src/components/taglib/init-components-tag")),
    await_reorderer_tag = marko_loadTag(require("marko/src/taglibs/async/await-reorderer-tag"));

function render(input, out, __component, component, state) {
  var data = input;

  out.w("<html><body>");

  component_globals_tag({}, out);

  out.w("<h1>User</h1>");

  if (data.validationErrors) {
    out.w("<div>");

    var for__4 = 0;

    marko_forEach(data.validationErrors, function(error) {
      var keyscope__5 = "[" + ((for__4++) + "]");

      out.w("<div>" +
        marko_escapeXml(error.param) +
        " - " +
        marko_escapeXml(error.msg) +
        "</div>");
    });

    out.w("</div>");
  }

  out.w("<form action=\"/users\" method=\"post\">");

  if (data.user.id) {
    out.w("<div><input type=\"hidden\" name=\"_method\" value=\"PUT\"><input type=\"hidden\" id=\"id\" name=\"id\" value=\"" +
      marko_escapeXmlAttr(data.user.id) +
      "\"></div>");
  }

  out.w("<div><label for=\"name\">Name:</label><input type=\"text\" id=\"name\" name=\"name\" value=\"" +
    marko_escapeXmlAttr(data.user.name) +
    "\"></div><div><label for=\"email\">Email:</label><input type=\"email\" id=\"email\" name=\"email\" value=\"" +
    marko_escapeXmlAttr(data.user.email) +
    "\"></div><div><label for=\"descricao\">Password:</label><input type=\"text\" id=\"password\" name=\"password\" value=\"" +
    marko_escapeXmlAttr(data.user.password) +
    "\"></div><input type=\"submit\" value=\"Submit\"></form>");

  init_components_tag({}, out);

  await_reorderer_tag({}, out, __component, "21");

  out.w("</body></html>");
}

marko_template._ = marko_renderer(render, {
    ___implicit: true,
    ___type: marko_componentType
  });

marko_template.Component = marko_defineComponent({}, marko_template._);

marko_template.meta = {
    id: "/simple-node$1.0.0/src/app/views/users/form/form.marko",
    tags: [
      "marko/src/components/taglib/component-globals-tag",
      "marko/src/components/taglib/init-components-tag",
      "marko/src/taglibs/async/await-reorderer-tag"
    ]
  };
