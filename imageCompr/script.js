let quality = 0.85; // Default quality
let format = 'jpeg'; // Default format
let filesSelected = false; // Track if files have been selected

const imageInput = document.getElementById('imageInput');
const compressBtn = document.getElementById('compressBtn');
const fileDetails = document.getElementById('fileDetails');
const messageDiv = document.getElementById('message');
const desiredSizeInput = document.getElementById('desiredSize');
const progressBar = document.getElementById('progressBar');
const previewContainer = document.getElementById('previewContainer');
const preview = document.getElementById('preview');
const downloadLink = document.getElementById('downloadLink');
const loadingSpinner = document.getElementById('loadingSpinner');
const progressContainer = document.getElementById('progressContainer');
const filenameInput = document.getElementById('filename');

// Trigger file input on drag area click
document.getElementById('dragArea').addEventListener('click', () => {
    imageInput.click();
});

// Prevent default behavior on drag events
document.getElementById('dragArea').addEventListener('dragover', (e) => e.preventDefault());
document.getElementById('dragArea').addEventListener('drop', handleDrop); // Handle drop event

// Handle file drop
function handleDrop(event) {
    event.preventDefault();
    const files = event.dataTransfer.files;
    imageInput.files = files; // Assign the dropped file to the input
    handleFiles(files); // Process the file
}

// Handle file input change
imageInput.addEventListener('change', function (event) {
    const files = event.target.files;
    handleFiles(files); // Process the files
});

// Handle image files
function handleFiles(files) {
    if (files.length === 0) {
        messageDiv.textContent = "Please choose an image!";
        return;
    }

    const file = files[0];
    let totalSizeMB = file.size / 1024 / 1024;
    document.getElementById('currentSize').textContent = totalSizeMB.toFixed(2); // Display size in MB
    document.getElementById('compressBtn').disabled = false;

    // Set desired size input max value
    document.getElementById('desiredSize').max = totalSizeMB;

    filesSelected = true;
}

// Event listener for compression quality slider
document.getElementById('qualitySlider').addEventListener('input', function (event) {
    quality = parseFloat(event.target.value);
});

// Event listener for format selection
document.getElementById('formatSelect').addEventListener('change', function (event) {
    format = event.target.value;
});

// Event listener for "Compress Image" button
document.getElementById('compressBtn').addEventListener('click', function () {
    const files = imageInput.files;

    if (!filesSelected || files.length === 0) {
        messageDiv.textContent = "Please select an image.";
        return;
    }

    const desiredSizeMB = parseFloat(desiredSizeInput.value);
    const maxSize = desiredSizeMB * 1024 * 1024;  // Convert to bytes

    loadingSpinner.style.display = "block";
    progressContainer.style.display = "block";
    progressBar.value = 0;

    // Process the single image
    const file = files[0]; // Only the first file
    const reader = new FileReader();
    reader.onload = function (e) {
        const img = new Image();
        img.src = e.target.result;

        img.onload = function () {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const ratio = img.height / img.width;
            const newWidth = img.width * 0.8;  // Resize to 80% of original width
            const newHeight = newWidth * ratio;
            canvas.width = newWidth;
            canvas.height = newHeight;
            ctx.drawImage(img, 0, 0, newWidth, newHeight);

            // Compress the image
            compressImage(canvas, maxSize, file, null, null, null);
        };
    };
    reader.readAsDataURL(file);
});

// Function to compress image and handle the format conversion
function compressImage(canvas, maxSize, originalFile, zip, resolve, reject) {
    canvas.toBlob(function (blob) {
        const compressedSize = blob.size;

        if (compressedSize > maxSize) {
            let quality = 0.75;  // Default quality

            if (compressedSize > maxSize * 1.2) {
                quality = 0.6;  // More aggressive compression if the image is too large
            }

            const newCanvas = document.createElement('canvas');
            const ctx = newCanvas.getContext('2d');
            newCanvas.width = canvas.width;
            newCanvas.height = canvas.height;
            ctx.drawImage(canvas, 0, 0, newCanvas.width, newCanvas.height);

            newCanvas.toBlob(function (newBlob) {
                const progress = Math.min(100, (newBlob.size / compressedSize) * 100); // Calculate progress
                progressBar.value = progress;

                if (newBlob.size > maxSize) {
                    compressImage(newCanvas, maxSize, originalFile, zip, resolve, reject); // Recursively compress
                } else {
                    finishCompression(newBlob, originalFile);  // Handle the single image
                }
            }, `image/${format}`, quality);
        } else {
            finishCompression(blob, originalFile);  // Handle the single image
        }
    }, `image/${format}`, quality);
}

// Function to handle finishing the compression and showing the result
function finishCompression(blob, originalFile) {
    previewContainer.style.display = "block";
    preview.src = URL.createObjectURL(blob);
    preview.style.display = "block";

    downloadLink.style.display = "block";
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = filenameInput.value + "." + format;  // Use custom filename

    messageDiv.textContent = `Image compressed successfully! Size: ${(blob.size / 1024 / 1024).toFixed(2)} MB`;

    loadingSpinner.style.display = "none";
    progressContainer.style.display = "none";
}
