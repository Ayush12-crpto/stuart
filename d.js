const form = document.querySelector("form");
const result = document.querySelector(".result");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    getWordInfo(form.elements[0].value);
});

const getWordInfo = async (word) => {
    try {
        document.querySelector(".result").style.visibility = "visible";
        result.innerHTML = "Fetching data...";

        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        const data = await response.json();

        if (!data || data.title === "No Definitions Found") {
            result.innerHTML = `<p>Sorry, word could not be found.</p>`;
            return;
        }

        result.innerHTML = `
            <h2>Word: ${data[0].word}</h2>
            <p><strong>Part of Speech: </strong>
                <i style="color:#808080">
                    ${data[0].meanings[0]?.partOfSpeech || "Not Found"}
                </i>
            </p>
            <p><strong>Meaning: </strong>
                ${data[0].meanings[0]?.definitions[0]?.definition || "Not Found"}
            </p>
            <p><strong>Example: </strong>
                ${data[0].meanings[0]?.definitions[0]?.example || "Not Found"}
            </p>
            <p><strong>Antonyms:</strong></p>
        `;

        // Antonyms
        const antonyms = data[0].meanings[0]?.antonyms || [];
        if (antonyms.length === 0) {
            result.innerHTML += `<p>Not found</p>`;
        } else {
            antonyms.forEach(antonym => {
                result.innerHTML += `<li>${antonym}</li>`;
            });
        }

        result.innerHTML += `<p><strong>Synonyms:</strong></p>`;

        // Synonyms
        const synonyms = data[0].meanings[0]?.synonyms || [];
        if (synonyms.length === 0) {
            result.innerHTML += `<p>Not found</p>`;
        } else {
            synonyms.forEach(synonym => {
                result.innerHTML += `<li>${synonym}</li>`;
            });
        }

        result.innerHTML += `<br><br>`;
        result.innerHTML += `<a href="${data[0].sourceUrls[0]}" target="_blank">Read More</a>`;

        console.log(data);
    } catch (error) {
        console.error(error);
        result.innerHTML = `<p>Sorry, word could not be found.</p>`;
    }
};
