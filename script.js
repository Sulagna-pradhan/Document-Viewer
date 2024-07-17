document.addEventListener('DOMContentLoaded', () => {
    const uploadContainer = document.getElementById('uploadContainer');
    const fileInput = document.getElementById('fileInput');
    const browseButton = document.getElementById('browseButton');
    const viewer = document.getElementById('viewer');
    const documentViewer = document.getElementById('documentViewer');
    const loading = document.getElementById('loading');
    const zoomIn = document.getElementById('zoomIn');
    const zoomOut = document.getElementById('zoomOut');
    const fullscreen = document.getElementById('fullscreen');
    const darkMode = document.getElementById('darkMode');

    let scale = 1;

    uploadContainer.addEventListener('dragover', (event) => {
        event.preventDefault();
        uploadContainer.classList.add('dragging');
    });

    uploadContainer.addEventListener('dragleave', () => {
        uploadContainer.classList.remove('dragging');
    });

    uploadContainer.addEventListener('drop', (event) => {
        event.preventDefault();
        uploadContainer.classList.remove('dragging');
        const file = event.dataTransfer.files[0];
        handleFile(file);
    });

    browseButton.addEventListener('click', () => {
        fileInput.click();
    });

    fileInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        handleFile(file);
    });

    zoomIn.addEventListener('click', () => {
        scale += 0.1;
        documentViewer.style.transform = `scale(${scale})`;
    });

    zoomOut.addEventListener('click', () => {
        if (scale > 0.1) {
            scale -= 0.1;
            documentViewer.style.transform = `scale(${scale})`;
        }
    });

    fullscreen.addEventListener('click', () => {
        if (documentViewer.requestFullscreen) {
            documentViewer.requestFullscreen();
        } else if (documentViewer.mozRequestFullScreen) {
            documentViewer.mozRequestFullScreen();
        } else if (documentViewer.webkitRequestFullscreen) {
            documentViewer.webkitRequestFullscreen();
        } else if (documentViewer.msRequestFullscreen) {
            documentViewer.msRequestFullscreen();
        }
    });

    darkMode.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
    });

    function handleFile(file) {
        if (file && file.type.match('application/pdf')) {
            const reader = new FileReader();
            reader.onloadstart = () => {
                loading.style.display = 'block';
            };
            reader.onload = (e) => {
                documentViewer.src = e.target.result;
                viewer.style.display = 'block';
                loading.style.display = 'none';
            };
            reader.readAsDataURL(file);
        } else {
            alert('Please upload a valid PDF document.');
        }
    }
});
