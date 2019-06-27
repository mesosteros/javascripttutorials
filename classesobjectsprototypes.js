function Range(from, to) {
	// Store the start and end points (state) of this new
	// range object. These are noninherited properties that
	// are unique to this object.
	this.from = from;
	this.to = to;
}
// All Range objects inherit from this object.
// Note that the property name must be "prototype".
Range.prototype = {
		// Return true if x is in the range, false otherwise
	includes: function(x) {
		return this.from <= x && x <= this.to;
	},
	// Invoke f once for each integer in the range.
	foreach: function(f) {
		for(var x=Math.ceil(this.from); x <= this.to; x++)
			f(x);
	},
	// Return a string representation of the range
	toString: function() {
		return "(" + this.from + "..." + this.to + ")";
	}
};
// Here are example uses of a range object
var r = new Range(1,3); // Create a range object
r.includes(2); // => true: 2 is in the range
r.foreach(console.log); // Prints 1 2 3
console.log(r); // Prints (1...3)
// A subclass of our Range class. It inherits the includes()
// and toString() methods, and overrides the foreach method
// to make it work with dates.
function DateRange(from, to) {
	// Use the superclass constructor to initialize
	Range.call(this, from, to);
}
// These two lines are key to subclassing. The subclass
// prototype must inherit from the superclass prototype.
DateRange.prototype = Object.create(Range.prototype);
DateRange.prototype.constructor = DateRange;
// This "static" field of the subclass holds the
// number of milliseconds in one day.
DateRange.DAY = 1000*60*60*24;
// Invoke f once for each day in the range
DateRange.prototype.foreach = function(f) {
	var d = this.from;
	while(d < this.to) {
		f(d);
		d = new Date(d.getTime() + DateRange.DAY);
	}
};
var now = new Date();
var tomorrow = new Date(now.getTime() + DateRange.DAY);
var nextweek = new Date(now.getTime() + 7*DateRange.DAY);
var week = new DateRange(now, nextweek);
week.includes(tomorrow); // => true
week.foreach(function(d) { // Print each day in the week
	console.log(d.toLocaleDateString());
});