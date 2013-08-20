window.App = window.App || {};
(function(root){
	"use strict";

	/* Sqr grid */

	var SqrGrid = function(options){
		this.widgets = [];
		this.widgetClass = options.widgetClass;
		this.widgetDataArr = options.widgetDataArr;
		this.container = document.getElementById(options.containerId);

		// init
		this._createWidgetsFromData(this.widgetDataArr);
		this._addGridToDom();

	};

	SqrGrid.prototype._createWidgetsFromData = function (widgetDataArr) {
		widgetDataArr.forEach( function(data){
			this.widgets.push(this._genWidget(data));
		}.bind(this));
	};

	SqrGrid.prototype._genWidget = function (widgetData) {
		return new this.widgetClass(widgetData);
	};

	SqrGrid.prototype._addGridToDom = function () {
		this.widgets.forEach(function(widget){
			this.container.appendChild(widget.el);
		}.bind(this));
	};

	SqrGrid.prototype.arrangeWidgets = function(order){
		order.forEach(function(id, i){
			if(this.container.childNodes[i].id !== "widget-"+id) {
				this.container.insertBefore(this.container.querySelector("#widget-"+id), this.container.childNodes[i]);
			}
		}.bind(this));
	};

	root.SqrGrid = SqrGrid;

}(window.App));