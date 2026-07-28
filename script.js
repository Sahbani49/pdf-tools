function previewImages() {
    const preview = document.getElementById("preview");
    preview.innerHTML = "";

    const files = document.getElementById("images").files;

    for (const file of files) {
        const img = document.createElement("img");
        img.src = URL.createObjectURL(file);
        img.style.width = "120px";
        img.style.margin = "5px";
        img.style.borderRadius = "8px";
        preview.appendChild(img);
    }
}

async function convertPDF() {

    const files = document.getElementById("images").files;

    if (files.length === 0) {
        alert("Please select at least one image.");
        return;
    }

    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF();

    for (let i = 0; i < files.length; i++) {

        const imgData = await fileToDataURL(files[i]);

        if (i > 0) {
            pdf.addPage();
        }

        pdf.addImage(imgData, "JPEG", 10, 10, 190, 270);
    }

    pdf.save("images.pdf");
}

function fileToDataURL(file) {
    return new Promise((resolve) => {
        const reader = new FileReader();

        reader.onload = (e) => {
            resolve(e.target.result);
        };

        reader.readAsDataURL(file);
    });
                       }
