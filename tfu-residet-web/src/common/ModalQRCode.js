import React, { useState } from 'react';
import Modal from 'react-modal';
import { QRCodeSVG } from 'qrcode.react';
import { Box, Button, Typography } from '@mui/material';

Modal.setAppElement('#root');

const QRCodeModal = ({ isOpen, onRequestClose }) => {
    const transferContent = `
        Vui lòng chuyển đúng nội dung ABCXYZ để chúng tôi xác nhận thanh toán,
        Tên tài khoản: Nguyễn Văn A,
        Số tài khoản: 14124565754534,
        Ngân hàng: TP Bank,
    `;

    const qrData = `ABCXYZ|14124565754534|300000000`;

    return (
        <Modal isOpen={isOpen} onRequestClose={onRequestClose} style={customStyles}>
            <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h6" gutterBottom>
                    Mã QR Chuyển Tiền
                </Typography>
                <QRCodeSVG value={qrData} size={256} /> {/* Sử dụng QRCodeSVG */}
                <Box sx={{ marginTop: '20px', textAlign: 'left' }}>
                    <Typography variant="body1">{transferContent}</Typography>
                </Box>
                <Button variant="outlined" onClick={onRequestClose} sx={{ marginTop: '20px' }}>
                    Đóng
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
