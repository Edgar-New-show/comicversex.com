document.addEventListener("DOMContentLoaded", () => {
  const ageModal = document.getElementById("ageModal");
  const ageYes = document.getElementById("ageYes");
  const ageNo = document.getElementById("ageNo");

  if (!ageModal) return;

  const ONE_HOUR = 60 * 60 * 1000; // 1 hora em ms
  const now = Date.now();

  const ageData = JSON.parse(localStorage.getItem("ageCheck"));

  // Se NÃO existir confirmação ou já expirou
  if (!ageData || now - ageData.time > ONE_HOUR) {
    ageModal.style.display = "flex";
  } else {
    ageModal.style.display = "none";
  }

  // Clique em SIM
  ageYes.addEventListener("click", () => {
    localStorage.setItem(
      "ageCheck",
      JSON.stringify({
        confirmed: true,
        time: Date.now()
      })
    );
    ageModal.style.display = "none";
  });

  // Clique em NÃO
  ageNo.addEventListener("click", () => {
    alert("Acesso permitido apenas para maiores de 18 anos.");
    window.location.href = "https://www.google.com";
  });
});