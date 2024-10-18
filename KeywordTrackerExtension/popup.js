document.addEventListener("DOMContentLoaded", () => {
    // Load keywords from Chrome Storage
    chrome.storage.sync.get("keywords", (data) => {
        const keywords = data.keywords || [];
        keywords.forEach((keyword) => addKeywordToUI(keyword));
    });

    // Request the keyword counts from the content script
    chrome.runtime.onMessage.addListener((message) => {
        if (message.type === "keyword-counts") {
            displayKeywordData(message.counts);
        }
    });
});

// Function to display keyword occurrences in the popup
function displayKeywordData(keywordData) {
    const keywordOccurrencesList = document.getElementById("keywordOccurrencesList");
    keywordOccurrencesList.innerHTML = ""; // Clear previous entries

    for (const keyword in keywordData) {
        const count = keywordData[keyword];
        const li = document.createElement("li");
        li.textContent = `${keyword}: ${count}`; // Format the display
        keywordOccurrencesList.appendChild(li);
    }
}

// Add keyword button listener
document.getElementById("addKeywordButton").addEventListener("click", () => {
    const keywordInput = document.getElementById("keywordInput");
    const keyword = keywordInput.value.trim();
    if (keyword) {
        // Save to Chrome Storage
        chrome.storage.sync.get("keywords", (data) => {
            const keywords = data.keywords || [];
            keywords.push(keyword);
            chrome.storage.sync.set({ keywords: keywords }, () => {
                addKeywordToUI(keyword);
                keywordInput.value = "";
            });
        });
    }
});

// Function to add a keyword to the UI
function addKeywordToUI(keyword) {
    const li = document.createElement("li");
    li.textContent = keyword;
    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = '<i class="fas fa-trash-alt"></i>';
    deleteButton.className = "delete-btn";
    deleteButton.addEventListener("click", () => removeKeyword(keyword, li));
    li.appendChild(deleteButton);
    document.getElementById("keywordList").appendChild(li);
}

// Function to remove a keyword from the UI and storage
function removeKeyword(keyword, li) {
    chrome.storage.sync.get("keywords", (data) => {
        const keywords = data.keywords || [];
        const updatedKeywords = keywords.filter((k) => k !== keyword);
        chrome.storage.sync.set({ keywords: updatedKeywords }, () => {
            li.remove();
        });
    });
}
