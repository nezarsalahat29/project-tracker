import Navbar from "../Navbar";
import Project from "../Project";
import { Row,Col } from "antd";

function App() {
    return (
        <div className="App">
          <Row
        gutter={0}
        style={{
         
        }}
      >
           <Col span={2} style={{ }}>
           <Navbar/>
        </Col>
          <Col span={22} style={{  }}>
         <Project/>
         
        </Col>
       

        
      </Row>
            
        </div>
       
    );
}

export default App;
