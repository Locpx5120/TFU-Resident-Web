import React, { Component } from 'react';
import InvestorDetail from '../../components/owner/InvestorDetail';
import { getInvestorDetail } from '../../services/ownerService';

class InvestorDetailPage extends Component {
    state = {
        investor: null
    };

    componentDidMount() {
        const investorId = this.props.match.params.id;
        getInvestorDetail(investorId).then(data => this.setState({ investor: data }));
    }

    render() {
        const { investor } = this.state;

        return (
            <div>
                {investor ? <InvestorDetail investor={investor} /> : <p>Đang tải...</p>}
            </div>
        );
    }
}

export default InvestorDetailPage;
