// JavaScript
let currentFile = null;  // Variável para armazenar o arquivo atual

function handleFileUpload(file) {
    const filePreview = document.getElementById('filePreview');
    const downloadButton = document.getElementById('downloadButton');
    
    filePreview.innerHTML = "";  // Limpa a pré-visualização anterior
    currentFile = file;  // Armazena o arquivo atual
    
    const fileName = file.name;
    const validImage = /\.(jpg|jpeg|png)$/i.test(fileName);
    const validPDF = /\.pdf$/i.test(fileName);
  
    if (validImage || validPDF) {
        downloadButton.style.display = 'inline-block';  // Exibe o botão de download
  
        const reader = new FileReader();
        reader.onload = function(event) {
            if (validImage) {
                const img = document.createElement("img");
                img.src = event.target.result;
                filePreview.appendChild(img);
            } else if (validPDF) {
                const pdfPreview = document.createElement("p");
                pdfPreview.textContent = `Pré-visualizando PDF: ${fileName}`;
                filePreview.appendChild(pdfPreview);
            }
        };
        
        if (validImage) {
            reader.readAsDataURL(file);  // Carrega imagem como URL de dados
        } else if (validPDF) {
            reader.readAsArrayBuffer(file);  // Carrega PDF como ArrayBuffer
        }
    } else {
        alert("Por favor, selecione um arquivo JPG, JPEG, PNG ou PDF.");
    }
}

// Função de download
function downloadFile() {
    if (currentFile) {
        const url = URL.createObjectURL(currentFile);
        const a = document.createElement('a');
        a.href = url;
        a.download = currentFile.name;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);  // Libera o objeto URL após o download
    } else {
        alert("Nenhum arquivo disponível para download.");
    }
}
