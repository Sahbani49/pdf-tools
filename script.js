function previewImages() {

    const preview = document.getElementById("preview");
    preview.innerHTML = "";

    const files = document.getElementById("images").files;

    document.getElementById("count").textContent =
        files.length + (files.length === 1 ? " image selected" : " images selected");

    for (const file of files) {

        const img = document.createElement("img");
        img.src = URL.createObjectURL(file);
        img.style.width = "120px";
        img.style.height = "120px";
        img.style.objectFit = "cover";
        img.style.margin = "5px";
        img.style.borderRadius = "8px";

        preview.appendChild(img);
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

        pdf.addImage(dataUrl, "JPEG", 10, 10, 190, 277);
    }

    pdf.save("converted.pdf");
}

function loadImage(file) {

    return new Promise((resolve) => {

        const reader = new FileReader();

        reader.onload = function (e) {
            resolve(e.target.result);
        };

        reader.readAsDataURL(file);

    });

}
