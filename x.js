const data_J = Object.keys(groupedData).length > 0 && groupedData.J1.map((item, index) => ({
    J1: { MaViTriKho: item.MaViTriKho, PhanTram: item.PhanTram },
    J2: groupedData.J2 ? { MaViTriKho: groupedData.J2[index]?.MaViTriKho, PhanTram: groupedData.J2[index]?.PhanTram, ItemCode: groupedData.J2[index]?.ItemCode } : null,
    J3: groupedData.J3 ? { MaViTriKho: groupedData.J3[index]?.MaViTriKho, PhanTram: groupedData.J3[index]?.PhanTram, ItemCode: groupedData.J2[index]?.ItemCode } : null,
    J4: groupedData.J4 ? { MaViTriKho: groupedData.J4[index]?.MaViTriKho, PhanTram: groupedData.J4[index]?.PhanTram, ItemCode: groupedData.J2[index]?.ItemCode } : null,
    J5: groupedData.J5 ? { MaViTriKho: groupedData.J5[index]?.MaViTriKho, PhanTram: groupedData.J5[index]?.PhanTram, ItemCode: groupedData.J2[index]?.ItemCode } : null,
    J6: groupedData.J6 ? { MaViTriKho: groupedData.J6[index]?.MaViTriKho, PhanTram: groupedData.J6[index]?.PhanTram, ItemCode: groupedData.J2[index]?.ItemCode } : null,
}));