/**
 * Searches for matches in scanned text.
 * @param {string} searchTerm - The word or term we're searching for. 
 * @param {JSON} scannedTextObj - A JSON object representing the scanned text.
 * @returns {JSON} - Search results.
 * */
function findSearchTermInBooks(searchTerm, scannedTextObj) {
    if (typeof searchTerm !== 'string' || typeof scannedTextObj !== 'object' && !Array.isArray(scannedTextObj) || scannedTextObj === null) {
        throw new Error('Invalid inputs. Please provide a search term (string) and a list of book objects.');
    }

    var result = {
        "SearchTerm": searchTerm,
        "Results": []
    };

    const booksArray = Array.isArray(scannedTextObj) ? scannedTextObj : [scannedTextObj];

    booksArray.forEach(book => {
        if (book.Content && Array.isArray(book.Content)) {
            book.Content.forEach(scannedText => {
                if (scannedText.Text.includes(searchTerm)) {
                    result.Results.push({
                        ISBN: book.ISBN,
                        Page: scannedText.Page,
                        Line: scannedText.Line
                    });
                }
            });
        }
    });

    return result;
}

/** Example input object. */
const twentyLeaguesIn = [
    {
        "Title": "Twenty Thousand Leagues Under the Sea",
        "ISBN": "9780000528531",
        "Content": [
            {
                "Page": 31,
                "Line": 8,
                "Text": "now simply went on by her own momentum. The dark-"
            },
            {
                "Page": 31,
                "Line": 9,
                "Text": "ness was then profound; and however good the Canadian\'s"
            },
            {
                "Page": 31,
                "Line": 10,
                "Text": "eyes were, I asked myself how he had managed to see, and"
            }
        ]
    }
]

/** Example output object */
const twentyLeaguesOut = {
    "SearchTerm": "the",
    "Results": [
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 9
        }
    ]
}

/*
 _   _ _   _ ___ _____   _____ _____ ____ _____ ____  
| | | | \ | |_ _|_   _| |_   _| ____/ ___|_   _/ ___| 
| | | |  \| || |  | |     | | |  _| \___ \ | | \___ \ 
| |_| | |\  || |  | |     | | | |___ ___) || |  ___) |
 \___/|_| \_|___| |_|     |_| |_____|____/ |_| |____/ 
                                                      
 */

/* We have provided two unit tests. They're really just `if` statements that 
 * output to the console. We've provided two tests as examples, and 
 * they should pass with a correct implementation of `findSearchTermInBooks`. 
 * 
 * Please add your unit tests below.
 * */

/** We can check that, given a known input, we get a known output. */
const test1result = findSearchTermInBooks("the", twentyLeaguesIn);
if (JSON.stringify(twentyLeaguesOut) === JSON.stringify(test1result)) {
    console.log("PASS: Test 1");
} else {
    console.log("FAIL: Test 1");
    console.log("Expected:", twentyLeaguesOut);
    console.log("Received:", test1result);
}

/** We could choose to check that we get the right number of results. */
const test2result = findSearchTermInBooks("the", twentyLeaguesIn);
if (test2result.Results.length == 1) {
    console.log("PASS: Test 2");
} else {
    console.log("FAIL: Test 2");
    console.log("Expected:", twentyLeaguesOut.Results.length);
    console.log("Received:", test2result.Results.length);
}

// Positive Test: word exists
const samplePositive = "canadian"
const positiveTest = findSearchTermInBooks(samplePositive, twentyLeaguesIn);
const expectedPositive = {
    "SearchTerm": samplePositive,
    "Results": [
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 9
        }
    ]
};

if (JSON.stringify(expectedPositive).toLowerCase == JSON.stringify(positiveTest).toLowerCase) {
    console.log("PASS: Positive Test");
    console.log(positiveTest)
} else {
    console.log("FAIL: Positive Test");
    console.log("Expected:", expectedPositive);
    console.log("Received:", positiveTest);
}

// Negative Test: word does not exist
const negativeTest = findSearchTermInBooks("bad", twentyLeaguesIn);
const expectedNegative = {
    "SearchTerm": "had",
    "Results": [
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 10
        }
    ]
};
if (JSON.stringify(expectedNegative) !== JSON.stringify(negativeTest)) {
    console.log("PASS: Negative Test");
    console.log(negativeTest)
}
else {
    console.log("FAIL: Negative Test");
    console.log("Expected:", expectedNegative);
    console.log("Received:", negativeTest);
}

// Case-Sensitive Test
const caseSensitiveTest = findSearchTermInBooks("The", twentyLeaguesIn);
const expectedCase = {
    "SearchTerm": "The",
    "Results": [
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 8
        }
    ]
};

if (JSON.stringify(expectedCase) === JSON.stringify(caseSensitiveTest)) {
    console.log("PASS: Case-Sensitive Test");
    console.log(caseSensitiveTest);
}

else {
    console.log("FAIL: Case-Sensitive Test");
    console.log("Expected:", expectedCase);
    console.log("Received:", caseSensitiveTest);
}