export function drawImages(images: FileList, preserveAlpha: boolean) {
    console.log(images);
    const container =  document.getElementsByClassName("image-container")[0];

    for (let i = 0; i < images.length; i++) {
        let canvas;
        if (document.getElementById(images[i].name)) {
            canvas = document.getElementById(images[i].name);
        } else {
            canvas = document.createElement('canvas');
            canvas.id = images[i].name;
        }
       
        const image = images[i];
        container.appendChild(canvas);

        const ctx = canvas.getContext('2d');
      
        const img = new Image();
        img.src = URL.createObjectURL(image);
        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            // ctx.filter = "invert(1)";
            ctx.drawImage(img, 0, 0);
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const invertedData = customInverse(imageData, preserveAlpha);
            ctx.putImageData(invertedData, 0, 0);
            // downloadURI(canvas.toDataURL('image/jpeg'), "inverted_"+image.name);
        }

        img.onerror = (err) => {
            console.log(err);
        }

    }
}

export function downloadImages() {
    const container =  document.getElementsByClassName("image-container")[0];
    const canvasList = container.getElementsByTagName("canvas");
    for (let i = 0; i < canvasList.length; i++) {
        const canvas = canvasList[i];
        downloadURI(canvas.toDataURL('image/png'), "inverted_"+canvas.id);
    }

}


function downloadURI(uri, name) {
    var link = document.createElement("a");
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

function customInverse(imageData: ImageData, preserveAlpha: boolean) {
    const data = imageData.data;
    for (let i = 0; i < data.length; i+=4) {
        data[i] = 255 - data[i];
        data[i+1] = 255 - data[i+1];
        data[i+2] = 255 - data[i+2];
        if (preserveAlpha) {
            data[i+3] = data[i+3];
        } else {
            data[i+3] = 255; 
        }

    }
    return imageData;
}