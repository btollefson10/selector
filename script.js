document.addEventListener('DOMContentLoaded', function() {
    const imageGrid = document.getElementById('imageGrid');

    // Initialize the grid with images
    images.forEach((src, index) => {
        const col = document.createElement('div');
        col.className = 'col-md-4';
        col.innerHTML = `
            <div class="image-wrapper">
                <img src="${src}" class="img-fluid" alt="Image ${index + 1}">
                <div class="check-overlay"></div>
            </div>
        `;
        imageGrid.appendChild(col);
    });

    // Event listener for the lottery button
    document.getElementById('lotteryButton').addEventListener('click', () => {
        // Clear previous selections
        const wrappers = document.querySelectorAll('.image-wrapper');
        wrappers.forEach(wrapper => wrapper.classList.remove('selected'));

        // Get and display 3 random images
        let selectedImages = getRandomImages(images, 3);
        displayImages(selectedImages);

        // Highlight selected images in the grid
        highlightSelectedImages(selectedImages);
    });
});

// Function to display 3 random images
function displayImages(imagePaths) {
    const container = document.getElementById('imageContainer');
    container.innerHTML = imagePaths.map(path => `<img src="${path}" alt="Lottery Image">`).join('');
}

// Function to highlight selected images in the grid
function highlightSelectedImages(selectedImages) {
    // Get the root URL
    let rootUrl = window.location.origin;

    document.querySelectorAll('.image-wrapper img').forEach(img => {
        // Normalize the src by removing the root URL
        let normalizedSrc = img.src.replace(rootUrl, '');

        if (selectedImages.includes(normalizedSrc)) {
            img.parentElement.classList.add('selected');
        }
    });
}


// ... (rest of the functions like getRandomImages, getRandomIndexes remain unchanged)


const images = [
    'https://s3.us-east-2.amazonaws.com/myownfairytale.com/images/Cover.png',
    '/images/2.png',
    '/images/3.png',
    '/images/4.png',
    '/images/5.png',
    '/images/6.png',
    '/images/7.png',
    '/images/8.png',
    '/images/9.png',
    '/images/10.png',
    // ... add paths for all 10 images
];

function selectRandomImages() {
    const wrappers = document.querySelectorAll('.image-wrapper');
    wrappers.forEach(wrapper => wrapper.classList.remove('selected'));
    let selectedIndexes = getRandomIndexes(wrappers.length, 3); // Select 3 random images

    selectedIndexes.forEach(index => {
        wrappers[index].classList.add('selected');
    });
}

function getRandomIndexes(max, count) {
    let indexes = [];
    while (indexes.length < count) {
        let index = Math.floor(Math.random() * max);
        if (!indexes.includes(index)) {
            indexes.push(index);
        }
    }
    return indexes;
}

document.getElementById('lotteryButton').addEventListener('click', () => {
    let selectedImages = getRandomImages(images, 3);
    displayImages(selectedImages);
});

function getRandomImages(arr, num) {
    let copy = arr.slice();
    let result = [];

    for (let i = 0; i < num; ) {
        let index = Math.floor(Math.random() * copy.length);
        result.push(copy.splice(index, 1)[0]);
        i++;
    }

    return result;
}