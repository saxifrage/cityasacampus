String.prototype.bool = function() {
  return (/^true$/i).test(this);
};