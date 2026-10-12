import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { formatRupiah } from '../utils/format';
import { COLORS } from '../theme';

const UKURAN = [
  { label: 'Regular', tambahan: 0 },
  { label: 'Large', tambahan: 5000 },
];

export default function DetailScreen({ route, navigation }) {
  // Mengambil data yang dikirim dari Home melalui route.params
  const { nama, harga, kategori, emoji, deskripsi } = route.params;

  // useState: jumlah pesanan, ukuran, dan pesan feedback
  const [jumlah, setJumlah] = useState(1);
  const [ukuran, setUkuran] = useState(UKURAN[0]);
  const [feedback, setFeedback] = useState('');

  const hargaSatuan = harga + ukuran.tambahan;
  const subtotal = hargaSatuan * jumlah;

  const tambahJumlah = () => {
    if (jumlah >= 10) {
      setFeedback('⚠️ Maksimal 10 item per pesanan');
      return;
    }
    setJumlah(jumlah + 1);
    setFeedback(`➕ Jumlah ditambah menjadi ${jumlah + 1}`);
  };

  const kurangJumlah = () => {
    if (jumlah <= 1) {
      setFeedback('⚠️ Minimal pemesanan 1 item');
      return;
    }
    setJumlah(jumlah - 1);
    setFeedback(`➖ Jumlah dikurangi menjadi ${jumlah - 1}`);
  };

  const pilihUkuran = (u) => {
    setUkuran(u);
    setFeedback(`📏 Ukuran ${u.label} dipilih`);
  };

  const handleCheckout = () => {
    // Passing data Detail -> Konfirmasi: nama, harga, jumlah (+ ukuran)
    navigation.navigate('Checkout', {
      nama,
      harga: hargaSatuan,
      jumlah,
      ukuran: ukuran.label,
      emoji,
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.hero}>
        <Text style={styles.emoji}>{emoji}</Text>
        <Text style={styles.nama}>{nama}</Text>
        <Text style={styles.badge}>{kategori}</Text>
        <Text style={styles.harga}>{formatRupiah(harga)}</Text>
        <Text style={styles.deskripsi}>{deskripsi}</Text>
      </View>

      {kategori !== 'Makanan' && (
        <>
          <Text style={styles.label}>Ukuran</Text>
          <View style={styles.row}>
            {UKURAN.map((u) => {
              const aktif = u.label === ukuran.label;
              return (
                <TouchableOpacity
                  key={u.label}
                  activeOpacity={0.6}
                  onPress={() => pilihUkuran(u)}
                  style={[styles.opsi, aktif && styles.opsiAktif]}
                >
                  <Text style={[styles.opsiText, aktif && { color: '#fff' }]}>
                    {u.label} {u.tambahan > 0 ? `(+${formatRupiah(u.tambahan)})` : ''}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </>
      )}

      <Text style={styles.label}>Jumlah</Text>
      <View style={styles.counter}>
        <TouchableOpacity style={styles.counterBtn} onPress={kurangJumlah} activeOpacity={0.6}>
          <Text style={styles.counterBtnText}>−</Text>
        </TouchableOpacity>
        <Text style={styles.jumlah}>{jumlah}</Text>
        <TouchableOpacity style={styles.counterBtn} onPress={tambahJumlah} activeOpacity={0.6}>
          <Text style={styles.counterBtnText}>+</Text>
        </TouchableOpacity>
      </View>

      {/* Feedback setelah interaksi */}
      {feedback !== '' && <Text style={styles.feedback}>{feedback}</Text>}

      <View style={styles.subtotalBox}>
        <Text style={styles.subtotalLabel}>Subtotal</Text>
        <Text style={styles.subtotal}>{formatRupiah(subtotal)}</Text>
      </View>

      <TouchableOpacity style={styles.btnPrimary} onPress={handleCheckout} activeOpacity={0.7}>
        <Text style={styles.btnPrimaryText}>Pesan Sekarang</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.btnSecondary}
        onPress={() => navigation.goBack()}
        activeOpacity={0.7}
      >
        <Text style={styles.btnSecondaryText}>← Kembali ke Menu</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, paddingBottom: 40 },
  hero: {
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 16,
  },
  emoji: { fontSize: 72 },
  nama: { fontSize: 22, fontWeight: 'bold', color: COLORS.text, textAlign: 'center', marginTop: 8 },
  badge: {
    marginTop: 6,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 10,
    backgroundColor: COLORS.border,
    color: COLORS.primary,
    fontSize: 12,
    fontWeight: '600',
    overflow: 'hidden',
  },
  harga: { fontSize: 18, fontWeight: 'bold', color: COLORS.primary, marginTop: 8 },
  deskripsi: { color: COLORS.muted, textAlign: 'center', marginTop: 8 },
  label: { fontSize: 15, fontWeight: 'bold', color: COLORS.text, marginBottom: 8, marginTop: 4 },
  row: { flexDirection: 'row', gap: 10, marginBottom: 12 },
  opsi: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.primary,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  opsiAktif: { backgroundColor: COLORS.primary },
  opsiText: { color: COLORS.primary, fontWeight: '600' },
  counter: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  counterBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  counterBtnText: { color: '#fff', fontSize: 22, fontWeight: 'bold' },
  jumlah: { fontSize: 22, fontWeight: 'bold', marginHorizontal: 24, color: COLORS.text },
  feedback: {
    backgroundColor: COLORS.successBg,
    color: COLORS.success,
    padding: 10,
    borderRadius: 10,
    marginBottom: 12,
    overflow: 'hidden',
  },
  subtotalBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 12,
  },
  subtotalLabel: { fontSize: 16, color: COLORS.muted },
  subtotal: { fontSize: 20, fontWeight: 'bold', color: COLORS.primary },
  btnPrimary: {
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 10,
  },
  btnPrimaryText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  btnSecondary: {
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  btnSecondaryText: { color: COLORS.primary, fontSize: 16, fontWeight: '600' },
});
