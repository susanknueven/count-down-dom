function getById(id, throwError = true) {
   var el = document.getElementById(id);
   if (!el && throwError) {
	    throw new ReferenceError(id + " is not defined");
   }
   return el;
}
