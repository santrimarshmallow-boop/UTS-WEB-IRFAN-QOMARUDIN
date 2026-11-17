
const tombolTema = document.getElementById("tombolTema");
const html = document.documentElement;

function setTema(tema) {
  html.setAttribute("data-bs-theme", tema);
  tombolTema.textContent = tema === "dark" ? "Mode terang" : "Mode gelap";
  localStorage.setItem("tema", tema);
}

setTema(localStorage.getItem("tema") || "light");

tombolTema.addEventListener("click", function () {
  const sekarang = html.getAttribute("data-bs-theme");
  setTema(sekarang === "dark" ? "light" : "dark");
});

const form = document.getElementById("orderForm");

if (form) {
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const nama = document.getElementById("nama");
    const email = document.getElementById("email");
    const material = document.getElementById("material");
    const jumlah = document.getElementById("jumlah");
    const alamat = document.getElementById("alamat");
    let valid = true;

    function cek(input, idError, salah, pesan) {
      const kotakError = document.getElementById(idError);
      if (salah) {
        kotakError.textContent = pesan;
        input.classList.add("is-invalid");
        valid = false;
      } else {
        kotakError.textContent = "";
        input.classList.remove("is-invalid");
      }
    }

    const formatEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    cek(nama, "errNama", nama.value.trim() === "", "Nama tidak boleh kosong atau hanya spasi.");
    cek(email, "errEmail", !formatEmail.test(email.value.trim()), "Format email salah. Contoh: nama@email.com");
    cek(material, "errMaterial", material.value === "", "Silakan pilih material.");
    cek(jumlah, "errJumlah", Number(jumlah.value) < 1, "Jumlah minimal 1.");
    cek(alamat, "errAlamat", alamat.value.trim().length < 10, "Alamat minimal 10 karakter.");

    const hasil = document.getElementById("hasil");
    hasil.textContent = "";

    if (valid) {
      hasil.className = "alert alert-success mt-3";
      const judul = document.createElement("strong");
      judul.textContent = "Pesanan berhasil (simulasi). Ringkasan:";
      hasil.appendChild(judul);

      const daftar = [
        "Nama: " + nama.value.trim(),
        "Email: " + email.value.trim(),
        "Material: " + material.value,
        "Jumlah: " + jumlah.value,
        "Alamat: " + alamat.value.trim()
      ];
      const ul = document.createElement("ul");
      ul.className = "mb-0";
      daftar.forEach(function (teks) {
        const li = document.createElement("li");
        li.textContent = teks;                 // ringkasan pakai textContent
        ul.appendChild(li);
      });
      hasil.appendChild(ul);
    } else {
      hasil.className = "alert alert-danger mt-3";
      hasil.textContent = "Masih ada isian yang salah. Periksa pesan merah di atas.";
    }
  });
}
