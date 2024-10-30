import React, { Component } from 'react';
import InvestorList from '../../components/owner/InvestorList';

class InvestorManagementPage extends Component {
    state = {
        investors: []
    };

    componentDidMount() {
        // Giả lập fetch dữ liệu
        this.setState({ investors: [{ id: 1, name: 'Nguyễn Văn A', email: 'a@example.com' }] });
    }

    render() {
        return (
            <div>
                <h2>Quản lý Nhà đầu tư</h2>
                <InvestorList investors={this.state.investors} onSelect={(investor) => console.log(investor)} />
            </div>
        );
    }
}

export default InvestorManagementPage;
