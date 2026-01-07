document.addEventListener("DOMContentLoaded", () => {
  // Data from existing HTML
  const wishesData = [
    {
      name: "Anh Bơ Đẹp Zai",
      message:
        "Chúc bé Mint hay ăn chóng lớn, luôn vui vẻ và ngoan ngoãn nhé! Yêu con nhiều ❤️",
      image: "./assets/images/bo.png",
      type: "Friend",
      typeColor: "text-blue-600",
      bgColor: "bg-blue-100", // For avatar/glow
      textColor: "text-blue-600", // For avatar text
      accentColor: "bg-pastel-blue", // For avatar bg
      borderColor: "border-blue-100",
      gradient: "from-white to-blue-50",
    },

    {
      name: "Mẹ yêu",
      image: "",
      message:
        "Yêu con gái của mẹ nhất trên đời. Cảm ơn con đã đến bên bố mẹ. 💖",
      type: "Mom",
      typeColor: "text-red-400",
      bgColor: "bg-pink-100",
      textColor: "text-red-400",
      accentColor: "bg-secondary-pink",
      borderColor: "border-pink-100",
      gradient: "from-white to-pink-50",
    },
  ];

  const container = document.getElementById("wishes-container");
  if (!container) return;

  wishesData.forEach((wish) => {
    const card = document.createElement("div");
    card.className = `bg-gradient-to-br ${wish.gradient} dark:from-gray-800 dark:to-gray-800 p-6 rounded-[2rem] shadow-sm border ${wish.borderColor} dark:border-white/5 hover:shadow-md transition-shadow relative overflow-hidden group`;

    // Avatar logic: Prefer image when available; otherwise fallback to first letter
    let avatarHtml = "";
    const hasImage = Boolean(wish.image && wish.image.trim() !== "");
    if (hasImage) {
      avatarHtml = `<img src="${wish.image}" alt="${wish.name}" loading="lazy" class="w-12 h-12 rounded-2xl object-cover shadow-inner shrink-0 rotate-3 bg-white/50">`;
    } else {
      const firstLetter = wish.name.charAt(0).toUpperCase();
      // Random rotation for fun
      const rotations = ["rotate-3", "-rotate-2", "rotate-1", "-rotate-3"];
      const rotateClass =
        rotations[Math.floor(Math.random() * rotations.length)];

      avatarHtml = `
                <div class="w-12 h-12 rounded-2xl ${wish.accentColor} ${wish.textColor} flex items-center justify-center font-bold text-xl shadow-inner shrink-0 ${rotateClass}">
                    ${firstLetter}
                </div>
            `;
    }

    card.innerHTML = `
            <div class="absolute -right-4 -top-4 w-20 h-20 ${wish.bgColor} rounded-full blur-2xl opacity-50 group-hover:opacity-100 transition-opacity"></div>
            <div class="flex items-start gap-4 relative z-10">
                ${avatarHtml}
                <div class="flex-1">
                    <div class="flex justify-between items-start">
                        <h4 class="font-bold text-text-heading dark:text-white font-cute text-lg">${wish.name}</h4>
                        <span class="text-xs bg-white/50 px-2 py-1 rounded-lg ${wish.typeColor} font-bold">${wish.type}</span>
                    </div>
                    <p class="text-text-main dark:text-gray-300 text-base mt-2 font-cute leading-relaxed">
                        "${wish.message}"
                    </p>
                </div>
            </div>
        `;

    container.appendChild(card);
  });
});
