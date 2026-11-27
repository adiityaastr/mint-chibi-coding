<div align="center">

# Mint Chibi Coding

**Pet pixel art untuk Orca ADE.** Mint Chibi menemani agen saat ngoding dan bereaksi ketika Anda perlu turun tangan.

<img src="./Mint-Chibi-Coding-preview.gif" alt="Animasi Mint Chibi membaca layar, mengetik, dan menampilkan gelembung saat selesai, error, atau menunggu masukan" width="320">

**[Unduh paket pet](https://github.com/adiityaastr/mint-chibi-coding/releases/download/v1.0.0/Mint-Chibi-Coding.zip)** · [Buka GIF ukuran penuh](./Mint-Chibi-Coding-preview.gif) · [Lihat plugin di Orca](https://api.onorca.dev/plugins/adiityaastr/mint-chibi-coding)

</div>

## Ekspresi Mint Chibi

| Status | Tampilan pet |
| --- | --- |
| Santai | Membaca layar, berkedip, lalu sesekali mengetuk satu tombol. |
| Sedang bekerja | Mengetik dengan kedua tangan di dekat keyboard. |
| Menunggu masukan | Tampak bingung dan menampilkan **“Bisa bantu aku?”** |
| Error | Bereaksi kaget dan menampilkan **“Ups, ada error!”** |
| Selesai | Tersenyum lega dan menampilkan **“Kode siap dicek!”** |

## Pasang pet di Orca Desktop

1. [Unduh dan ekstrak ZIP](https://github.com/adiityaastr/mint-chibi-coding/releases/download/v1.0.0/Mint-Chibi-Coding.zip). Folder `Mint-Chibi-Coding.codex-pet` harus berisi `pet.json` dan `spritesheet.webp`.
2. Di status bar Orca, buka **Pet → Import .codex-pet bundle…** dan pilih folder yang langsung berisi kedua file tadi. Jika menu Pet belum terlihat, cari opsi **Pet** di **Settings → Experimental**. Lokasinya dapat berbeda menurut versi Orca.
3. Pilih **Mint Chibi Coding** dari menu Pet.

**Memperbarui pet.** Ekstrak dan impor paket terbaru, lalu pilih entri yang baru diimpor. Orca menyimpan salinan file saat impor.

## Hubungkan dengan agen Anda

Mint Chibi mengikuti status yang dilaporkan agen ke Orca. Ini berlaku untuk Codex, Claude Code, dan agen lain selama integrasinya melaporkan status. Paket pet dan plugin tidak memerlukan API key tambahan.

1. Pasang dan autentikasi CLI agen pilihan Anda. Jalankan agen dari workspace Orca. Jika tersedia, gunakan launcher agen bawaan Orca.
2. Pastikan **Settings → Agents → Agent status hooks** aktif. Buka sesi agen baru jika Anda baru memasang agen atau mengubah pengaturannya.
3. Coba tugas sederhana, misalnya meminta agen merangkum sebuah file. Pet akan mengetik saat Orca mendeteksi agen bekerja. Gelembung muncul ketika Orca menerima status yang sesuai.
4. Untuk CLI kustom, cek dulu apakah perubahan status terlihat di Orca. Mint Chibi tetap bisa ditampilkan meski CLI itu belum melaporkan status.

[Dokumentasi agent status hooks Orca](https://github.com/stablyai/orca/blob/main/docs/site/content/docs/agents/hooks-memory.mdx)

## Tambahkan pesan di status bar

**Mint Chibi Responses** adalah plugin opsional untuk Orca Desktop **1.4.248+**. Plugin berjalan sebagai worker lokal dan meminta akses `agent:read` untuk menerima perubahan status agen. Gelembung pada pet sudah termasuk di paket sprite.

<details>
<summary><strong>Pasang dari katalog Orca</strong></summary>

Buka **Settings → Plugins**, cari **Mint Chibi Responses**, lalu tinjau akses dan pilih **Install**. Jika plugin belum muncul, cek halaman katalog atau gunakan pemasangan dari GitHub.

[Halaman plugin di katalog Orca](https://api.onorca.dev/plugins/adiityaastr/mint-chibi-coding)

</details>

<details>
<summary><strong>Pasang dari GitHub atau folder lokal</strong></summary>

Untuk memasang versi yang ditag:

~~~sh
orca plugin install adiityaastr/mint-chibi-coding@v1.0.1
~~~

Untuk memasang dari folder, unduh atau clone repo ini, lalu jalankan perintah berikut dari folder yang berisi `orca-plugin.json`:

~~~sh
orca plugin install .
~~~

Jika Orca meminta persetujuan, tinjau aksesnya dan ikuti perintah dengan fingerprint yang ditampilkan CLI. Saat aktif, status bar menampilkan **Mint Chibi siap**.

</details>

## Pemecahan masalah

| Masalah | Yang perlu dicek |
| --- | --- |
| Pet tidak bisa diimpor | Ekstrak ZIP terlebih dahulu. Pilih folder yang langsung berisi `pet.json` dan `spritesheet.webp`. |
| Pet tampil, tetapi ekspresi tidak berubah | Cek apakah Orca menampilkan status agen dan pastikan **Agent status hooks** aktif. |
| Pesan status bar tidak muncul | Cek apakah plugin sudah aktif. Lihat log dengan `orca plugin logs adiityaastr.mint-chibi-responses`, atau gunakan ID `local.mint-chibi-responses` jika dipasang dari folder. |
| Error atau sukses tidak terdeteksi | Agen perlu melaporkan hasilnya ke Orca. Penyelesaian tanpa hasil terkonfirmasi menggunakan pesan netral. |

## Lisensi

[Lisensi MIT](./Mint-Chibi-Responses/LICENSE) berlaku untuk kode plugin respons. Hak atas artwork pet berada di luar lisensi kode tersebut.
