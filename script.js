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


        card.appendChild(remove);
        card.appendChild(number);
        card.appendChild(img);

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
let dragStartIndex = null;

document.addEventListener("dragstart", function(e){

    if(e.target.classList.contains("image-card")){

        dragStartIndex = Array.from(
            e.target.parentNode.children
        ).indexOf(e.target);

    }

});


document.addEventListener("dragover", function(e){

    e.preventDefault();

});


document.addEventListener("drop", function(e){

    if(e.target.classList.contains("image-card")){

        const dropIndex = Array.from(
            e.target.parentNode.children
        ).indexOf(e.target);


        const movedFile = selectedFiles.splice(dragStartIndex,1)[0];

        selectedFiles.splice(dropIndex,0,movedFile);

        showPreview();

    }

});
