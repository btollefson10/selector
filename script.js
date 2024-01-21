// Global variables
const createdItems = new Map();
const selectedImagesMap = new Map();

function pushSelectedImagesMap(key){
    selectedImagesMap.set(key, imagesMap.get(key));
    if(selectedImagesMap.size >= 4){
        document.querySelector('#imageGrid').classList.add('selector-full');
    }
}

function removeFromSelectedImagesMap(key) {
    selectedImagesMap.delete(key);
    if(selectedImagesMap.size<4){
        document.querySelector('#imageGrid').classList.remove('selector-full');
    }
}

function pushCreatedItems(key, item){
    createdItems.set(key, item);
    //update the sidebar to add the scratchoff images
}

function modifyCreatedItem(key){
    //load them as selected items and remove from the created Items map until it is added again
}


document.addEventListener('DOMContentLoaded', function() {
    /*const imageGrid = document.getElementById('imageGrid');

    // Initialize the grid with images
    images.forEach((src, index) => {
        const col = document.createElement('div');
        col.className = 'col-md-4 p-2';
        col.innerHTML = `
            <div class="image-wrapper" onclick="toggleImageSelection(this)">
                <img src="${src}" class="img-fluid" alt="Image ${index + 1}">
                <div class="check-overlay">   
 <img src="./images/check-circle-fill.svg" alt="Headline Image" class="headline-image">

</div>
            </div>
        `;
        imageGrid.appendChild(col);
    });*/

    const imageGrid = document.getElementById('imageGrid');

    // Iterate over the imagesMap
    imagesMap.forEach((src, key) => {
        const col = document.createElement('div');
        col.className = 'col-md-3 p-2';
        col.innerHTML = `
            <div class="image-wrapper" onclick="toggleImageSelection(this)" data-key="${key}">
                <img src="${src}" class="img-fluid" alt="Image ${key}">
                <div class="check-overlay">   
                    <img src="https://s3.us-east-2.amazonaws.com/myownfairytale.com/images/check-circle-fill.svg" alt="Headline Image" class="headline-image">
                </div>
            </div>
        `;
        imageGrid.appendChild(col);
    });


    // Event listener for the lottery button
    /*document.getElementById('lotteryButton').addEventListener('click', () => {
        // Clear previous selections
        const wrappers = document.querySelectorAll('.image-wrapper');
        wrappers.forEach(wrapper => wrapper.classList.remove('selected'));

        // Get and display 4 random images
        selectedImages = getRandomImages(images, 4);
        displayImages(selectedImages);

        // Highlight selected images in the grid
        highlightSelectedImages();
    });*/

    document.getElementById('randomImagesButton').addEventListener('click', selectRandomImages);


    // Add to Cart button event listener
    document.getElementById('scratchOff').addEventListener('click', function() {
        if(selectedImagesMap.size < 4){
            alert('make sure 4 images are added before adding to cart');
            return;
        }
        // Create a card with selected images
        let card = createImageCard(createdItems.size + 1);

        // Add the card to the sidebar
        let sidebar = document.getElementById('sidebar');
        sidebar.appendChild(card);

        // Store the selected images in the createdItems map
        pushCreatedItems(createdItems.size + 1, {images: selectedImagesMap.keys()})

        // Reset the random images selection
        resetSelectedImages();

        // Show the sidebar if it's not already visible
        sidebar.classList.add('show');
        sidebar.classList.add('p-3');
    });
});

// Function to display 3 random images
function displayImages(imagePaths) {
    const container = document.getElementById('imageContainer');
    container.innerHTML = imagePaths.map(path => `
        <div class="col-md-3 p-2">
            <img src="${path}" alt="Lottery Image">
        </div>
    `).join('');
}

function newDisplayImages(){
    let index = 0;
    selectedImagesMap.forEach((value, key) => {
        index++;
        const slot = document.getElementById(`slot-${index}`);
        slot.innerHTML = `<img src="${value}" alt="${key} Image">`;
    });
    for (let slotIndex = index; slotIndex < 4; slotIndex++) {
        console.log(slotIndex);
        const slot = document.getElementById(`slot-${slotIndex+1}`);
        slot.innerHTML = `<img src="https://s3.us-east-2.amazonaws.com/myownfairytale.com/images/card-image.svg" alt="placeholder image">`;
        
    }
}

// Function to highlight selected images in the grid
function highlightSelectedImages() {
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
    'https://s3.us-east-2.amazonaws.com/myownfairytale.com/images/End.png',
    'https://s3.us-east-2.amazonaws.com/myownfairytale.com/images/Scene_9_Grand_Hall.png',
    'https://s3.us-east-2.amazonaws.com/myownfairytale.com/images/Scene_9_Final_Scene.png',
    'https://s3.us-east-2.amazonaws.com/myownfairytale.com/images/Scene_4_Knight_Princess.png',
    'https://s3.us-east-2.amazonaws.com/myownfairytale.com/images/Scene_1_Festival.png',
    'https://s3.us-east-2.amazonaws.com/myownfairytale.com/images/Scene_1_Kingdom.png',
    'https://s3.us-east-2.amazonaws.com/myownfairytale.com/images/Scene_1_Knight_with_kids.png',
    'https://s3.us-east-2.amazonaws.com/myownfairytale.com/images/Scene_1_Knight.png',
    'https://s3.us-east-2.amazonaws.com/myownfairytale.com/images/Scene_1_Princess.png',
    // ... add paths for all 10 images
];

const imagesMap = new Map();

imagesMap.set('1', 'https://s3.us-east-2.amazonaws.com/myownfairytale.com/images/Cover.png');
imagesMap.set('2', 'https://s3.us-east-2.amazonaws.com/myownfairytale.com/images/Cover.png');
imagesMap.set('3', 'https://s3.us-east-2.amazonaws.com/myownfairytale.com/images/Cover.png');
imagesMap.set('4', 'https://s3.us-east-2.amazonaws.com/myownfairytale.com/images/Cover.png');
imagesMap.set('5', 'https://s3.us-east-2.amazonaws.com/myownfairytale.com/images/Cover.png');
imagesMap.set('6', 'https://s3.us-east-2.amazonaws.com/myownfairytale.com/images/Cover.png');
imagesMap.set('7', 'https://s3.us-east-2.amazonaws.com/myownfairytale.com/images/Cover.png');
imagesMap.set('8', 'https://s3.us-east-2.amazonaws.com/myownfairytale.com/images/Cover.png');
imagesMap.set('9', 'https://s3.us-east-2.amazonaws.com/myownfairytale.com/images/Cover.png');
imagesMap.set('10', 'https://s3.us-east-2.amazonaws.com/myownfairytale.com/images/Cover.png');

function selectRandomImages() {
    let remainingSlots = 4 - selectedImagesMap.size;
    if (remainingSlots > 0) {
        let additionalImages = getRandomItems(remainingSlots);
        additionalImages.forEach((value, key) => {
            if (!selectedImagesMap.has(key)) {
                pushSelectedImages(value);
                pushSelectedImagesMap(key);
            }
        });
        highlightSelectedImages();
        displayImages(selectedImages);
    }
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

function getRandomItems(numItems) {
    // Filter out preselected items
    const availableItems = Array.from(imagesMap).filter(([key, value]) => !selectedImagesMap.has(key));

    // Handle case where numItems is greater than available items
    const itemsToSelect = Math.min(numItems, availableItems.length);
    
    const selectedItems = new Map();

    while (selectedItems.size < itemsToSelect) {
        const randomIndex = Math.floor(Math.random() * availableItems.length);
        const [key, value] = availableItems[randomIndex];

        // Add to selectedItems map if not already selected
        if (!selectedItems.has(key)) {
            selectedItems.set(key, value);
        }
    }

    return selectedItems;
}

function createImageCard(cardNumber) {
    // Create a card element and add the selected images to it
    let card = document.createElement('div');
    card.className = 'card';
    card.dataset.cardKey = cardNumber;
    card.addEventListener('click', createdImageCardClick)

    let keys = Array.from(selectedImagesMap.keys());
    selectRandomImages.forEach( value, key => {

    })
    keys.forEach(key => {
        src = 
        let img = document.createElement('img');
        img.src = src;
        img.className = 'card-img-top'; // Bootstrap class
        card.appendChild(img);
    });

    return card;
}

createdImageCardClick = (event) => {
    target = event.target;
    cardKey = target.dataset.cardKey;
    cardItems = createdItems.get(cardKey);
    selectedImagesMap
}

function resetSelectedImages() {
    selectedImagesMap.clear();
    // Select all elements with the class 'selected'
    let elements = document.querySelectorAll('.selected');

    // Iterate over the NodeList and remove the class 'selected' from each element
    elements.forEach(element => {
        element.classList.remove('selected');
    });

    newDisplayImages();
}

function toggleImageSelection(wrapper) {
    let key = wrapper.dataset.key;
    if(selectedImagesMap.has(key)){
        wrapper.classList.remove('selected');
        removeFromSelectedImagesMap(key);
    }else if(selectedImagesMap.size < 4){
        wrapper.classList.add('selected');
        pushSelectedImagesMap(key);
    }
    // Find the image inside the wrapper
    /*let childImg = wrapper.querySelector('img');
    if (!childImg) return; // Exit if no image found

    let imgSrc = childImg.getAttribute('src');
    if (selectedImages.includes(imgSrc)) {
        wrapper.classList.remove('selected');
        selectedImages = selectedImages.filter(src => src !== imgSrc);
    } else if (selectedImages.length < 4) {
        selectedImages.push(imgSrc);
        wrapper.classList.add('selected');
    }*/

    //displayImages(selectedImages);
    newDisplayImages();
}
