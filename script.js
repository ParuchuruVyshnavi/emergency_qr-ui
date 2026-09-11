document.addEventListener("DOMContentLoaded", function () {

    const toggleBtn = document.getElementById("toggleThemeBtn");

    if (toggleBtn) {
        toggleBtn.addEventListener("click", function () {
            document.body.classList.toggle("dark");
        });
    }

    const generateBtn = document.getElementById("generateBtn");
    const phoneInput = document.getElementById("phone");
    const bloodInput = document.getElementById("blood");
    const medicalSelect = document.getElementById("medical");
    const otherMedicalInput = document.getElementById("otherMedical");

    // Show / hide Other Medical Condition
    if (medicalSelect && otherMedicalInput) {

        medicalSelect.addEventListener("change", function () {

            let selected = Array.from(medicalSelect.selectedOptions)
                .map(option => option.value);

            if (selected.includes("Other")) {
                otherMedicalInput.style.display = "block";
            } else {
                otherMedicalInput.style.display = "none";
                otherMedicalInput.value = "";
            }
        });
    }

    // Primary phone validation
    if (phoneInput) {

        phoneInput.addEventListener("input", function () {
            this.value = this.value
                .replace(/\D/g, "")
                .substring(0, 10);
        });
    }

    // Generate QR
    if (generateBtn) {

        generateBtn.addEventListener("click", function () {

            let name = document.getElementById("name").value.trim();
            let blood = bloodInput.value.trim().toUpperCase();
            let phone = phoneInput.value.trim();

            let phone2 = document.getElementById("phone2").value.trim();

            let address =
                document.getElementById("address").value.trim();

            // Medical conditions
            let medical = Array.from(
                medicalSelect.selectedOptions
            ).map(option => option.value);

            let otherMedical =
                otherMedicalInput.value.trim();

            // Validation
            if (!name) {
                alert("Enter Name");
                return;
            }

            if (!/^(A|B|AB|O)[+-]$/.test(blood)) {
                alert("Invalid Blood Group (Ex: A+, O-)");
                return;
            }

            if (!/^[6-9]\d{9}$/.test(phone)) {
                alert("Invalid Primary Phone Number");
                return;
            }

            // Optional second phone
            if (phone2 && !/^[6-9]\d{9}$/.test(phone2)) {
                alert("Invalid Second Phone Number");
                return;
            }

            // Medical condition text
            let medicalText = medical.length > 0
                ? medical.join(", ")
                : "None";

            if (medical.includes("Other") && otherMedical) {
                medicalText =
                    medical
                        .filter(item => item !== "Other")
                        .concat(otherMedical)
                        .join(", ");
            }

            // GitHub Pages view page
            let baseURL =
                "https://vyshu-emergency-qr.netlify.app/view.html";

            // Create URL containing emergency information
            let qrURL = baseURL +
                `?name=${encodeURIComponent(name)}` +
                `&blood=${encodeURIComponent(blood)}` +
                `&phone=${encodeURIComponent(phone)}` +
                `&phone2=${encodeURIComponent(phone2)}` +
                `&address=${encodeURIComponent(address)}` +
                `&medical=${encodeURIComponent(medicalText)}`;

            // Clear previous QR
            let qrcodeDiv =
                document.getElementById("qrcode");

            qrcodeDiv.innerHTML = "";

            // Generate QR
            new QRCode(qrcodeDiv, {
                text: qrURL,
                width: 220,
                height: 220
            });

            // Download QR
            let downloadBtn =
                document.getElementById("downloadQR");

            if (downloadBtn) {

                downloadBtn.style.display = "block";

                downloadBtn.onclick = function () {

                    let img =
                        document.querySelector("#qrcode img");

                    if (img) {

                        let link =
                            document.createElement("a");

                        link.href = img.src;
                        link.download = "Emergency_QR.png";
                        link.click();
                    }
                };
            }

            // Print QR
            let printBtn =
                document.getElementById("printQR");

            if (printBtn) {

                printBtn.style.display = "block";

                printBtn.onclick = function () {

                    let img =
                        document.querySelector("#qrcode img");

                    if (img) {

                        let w =
                            window.open(
                                "",
                                "",
                                "width=400,height=500"
                            );

                        w.document.write(`
                            <h3>🚨 Emergency QR</h3>

                            <p>
                                <strong>Name:</strong>
                                ${name}
                            </p>

                            <p>
                                <strong>Blood:</strong>
                                ${blood}
                            </p>

                            <p>
                                <strong>Primary Contact:</strong>
                                ${phone}
                            </p>

                            <p>
                                <strong>Second Contact:</strong>
                                ${phone2 || "Not provided"}
                            </p>

                            <img src="${img.src}" width="200">

                            <p style="color:red;font-size:12px;">
                                ⚠ Please print and carry this QR
                                card for emergency use.
                            </p>
                        `);

                        w.document.close();
                        w.print();
                    }
                };
            }

        });
    }
});
