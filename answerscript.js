async function loadAnswer(questionId, button) {

    const answerBox = button.nextElementSibling;

    // If answer is already visible, hide it
    if (answerBox.classList.contains("show")) {
        answerBox.classList.remove("show");
        button.textContent = "Load Answer";
        return;
    }

    // Otherwise, load the answer
    button.disabled = true;
    button.textContent = "Loading...";

    try {

        const response = await fetch("ssmodule1.json");

        if (!response.ok) {
            throw new Error("HTTP " + response.status);
        }

        const data = await response.json();

        // Get only the answer for this question
        const answer = data[questionId];

        if (!answer) {
            throw new Error("Answer not found for " + questionId);
        }

        answerBox.innerHTML = answer;
        answerBox.classList.add("show");

        button.textContent = "Hide Answer";

    } catch (error) {

        console.error("Answer loading error:", error);

        answerBox.innerHTML =
            "<p>⚠️ Could not load answer.</p>";

        answerBox.classList.add("show");

        button.textContent = "Try Again";
    }

    button.disabled = false;
}
