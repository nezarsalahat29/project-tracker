import { Result, Button } from "antd";
import { Link } from "react-router-dom";

// eslint-disable-next-line import/no-anonymous-default-export
export default function FaultPage() {
  return (
    <div>
      <Result
        status='404'
        title='404'
        subTitle='Sorry, the page you visited does not exist.'
        extra={
          <Button type='primary'>
            <Link to='/'>Back Home</Link>
          </Button>
        }
      />
    </div>
  );
}
