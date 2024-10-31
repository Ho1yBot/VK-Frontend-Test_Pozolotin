import React, { useState } from "react";
import { Button, Input, List } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Item } from "../stores/ListStore";

interface ListItemProps {
  item: Item;
  onDelete: () => void;
  onEdit: (newName: string) => void;
}

const ListItem: React.FC<ListItemProps> = ({ item, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(item.name);

  const handleEdit = () => {
    setIsEditing(false);
    onEdit(name);
  };

  return (
    <List.Item
      role="listitem" // добавляем роль
      actions={[
        isEditing ? null : (
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => setIsEditing(true)}
          >
            Edit
          </Button>
        ),
        <Button
          type="primary"
          danger
          icon={<DeleteOutlined />}
          onClick={onDelete}
        >
          Delete
        </Button>,
      ]}
    >
      {isEditing ? (
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          onBlur={handleEdit}
          onPressEnter={handleEdit}
        />
      ) : (
        <span>{name}</span>
      )}
    </List.Item>
  );
};

export default ListItem;
