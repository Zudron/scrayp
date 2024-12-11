document.addEventListener('DOMContentLoaded', () => {
    const fileDropZone = document.getElementById('file-drop-zone');
    const fileInput = document.getElementById('file-input');
    const usernameInput = document.getElementById('username-input');
    const radioInputs = document.querySelectorAll('input[name="input-type"]');

    // Handle radio button changes
    radioInputs.forEach(radio => {
        radio.addEventListener('change', (e) => {
            const isFileInput = e.target.value === 'file';
            fileDropZone.style.display = isFileInput ? 'flex' : 'none';
            usernameInput.style.display = isFileInput ? 'none' : 'block';
        });
    });

    // Initialize visibility
    fileDropZone.style.display = 'none';

    // File drop handling
    fileDropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        fileDropZone.classList.add('drag-over');
    });

    fileDropZone.addEventListener('dragleave', () => {
        fileDropZone.classList.remove('drag-over');
    });

    fileDropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        fileDropZone.classList.remove('drag-over');
        
        const file = e.dataTransfer.files[0];
        if (file && file.type === 'text/plain') {
            handleFile(file);
        }
    });

    fileDropZone.addEventListener('click', () => {
        fileInput.click();
    });

    fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            handleFile(file);
        }
    });

    function handleFile(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const content = e.target.result;
            // Process the file content here
            console.log('File content:', content);
        };
        reader.readAsText(file);
    }
});