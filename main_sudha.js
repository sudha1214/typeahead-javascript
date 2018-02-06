// variables
var listToRefer = ['student on the bus', 'useless stuff', 'stubhub tickets', 'user study','student',
'js related stuff', 'coding stuff', 'styling stuff'];

var inpuElement = document.getElementsByTagName("body");
inpuElement[0].addEventListener("keyup", myFunction);
//hides the dropdown, when clicked on the clear "x" button.
inpuElement[0].addEventListener("search", hideDropDown);


/** 
 * Returns the list or phrases that are matched with query string.
 * @param {string} val -- query string.
 */ 
function typeAheadList(val) {
  var matchedList = [];

  for (i = 0; i < listToRefer.length; i++) {
    var listItem = listToRefer[i].toLowerCase();
    if (listItem.indexOf(val.toLowerCase()) !== -1) {
        matchedList.push(listItem);
    }
  }

  return matchedList;
}

/**
 * Displays the matched list or phrases, when the text entered in the input field.
 * @param {event} e 
 */
function  myFunction(e){
    var targetElement = e.target,
        input_val, 
        matchedResults, 
        listToDisplay;

    if(targetElement && targetElement.nodeName === "INPUT") {
        input_val = targetElement.value; // updates the variable on each ocurrence
        matchedResults = document.getElementById("matchedResults");
        
        //search for the matced list or phrases, if the length of the query string is greater than 1.
        if (input_val.length > 0) {
            listToDisplay = [];
            matchedResults.innerHTML = '';
            listToDisplay = typeAheadList(input_val);// list that inclues query string.

            // hide the dropdown and return, if the list that includes search query string is empty.
            if(listToDisplay.length === 0 ) {
                hideDropDown();
                return;
            }

            for (i = 0; i < listToDisplay.length; i++) {
                var textToBold = new RegExp( "(" + input_val + ")", "gi" ),
                template = "<span style='font-weight:bold;'>$1</span>",
                label = listToDisplay[i].replace(textToBold,template);
                matchedResults.innerHTML += '<li>' + label + '</li>';
            }
            matchedResults.style.display = 'block';
        } else {
            hideDropDown();
        }
    }
}

/**
 * Clear the list of items and hides the dropDown.
 */
function hideDropDown() {
    matchedResults.innerHTML = '';
    matchedResults.style='display:none'
}