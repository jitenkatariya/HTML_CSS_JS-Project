let users = [
  {
    name: "Aarav Patel",
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
    bio: "Dream big ✨ | Hustle harder 💻 | Living my best life",
  },
  {
    name: "Priya Sharma",
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    bio: "Coffee lover ☕ | Smiling through life 😊",
  },
  {
    name: "Rohan Mehta",
    img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d",
    bio: "Fitness freak 💪 | Music addict 🎵",
  },
  {
    name: "Ananya Verma",
    img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2",
    bio: "Silent soul 🌸 | Wild heart ❤️",
  },
  {
    name: "Kabir Singh",
    img: "https://images.unsplash.com/photo-1504593811423-6dd665756598",
    bio: "Explorer 🌍 | Adventure seeker 🚀",
  },
  {
    name: "Meera Joshi",
    img: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df",
    bio: "Books 📚 | Tea 🍵 | Peace ✨",
  },
  {
    name: "Sneha Kapoor",
    img: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1",
    bio: "Fashionista 👗 | Travel lover ✈️",
  },
  {
    name: "Dev Malhotra",
    img: "https://images.unsplash.com/photo-1504257432389-52343af06ae3",
    bio: "Chasing goals 🎯 | Never settle 🔥",
  },
  {
    name: "Ishita Desai",
    img: "https://images.unsplash.com/photo-1517841905240-472988babdf9",
    bio: "Cute but savage 😎 | Living freely 🌈",
  },
];

function showUsers(arr) {
  arr.forEach(function (user) {
    let card = document.createElement("div");
    card.classList.add("card");

    // Image
    let img = document.createElement("img");
    img.src = user.img;
    img.alt = "";
    img.classList.add("bg-img");

    // Blurred Layer
    let blurredLayer = document.createElement("div");
    blurredLayer.style.backgroundImage = `url(${user.img})`;
    blurredLayer.classList.add("blurred-layer");

    // Content
    let content = document.createElement("div");
    content.classList.add("content");

    // Heading
    let h3 = document.createElement("h3");
    h3.textContent = user.name;

    // Paragraph
    let p = document.createElement("p");
    p.textContent = user.bio; 

    // Append elements
    content.appendChild(h3);
    content.appendChild(p);

    card.appendChild(img);
    card.appendChild(blurredLayer);
    card.appendChild(content);

    // Add card to body or container

    document.querySelector(".cards").appendChild(card);
  });
}

showUsers(users);

let inp = document.querySelector("input");
inp.addEventListener("input", function () {
  let newUsers = users.filter((user) => {
    return (
      user.name.startsWith(inp.value) ||
      user.name.toLowerCase().startsWith(inp.value)
    );
  });

  document.querySelector(".cards").innerHTML = "";
  showUsers(newUsers);

   let noResults = document.getElementById("no-results");
    if (newUsers.length === 0) {
      noResults.style.display = "block";
    } else {
      noResults.style.display = "none";
    }
});
