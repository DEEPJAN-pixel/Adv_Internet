const form = document.getElementById("pcForm");
const results = document.getElementById("results");

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const data = new URLSearchParams(formData);

    try {
        const response = await fetch("/analyze", {
            method: "POST",
            body: data
        });

        if (!response.ok) {
            throw new Error("Analysis failed");
        }

        const html = await response.text();
        results.innerHTML = html;
        const downloadParams = new URLSearchParams(formData);

        const downloadLink = document.createElement("a");
        downloadLink.href = "/download?" + downloadParams.toString();
        downloadLink.textContent = "Download PC Report";
        downloadLink.setAttribute("download", "FrameForecast-Report.txt");

        results.appendChild(document.createElement("p"));
        results.appendChild(downloadLink);

    } catch (error) {
        results.textContent = "Something went wrong. Please try again.";
    }
});