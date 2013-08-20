window.App = window.App || {};
(function(root){
"use strict";

/* Sqr widget */


var SqrWidget = function(data){
	this.id = typeof data.id !== "undefined" ? data.id : 0;
	this.position = typeof data.position !== "undefined" ? data.position : 0;
	this.size = typeof data.size !== "undefined" ? data.size : 1;
	this.color = typeof data.color !== "undefined" ? data.color : "forest";
	this._genElement();
};

SqrWidget.prototype._genElement = function(){
	this.el = document.createElement("article");
	this.el.id = "widget-" + this.id;
	this.el.classList.add("s"+this.size);
	this.el.classList.add(this.color);
};

root.SqrWidget = SqrWidget;

}(window.App));