 function getUser() {
      const container = document.querySelector(".users");

      container.innerHTML = "Loading...";

      setTimeout(() => {
        fetch("https://randomuser.me/api/?results=3")
          .then((response) => response.json())
          .then((data) => {
            container.innerHTML = ""; // clear loading

            data.results.forEach((user) => {
              const card = document.createElement("div");
              card.className =
                "bg-white shadow-lg rounded-2xl p-6 w-80 text-center";

              const img = document.createElement("img");
              img.src = user.picture.large;
              img.className =
                "w-24 h-24 mx-auto rounded-full border-4 border-blue-500";

              const name = document.createElement("h2");
              name.className = "text-xl font-semibold mt-4";
              name.textContent = `${user.name.first} ${user.name.last}`;

              const role = document.createElement("p");
              role.className = "text-gray-500 text-sm";
              role.textContent = "MERN Stack Developer";

              const bio = document.createElement("p");
              bio.className = "text-gray-600 mt-3 text-sm";
              bio.textContent =
                "Passionate developer learning React, Node.js & building real-world projects.";

              const btnContainer = document.createElement("div");
              btnContainer.className = "mt-5 flex justify-center gap-3";

              const followBtn = document.createElement("button");
              followBtn.className =
                "bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600";
              followBtn.textContent = "Follow";

              const messageBtn = document.createElement("button");
              messageBtn.className =
                "border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-100";
              messageBtn.textContent = "Message";

              btnContainer.append(followBtn, messageBtn);
              card.append(img, name, role, bio, btnContainer);

              container.appendChild(card);
            });
          });
      }, 100); // small delay so "Loading..." renders
    }
    getUser();

    const refreshBtn = document.querySelector("#refreshBtn");

    refreshBtn.addEventListener("click", function () {
      getUser();
    });
    