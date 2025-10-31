async function fetchPDFfromDrive(driveUrl) {
  const fileId = driveUrl.match(/\/d\/(.*?)\//)[1];
  const downloadUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;
  
  const response = await fetch(downloadUrl);
  if (!response.ok) throw new Error('No se pudo descargar el PDF');
  
  return await response.arrayBuffer(); // listo para pdf.js
}


async function pdfDriveFirstPageToImage(driveUrl, format = 'image/png') {
  const arrayBuffer = await fetchPDFfromDrive(driveUrl);

  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
  const page = await pdf.getPage(1);

  const viewport = page.getViewport({ scale: 2 });
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = viewport.width;
  canvas.height = viewport.height;

  await page.render({ canvasContext: ctx, viewport }).promise;

  return canvas.toDataURL(format); // DataURL PNG/WebP
}

function createImgOfPrev(id) {
    const driveUrl = 'https://drive.google.com/file/d/${id}/view?usp=sharing';
    pdfDriveFirstPageToImage(driveUrl, 'image/png')
    .then(dataUrl => {
        const img = document.createElement('img');
        img.src = dataUrl;
        document.body.appendChild(img);
    })
    .catch(console.error);
}

createImgOfPrev('1ZVI3lJ8FdI8d8zZ-JmSY8d1cjuCv6CL5')