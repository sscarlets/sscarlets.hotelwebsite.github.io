let counter = [[], [], [], [], [], [], []] 
let archiveList = []

function addGuest(roomNum) {
    let rawGuest = document.getElementById("add" + roomNum).value;
    let guest = rawGuest.charAt(0).toUpperCase() + rawGuest.slice(1).toLowerCase();

    if (counter[roomNum].length == 4) {
        document.getElementById("warn" + roomNum).innerHTML = "Room Full";
        //roomnum stuff
    } else {
        let currentDate = new Date();
        let year = currentDate.getFullYear();
        let month = currentDate.getMonth() + 1;
        let day = currentDate.getDate();
        let hours = currentDate.getHours();
        let minutes = currentDate.getMinutes();
        let seconds = currentDate.getSeconds();

        let timestamp = ` checked in at ${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
        let entry = guest + timestamp;
        counter[roomNum].push(entry);
        //let number = (counter.length)

        let number = counter[roomNum].length;
        let itemContainer = document.getElementById("list" + roomNum);
        let p = document.createElement('p');
        //let txt = document.createTextNode(entry)
        //p.appendChild(txt)
        p.textContent = number + '. ' + entry;
        itemContainer.appendChild(p);

        let archiveContainer = document.getElementById("archive");
        let r = document.createElement('p');
        r.textContent = entry;
        archiveContainer.appendChild(r);

        //clear th input field
        document.getElementById("add" + roomNum).value = "";
    }
}

// allowing for enter key inputs
function setupEnterKeyListeners() {
    // input[id^="add"] is selecting all of the input ids starting with add, and we need this to iterate thru them later
    let inputFields = document.querySelectorAll('input[id^="add"]');  
    
    //basicaly it's looping through eahc input
    inputFields.forEach(input => {
        input.addEventListener("keypress", function(event) {
            if (event.key === "Enter") {
                let roomNum = input.id.replace("add", ""); //locating the input field that was activated
                addGuest(roomNum); // call addGuest function for the corresponding room
            }
        });
    });
}

document.addEventListener("DOMContentLoaded", function() {
    setupEnterKeyListeners();
    //basically DOMContentLoaded makes sure that everything has loaded before we start look for event listeners
    //DONT DELETE!!!
});

function removeGuest(roomNum) {
    let rawBadGuest = document.getElementById("remove" + roomNum).value;
    let badGuest = rawBadGuest.charAt(0).toUpperCase() + rawBadGuest.slice(1).toLowerCase();
    document.getElementById('warn' + roomNum).innerHTML = "";  
    
    // Check if the guest name exists in the list
    if (badGuest) {
        let paragraphs = document.querySelectorAll('#list' + roomNum + ' p');
        let guestIndex = -1; //temporary, indicates we didnt find the guest
        for (let i = 0; i < paragraphs.length; i++) {
            if (paragraphs[i].innerText.includes(badGuest)) {
                guestIndex = i; //to indicate we found the guest!
                break;
            }
        }

        if (guestIndex !== -1) {
            // remove guest from everything (including counters)
            let removeGuest = paragraphs[guestIndex];
            let containerElement = removeGuest.parentNode;
            containerElement.removeChild(removeGuest);
            counter[roomNum].splice(guestIndex, 1); 

            // rebuilding list
            let itemContainer = document.getElementById('list' + roomNum);
            itemContainer.innerHTML = '';  // clear the existing list
            counter[roomNum].forEach((entry, index) => {  //forEach is like a loop, but it is defining entry and index
                let p = document.createElement('p');
                p.textContent = (index + 1) + '. ' + entry; //we get the index of the list and attach it to the name
                itemContainer.appendChild(p);
            });

            let currentDate = new Date();
            let year = currentDate.getFullYear();
            let month = currentDate.getMonth() + 1;
            let day = currentDate.getDate();
            let hours = currentDate.getHours();
            let minutes = currentDate.getMinutes();
            let seconds = currentDate.getSeconds();

            let timestamp = ` checked out at ${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
            let entry = badGuest + timestamp;

            // Update the archive checkouts
            let archiveOppContainer = document.getElementById("archiveOpp");
            let m = document.createElement('p');
            m.textContent = entry;
            archiveOppContainer.appendChild(m);
        } else {
            document.getElementById('warn' + roomNum).innerHTML = "Guest not found";
        }
    }
    document.getElementById("remove" + roomNum).value = ""; //clear input
}

//allow enter inputs
function setupRemoveKeyListeners() {
    let inputFields = document.querySelectorAll('input[id^="remove"]');
    
    inputFields.forEach(input => {
        input.addEventListener("keypress", function(event) {
            if (event.key === "Enter") {
                let roomNum = input.id.replace("remove", ""); // we are finding the input id so that we can later feed JUST the number part into the function as roomNum
                removeGuest(roomNum); // we call removeGuest for the corresponding room
            }
        });
    });
}

document.addEventListener("DOMContentLoaded", function() {
    setupRemoveKeyListeners();
    //  we need to make sure DOM is loaded for this to work (DONT DELETE)
});


let lock = false
function lockRoom(roomNum) {
    let addBtn = document.getElementById("addButton" + roomNum);
    let addField = document.getElementById('add' +roomNum);
    let removeBtn = document.getElementById("removeButton" + roomNum);
    let removeField = document.getElementById('remove' +roomNum);
    
        if (lock === false) {
            addBtn.disabled = true;
            addField.disabled = true;
            removeBtn.disabled = true;
            removeField.disabled = true;
            lock = true
            document.getElementById("lockButton" + roomNum).textContent = "Unlock"
        }
        else {
            addBtn.disabled = false;
            addField.disabled = false;
            removeBtn.disabled = false;
            removeField.disabled = false;
            lock = false
            document.getElementById("lockButton" + roomNum).textContent = "Lock"
        }
    }

function clearAll(roomNum) {
    let paragraphs = document.querySelectorAll('#list' + roomNum + ' p');
    //for (var i = 0; i < paragraphs.length; i++) {
        //let removeGuest = document.getElementsByTagName("p")[i]
        //let containerElement = removeGuest.parentNode
        //containerElement.removeChild(removeGuest)
    //}
    let itemContainer = document.getElementById('list' + roomNum);
    itemContainer.innerHTML = '';
    counter[roomNum].length = 0
}

function clearArchive() {
    let paragraphs = document.querySelectorAll('#archive');
    let itemContainer = document.getElementById('archive');
    itemContainer.innerHTML = '';
}
