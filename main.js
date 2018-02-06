
(function() {

    var listToRefer =  ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California',
    'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii',
    'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana',
    'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota',
    'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire',
    'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota',
    'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island',
    'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
    'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
    ],
    listItems,
    inputElement,
    curListLength = 0,
    bodyElement = document.getElementsByTagName("body");


    bodyElement[0].addEventListener("keyup", displayDropDown);
    //hides the dropdown, when clicked on the clear "x" button.
    bodyElement[0].addEventListener("search", doSearch);
    //hides the dropsown on outside click.
    bodyElement[0].onclick = function() {
        hideDropDown();
    }

    window.onload = function(e) {
        listItems = document.getElementById('matchedResults');
        listItems.addEventListener('click', doSearch);
        listItems.addEventListener('mouseover',hoverFunction);
        inputElement = document.getElementById("inputField")
    };


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
    function  displayDropDown(e){
        var targetElement = e.target,
            input_val, 
            listToDisplay,
            selected;

        e.stopPropagation();
        if (e.keyCode == 40) { //down
            if (curListLength > 0) {
                var first = listItems.firstChild;
                selected = listItems.getElementsByClassName("selected")
                if (selected.length != 0) {
                    if(selected[0].nextElementSibling) {
                        selected[0].nextElementSibling.classList.add("selected");                
                        selected[0].classList.remove("selected");
                    }   
                } else {
                    first.className = "selected";
                }
                var allNodes = listItems.childNodes;
                for (i=0; i<allNodes.length; i++) {
                    if (allNodes[i].className == "selected") {
                        allNodes[i].scrollIntoView(true)
                    }
                }        
            }
        } else if (e.keyCode == 38) { //up
            if (curListLength > 0) {
                selected = listItems.getElementsByClassName("selected");
                if (selected.length != 0 && selected[0].previousElementSibling) {
                    selected[0].previousElementSibling.classList.add("selected");                
                    selected[0].nextElementSibling.classList.remove("selected");
                }
                var allNodes = listItems.childNodes;
                for (i=0; i<allNodes.length; i++) {
                    if (allNodes[i].className == "selected") {
                        allNodes[i].scrollIntoView(true)
                    }
                }             
            }
        } else if (e.keyCode === 27) { //esc key
            var isFocused = (document.activeElement === inputElement);
            if(!isFocused) {
                inputElement.focus();
            } else {
                hideDropDown();
            }
        } else if (e.keyCode == 13)  { //enter
            return
        } else if(targetElement && targetElement.nodeName === "INPUT") {
            input_val = targetElement.value; // updates the variable on each ocurrence
            
            //search for the matced list or phrases, if the length of the query string is greater than 1.
            if (input_val.length > 0) {
                listToDisplay = [];
                listItems.innerHTML = '';
                listToDisplay = typeAheadList(input_val);// list that inclues query string.
                curListLength = listToDisplay.length;

                // hide the dropdown and return, if the list that includes search query string is empty.
                if(listToDisplay.length === 0 ) {
                    hideDropDown();
                    return;
                }

                for (i = 0; i < listToDisplay.length; i++) {
                    var textToBold = new RegExp( "(" + input_val + ")", "gi" ),
                    template = "<span style='font-weight:bold;'>$1</span>",
                    label = listToDisplay[i].replace(textToBold,template);
                    listItems.innerHTML += '<li>' + label + '</li>';
                }
                listItems.style.display = 'block';
            } else {
                hideDropDown();
            }
        }
    }

    //On mouseOver, removes 'selected' class if any and adds 'selected' class on hovered element
    function hoverFunction(e) {
        var selected = listItems.getElementsByClassName("selected");
        if (selected.length != 0) {
            selected[0].classList.remove("selected");
        }
        if(e.target.nodeName === "LI" ) {
            e.target.className = 'selected';
        }
    }

    //on enter, selects the values of the element.
    function doSearch(e) {
        e.stopPropagation();
        if (curListLength > 0) {
            var selected = listItems.getElementsByClassName("selected");
            if (selected.length != 0) {
                inputElement.value = selected[0].innerText;
            }
        }
        hideDropDown()
    }
    /**
     * Clear the list of items and hides the dropDown.
     */
    function hideDropDown() {
        listItems.innerHTML = '';
        listItems.style='display:none'
    }
})();