// Format angka menjadi Rupiah, contoh: 22000 -> "Rp 22.000"
export function formatRupiah(angka) {
  return 'Rp ' + String(angka).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}
