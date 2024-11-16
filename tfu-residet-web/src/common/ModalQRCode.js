import React, { useState } from 'react';
import Modal from 'react-modal';
import { QRCodeSVG } from 'qrcode.react';
import { Box, Button, Typography, TextField } from '@mui/material';
import { processPayment } from '../services/roomService';
import Swal from 'sweetalert2';

Modal.setAppElement('#root');

const QRCodeModal = ({ isOpen, onRequestClose, transferData }) => {
    const { data, bankAccountName, bankAccountNumber, bankName, amount, transactionContent } = transferData;
    const [transactionInput, setTransactionInput] = useState(transactionContent);
    const [isProcessing, setIsProcessing] = useState(false);

    const handleTransactionContentChange = (event) => {
        setTransactionInput(event.target.value);
    };
    console.log(data);
    
    const handlePaymentClick = async () => {
        setIsProcessing(true);
        const invoiceIds = data?.map(item => String(item.invoiceId));
        try {
            const res = await processPayment({invoiceIds,bankAccountName,bankAccountNumber,bankName,amount,transactionContent })
            if(res.success) {
                setIsProcessing(false);
                Swal.fire('Thành công', 'Thanh toán thành công!', 'success');
                onRequestClose();
            }
        } catch (error) {
            setIsProcessing(false);
            Swal.fire('Thất bại', 'Thanh toán thất bại!', 'error');
        }
    };

    const qrData = `${transactionInput}|${bankAccountNumber}|${amount}`;

    return (
        <Modal isOpen={isOpen} onRequestClose={onRequestClose} style={customStyles}>
            <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h6" gutterBottom>
                    Mã QR Chuyển Tiền
                </Typography>
                <QRCodeSVG value={qrData} size={256} />
                <Box sx={{ marginTop: '20px', textAlign: 'left' }}>
                    <p>
                        <strong>Người nhận:</strong> {bankAccountName}<br />
                        <strong>Số tài khoản:</strong> {bankAccountNumber}<br />
                        <strong>Ngân hàng:</strong> {bankName}<br />
                        <strong>Số tiền:</strong> {amount.toLocaleString()} VND<br />
                    </p>
                    <TextField
                        label="Nội dung chuyển tiền"
                        value={transactionInput}
                        onChange={handleTransactionContentChange}
                        fullWidth
                        multiline
                        rows={4}
                        variant="outlined"
                        sx={{ marginTop: '10px' }}
                    />
                </Box>
                <Button
                    variant="outlined"
                    onClick={handlePaymentClick}
                    sx={{ marginTop: '20px', position: 'relative' }}
                    disabled={isProcessing}
                >
                    {isProcessing ? 'Đang xử lý...' : 'Thanh toán'}
                </Button>
            </Box>
        </Modal>
    );
};

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        transform: 'translate(-50%, -50%)',
        width: '300px',
        padding: '20px',
    },
};

export default QRCodeModal;
