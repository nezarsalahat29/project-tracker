import { Empty, Card, Divider, Typography } from "antd";

const { Title } = Typography;
const NoData = (props) => (
  <div>
    <Card style={{ backgroundColor: "#F7F7F7" }}>
      <Title level={2}>{props.title}</Title>
      <Divider />
      <Empty
        description={false}
        style={{
          textAlign: "center",
          height: "340px",
          justifyContent: "center",
          width: "auto",
          display: "flex",
        }}
        imageStyle={{
          margin: "auto",
          width: "340px",
          maxWidth: "100%",
          height: "auto",
          display: "block",
        }}
      />
    </Card>
  </div>
);

export default NoData;
