let puzzle_start = document.getElementById('puzzle_start');
let puzzle_end = document.getElementById('puzzle_end');
let arr_start = [[1,2,3], [4,5,6], [7,8,0]];
let arr_end = [[1,2,3], [4,5,6], [7,8,0]];

for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 3; j++) {
        let top = (8 * i) + ((i + 1) * (0.25));
        let left = (8 * j) + ((j + 1) * (0.25));
        if (arr_start[i][j] != 0) {

            puzzle_start.innerHTML += `
                            <div class="block position-absolute bg-danger fs-2 d-flex
                             justify-content-center align-items-center text-white"
                              style="top:${top}rem; left:${left}rem;" id="puzzle_start${arr_start[i][j]}" onclick="Move(${arr_start[i][j]},'start',${arr_start})" >
                                ${arr_start[i][j]}
                            </div>
                            `;
        }
        else {
            puzzle_start.innerHTML += `
                            
                            `;
        }
    }
    for (var j = 0; j < 3; j++) {
        let top = (8 * i) + ((i + 1) * (0.25));
        let left = (8 * j) + ((j + 1) * (0.25));
        if (arr_end[i][j] != 0) {

            puzzle_end.innerHTML += `
                            <div class="block position-absolute bg-danger fs-2 d-flex
                             justify-content-center align-items-center text-white"
                              style="top:${top}rem; left:${left}rem;" id="puzzle_end${arr_end[i][j]}" onclick="Move(${arr_end[i][j]},'end',${arr_end})" >
                                ${arr_end[i][j]}
                            </div>
                            `;
        }
        else {
            puzzle_end.innerHTML += `
                            
                            `;
        }
    }
}

function Move(num,status,arr) {
    if(status=="start"){
        var item=document.getElementById('puzzle_start'+num);
        arr=arr_start;
    }
    else{
        var item=document.getElementById('puzzle_end'+num);
        arr=arr_end;
    }
    let Num1 = findIndex(num,arr);
    let Zero = findIndex(0,arr);
    if(Math.abs(Num1[0]-Zero[0]) + Math.abs(Num1[1] - Zero[1])===1){
        
        
        //Down
        if(Num1[0]-Zero[0]==-1){
            
            
            switch(Num1[0]){
                case 1:
                    item.style.animationName="DownToRow3";
                    item.style.top=(parseFloat(item.style.top)+8.25)+'rem';
                    arr[Num1[0]][Num1[1]]=0;
                    arr[Zero[0]][Zero[1]]=num;
                    break;
                case 0:
                    item.style.animationName="DownToRow2";
                    item.style.top=(parseFloat(item.style.top)+8.25)+'rem';
                    arr[Num1[0]][Num1[1]]=0;
                    arr[Zero[0]][Zero[1]]=num;
                    break;
            }
        }
        //Up
        else if(Num1[0]-Zero[0]==1){
            
            
            switch(Num1[0]){
                case 1:
                    item.style.animationName="UpToRow1";
                    item.style.top=(parseFloat(item.style.top)-8.25)+'rem';
                    arr[Num1[0]][Num1[1]]=0;
                    arr[Zero[0]][Zero[1]]=num;
                    break;
                case 2:
                    item.style.animationName="UpToRow2";
                    item.style.top=(parseFloat(item.style.top)-8.25)+'rem';
                    arr[Num1[0]][Num1[1]]=0;
                    arr[Zero[0]][Zero[1]]=num;
                    break;
            }
        }
        //Left
        else if(Num1[1]-Zero[1]===1){
            switch(Num1[1]){
                case 1:
                    item.style.animationName="LeftToCol1";
                    item.style.left=(parseFloat(item.style.left)-8.25)+'rem';
                    arr[Num1[0]][Num1[1]]=0;
                    arr[Zero[0]][Zero[1]]=num;
                    break;
                case 2:
                    item.style.animationName="LeftToCol2";
                    item.style.left=(parseFloat(item.style.left)-8.25)+'rem';
                    arr[Num1[0]][Num1[1]]=0;
                    arr[Zero[0]][Zero[1]]=num;
                    break;
            }
        }

        //Right
        else if(Num1[1]-Zero[1]===-1){
            switch(Num1[1]){
                case 1:
                    item.style.animationName="RightToCol3";
                    item.style.left=(parseFloat(item.style.left)+8.25)+'rem';
                    arr[Num1[0]][Num1[1]]=0;
                    arr[Zero[0]][Zero[1]]=num;
                    break;
                case 0:
                    item.style.animationName="RightToCol2";
                    item.style.left=(parseFloat(item.style.left)+8.25)+'rem';
                    arr[Num1[0]][Num1[1]]=0;
                    arr[Zero[0]][Zero[1]]=num;
                    break;
            }
        }
    }
    console.log(arr);
}
function findIndex(num,arr) {
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            if (num == arr[i][j]) {
                return [i, j];
            }
        }
    }
}
function Submit(){
    for(var i=0;i<3;i++)
    {
        for(var j=i*3;j<i*3+3;j++){
            document.getElementById('start'+j).value=arr_start[i][j%3];
            document.getElementById('end'+j).value=arr_end[i][j%3];
        }
    }
    
    document.getElementById('form1').submit();
}