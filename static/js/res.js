var list = document.getElementsByClassName('item');
var index = 0;
function getPuzzle(index) {

    var puzzle = [];
    var j = 0;
    for (var i = index * 9; i < index * 9 + 9; i += 3) {
        puzzle[j] = [parseInt(list[i].innerHTML), parseInt(list[i + 1].innerHTML), parseInt(list[i + 2].innerHTML)];
        j++;
    }
    return puzzle;
}
var current = getPuzzle(0), previous = [], next = getPuzzle(1);
var btn_next = document.getElementById('btn_next');
var btn_previous = document.getElementById('btn_previous');
btn_previous.setAttribute('disabled', true);
btn_next.onclick = () => {
    Move(FindMove("next"), "next");
    index++;
    previous = [...current];
    current = [...next];
    if (index === (list.length / 9) - 1) {
        next = null;
    }
    else {

        next = getPuzzle(index + 1)
    }
    CheckBtns();
}

btn_previous.onclick = () => {
    Move(FindMove("previous"), "pervois");
    index--;
    next = [...current];
    current = [...previous];
    if (index === 0) {
        previous = null;
    }
    else {
        previous = getPuzzle(index - 1)
    }
    CheckBtns();
}


function CheckBtns() {
    btn_previous.removeAttribute('disabled');
    btn_next.removeAttribute('disabled');
    if (index === 0) {
        btn_previous.setAttribute('disabled', true);
    }
    if (index === (list.length / 9) - 1) {
        btn_next.setAttribute('disabled', true);
    }
}

var puzzle = document.getElementById('puzzle');

function Show() {
    puzzle.innerHTML = "";
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            let top = (8 * i) + ((i + 1) * (0.25));
            let left = (8 * j) + ((j + 1) * (0.25));
            if (current[i][j] != 0) {

                puzzle.innerHTML += `
                                        <div class="block position-absolute bg-danger fs-2 d-flex
                                         justify-content-center align-items-center text-white"
                                          style="top:${top}rem; left:${left}rem;" id="puzzle${current[i][j]}" onclick="Move(${current[i][j]})" >
                                            ${current[i][j]}
                                        </div>
                                        `;
            }
            else {
                puzzle.innerHTML += ` `;
            }
        }
    }
}

Show();

function FindMove(dir) {
    var i1, i2, j1, j2;
    if (dir === 'next') {
        for (var i = 0; i < 3; i++) {
            if (current[i].indexOf(0) !== -1) {
                i1 = i;
                j1 = current[i].indexOf(0);
            }
            if (next[i].indexOf(0) !== -1) {
                i2 = i;
                j2 = next[i].indexOf(0);
            }
        }
        return { 'zero': [i1, j1], 'item': [i2, j2] };
    }
    else {
        for (var i = 0; i < 3; i++) {
            if (current[i].indexOf(0) !== -1) {
                i1 = i;
                j1 = current[i].indexOf(0);
            }
            if (previous[i].indexOf(0) !== -1) {
                i2 = i;
                j2 = previous[i].indexOf(0);
            }
        }
        return { 'zero': [i1, j1], 'item': [i2, j2] };
    }

}

function Move(dirmove, dir) {
    if (dir === "next")
        var item = document.getElementById(`puzzle${current[dirmove['item'][0]][dirmove['item'][1]]}`);
    else
        var item = document.getElementById(`puzzle${current[dirmove['item'][0]][dirmove['item'][1]]}`);
    //UP

    if (dirmove['item'][0] - dirmove['zero'][0] == 1) {
        switch (dirmove['item'][0]) {
            case 1:
                item.style.animationName = "UpToRow1";
                item.style.top = (parseFloat(item.style.top) - 8.25) + 'rem';
                break;
            case 2:
                item.style.animationName = "UpToRow2";
                item.style.top = (parseFloat(item.style.top) - 8.25) + 'rem';
                break;
        }
    }
    //DOWN
    else if (dirmove['item'][0] - dirmove['zero'][0] == -1) {
        switch (dirmove['item'][0]) {
            case 1:
                item.style.animationName = "DownToRow3";
                item.style.top = (parseFloat(item.style.top) + 8.25) + 'rem';
                break;
            case 0:
                item.style.animationName = "DownToRow2";
                item.style.top = (parseFloat(item.style.top) + 8.25) + 'rem';
                break;
        }
    }
    //LEFT
    else if (dirmove['item'][1] - dirmove['zero'][1] == 1) {
        switch (dirmove['item'][1]) {
            case 1:
                item.style.animationName = "LeftToCol1";
                item.style.left = (parseFloat(item.style.left) - 8.25) + 'rem';
                break;
            case 2:
                item.style.animationName = "LeftToCol2";
                item.style.left = (parseFloat(item.style.left) - 8.25) + 'rem';
                break;
        }
    }
    //RIGHT
    else if (dirmove['item'][1] - dirmove['zero'][1] == -1) {
        switch (dirmove['item'][1]) {
            case 1:
                item.style.animationName = "RightToCol3";
                item.style.left = (parseFloat(item.style.left) + 8.25) + 'rem';
                break;
            case 0:
                item.style.animationName = "RightToCol2";
                item.style.left = (parseFloat(item.style.left) + 8.25) + 'rem';
                break;
        }
    }
}
