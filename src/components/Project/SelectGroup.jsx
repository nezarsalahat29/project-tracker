import React, { useState } from 'react';
import { Form, Modal, Button, Select } from 'antd';

const { Option } = Select;
const GroupSelectModal = ({
  visible,
  onCancel,
  onGroupSelect,
  project,
  groups,
}) => {
  const [form] = Form.useForm();

  return (
    <>
      <Modal
        width={400}
        visible={visible}
        footer={null}
        title={'Assign Group'}
        onCancel={() => {
          form.resetFields();
          onCancel();
        }}
      >
        <Form
          form={form}
          initialValues={{
            group: project.groupId
              ? `Group ${
                  groups.find((group) => group.id === project.groupId).number
                }`
              : null,
          }}
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          layout='horizontal'
        >
          <Form.Item name='group' label='Assigned Group'>
            <Select
              style={{ width: 200 }}
              placeholder='Select a group'
              onChange={onGroupSelect}
            >
              {groups.map((group) => (
                <Option key={group.id} value={group.id}>
                  {`Group ${group.number}`}
                </Option>
              ))}
              <Option value={null}>None</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default function SelectGroup({ onGroupSelect, project, groups }) {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <Button onClick={() => setVisible(true)}>Assign Group</Button>
      <GroupSelectModal
        visible={visible}
        project={project}
        groups={groups}
        onGroupSelect={onGroupSelect}
        onCancel={() => {
          setVisible(false);
        }}
      />
    </>
  );
}
