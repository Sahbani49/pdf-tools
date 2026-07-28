function previewImages() {

    const preview = document.getElementById("preview");
    preview.innerHTML = "";

    const files = document.getElementById("images").files;

    document.getElementById("count").textContent =
        files.length + (files.length === 1 ? " image selected" : " images selected");


    for (let i = 0; i < files.length; i++) {

        const file = files[i];

        const card = document.createElement("div");
        card.className = "image-card";


        const number = document.createElement("span");
        number.className = "image-number";
        number.textContent = i + 1;


        const img = document.createElement("img");
        img.src = URL.createObjectURL(file);


        card.appendChild(number);
        card.appendChild(img);

        preview.appendChild(card);
    }
}



async function convertPDF() {

    const files = document.getElementById("images").files;

    if (!files.length) {
        alert("Please select at least one image.");
        return;
    }


    const { jsPDF } = window.jspdf;

    const pdf = new jsPDF("p", "mm", "a4");


    for (let i = 0; i < files.length; i++) {

        const dataUrl = await loadImage(files[i]);


        if (i > 0) {
            pdf.addPage();
        }


        pdf.addImage(
            dataUrl,
            "JPEG",
            10,
            10,
            190,
            277
        );
    }


    pdf.save("converted.pdf");
}




function loadImage(file) {

    return new Promise((resolve) => {

        const reader = new FileReader();


        reader.onload = function(e) {

            resolve(e.target.result);

        };


        reader.readAsDataURL(file);

    });
        }
