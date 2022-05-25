import React from "react";

import { Collapse } from "antd";

import { List } from "antd";

const { Panel } = Collapse;

export default function Collaps({ items, icon, head }) {
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
                  description={"ID: "+item.id}
                />
              </List.Item>
            )}
          />
        </p>
      </Panel>
    </Collapse>
  );
}
