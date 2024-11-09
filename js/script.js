// JavaScript
function handleFileUpload() {
    const fileInput = document.getElementById('fileInput');
    const downloadButton = document.getElementById('downloadButton');
    const filePreview = document.getElementById('filePreview');
  
    filePreview.innerHTML = "";  // Limpa a pré-visualização anterior
  
    if (fileInput.files.length > 0) {
      const selectedFile = fileInput.files[0];
      const fileName = selectedFile.name;
      const validImage = /\.(jpg|jpeg|png)$/i.test(fileName);
      const validPDF = /\.pdf$/i.test(fileName);  // Verificação para PDF
      const validText = /\.txt$/i.test(fileName);
  
      if (validImage || validPDF || validText) {
        downloadButton.style.display = 'inline-block';  // Exibe o botão de download
  
        const reader = new FileReader();
        reader.onload = function(event) {
          if (validImage) {
            const img = document.createElement("img");
            img.src = event.target.result;

            // Ajusta o tamanho máximo da imagem
            img.onload = function() {
              const maxWidth = 400;
              const maxHeight = 400;

              if (img.width > maxWidth || img.height > maxHeight) {
                const ratio = Math.min(maxWidth / img.width, maxHeight / img.height);
                img.width = img.width * ratio;
                img.height = img.height * ratio;
              }
            };

            filePreview.appendChild(img);
          } else if (validPDF) {
            const pdfPreview = document.createElement("p");
            pdfPreview.textContent = `Pré-visualizando PDF: ${fileName}`;
            filePreview.appendChild(pdfPreview);
          } else if (validText) {
            const text = document.createElement("p");
            text.textContent = event.target.result;
            filePreview.appendChild(text);
          }
        };
        
        if (validImage) {
          reader.readAsDataURL(selectedFile);  // Carrega imagem como URL de dados
        } else if (validPDF) {
          reader.readAsArrayBuffer(selectedFile);  // Carrega PDF como ArrayBuffer (não será exibido visualmente)
        } else if (validText) {
          reader.readAsText(selectedFile);  // Carrega texto
        }
      } else {
        downloadButton.style.display = 'none';
        alert("Por favor, selecione um arquivo JPG, JPEG, PNG, PDF ou TXT.");
      }
    } else {
      downloadButton.style.display = 'none';
    }
}
