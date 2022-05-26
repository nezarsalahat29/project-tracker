import React, { useEffect, useState } from "react";
import { Dropdown, Menu, Button, Row } from "antd";
import { updateRole } from "../firestore/users";
import { getStudentFromDb } from "../firestore/users";
export default function AssignStudent(props) {
  const [Role, setRole] = useState();

  const getStudent = async () => {
    const stude = await getStudentFromDb(props.student.id);
    setRole(stude.role);
  };

  useEffect(() => {
    const getData = async () => {
      await Promise.all([getStudent()]);
    };

    getData();
  }, []);

  const Roles = props.Roles;
  const menu = (
    <Menu
      items={Roles.map((item) => {
        return {
          key: Roles.indexOf(item),
          label: (
            <Button
              type='text'
              onClick={() => {
                updateRole(props.student.id, item.name);
                setRole(item.name);
              }}
            >
              {item.name}
            </Button>
          ),
        };
      })}
    />
  );
  return (
    <div>
      <Row justify='space-between'>
        <p>{props.student.name}</p>

        <Dropdown overlay={menu}>
          <Button>{Role ? Role : "Role"}</Button>
        </Dropdown>
      </Row>
    </div>
  );
}
