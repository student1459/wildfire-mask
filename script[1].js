
const MEDICAL_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSfUQXMoDtDjKvPdM5cifi9qS41yzPezBl9GDletizJI7Rafig/viewform?usp=dialog";

document.getElementById("write").addEventListener("click", async () => {
    try {
        const ndef = new NDEFReader();
        await ndef.write(MEDICAL_FORM_URL);
        document.getElementById("output").textContent = 
            "Success! Medical info link written to NFC tag.";
    } catch (error) {
        document.getElementById("output").textContent = "Error: " + error;
    }
});

document.getElementById("read").addEventListener("click", async () => {
    try {
        const ndef = new NDEFReader();
        await ndef.scan();
        ndef.onreading = event => {
            const decoder = new TextDecoder();
            let message = "";
            for (const record of event.message.records) {
                message += decoder.decode(record.data);
            }
            document.getElementById("output").textContent = 
                "NFC Tag Content:\n" + message;
        };
    } catch (error) {
        document.getElementById("output").textContent = "Error: " + error;
    }
});
