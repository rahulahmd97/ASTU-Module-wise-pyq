async function loadAnswer(questionId, button) {

    const answerBox = button.nextElementSibling;

    // If answer is already visible, hide it
    if (answerBox.classList.contains("show")) {
        answerBox.classList.remove("show");
        button.textContent = "Load Answer";
        button.classList.remove("answer-open");
        return;
    }

    button.disabled = true;
    button.textContent = "Loading...";

    try {

        // Load JSON from GitHub through jsDelivr
        const response = await fetch(
            "https://cdn.jsdelivr.net/gh/rahulahmd97/ASTU-Module-wise-pyq@main/ssmodule1.json"
        );

        if (!response.ok) {
            throw new Error("HTTP " + response.status);
        }

        // Convert JSON response into JavaScript object
        const data = await response.json();

        // Get the answer for the clicked question
        const answer = data[questionId];

        if (!answer) {
            throw new Error("Answer not found for " + questionId);
        }

        // Display answer
        answerBox.innerHTML = answer;
        answerBox.classList.add("show");

        button.textContent = "Hide Answer";
        button.classList.add("answer-open");

    } catch (error) {

        console.error("Answer loading error:", error);

        answerBox.innerHTML =
            "<p>⚠️ Could not load answer.</p>";

        answerBox.classList.add("show");

        button.textContent = "Try Again";
    }

    button.disabled = false;
}
