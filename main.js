let selectedCards = [];

// SECTION 1 → 2
function goToCards() {
  document.getElementById("section1").classList.remove("active");
  document.getElementById("section2").classList.add("active");

  const container = document.getElementById("cardsContainer");
  container.innerHTML = "";
  selectedCards = [];

  // Cartas normales
  for (let i = 1; i <= 6; i++) {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `<img src="${i}.png">`;
    card.onclick = () => toggleSelect(card, `card${i}`);
    container.appendChild(card);
  }

  // Cartas especiales
  const specialCards = [
    { img: "draft.png", amount: 100000, type: "Draft" },
    { img: "fcpoint.png", amount: 100000, type: "FC Points" },
    { img: "gem.png", amount: 100000, type: "Gems" }
  ];

  specialCards.forEach(item => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${item.img}">
      <div style="margin-top:6px; color:"#007aff;">${item.amount}</div>
    `;
    card.onclick = () =>
      toggleSelect(card, `${item.amount}|${item.type}|${item.img}`);
    container.appendChild(card);
  });
}

// Toggle selección
function toggleSelect(card, value) {
  if (card.classList.contains("selected")) {
    card.classList.remove("selected");
    selectedCards = selectedCards.filter(v => v !== value);
  } else {
    card.classList.add("selected");
    selectedCards.push(value);
  }
}

// SECTION 2 → 3
function goToSearching() {
  if (selectedCards.length === 0) {
    alert("Select at least one card");
    return;
  }

  document.getElementById("section2").classList.remove("active");
  document.getElementById("section3").classList.add("active");

  document.getElementById("searchingPlayer").innerText =
    "ID: " + document.getElementById("playerID").value;

  let dots = 0;
  const loading = document.getElementById("loadingText");
  const interval = setInterval(() => {
    dots = (dots + 1) % 4;
    loading.innerText = "Loading" + ".".repeat(dots);
  }, 400);

  setTimeout(() => {
    clearInterval(interval);
    showFinal();
  }, 1500);
}

// SECTION 3 → 4
function showFinal() {
  document.getElementById("section3").classList.remove("active");
  document.getElementById("section4").classList.add("active");

  const final = document.getElementById("finalCards");
  final.innerHTML = "";

  selectedCards.forEach(item => {
    const card = document.createElement("div");
    card.className = "card selected";

    if (item.includes("|")) {
      const [amount, type, img] = item.split("|");
      card.innerHTML = `
        <img src="${img}">
        <div style="margin-top:6px">${amount} ${type}</div>
      `;
    } else {
      const num = item.replace("card", "");
      card.innerHTML = `<img src="${num}.png">`;
    }

    final.appendChild(card);
  });

  confetti({ spread: 360, particleCount: 150 });
}

// Reiniciar
function restart() {
  document.getElementById("section4").classList.remove("active");
  document.getElementById("section1").classList.add("active");
  document.getElementById("playerID").value = "";
}
