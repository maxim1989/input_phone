(function ($) {

    $.fn.phoneMask = function(msk) {
    	this.val(msk);
    	let cashedValue = {},
        	defaultValue = msk,
        	minPos = -1;
	    // Create items for value substitution
	    for (let j = 0; j < defaultValue.length; j++){
	        if (defaultValue[j] == "_") {
	        	if (minPos === -1){
	        		minPos = j;
	        	}
	            cashedValue[j] = "_";
	        }
	    }

	    /**
	    * Delete digit after cursor
	    * @param pos: cursor position
	    */
	    function deleteNumber(pos){
	        let sortable = [];
	        for (let key in cashedValue) {
	            if (pos <= key){
	                sortable.push([key, cashedValue[key]]);
	            }
	        }
	        sortable.sort(function(a, b) {
	            return a[0] - b[0];
	        });
	        for (let i=0; i < sortable.length; i++){
	            sortable[i][1] = (sortable[i+1] ? sortable[i+1][1] : "_");
	            cashedValue[sortable[i][0]] = sortable[i][1];
	        }
	        return (sortable.length ? sortable[0][0] : pos);
	    }

	    /**
	    * Get the nearest left digit position relative to the cursor
	    * @param pos: cursor position
	    */
	    function getClosestLeftPosition(pos){
	        let closestNumber = 0;
	        for (let key in cashedValue) {
	            if (pos > key){
	                closestNumber = Math.max(key, closestNumber);
	            }
	        }
	        cashedValue[closestNumber] = '_';
	        return closestNumber;
	    }

	    /**
	    * Create an array of elements which index greater or equal @pos
	    * @param pos: cursor position
	    */
	    function arrayWithRightDigits(pos){
	        let arr = [];
	        for (let key in cashedValue) {
	            if (pos <= key){
	                arr.push(key);
	            }
	        }
	        return arr;
	    }

	    /**
	    * Get the nearest right digit position relative to the cursor
	    * @param pos: cursor position
	    */
	    function getClosestRightPosition(pos){
	        let arr = arrayWithRightDigits(pos);
	        return (arr.length ? Math.min.apply(null, arr) : pos+1);
	    }

	    /**
	    * Shift right
	    * @param pos: cursor position
	    */
	    function shiftRight(pos){
	        let arr = arrayWithRightDigits(pos);
	        arr.sort(function(a, b) {
	            return b - a;
	        });

	        for (let i=0; i < arr.length-1; i++){
	            cashedValue[arr[i]] = cashedValue[arr[i+1]];
	        }
	    }

	    this.on('keydown', function(event) {
	        // If left or right keys, stop function, normal stuff will happen
	        if (event.key == "ArrowLeft" || event.key == "ArrowRight"){
	            return;
	        }
	        event.preventDefault();
	        let cursorPosition = event.target.selectionStart,
	            newCursorPosition = minPos,
	            keyCode = event.keyCode;
	        if ((48 <= keyCode && keyCode <= 57) || (96 <= keyCode && keyCode <= 105)) {
	            if (cursorPosition < defaultValue.length) {
	                let positionOnChange = getClosestRightPosition(cursorPosition);
	                shiftRight(positionOnChange);
	                cashedValue[positionOnChange] = event.key;
	                newCursorPosition = getClosestRightPosition(positionOnChange+1);
	            } else {
	                return;
	            }
	            // Logic of work function getClosestRightPosition()
	            /*if (cursorPosition < 4) {
	                cashedValue[4] = event.key;
	                newCursorPosition = 5;
	                var a = getClosestRightPosition(cursorPosition), //+
	                    b = getClosestRightPosition(a+1);
	                console.log('a =', a);
	                console.log('b =', b);
	            }
	             else if (4 <= cursorPosition && cursorPosition < 7) {
	                cashedValue[cursorPosition] = event.key;
	                newCursorPosition = cursorPosition + 1;
	                var a = getClosestRightPosition(cursorPosition), //+
	                    b = getClosestRightPosition(a+1);
	                console.log('a =', a);
	                console.log('b =', b);
	            }
	             else if (cursorPosition == 7 || cursorPosition == 8) {
	                cashedValue[9] = event.key;
	                newCursorPosition = 10;
	                var a = getClosestRightPosition(cursorPosition), //+
	                    b = getClosestRightPosition(a+1);
	                console.log('a =', a);
	                console.log('b =', b);
	            }
	             else if (cursorPosition == 9 || cursorPosition == 10) {
	                cashedValue[cursorPosition] = event.key;
	                newCursorPosition = cursorPosition + 1;
	                var a = getClosestRightPosition(cursorPosition), //+
	                    b = getClosestRightPosition(a+1);
	                console.log('a =', a);
	                console.log('b =', b);
	            }
	             else if (cursorPosition == 11) {
	                cashedValue[cursorPosition] = event.key;
	                newCursorPosition = cursorPosition + 2;
	                var a = getClosestRightPosition(cursorPosition), //+
	                    b = getClosestRightPosition(a+1);
	                console.log('a =', a);
	                console.log('b =', b);
	            }
	             else if (cursorPosition == 12) {
	                cashedValue[13] = event.key;
	                newCursorPosition = 14;
	                var a = getClosestRightPosition(cursorPosition), //+
	                    b = getClosestRightPosition(a+1);
	                console.log('a =', a);
	                console.log('b =', b);
	            }
	             else if (cursorPosition == 13) {
	                cashedValue[cursorPosition] = event.key;
	                newCursorPosition = 14;
	                var a = getClosestRightPosition(cursorPosition), //?
	                    b = getClosestRightPosition(a+1);
	                console.log('a =', a);
	                console.log('b =', b);
	            }
	             else if (cursorPosition == 14) {
	                cashedValue[cursorPosition] = event.key;
	                newCursorPosition = 16;
	                var a = getClosestRightPosition(cursorPosition), //+
	                    b = getClosestRightPosition(a+1);
	                console.log('a =', a);
	                console.log('b =', b);
	            }
	             else if (cursorPosition == 15) {
	                cashedValue[16] = event.key;
	                newCursorPosition = 16;
	                var a = getClosestRightPosition(cursorPosition), //+
	                    b = getClosestRightPosition(a+1);
	                console.log('a =', a);
	                console.log('b =', b);
	            }
	             else if (cursorPosition == 16 || cursorPosition == 17) {
	                cashedValue[cursorPosition] = event.key;
	                newCursorPosition = cursorPosition + 1;
	                var a = getClosestRightPosition(cursorPosition), //+
	                    b = getClosestRightPosition(a+1);
	                console.log('a =', a);
	                console.log('b =', b);
	            }
	             else {
	                return;
	            }*/
	        } else if (event.key == "Delete") {
	            newCursorPosition = deleteNumber(cursorPosition);
	        } else if (event.key == "Backspace" && cursorPosition > minPos) {
	            newCursorPosition = deleteNumber(getClosestLeftPosition(cursorPosition));
	        } else {
	            return
	        }

	        let arr = [];
        	for (let k = 0; k < defaultValue.length; k++){
        		arr.push(defaultValue[k]);
        	}
	        for (let i in cashedValue) {
	        	arr[i] = cashedValue[i];
	        }
	        event.target.value = arr.join('');
	        
	        // Move cursor back since the browser moved it when new input value was changed
	        event.target.selectionStart = newCursorPosition;
	        event.target.selectionEnd = newCursorPosition;
	    });

        return this;
    };
 
}(jQuery));