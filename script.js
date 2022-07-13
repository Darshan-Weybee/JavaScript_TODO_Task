let addbtn = document.querySelector(".addbtn");
let searchbtn = document.querySelector(".searchbtn");
let allbtn = document.querySelector(".allbtn");
let activebtn = document.querySelector(".activebtn");
let completedbtn = document.querySelector(".completedbtn");
let inputText = document.querySelector(".inputbox");
let addData = document.querySelector(".data");
let dropDownSort = document.querySelector(".sort");
let inputValue = [];
let deleteBtnAr;
let editBtn;
let i = 0;
let addFlag = false;
let searchFlag = false;


// ============================================================
//  ========== Add Button  ==================================
addbtn.addEventListener("click", function(e){
    addFlag = true;
    searchFlag = false;

    activeCss(addbtn);
    inputText.classList.remove("hidden");
    inputText.focus();

    inputText.addEventListener("keydown", function(eve){
    
        let html = data(`${inputText.value}`);
        console.log({addFlag, searchFlag});
        if(eve.key == "Enter" && addFlag){
            addData.insertAdjacentHTML("afterbegin", html);

            editBtn = document.querySelector(".fa-pen-to-square");
            editBtn.classList.add(`edit-${i}`);
            document.querySelector(".newData").classList.add(`edit-${i}`);

            inputValue.push(`${inputText.value}`);
            i++;
            inputText.value = "";
        }
        document.addEventListener("click", function(e){
        for(let j=0; j<=i; j++){
                let iconClass = [e.target.className.split(" ")]
                document.querySelector(`.${iconClass[0][iconClass[0].length-1]}`).classList.add("hidden");
            }
        });
        //  document.querySelector(".newData").classList.add("hidden");
    });
// e.target.closest(".fa-pen-to-square");
// editBtn.addEventListener("click", function(e){
//     document.querySelector(".newData").classList.add("hidden");

// });

    
});


// ============================================================
//  ========   Sort DropDown   ==================================
dropDownSort.addEventListener("click", function(e){
    let dropDownValue = e.target.value;
   
    if(dropDownValue == "A-to-Z"){
        addData.innerHTML = "";
            inputValue.slice().sort();
            for(let word of inputValue){
                let sort = `${data(word)}`;
                addData.insertAdjacentHTML("beforeend", sort);
            }
    }
    else if(dropDownValue == "Z-to-A"){
        addData.innerHTML = "";
            inputValue.slice().sort();
            for(let word of inputValue){
                let sort = `${data(word)}`;
                addData.insertAdjacentHTML("afterbegin", sort);
            }
    }
    else if(dropDownValue == "Oldest"){
        addData.innerHTML = "";
            for(let word of inputValue){
                let sort = `${data(word)}`;
                addData.insertAdjacentHTML("beforeend", sort);
            }
    }
    else if(dropDownValue == "Newest"){
        addData.innerHTML = "";
            for(let word of inputValue){
                let sort = `${data(word)}`;
                addData.insertAdjacentHTML("afterbegin", sort);
            }
    }

});

// ============================================================
//  ========   Search   ==================================
searchbtn.addEventListener("click", function(e){
    addFlag = false;
    searchFlag = true;

    activeCss(searchbtn);
    inputText.focus();
    inputText.addEventListener("input", function(e){
        addData.innerHTML = "";
        let searchText = e.target.value;
        for(let word of inputValue){
            if(word.includes(searchText) && searchFlag){
                let search = `${data(word)}`;
                addData.insertAdjacentHTML("afterbegin", search);
            }
        }
        if(addData.innerHTML == ""){
            addData.insertAdjacentHTML("afterbegin", "No Data Found");
        }
    });

});












function data(inputData){
    let html = `<div class="inputList">   
    <div class="leftdata"> 
        <input type="checkbox" value=${inputData} class="check">
        <span class="newData">${inputData}</span>
    </div>
    <div class="rightdata"> 
        <i class="fa-solid fa-pen-to-square"></i>
        <i class="fa-solid fa-delete-left"></i>
    </div>
</div>
<hr>`;
return html;
}


function activeCss(className){
    className.classList.remove("default");
    className.classList.add("active");
}

function removeActiveCss(className){
    className.classList.add("default");
    className.classList.remove("active");
}