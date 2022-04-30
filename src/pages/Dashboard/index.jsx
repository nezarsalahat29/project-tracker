import React from 'react';
import { Typography, Button } from 'antd';
import { useAuth } from '../../contexts/AuthContext';

const { Title } = Typography;

const Dashboard = () => {
    const { logout } = useAuth();

    return (
        <>
            <Title>DashBoard</Title>
            <Button
                type='primary'
                htmlType='submit'
                onClick={async () => await logout()}
            >
                Sign Out
            </Button>
        </>
    );
};

export default Dashboard;
