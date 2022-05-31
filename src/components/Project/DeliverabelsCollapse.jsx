import React from "react";

import { Collapse } from "antd";

import { List } from "antd";


const { Panel } = Collapse;
// function timeConverter(UNIX_timestamp){
//   var a = new Date(UNIX_timestamp * 1000);
//   var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
//   var year = a.getYear()-69;
//   var month = months[a.getMonth()];
//   var date = a.getDate();

//   var time = date + '/ ' + month + ' /' + year ;
//   return time;
// }


export default function DeliCollapse({ items, icon, head }) {
  return (
    <Collapse defaultActiveKey={["1"]} style={{ width: 750 }} >
      <Panel header={head} key="1">
        
          <List
            itemLayout="horizontal"
            dataSource={items}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  avatar={icon}
                  title={item.title  }
                  description={`ID: ${item.id}` }
                   
              
                />
                <p>
                 {`
                     Due date:  ${item.dueDate}
                `}
                </p>
              </List.Item>
            )}
          />
        
      </Panel>
    </Collapse>
  );
}