"use strict";module.exports={_CONTINUE:"__NM_CONTINUE",_handlers:{},_add:function _add(a,b){var c=this._handlers[a];return Array.isArray(c)||(c=this._handlers[a]=[]),Array.isArray(b)?this._handlers[a]=[].concat(c,b):this._handlers[a].push(b),this},_next:function _next(){return this._CONTINUE},use:function use(a){return this._add("*",a)},get:function get(a){return this._add("get",a)},post:function post(a){return this._add("post",a)},patch:function patch(a){return this._add("patch",a)},put:function put(a){return this._add("put",a)},delete:function _delete(a){return this._add("delete",a)},end:function end(a){var b=this;return function(c,d){var e=c.method.toLowerCase();if(Array.isArray(b._handlers[e])){for(var f,g=b._handlers["*"],h=[].concat(g,b._handlers[e]),j=b._next.bind(b),k=0;k<h.length&&(f=h[k],"function"!=typeof f||f(c,d,j)===b._CONTINUE);k++);return void("function"==typeof a&&a())}var l=Error("Missing handlers for '".concat(e,"' method"));throw l.method=e,l.req=c,l.res=d,l}}};