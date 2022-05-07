import { Table } from "antd";
import { Card } from "antd";
import { Divider } from "antd";
import { Typography } from "antd";

const { Title } = Typography;

function randomDate(start, end) {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
}

const columns = [
  {
    title: "Group",
    dataIndex: "groupName",
  },
  {
    rowKey: "Key",
    title: "Last Modified",
    dataIndex: "LastModified",
    sorter: (a, b) => a.LastModified < b.LastModified,
    sortDirections: ["ascend"],
    defaultSortOrder: ["ascend"],
  },
];

const data = [];
for (let i = 0; i < 100; i++) {
  var d = randomDate(new Date(2012, 0, 1), new Date())
    .toISOString()
    .split("T")[0];
  data.push({
    key: i,
    groupName: `Edward King ${i}`,
    LastModified: d,
  });
}

function onChange(pagination, filters, sorter, extra) {
  console.log("params", pagination, filters, sorter, extra);
}

export default function LastModifiedTable() {
  return (
    <div>
      <Card style={{ backgroundColor: "#F7F7F7" }}>
        <Title level={2}>Last Modified</Title> <Divider />
        <Table
          columns={columns}
          dataSource={data}
          bordered
          pagination={{ pageSize: 100, showSizeChanger: false }}
          scroll={{ y: 270 }}
          onChange={onChange}
        />
      </Card>
    </div>
  );
}
