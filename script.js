function previewImages() {

    const preview = document.getElementById("preview");
    preview.innerHTML = "";

    const files = document.getElementById("images").files;

    for (let file of files) {

        const img = document.createElement("img");

        img.src = URL.createObjectURL(file);

        preview.appendChild(img);
    }
}

function convertPDF() {
    alert("The PDF conversion feature will be completed in the next step.");
}
