import { useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';

import { KATEGORI, MENU } from '../data/menu';
import { formatRupiah } from '../utils/format';
import { COLORS } from '../theme';

export default function HomeScreen({ navigation }) {
  // useState: kategori yang sedang dipilih untuk filter menu
  const [kategoriAktif, setKategoriAktif] = useState('Semua');

  const menuTampil =
    kategoriAktif === 'Semua' ? MENU : MENU.filter((item) => item.kategori === kategoriAktif);

  // Event handler: dipanggil saat kartu menu ditekan (onPress)
  const handlePilihMenu = (item) => {
    // Passing data Home -> Detail: nama, harga, kategori (+ data pendukung)
    navigation.navigate('Detail', {
      nama: item.nama,
      harga: item.harga,
      kategori: item.kategori,
      emoji: item.emoji,
      deskripsi: item.deskripsi,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sapaan}>Mau ngopi apa hari ini?</Text>

      {/* Filter kategori: Pressable + onPress mengubah state */}
      <View style={styles.chipRow}>
        {KATEGORI.map((kat) => {
          const aktif = kat === kategoriAktif;
          return (
            <Pressable
              key={kat}
              onPress={() => setKategoriAktif(kat)}
              style={({ pressed }) => [
                styles.chip,
                aktif && styles.chipAktif,
                pressed && { opacity: 0.6 },
              ]}
            >
              <Text style={[styles.chipText, aktif && styles.chipTextAktif]}>{kat}</Text>
            </Pressable>
          );
        })}
      </View>

      {/* Feedback: jumlah menu yang tampil sesuai filter */}
      <Text style={styles.info}>
        Menampilkan {menuTampil.length} menu {kategoriAktif !== 'Semua' ? `kategori ${kategoriAktif}` : ''}
      </Text>

      <FlatList
        data={menuTampil}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 24 }}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => handlePilihMenu(item)}
            style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
          >
            <Text style={styles.emoji}>{item.emoji}</Text>
            <View style={{ flex: 1 }}>
              <Text style={styles.nama}>{item.nama}</Text>
              <Text style={styles.kategori}>{item.kategori}</Text>
              <Text style={styles.harga}>{formatRupiah(item.harga)}</Text>
            </View>
            <Text style={styles.arrow}>›</Text>
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  sapaan: { fontSize: 20, fontWeight: 'bold', color: COLORS.text, marginBottom: 12 },
  chipRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 8 },
  chip: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.primary,
    backgroundColor: '#fff',
  },
  chipAktif: { backgroundColor: COLORS.primary },
  chipText: { color: COLORS.primary, fontWeight: '600' },
  chipTextAktif: { color: '#fff' },
  info: { color: COLORS.muted, marginBottom: 12 },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  cardPressed: { backgroundColor: COLORS.border, transform: [{ scale: 0.98 }] },
  emoji: { fontSize: 36, marginRight: 14 },
  nama: { fontSize: 16, fontWeight: 'bold', color: COLORS.text },
  kategori: { fontSize: 12, color: COLORS.muted, marginVertical: 2 },
  harga: { fontSize: 15, fontWeight: '600', color: COLORS.primary },
  arrow: { fontSize: 28, color: COLORS.primaryLight },
});
