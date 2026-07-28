let selectedFiles = [];

function previewImages() {

    const input = document.getElementById("images");

    selectedFiles = Array.from(input.files);

    showPreview();
}


function showPreview() {

    const preview = document.getElementById("preview");
    preview.innerHTML = "";

    document.getElementById("count").textContent =
        selectedFiles.length +
        (selectedFiles.length === 1 ? " image selected" : " images selected");


    selectedFiles.forEach((file, index) => {

        const card = document.createElement("div");
        card.className = "image-card";
        card.draggable = true;


        const number = document.createElement("span");
        number.className = "image-number";
const number = document.createElement("span");
number.className = "image-number";
number.textContent = index + 1;
        number.textContent = index + 1;


        const img = document.createElement("img");
        img.src = URL.createObjectURL(file);


        const remove = document.createElement("button");
        remove.innerHTML = "✖";
        remove.className = "remove-btn";


        remove.onclick = function() {

            selectedFiles.splice(index, 1);

            showPreview();
        };


        const up = document.createElement("button");
up.innerHTML = "⬆️";
up.className = "move-btn";

up.onclick = function(){
    if(index > 0){
        const temp = selectedFiles[index];
        selectedFiles[index] = selectedFiles[index - 1];
        selectedFiles[index - 1] = temp;

        showPreview();
    }
};


const down = document.createElement("button");
down.innerHTML = "⬇️";
down.className = "move-btn";

down.onclick = function(){
    if(index < selectedFiles.length - 1){
        const temp = selectedFiles[index];
        selectedFiles[index] = selectedFiles[index + 1];
        selectedFiles[index + 1] = temp;

        showPreview();
    }
};


card.appendChild(remove);
card.appendChild(number);
card.appendChild(img);
card.appendChild(up);
card.appendChild(down);

preview.appendChild(card);

    });
}



async function convertPDF() {

    if (!selectedFiles.length) {

        alert("Please select at least one image.");
        return;
    }


    const { jsPDF } = window.jspdf;

    const pdf = new jsPDF("p", "mm", "a4");


    for (let i = 0; i < selectedFiles.length; i++) {

        const dataUrl = await loadImage(selectedFiles[i]);


        if (i > 0) {
            pdf.addPage();
        }


        pdf.addImage(dataUrl, "JPEG", 10, 10, 190, 277);

    }


    pdf.save("converted.pdf");
}



function loadImage(file) {

    return new Promise((resolve)=>{

        const reader = new FileReader();

        reader.onload = function(e){

            resolve(e.target.result);

        };

        reader.readAsDataURL(file);

    });
                                            }
let touchStartIndex = null;

document.addEventListener("touchstart", function(e){

    const number = e.target.closest(".image-number");

    if(number){

        const card = number.closest(".image-card");

        touchStartIndex = Array.from(
            card.parentNode.children
        ).indexOf(card);

    }

});


document.addEventListener("touchmove", function(e){

    e.preventDefault();

}, {passive:false});


document.addEventListener("touchend", function(e){

    if(touchStartIndex === null) return;


    const touch = e.changedTouches[0];

    const element = document.elementFromPoint(
        touch.clientX,
        touch.clientY
    );


    const targetCard = element.closest(".image-card");


    if(targetCard){

        const dropIndex = Array.from(
            targetCard.parentNode.children
        ).indexOf(targetCard);


        if(dropIndex !== touchStartIndex){

            const movedFile = selectedFiles.splice(touchStartIndex,1)[0];

            selectedFiles.splice(dropIndex,0,movedFile);

            showPreview();
        }

    }


    touchStartIndex = null;

});
