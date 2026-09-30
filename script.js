// ==============================
// MENGAMBIL ELEMENT HTML
// ==============================

// Mengambil elemen berdasarkan ID
const inputTugas = document.getElementById("input-tugas");
const tombolTambah = document.getElementById("btn-tambah");
const daftarTugas = document.getElementById("daftar-tugas");

const totalTugas = document.getElementById("total-tugas");
const tugasSelesai = document.getElementById("tugas-selesai");
const tugasBelum = document.getElementById("tugas-belum");

const pesanPeringatan = document.getElementById("pesan-peringatan");
const pesanKosong = document.getElementById("pesan-kosong");
const tanggal = document.getElementById("tanggal");


// ==============================
// MENAMPILKAN TANGGAL
// ==============================

const hariIni = new Date();

tanggal.innerText = hariIni.toLocaleDateString("id-ID", {
    weekday: "long",
    month: "long",
    day: "numeric"
});


// ==============================
// VARIABEL JUMLAH TUGAS
// ==============================

let jumlahTotal = 0;
let jumlahSelesai = 0;


// ==============================
// FUNCTION MEMPERBARUI STATISTIK
// ==============================

function perbaruiStatistik() {

    totalTugas.innerText = jumlahTotal;

    tugasSelesai.innerText = jumlahSelesai;

    tugasBelum.innerText = jumlahTotal - jumlahSelesai;

}


// ==============================
// FUNCTION MENAMBAHKAN TUGAS
// ==============================

function tambahTugas() {

    // Mengambil isi input
    const teksTugas = inputTugas.value.trim();


    // ==========================
    // VALIDASI INPUT
    // ==========================

    if (teksTugas === "") {

        pesanPeringatan.innerText = "Lah mana oi? kamu belum ngetik tugas apapun!";

        return;
    }


    // Menghapus pesan peringatan
    pesanPeringatan.innerText = "";


    // ==========================
    // MEMBUAT ELEMENT TUGAS
    // ==========================

    const itemTugas = document.createElement("li");

    itemTugas.classList.add("task-item");


    // Membuat checkbox
    const checkbox = document.createElement("input");

    checkbox.type = "checkbox";


    // Membuat teks tugas
    const teks = document.createElement("span");

    teks.innerText = teksTugas;

    teks.classList.add("task-text");


    // Membuat tombol hapus
    const tombolHapus = document.createElement("button");

    tombolHapus.innerText = "Hapus";

    tombolHapus.classList.add("delete-button");


    // ==========================
    // CHECKBOX SELESAI
    // ==========================

    checkbox.addEventListener("change", function () {

        if (checkbox.checked) {

            teks.classList.add("completed");

            jumlahSelesai++;

        } else {

            teks.classList.remove("completed");

            jumlahSelesai--;
        }


        // Memperbarui statistik
        perbaruiStatistik();

    });


    // ==========================
    // TOMBOL HAPUS
    // ==========================

    tombolHapus.addEventListener("click", function () {

        // Jika tugas sedang selesai
        if (checkbox.checked) {

            jumlahSelesai--;

        }


        // Menghapus tugas
        itemTugas.remove();

        jumlahTotal--;


        // Memperbarui statistik
        perbaruiStatistik();


        // Jika tidak ada tugas
        if (jumlahTotal === 0) {

            pesanKosong.style.display = "block";

        }

    });


    // ==========================
    // MEMASUKKAN ELEMENT KE LIST
    // ==========================

    itemTugas.appendChild(checkbox);

    itemTugas.appendChild(teks);

    itemTugas.appendChild(tombolHapus);

    daftarTugas.appendChild(itemTugas);


    // ==========================
    // UPDATE JUMLAH
    // ==========================

    jumlahTotal++;

    perbaruiStatistik();


    // Menyembunyikan pesan "belum ada tugas"
    pesanKosong.style.display = "none";


    // Mengosongkan input
    inputTugas.value = "";

    // Mengembalikan kursor ke input
    inputTugas.focus();


    // Menampilkan hasil di Console
    console.log("Tugas ditambahkan:", teksTugas);
}


// ==============================
// TOMBOL TAMBAH
// ==============================

tombolTambah.addEventListener("click", tambahTugas);


// ==============================
// MENAMBAHKAN TUGAS DENGAN ENTER
// ==============================

inputTugas.addEventListener("keyup", function (event) {

    if (event.key === "Enter") {

        tambahTugas();

    }

});


// ==============================
// STATISTIK AWAL
// ==============================

perbaruiStatistik();