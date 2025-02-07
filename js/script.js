// toggle class active untuk hamburger menu
const navbarNav = document.querySelector(".navbar-nav");
// ketika hamburger menu di klik
document.querySelector("#hamburger-menu").onclick = () => {
  navbarNav.classList.toggle("active");
};

// toggle class active untuk search form
const searchform = document.querySelector(".search-form");
const searchbox = document.querySelector("#search-box");

document.querySelector("#search-button").onclick = (e) => {
  e.preventDefault(); // Mencegah aksi default
  searchform.classList.toggle("active");
  searchbox.focus();
};

// modal box
const itemdetailmodal = document.querySelector("#item-detail-modal");

document.addEventListener("alpine:init", () => {
  setTimeout(() => {
    const itemDetailButton = document.querySelectorAll(".item-detail-button");
    console.log(itemDetailButton); // Harusnya tidak null sekarang
    itemDetailButton.forEach((button) => {
      button.onclick = (e) => {
        console.log(e);
        e.preventDefault();
        itemdetailmodal.style.display = "flex";
      };
    });

    // toggle class active untuk shopping cart
    const shoppingcart = document.querySelector(".shopping-cart");

    document.querySelector("#shopping-cart-button").onclick = (e) => {
      shoppingcart.classList.toggle("active");
      e.preventDefault();
    };

    // klik diluar element
    const hm = document.querySelector("#hamburger-menu");
    const sb = document.querySelector("#search-button");
    const sc = document.querySelector("#shopping-cart-button");

    console.log({ sc, shoppingcart });

    document.addEventListener("click", function (e) {
      if (!hm.contains(e.target) && !navbarNav.contains(e.target)) {
        navbarNav.classList.remove("active");
      }

      if (!sb.contains(e.target) && !searchform.contains(e.target)) {
        searchform.classList.remove("active");
      }

      if (!sc.contains(e.target) && !shoppingcart.contains(e.target)) {
        shoppingcart.classList.remove("active");
      }
    });

    // Tambahkan event listener untuk form checkout
    const checkoutForm = document.getElementById("checkoutForm");
    checkoutForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Ambil data form
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const phone = document.getElementById("phone").value;

      // Ambil data cart dari Alpine store
      const cartItems = Alpine.store("cart").items;

      // Format pesan
      let message = `Halo Kak! 👋\n\n`;
      message += `Saya ingin memesan kopi dari LepasKopi nih! ☕️\n\n`;
      message += `*Berikut Detail Pesanan Saya:*\n`;
      message += `---------------------------\n`;
      message += `*Nama:* ${name}\n`;
      message += `*Email:* ${email}\n`;
      message += `*No. Telepon:* ${phone}\n\n`;
      message += `*📝 Pesanan Saya:*\n`;

      cartItems.forEach((item) => {
        message += `▪️ ${item.name} (${item.quantity}x) - ${rupiah(
          item.total
        )}\n`;
      });

      message += `\n*💰 Total Pembayaran: ${rupiah(
        Alpine.store("cart").total
      )}*\n\n`;
      message += `Mohon diproses ya kak! Terima kasih 🙏`;

      // Encode pesan untuk URL WhatsApp
      const encodedMessage = encodeURIComponent(message);

      // Buat URL WhatsApp
      const waURL = `https://wa.me/6287830600219?text=${encodedMessage}`;

      // Buka WhatsApp di tab baru
      window.open(waURL, "_blank");

      // Reset cart
      Alpine.store("cart").items = [];
      Alpine.store("cart").total = 0;
      Alpine.store("cart").quantity = 0;

      // Tutup modal cart
      document.querySelector(".shopping-cart").classList.remove("active");

      // Reset form
      checkoutForm.reset();
    });
  }, 500);
});

// klik tombol close modal
document.querySelector(".modal .close-icon").onclick = (e) => {
  itemdetailmodal.style.display = "none";
  e.preventDefault();
};

// klik diluar modal
window.onclick = (e) => {
  if (e.target === itemdetailmodal) {
    itemdetailmodal.style.display = "none";
  }
};
