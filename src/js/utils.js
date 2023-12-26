//add utility functions
//select a random array element
Array.prototype.random = function() {
  return this[Math.floor(Math.random() * this.length)];
}

//count the number of words in a string
String.prototype.wordCount = function()
{
    return this.trim().replace(/\s+/g,' ').split(' ').length;
}
//Capitalize the first character of a string
String.prototype.ucFirst = function()
{
    return this.charAt(0).toUpperCase() + this.substring(1);
}
