USE MASTER
GO
DROP DATABASE IF EXISTS LECTURE4_CLASSPRACTICE
GO
CREATE DATABASE LECTURE4_CLASSPRACTICE
GO
USE LECTURE4_CLASSPRACTICE
GO
CREATE TABLE CustomerOrder(	ID int PRIMARY KEY IDENTITY(1, 1),	CustomerID int,	FullName nvarchar(20) NOT NULL,	DeliveryCity nvarchar(20),	DateDelivery date,	OrderDate date,	TotalAmount money,	OrderStatus nvarchar(20));INSERT INTO CustomerOrder(CustomerID, FullName, DeliveryCity, OrderDate, DateDelivery, TotalAmount, OrderStatus)VALUES(1, N'Ngô Kiến Huy', 'TP. HCM', '3/15/2022', '3/15/2022', 50000, 'COMPLETED'),(1, N'Ngô Kiến Huy', 'TP. HCM', '3/12/2022', '3/25/2022', 70000, 'ON-GOING'),(1, N'Ngô Kiến Huy', 'TP. HCM', '3/16/2022', '3/27/2022', 80000, 'CANCLED'),(2, N'Phan Mạnh Quỳnh', 'TP. HA NOI', '7/13/2022', '3/15/2023', 90000, 'CANCLED'),(2, N'Phan Mạnh Quỳnh', 'TP. HA NOI', '8/12/2022', '3/25/2023', 40000, 'ON-GOING'),(2, N'Phan Mạnh Quỳnh', 'TP. HA NOI', '9/18/2022', '3/27/2023', 30000, 'COMPLETED');SELECT * FROM CustomerOrder;-- PRACTICE SQL BUILT-IN FUNCTION - GROUP BY - HAVING
-- 1. IN RA THÔNG TIN ĐƠN HÀNG CÓ GIÁ TRỊ LỚN NHẤT MÀ ĐÃ HOÀN THÀNH TRONG NĂM 2022
-- 2. IN RA THÔNG TIN ĐƠN HÀNG CÓ GIÁ TRỊ LỚN NHẤT MÀ ĐÃ BỊ HỦY TRONG NĂM 2023
-- 3. TÍNH SỐ ĐƠN HÀNG ĐƯỢC ĐẶT VÀO TRONG KHOẢNG THÁNG 7 và tháng 8 2023
-- 4. TÍNH TỔNG SỐ ĐƠN HÀNG ĐÃ HOÀN THÀNH TRONG NĂM 2022 VÀ 2023
-- 5. TÍNH GIÁ TRỊ TRUNG BÌNH ĐƠN HÀNG TRONG NĂM 2023
-- 6. IN RA THÔNG TIN ĐƠN HÀNG CÓ GIÁ TRỊ NHỎ NHẤT MÀ ĐÃ HOÀN THÀNH TRONG NĂM 2022
-- 7. IN RA THÔNG TIN ĐƠN HÀNG CÓ GIÁ TRỊ NHỎ MÀ ĐÃ BỊ HỦY TRONG NĂM 2023
-- 8. TÍNH SỐ ĐƠN HÀNG ĐƯỢC ĐẶT THEO TỪNG THÁNG
-- 9. TÍNH SỐ ĐƠN HÀNG ĐƯỢC ĐẶT THEO TỪNG NĂM
-- 10. TÍNH GIÁ TRỊ TRUNG BÌNH ĐƠN HÀNG THEO TỪNG THÁNG TRONG NĂM 2023
-- 11. TỔNG SỐ ĐƠN HÀNG ĐƯỢC ĐẶT VÀO THÁNG 3 NĂM 2022
-- 12. TÍNH TỔNG SỐ ĐƠN HÀNG THEO TỪNG KHÁCH HÀNG
-- 13. LẤY THÔNG TIN KHÁCH HÀNG ĐẶT TỪ 2 ĐƠN HÀNG TRỞ LÊN
-- 14. TÍNH SỐ ĐƠN HÀNG THEO THÁNG VÀ PHẢI CÓ ÍT NHẤT 2 ĐƠN HÀNG TRỞ LÊN
-- 15. LẤY TÊN KHÁCH HÀNG CÓ GIÁ TRỊ ĐƠN HÀNG TRUNG BÌNH LỚN HƠN 6000 TRÊN 1 ĐƠN HÀNG VÀ CÓ ÍT NHẤT 2 ĐƠN HÀNG TRỞ LÊN
-- 16. TÍNH SỐ NGÀY TRUNG BÌNH ĐỂ GIAO 1 ĐƠN HÀNG CHO THEO KHÁCH HÀNG CHO NHỮNG KHÁCH ĐẶT TỪ 2 ĐƠN TRỞ LÊN
-- 17. TÍNH TỔNG ĐƠN HÀNG THEO THÀNH PHỐ VÀ CHỈ HIỂN THỊ THÀNH PHỐ CÓ TRÊN 2 ĐƠN HÀNG
-- 18. TÍNH TỔNG ĐƠN HÀNG ĐÃ HOÀN THÀNH THEO THÀNH PHỐ VÀ CHỈ HIỂN THỊ THÀNH PHỐ CÓ TỔNG ĐƠN HÀNG TRÊN 2 ĐƠN
-- 19. TÍNH TỔNG ĐƠN HÀNG ĐÃ BỊ HỦY THEO THÀNH PHỐ VÀ CHỈ HIỂN THỊ THÀNH PHỐ CÓ TỔNG ĐƠN HÀNG TRÊN 2 ĐƠN
-- lưu nội dung câu truy vấn vô file text(.txt) rồi nộp lại nha