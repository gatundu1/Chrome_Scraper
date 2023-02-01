let scrapeData = document.getElementById
('scrapeData');
let list = document.getElementById("data_list");

// Handler to receive emails from content script
chrome.runtime.onMessage.addListener((request, 
    sender, sendResponse) =>{

        // Get emails
        let emails = request.emails;
        alert(emails);

        // Display collected data
        if(emails == null || emails.length == 0){
            // When no data is available
            let li = document.createElement('li');
            li.innerText = "No Emails Found!";
            list.appendChild('li');
        }else{
            // Display list
            emails.forEach((email) => {
                let li = document.createElement('li');
                li.innerText = email;
                list.appendChild('li'); 
            })
        }
    })

scrapeData.addEventListener("click", async () =>{
    // Get current active tab
    let [tab] = await chrome.tabs.query({active:true,
    currentWindow: true});

    // Execute script to parse data on page
    chrome.scripting.executeScript({
        target: {tabId: tab.id},
        func: scrapeDataFromPage,
    });
})

// Function to scrape data
function scrapeDataFromPage() {
    // RegEx to parse email from HTML code
    const emailRegEx = /[\w\.=-]+@[\w\.-]+\.[\w]{2,3}/
    gim;

    // Parse email from HTML of page
    let emails = document.body.innerHTML.match
    (emailRegEx);

    // Send emails to the popup
    chrome.runtime.sendMessage({emails});
}