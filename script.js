const users = {
  admin: "password123",
  user1: "secret"
};

function login() {
  const u = document.getElementById("username").value;
  const p = document.getElementById("password").value;

  if (users[u] && users[u] === p) {
    document.getElementById("login-section").classList.add("hidden");
    document.getElementById("main-section").classList.remove("hidden");
  } else {
    document.getElementById("login-error").textContent = "Invalid credentials.";
  }
}

// RSA Utility
function gcd(a, b) {
  return b === 0 ? a : gcd(b, a % b);
}

function modInverse(e, phi) {
  let [m0, x0, x1] = [phi, 0, 1];
  while (e > 1) {
    let q = Math.floor(e / phi);
    [e, phi] = [phi, e % phi];
    [x0, x1] = [x1 - q * x0, x0];
  }
  return x1 < 0 ? x1 + m0 : x1;
}

function encryptRSA() {
  const input = document.getElementById("rsa-input").value;
  const p = parseInt(document.getElementById("p").value);
  const q = parseInt(document.getElementById("q").value);
  const e = parseInt(document.getElementById("e").value);
  const n = p * q;

  const asciiValues = Array.from(input).map(c => c.charCodeAt(0));
  const cipher = asciiValues.map(m => Math.pow(m, e) % n);
  document.getElementById("rsa-output").value = cipher.join(" ");
}

function decryptRSA() {
  const input = document.getElementById("rsa-output").value.trim().split(" ").map(Number);
  const p = parseInt(document.getElementById("p").value);
  const q = parseInt(document.getElementById("q").value);
  const e = parseInt(document.getElementById("e").value);
  const n = p * q;
  const phi = (p - 1) * (q - 1);
  const d = modInverse(e, phi);

  const plain = input.map(c => String.fromCharCode(Math.pow(c, d) % n));
  document.getElementById("rsa-input").value = plain.join("");
}

document.getElementById("fileInput").addEventListener("change", function () {
  const file = this.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      document.getElementById("fileContent").textContent = e.target.result;
    };
    reader.readAsText(file);
  }
});
