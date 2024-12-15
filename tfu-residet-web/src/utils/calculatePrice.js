//Hàm tính toán các giá cả của phòng\
export const formatCurrency = (value) => {
    if (!value) return '0';

    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    }).format(value);
};
