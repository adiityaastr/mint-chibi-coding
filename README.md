# Mint Chibi Coding for Orca ADE

Mint Chibi reads and types at a laptop and shows speech bubbles when Orca reports that an agent needs input, fails, or finishes. The optional **Mint Chibi Responses** plugin displays Indonesian messages in the Orca status bar.

[Download the pet ZIP](https://github.com/adiityaastr/mint-chibi-coding/releases/download/v1.0.0/Mint-Chibi-Coding.zip) · [Watch the GIF](https://github.com/adiityaastr/mint-chibi-coding/releases/download/v1.0.0/Mint-Chibi-Coding-preview.gif)

## Pasang pet di Orca

1. Unduh ZIP dari tautan di atas dan ekstrak. Di dalam folder `Mint-Chibi-Coding.codex-pet` harus ada `pet.json` dan `spritesheet.webp`.
2. Buka Orca Desktop. Jika menu **Pet** belum tampak di status bar, aktifkan **Pet** di **Settings → Experimental** jika opsi itu masih tersedia di versi Anda.
3. Buka **Pet → Import .codex-pet bundle…** dan pilih folder hasil ekstrak yang langsung berisi kedua file tadi.
4. Pilih **Mint Chibi Coding** di menu Pet. Untuk memperbaruinya, impor ulang folder paket terbaru lalu pilih entri yang baru diimpor. Orca menyimpan salinan aset saat impor.

## Pakai dengan Codex, Claude Code, atau agen lain

1. Pasang dan autentikasi CLI agen yang ingin dipakai, lalu jalankan agen itu dari workspace di Orca. Untuk harness yang tersedia di Orca, gunakan launcher agen Orca agar integrasi statusnya digunakan.
2. Buka **Settings → Agents** dan pastikan **Agent status hooks** aktif. Jika agen sudah berjalan sebelum pemasangan atau perubahan konfigurasi, buka sesi agen baru di Orca untuk menguji integrasinya.
3. Kirim tugas sederhana, misalnya meminta agen merangkum satu file di workspace. Saat Orca mengenali agen sedang bekerja, Mint Chibi mengetik. Saat Orca menerima status menunggu, gagal, atau selesai, pet dapat menampilkan respons yang sesuai.
4. Untuk agen CLI kustom, periksa dulu apakah statusnya muncul di Orca. Pet dan plugin membaca status yang dilaporkan Orca dan tidak memerlukan API key tambahan. Jika harness tidak melaporkan status, pet tetap bisa ditampilkan, tetapi reaksi otomatis bergantung pada dukungan status harness tersebut.

[Dokumentasi agent status hooks](https://github.com/stablyai/orca/blob/main/docs/site/content/docs/agents/hooks-memory.mdx)

## Pasang plugin pesan status bar (opsional)

Plugin memerlukan Orca Desktop **1.4.248 atau lebih baru**. Plugin meminta akses `agent:read` untuk menerima perubahan status agen dan berjalan sebagai worker lokal. Gelembung di atas pet berasal dari sprite dan bisa dipakai tanpa plugin.

- **Dari katalog.** Buka **Settings → Plugins**, cari **Mint Chibi Responses**, tinjau aksesnya, lalu pilih **Install**. Jika belum terdaftar atau tersembunyi oleh pengaturan katalog, gunakan cara CLI berikut.
- **Dari GitHub.** Jalankan `orca plugin install adiityaastr/mint-chibi-coding@v1.0.1`. Jika Orca meminta persetujuan, baca akses yang ditampilkan dan ikuti perintah dengan fingerprint yang diberikan CLI. Setelah aktif, status bar menampilkan **Mint Chibi siap**.
- **Dari folder lokal.** Unduh atau clone repo ini, lalu jalankan `orca plugin install .` dari root repo yang berisi `orca-plugin.json`. Tinjau permintaan akses di CLI dengan cara yang sama.

Jika plugin terpasang tetapi pesan tidak berganti, periksa apakah Orca sendiri mendeteksi perubahan status agen, lalu cek log melalui `orca plugin logs adiityaastr.mint-chibi-responses`. Untuk instalasi dari folder, gunakan ID `local.mint-chibi-responses`. Status selesai tanpa hasil sukses terkonfirmasi menghasilkan pesan netral. Status gagal hanya muncul jika Orca menerima hasil gagal dari agen.

## License

The MIT license in [Mint-Chibi-Responses/LICENSE](Mint-Chibi-Responses/LICENSE) applies to the response plugin code. It does not grant rights to the pet artwork.
