import { Result, Button, Layout } from "antd";
import { Link } from "react-router-dom";
const { Footer } = Layout;

// eslint-disable-next-line import/no-anonymous-default-export
export default function FaultPage() {
  return (
    <div>
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Button type="primary">
            <Link to="/">Back Home</Link>
          </Button>
        }
      />
      <Footer
        style={{
          textAlign: "center",
        }}
      >
        Project Tracker ©2022 Created by Ultra8Bits
      </Footer>
    </div>
  );
}
