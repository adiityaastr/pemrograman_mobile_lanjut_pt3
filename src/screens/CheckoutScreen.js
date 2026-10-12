import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { formatRupiah } from '../utils/format';
import { COLORS } from '../theme';

const METODE_BAYAR = ['Tunai', 'QRIS', 'Transfer Bank'];

export default function CheckoutScreen({ route, navigation }) {
  // Mengambil data yang dikirim dari Detail melalui route.params
  const { nama, harga, jumlah, ukuran, emoji } = route.params;

  // useState: metode pembayaran, status konfirmasi, dan pesan feedback
  const [metode, setMetode] = useState(null);
  const [sudahDipesan, setSudahDipesan] = useState(false);
  const [feedback, setFeedback] = useState('');

  const total = harga * jumlah;

  const handleKonfirmasi = () => {
    if (!metode) {
      setFeedback('⚠️ Pilih metode pembayaran terlebih dahulu');
      return;
    }
    setSudahDipesan(true);
    setFeedback('');
  };

  // Feedback setelah pesanan dikonfirmasi
  if (sudahDipesan) {
    return (
      <View style={styles.successContainer}>
        <Text style={styles.successIcon}>✅</Text>
        <Text style={styles.successTitle}>Pesanan Berhasil!</Text>
        <Text style={styles.successText}>
          {jumlah}x {nama} ({ukuran}) sedang disiapkan barista.
        </Text>
        <Text style={styles.successText}>
          Total {formatRupiah(total)} dibayar via {metode}.
        </Text>

        <TouchableOpacity
          style={[styles.btnPrimary, { alignSelf: 'stretch', marginTop: 24 }]}
          onPress={() => navigation.navigate('Home')}
          activeOpacity={0.7}
        >
          <Text style={styles.btnPrimaryText}>Pesan Menu Lain</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.section}>Ringkasan Pesanan</Text>
      <View style={styles.card}>
        <Text style={styles.emoji}>{emoji}</Text>
        <View style={{ flex: 1 }}>
          <Text style={styles.nama}>{nama}</Text>
          <Text style={styles.detail}>Ukuran: {ukuran}</Text>
          <Text style={styles.detail}>
            {jumlah} x {formatRupiah(harga)}
          </Text>
        </View>
      </View>

      <Text style={styles.section}>Metode Pembayaran</Text>
      {METODE_BAYAR.map((m) => {
        const aktif = m === metode;
        return (
          <TouchableOpacity
            key={m}
            activeOpacity={0.6}
            onPress={() => {
              setMetode(m);
              setFeedback(`💳 Metode ${m} dipilih`);
            }}
            style={[styles.opsi, aktif && styles.opsiAktif]}
          >
            <Text style={[styles.radio, aktif && { color: COLORS.primary }]}>{aktif ? '◉' : '○'}</Text>
            <Text style={styles.opsiText}>{m}</Text>
          </TouchableOpacity>
        );
      })}

      {feedback !== '' && (
        <Text style={[styles.feedback, feedback.startsWith('⚠️') && styles.feedbackWarn]}>
          {feedback}
        </Text>
      )}

      <View style={styles.totalBox}>
        <Text style={styles.totalLabel}>Total Bayar</Text>
        <Text style={styles.total}>{formatRupiah(total)}</Text>
      </View>

      <TouchableOpacity style={styles.btnPrimary} onPress={handleKonfirmasi} activeOpacity={0.7}>
        <Text style={styles.btnPrimaryText}>Konfirmasi Pesanan</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.btnSecondary}
        onPress={() => navigation.goBack()}
        activeOpacity={0.7}
      >
        <Text style={styles.btnSecondaryText}>← Ubah Pesanan</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, paddingBottom: 40 },
  section: { fontSize: 16, fontWeight: 'bold', color: COLORS.text, marginBottom: 10, marginTop: 4 },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 16,
  },
  emoji: { fontSize: 44, marginRight: 14 },
  nama: { fontSize: 17, fontWeight: 'bold', color: COLORS.text },
  detail: { color: COLORS.muted, marginTop: 2 },
  opsi: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 8,
  },
  opsiAktif: { borderColor: COLORS.primary, borderWidth: 2 },
  radio: { fontSize: 18, color: COLORS.muted, marginRight: 10 },
  opsiText: { fontSize: 15, color: COLORS.text },
  feedback: {
    backgroundColor: COLORS.successBg,
    color: COLORS.success,
    padding: 10,
    borderRadius: 10,
    marginTop: 4,
    overflow: 'hidden',
  },
  feedbackWarn: { backgroundColor: '#FFF3E0', color: '#E65100' },
  totalBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    borderTopWidth: 1,
    borderColor: COLORS.border,
    marginTop: 12,
    marginBottom: 12,
  },
  totalLabel: { fontSize: 16, color: COLORS.muted },
  total: { fontSize: 22, fontWeight: 'bold', color: COLORS.primary },
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
  successContainer: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  successIcon: { fontSize: 72 },
  successTitle: { fontSize: 24, fontWeight: 'bold', color: COLORS.success, marginVertical: 12 },
  successText: { fontSize: 15, color: COLORS.text, textAlign: 'center', marginBottom: 4 },
});
