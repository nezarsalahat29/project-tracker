import React from 'react'
import { Row } from "antd";
import { Progress } from "antd";

const Bar = ({p}) => {
  return (   
      
    <div style={{ textAlign: "center" }}>
        
        <h2>Work progress:</h2>
        <div style={{ textAlign: "center", position: "relative", left: 110 }}>
          <Row gutter={6}>
            <Progress
              style={{
                width: "90%",

                marginBottom: "25px",
              }}
              strokeColor={{
                "0%": "#5ebcff",
                "100%": "#162b3b",
              }}
              trailColor="#c9c8c5"
              percent={parseInt(p)}
           
            />
          </Row>
        </div>
      </div>
  )
}

export default Bar