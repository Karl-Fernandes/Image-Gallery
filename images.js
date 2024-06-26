let deleteMode = false;

        document.addEventListener('DOMContentLoaded', loadImagesFromLocalStorage);

        function handleFileChange(event) {
            const files = event.target.files;
            const galleryContainer = document.getElementById('galleryContainer');
            const images = [];

            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                const reader = new FileReader();

                reader.onload = function(e) {
                    const imgElement = document.createElement('img');
                    imgElement.src = e.target.result;

                    const caption = prompt("Enter a caption for this image:");


                    const anchorElement = document.createElement('a');
                    anchorElement.href = e.target.result;
                    anchorElement.setAttribute('data-lightbox', 'images');
                    anchorElement.setAttribute('data-title', caption || `Caption ${galleryContainer.children.length + 1}`);
                    anchorElement.appendChild(imgElement);

                    // Add click event for delete mode
                    anchorElement.addEventListener('click', function(event) {
                        if (deleteMode) {
                            event.preventDefault();
                            galleryContainer.removeChild(anchorElement);
                            saveImagesToLocalStorage();
                        }
                    });

                    galleryContainer.appendChild(anchorElement);
                    images.push(e.target.result);

                    // Save images to local storage
                    saveImagesToLocalStorage();
                };

                reader.readAsDataURL(file);
            }
        }

        function toggleDeleteMode() {
            deleteMode = !deleteMode;
            if (deleteMode) {
                alert('Delete mode activated. Click on an image to delete it. (Press Delete to deactivate mode)');
            } else {
                alert('Delete mode deactivated.');
            }
        }

        function saveImagesToLocalStorage() {
            const galleryContainer = document.getElementById('galleryContainer');
            const images = [];
            const links = galleryContainer.getElementsByTagName('a');
            
            for (let i = 0; i < links.length; i++) {
                images.push(links[i].href);
            }

            localStorage.setItem('imageGallery', JSON.stringify(images));
        }

        function loadImagesFromLocalStorage() {
            const galleryContainer = document.getElementById('galleryContainer');
            const images = JSON.parse(localStorage.getItem('imageGallery')) || [];

            for (let i = 0; i < images.length; i++) {
                const imgElement = document.createElement('img');
                imgElement.src = images[i];

                const anchorElement = document.createElement('a');
                anchorElement.href = images[i];
                anchorElement.setAttribute('data-lightbox', 'images');
                anchorElement.setAttribute('data-title', `Caption ${i + 1}`);
                anchorElement.appendChild(imgElement);

                // Add click event for delete mode
                anchorElement.addEventListener('click', function(event) {
                    if (deleteMode) {
                        event.preventDefault();
                        galleryContainer.removeChild(anchorElement);
                        saveImagesToLocalStorage();
                    }
                });

                galleryContainer.appendChild(anchorElement);
            }
        }