export function downloadImages(images: FileList) {
    console.log(images);
    const canvas = document.createElement('canvas');

    for (let i = 0; i < images.length; i++) {
        const image = images[i];
        var ctx = canvas.getContext('2d');
      
        const img = new Image();
        img.src = URL.createObjectURL(image);
        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.filter = "invert(1)";
            ctx.drawImage(img, 0, 0);
            console.log(canvas.toDataURL('image/jpeg'));
            downloadURI(canvas.toDataURL('image/jpeg'), "inverted_"+image.name);
        }

        img.onerror = (err) => {
            console.log(err);
        }

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