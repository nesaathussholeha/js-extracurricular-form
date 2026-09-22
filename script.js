document.addEventListener("DOMContentLoaded", function () {
  var formPendaftaran = document.getElementById("formPendaftaran");
  var areaKartu = document.getElementById("areaKartu");
  var nomorAnggota = 1001;

  formPendaftaran.addEventListener("reset", function () {
    sembunyikanAlert();
  });

  formPendaftaran.addEventListener("submit", function (event) {
    event.preventDefault();

    var dataPendaftar = ambilDataForm();

    if (!dataPendaftar) {
      return;
    }

    buatKartuAnggota(dataPendaftar, nomorAnggota);

    areaKartu.style.display = "block";

    nomorAnggota++;
    formPendaftaran.reset();
  });
});

function tampilkanAlert(pesan) {
  var alertBox = document.getElementById("alertBox");
  alertBox.textContent = "⚠️ " + pesan;
  alertBox.style.display = "block";

  alertBox.scrollIntoView({ behavior: "smooth", block: "center" });
}

function sembunyikanAlert() {
  var alertBox = document.getElementById("alertBox");
  alertBox.style.display = "none";
}

function ambilDataForm() {
  var nama = document.getElementById("nama").value.trim();
  var nis = document.getElementById("nis").value.trim();
  var kelas = document.getElementById("kelas").value.trim();
  var tglLahir = document.getElementById("tgl_lahir").value;
  var genderElement = document.querySelector('input[name="jk"]:checked');
  var ekskulChecked = document.querySelectorAll('input[name="ekskul"]:checked');

  if (!nama) {
        tampilkanAlert('Nama Lengkap wajib diisi!');
        document.getElementById('nama').focus();
        return null;
    }

    if (!nis) {
        tampilkanAlert('NIS wajib diisi!');
        document.getElementById('nis').focus();
        return null;
    }

    if (!kelas) {
        tampilkanAlert('Kelas wajib diisi!');
        document.getElementById('kelas').focus();
        return null;
    }

    if (!tglLahir) {
        tampilkanAlert('Tanggal Lahir wajib dipilih!');
        document.getElementById('tgl_lahir').focus();
        return null;
    }

    if (!genderElement) {
        tampilkanAlert('Jenis Kelamin wajib dipilih!');
        return null;
    }

    if (ekskulChecked.length === 0) {
        tampilkanAlert('Pilih minimal 1 jenis ekstrakurikuler!');
        return null;
    }

    sembunyikanAlert();

    var email = document.getElementById('email').value.trim() || '-';
    var telepon = document.getElementById('telepon').value.trim() || '-';
    var jenisKelamin = genderElement.value;

    var pilihanEkskul = [];
    for (var i = 0; i < ekskulChecked.length; i++) {
        pilihanEkskul.push(ekskulChecked[i].value);
    }

    return {
        nama: nama,
        nis: nis,
        kelas: kelas,
        tglLahir: tglLahir,
        jenisKelamin: jenisKelamin,
        ekskul: pilihanEkskul,
        email: email,
        telepon: telepon
    };
}


function buatKartuAnggota(data, noId) {
    var containerKartu = document.getElementById('containerKartu');
    var kartu = document.createElement('div');
    kartu.className = 'id-card';

    var ekskulHtml = '';
    for (var j = 0; j < data.ekskul.length; j++) {
        ekskulHtml += '<span class="badge-ekskul">' + data.ekskul[j] + '</span>';
    }

    kartu.innerHTML = 
        '<div class="id-card-header">' +
            '<h4>KARTU ANGGOTA EKSTRAKURIKULER</h4>' +
            '<span>ID NO: EKS-' + noId + '</span>' +
        '</div>' +
        '<div class="id-card-body">' +
            '<table cellpadding="4" cellspacing="0" border="0" width="100%">' +
                '<tr><td width="35%"><strong>Nama</strong></td><td width="5%">:</td><td>' + data.nama + '</td></tr>' +
                '<tr><td><strong>NIS / Kelas</strong></td><td>:</td><td>' + data.nis + ' / ' + data.kelas + '</td></tr>' +
                '<tr><td><strong>Tanggal Lahir</strong></td><td>:</td><td>' + data.tglLahir + '</td></tr>' +
                '<tr><td><strong>Jenis Kelamin</strong></td><td>:</td><td>' + data.jenisKelamin + '</td></tr>' +
                '<tr><td><strong>Email / Telp</strong></td><td>:</td><td>' + data.email + ' (' + data.telepon + ')</td></tr>' +
                '<tr><td valign="top"><strong>Ekskul</strong></td><td valign="top">:</td><td>' + ekskulHtml + '</td></tr>' +
            '</table>' +
        '</div>';

    containerKartu.insertBefore(kartu, containerKartu.firstChild);
}