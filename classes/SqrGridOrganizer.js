window.App = window.App || {};
(function(root){
"use strict";

/* Sqr grid organizer */


/*

widgets = [
	{ position: 0, size: 1, color: yellow },
	{ position: 1, size: 2, color: blue },
	{ position: 2, size: 2, color: red },
	{ position: 3, size: 1, color: green },
	{ position: 4, size: 1, color: purple },
	{ position: 5, size: 1, color: navy },
	{ position: 6, size: 1, color: orange },
	{ position: 7, size: 1, color: teal },
	{ position: 8, size: 1, color: pink },
	{ position: 9, size: 1, color: forest }
];

columnBreakpoints = [
	{ columns: 1, max: 399 },
	{ columns: 2, min: 400, max: 579 },
	{ columns: 3, min: 580, max: 819 },
	{ columns: 4, min: 820, max: 1099 },
	{ columns: 5, min: 1100, max: 1399 },
	{ columns: 6, min: 0 }
];

*/

var SqrGridOrganizer = function(dashboard, columnBreakpoints){
	this.dashboard = dashboard;
	this.originalOrder = dashboard.widgets.map(function(w){ return w.position; });
	this.v = {
		newOrder: [],
		newRow: [],
		len: 0,
		currentOrder: [],
		currentSum: 0,
		orderCache: [this.originalOrder]
	};

	this._setMediaQueries(columnBreakpoints);
};




SqrGridOrganizer.prototype.getOrderByColumns = function (cols) {
	// If number of columns are one
	if( this.v.orderCache[cols] ) {
		return this.v.orderCache[cols];
	}
	else {
		this.v.newOrder = [];
		this.v.currentOrder = this.originalOrder.slice(); // copy
		this.v.len = this.originalOrder.length;

		while ( this.v.newOrder.length < this.v.len ) {

			// get next row of _cols_ columns
			this.v.newRow = this._calcRow(this.v.currentOrder, cols);

			// remove elements which newRow consists of from currentOrder
			for (var el in this.v.newRow){
				this.v.currentOrder.splice(this.v.currentOrder.indexOf(this.v.newRow[el]), 1);
			}

			this.v.newOrder = this.v.newOrder.concat(this.v.newRow);
		}
		this.v.orderCache[cols] = this.v.newOrder;
		return this.v.newOrder;
	}
};

// Returns array with elements which together
// have the size equal to number of cols 

SqrGridOrganizer.prototype._calcRow = function(grid, cols, row, index){

	row = row || [];
	index = index || 0;

	row.push(grid[index]);

	if(index+1 === grid.length) return row;


	this.v.currentSum = row.reduce( function(sum, curr) {
		return sum+this.dashboard.widgets[curr].size;
	}.bind(this), 0);

	if( this.v.currentSum === cols) {
		return row;
	} else if( this.v.currentSum < cols ) {
		return this._calcRow( grid, cols, row, index+1 );
	} else {
		row.pop();
		return this._calcRow( grid, cols, row, index+1 );
	}

};


SqrGridOrganizer.prototype._setMediaQueries = function(bpCols){
	bpCols.forEach(function(bpCol, i){
		if(bpCol.min) {
			this._matchSetup("min", bpCol);
		}
		if(bpCol.max) {
			this._matchSetup("max", bpCol);
		}
	}.bind(this));
};

SqrGridOrganizer.prototype._matchSetup = function (minmax, bpCol) {
	var mql = window.matchMedia("("+minmax+"-width:"+bpCol[minmax]+"px)");

	if(minmax === "min") this._assertAndAct(mql, bpCol.columns);
	mql.addListener( function(mql) {
		this._assertAndAct(mql, bpCol.columns);
	}.bind(this) );
};

SqrGridOrganizer.prototype._assertAndAct = function(mql, cols){
	if( mql.matches ) this.dashboard.arrangeWidgets( this.getOrderByColumns(cols) );
};



root.SqrGridOrganizer = SqrGridOrganizer;

}(window.App));


