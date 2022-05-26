import React from "react";

import { Collapse } from "antd";

import { List } from "antd";


const { Panel } = Collapse;
function timeConverter(UNIX_timestamp){
  var a = new Date(UNIX_timestamp * 1000);
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var year = a.getYear()-69;
  var month = months[a.getMonth()];
  var date = a.getDate();

  var time = date + '/ ' + month + ' /' + year ;
  return time;
}


export default function DeliCollapse({ items, icon, head }) {
  return (
    <Collapse defaultActiveKey={["0"]} style={{ width: 500 }} >
      <Panel header={head} key="1">
        <p>
          <List
            itemLayout="horizontal"
            dataSource={items}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  avatar={icon}
                  title={<a href="https://ant.design">{item.title || item }</a>}
                  description={`ID: ${item.id}` }
                   
              
                />
                <p>
                 {`
                     Due date:  ${timeConverter(item.dueDate)}
                `}
                </p>
              </List.Item>
            )}
          />
        </p>
      </Panel>
    </Collapse>
  );
}