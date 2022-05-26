import React from "react";

import { Collapse } from "antd";

import { List } from "antd";

const { Panel } = Collapse;

export default function GroupCollapse({ items, icon }) {
  let HEAD="Group:\t"+items.id;
  return (
    <Collapse defaultActiveKey={["0"]} style={{ width: 500 }} >
      <Panel header={HEAD} key="1">
        <p>
          <List
            itemLayout="horizontal"
            dataSource={items.students}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  avatar={icon}
                  title={<a href="https://ant.design">{item.name}</a>}
                  description={`ID: ${item.id}` }
                   
              
                />
              </List.Item>
            )}
          />
        </p>
      </Panel>
    </Collapse>
  );
}