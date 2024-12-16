import React, {useEffect, useRef, useState} from 'react';
import Modal from 'react-modal';
import {QRCodeSVG} from 'qrcode.react';
import {Box, Button, Typography, TextField} from '@mui/material';
import {processPayment} from '../services/roomService';
import Swal from 'sweetalert2';
import {useNavigate} from 'react-router-dom';
import {getQRCode, verifyPayment} from "../services/PaymentService";

import {Toast} from 'primereact/toast';

Modal.setAppElement('#root');

const QRCodeModal = ({isOpen, onRequestClose, transferData}) => {
    const navigate = useNavigate();
    const {data, bankAccountName, bankAccountNumber, bankName, amount, transactionContent} = transferData;
    const [transactionInput, setTransactionInput] = useState(transactionContent);
    const [isProcessing, setIsProcessing] = useState(false);
    const [qrData, setQrData] = useState('');
    const [id, setId] = useState('');
    const toast = useRef(null);
    const handleTransactionContentChange = (event) => {
        setTransactionInput(event.target.value);
    };
    useEffect(() => {
        console.log(transferData)
        if (isOpen) {
        fetchBill();
        }
    }, [transferData]);
    const fetchBill = async () => {
        try {
            const body = {
                type: 'TRSCINA',
                transactionMapId: null,
                invoiceId: transferData.data
            }
            const res = await getQRCode(body);
            setQrData(res.data.imgQR);
            setId(res.data.id);
        } catch (e) {

        }
    }
    const handlePaymentClick = async () => {
        setIsProcessing(true);
        // const invoiceIds = data?.map(item => String(item.invoiceId));
        // try {
        //     const res = await processPayment({
        //         invoiceIds,
        //         bankAccountName,
        //         bankAccountNumber,
        //         bankName,
        //         amount,
        //         transactionContent
        //     })
        //     if (res.success) {
        //         setIsProcessing(false);
        //         Swal.fire('Thành công', 'Thanh toán thành công!', 'success');
        //         onRequestClose();
        //         navigate('/thanh-toan-dich-vu');
        //     }
        // } catch (error) {
        //     setIsProcessing(false);
        //     Swal.fire('Thất bại', 'Thanh toán thất bại!', 'error');
        // }
        try {
            const res = await verifyPayment({transactionMapId: id, type: 'TRSCINA'})
            setIsProcessing(false);
            if (res.data.result) {
                Swal.fire('Thành công', 'Thanh toán thành công!', 'success');
                onRequestClose();
                navigate('/thanh-toan-dich-vu');
            }
        } catch (e) {
            setIsProcessing(false);
            Swal.fire('Thất bại', 'Thanh toán thất bại!', 'error');
        }
    };

    const myFunction = () => {
        toast.current.show({severity: 'info', summary: 'Info', detail: 'Message Content'});
        navigator.clipboard.writeText(bankAccountNumber);
    }
    return (
        <Modal isOpen={isOpen} onRequestClose={onRequestClose} style={customStyles}>
            <Toast ref={toast}/>
            <Box sx={{textAlign: 'center'}}>
                <Typography variant="h6" gutterBottom>
                    Mã QR Chuyển Tiền
                </Typography>
                <QRCodeSVG value={qrData} size={256}/>
                <Box sx={{marginTop: '20px', textAlign: 'left'}}>
                    <p>
                        <strong>Người nhận:</strong> {bankAccountName}<br/>
                        <strong id="myInput">Số tài khoản:</strong> {bankAccountNumber} <i className="pi pi-clone"
                                                                                           onClick={myFunction}></i><br/>
                        <strong>Ngân hàng:</strong> {bankName}<br/>
                        <strong>Số tiền:</strong> {amount.toLocaleString()} VND<br/>
                    </p>
                    <TextField
                        label="Nội dung chuyển tiền"
                        value={transactionInput}
                        onChange={handleTransactionContentChange}
                        fullWidth
                        multiline
                        rows={4}
                        variant="outlined"
                        sx={{marginTop: '10px'}}
                    />
                </Box>
                <Button
                    variant="outlined"
                    onClick={handlePaymentClick}
                    sx={{marginTop: '20px', position: 'relative'}}
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
