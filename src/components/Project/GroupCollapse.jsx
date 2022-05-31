import React from "react";

import { Collapse } from "antd";

import { List } from "antd";

const { Panel } = Collapse;

export default function GroupCollapse({ items, icon ,w}) {
  let HEAD="Group:\t"+items.id;
  return (
    
    <Collapse defaultActiveKey={["1"]} style={{ width:w }} >
      <Panel header={HEAD} key="1">
        
          <List
            itemLayout="horizontal"
            dataSource={items.students}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  avatar={icon}
                  title={item.name}
                  description={`ID: ${item.id}` }
                   
              
                />
              </List.Item>
            )}
          />
         
      </Panel>
    </Collapse>
  );
}