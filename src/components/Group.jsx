import React, { useState, useEffect } from 'react';
import { Card, Skeleton } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { getGroupsFromDb } from '../firestore';
import Loader from './Loader';

export default function Group({ groupId, deleteGroup }) {
    const [group, setGroup] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getGroup = async () => {
            setGroup(await getGroupsFromDb(groupId));
            setLoading(false);
        };

        getGroup();
    }, []);

    return loading ? (
        <Loader />
    ) : (
        <Card
            title={`Group ${groupId}`}
            extra={
                // eslint-disable-next-line
                <a onClick={() => deleteGroup(groupId)}>
                    <DeleteOutlined />
                </a>
            }
            style={{ width: '100%', marginBottom: '0.5rem' }}
        ></Card>
    );
}
