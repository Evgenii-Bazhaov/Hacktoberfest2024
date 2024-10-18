console.log("Content script is running");

// Retrieve keywords from Chrome Storage
chrome.storage.sync.get("keywords", (data) => {
    const keywords = data.keywords || [];
    const pageContent = document.body.innerText.toLowerCase();
    let keywordOccurrences = {};

    keywords.forEach((keyword) => {
        const regex = new RegExp(`\\b${keyword.toLowerCase()}\\b`, "g");
        const matches = pageContent.match(regex);
        
        if (matches) {
            keywordOccurrences[keyword] = matches.length;
        }
    });

    // Log keywords and their occurrences to the console
    console.log("Keywords from storage: ", keywords);
    console.log("Keyword counts on the webpage: ", keywordOccurrences);

    // Send keyword occurrences to the popup
    chrome.runtime.sendMessage({ type: "keyword-counts", counts: keywordOccurrences });
});
