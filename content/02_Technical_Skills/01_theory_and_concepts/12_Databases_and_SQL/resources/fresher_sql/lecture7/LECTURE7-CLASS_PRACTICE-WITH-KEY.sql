
-- Câu 1 và 2 : Load dabatase
--Câu 3: Liệt kê những dòng xe có số chỗ ngồi trên 5 chỗ

select * from DONGXE
WHERE SoChoNgoi > 5

--Câu 4: Liệt kê thông tin của các nhà cung cấp đã từng đăng ký cung cấp những dòng xe
--thuộc hãng xe “Toyota” với mức phí có đơn giá là 15.000 VNĐ/km hoặc những dòng xe
--thuộc hãng xe “KIA” với mức phí có đơn giá là 20.000 VNĐ/km

select distinct ncc.*
from NHACUNGCAP ncc
join DANGKYCUNGCAP dkcc on ncc.MaNhaCC = dkcc.MaNhaCC
join DONGXE dx on dx.DongXe = dkcc.DongXe
join MUCPHI mp on mp.MaMP = dkcc.MaMP
where (dx.HangXe = 'Toyota' and mp.DonGia = '15000')
or (dx.HangXe = 'KIA' and mp.DonGia = '20000')

--Câu 5: Liệt kê thông tin toàn bộ nhà cung cấp được sắp xếp tăng dần theo tên nhà cung
--cấp và giảm dần theo mã số thuế
select *
from NHACUNGCAP
order by TenNhaCC, MaSoThue desc

--Câu 6: Đếm số lần đăng ký cung cấp phương tiện tương ứng cho từng nhà cung cấp với
--yêu cầu chỉ đếm cho những nhà cung cấp thực hiện đăng ký cung cấp có ngày bắt đầu
--cung cấp là “20/11/2015”
select ncc.MaNhaCC, ncc.TenNhaCC, COUNT(ncc.MaNhACC) SOLANDANGKI
from NHACUNGCAP ncc
left join DANGKYCUNGCAP dkcc on ncc.MaNhaCC = dkcc.MaNhaCC
where NgayBatDauCungCap = CONVERT(DATE,'20/11/2015',103)
group by ncc.MaNhaCC, ncc.TenNhaCC


--Câu 7: Liệt kê tên của toàn bộ các hãng xe có trong cơ sở dữ liệu với yêu cầu mỗi hãng xe
--chỉ được liệt kê một lần
SELECT DISTINCT HangXe FROM DONGXE

--Câu 8: Liệt kê MaDKCC, MaNhaCC, TenNhaCC, DiaChi, MaSoThue, TenLoaiDV, DonGia,
--HangXe, NgayBatDauCC, NgayKetThucCC của tất cả các lần đăng ký cung cấp phương
--tiện với yêu cầu những nhà cung cấp nào chưa từng thực hiện đăng ký cung cấp phương
--tiện thì cũng liệt kê thông tin những nhà cung cấp đó ra

SELECT	NCC.MaNhaCC,
		NCC.TenNhaCC,
		DKCC.MaDKCC
		DiaChi,
		MaSoThue,
		TenLoaiDV,
		DonGia,
		HangXe,
		NgayBatDauCungCap,
		NgayKetThucCungCap
FROM NHACUNGCAP NCC
LEFT JOIN DANGKYCUNGCAP DKCC
	ON NCC.MaNhaCC = DKCC.MaNhaCC
LEFT JOIN DONGXE DX
	ON DX.DongXe = DKCC.DongXe
LEFT JOIN MUCPHI MP
	ON DKCC.MaMP = MP.MaMP
LEFT JOIN LOAIDICHVU DV
	ON DV.MaLoaiDV = DKCC.MaLoaiDV

--Câu 9: Liệt kê thông tin của các nhà cung cấp đã từng đăng ký cung cấp phương tiện
--thuộc dòng xe “Hiace” hoặc từng đăng ký cung cấp phương tiện thuộc dòng xe “Cerato”
select distinct NCC.*
from NHACUNGCAP NCC JOIN DANGKYCUNGCAP DK
	ON NCC.MaNhaCC = DK.MaNhaCC
WHERE DongXe = 'Hiace' or Dongxe = 'Cerato'

--Câu 10: Liệt kê thông tin của các nhà cung cấp chưa từng thực hiện đăng ký cung cấp
--phương tiện lần nào cả.
select TenNhaCC from NHACUNGCAP ncc
left join DANGKYCUNGCAP dkcc on ncc.MaNhaCC = dkcc.MaNhaCC
where dkcc.MaDKCC is null