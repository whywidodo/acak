"use strict";

const formAcak = document.getElementById("form-acak");
const jmlKelompok = document.getElementById("jumlah-kelompok");
const daftarNama = document.getElementById("daftar-nama");
const tombolAcak = document.getElementById("acak-kelompok");
const kelompok = document.getElementById("kelompok");
const peringatan = document.querySelector(".alert");

function shuffleArray(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function chunkArray(array, size) {
  if (array.length <= size) {
    return [array];
  }
  return [array.slice(0, size), ...chunkArray(array.slice(size), size)];
}

function Randomize() {
  let arrDaftarNama = daftarNama.value
    .replace(/^\s+|\s+$/gm, "")
    .split("\n");

  let anggotaKelompok = Math.ceil(
    parseFloat(arrDaftarNama.length / jmlKelompok.value)
  );

  console.log(anggotaKelompok);

  let shuffledArr = shuffleArray(arrDaftarNama);

  let slicedArr = chunkArray(shuffledArr, anggotaKelompok);

  return slicedArr;
}

function renderTeam(arr) {
  formAcak.reset();
  kelompok.innerHTML = "";

  return arr.forEach((item, index) => {
    const div = document.createElement("div");
    const h5 = document.createElement("h5");
    const p = document.createElement("p");

    div.className = "col bg-light border mx-auto p-3 mb-2";
    p.className = "text-break";

    kelompok.appendChild(div);
    div.appendChild(h5);
    div.appendChild(p);

    h5.innerText = `Kelompok ${index + 1}`;
    p.innerText = item;
  });
}

tombolAcak.addEventListener("click", (e) => {
  e.preventDefault();
  if (jmlKelompok.value == "" || daftarNama.value == "") {
    formAcak.reset();
    kelompok.innerHTML = "";

    peringatan.classList.remove("d-none");
    jmlKelompok.classList.add("is-invalid");
    daftarNama.classList.add("is-invalid");
  } else {
    peringatan.classList.add("d-none");
    jmlKelompok.classList.remove("is-invalid");
    daftarNama.classList.remove("is-invalid");

    renderTeam(Randomize());
  }
});
