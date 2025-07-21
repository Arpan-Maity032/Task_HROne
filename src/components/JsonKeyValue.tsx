import React from "react";
import { JsonEditor } from "./JsonEditor";
import {DeleteOutlined } from "@ant-design/icons";
import "../styles/JsonEditor.css"
import { Button } from "antd";
import { Input } from 'antd';
import { Select } from "antd";
interface JsonKeyValueProps {
  k: string;
  v: any;
  path: string[];
  onChangeAtPath: (path: string[], newValue: any) => void;
}

export const JsonKeyValue: React.FC<JsonKeyValueProps> = ({
  k,
  v,
  path,
  onChangeAtPath
}) => {
  const handleChangeType = (type: string) => {
    let value: any;
    switch (type) {
      case "string":
      case "number":
      case "integer":
      case "boolean":
      case "null":
        value = type;
        break;
      case "object":
        value = {};
        break;
      default:
        return;
    }
    onChangeAtPath(path, value);
  };

  const handleDelete = () => {
    const parentPath = path.slice(0, -1);
    const keyToDelete = path[path.length - 1];
    onChangeAtPath(parentPath, (prev: any) => {
      const updated = { ...prev };
      delete updated[keyToDelete];
      return updated;
    });
  };

  return (
    <div className="Box" style={{ marginBottom: "0.5rem" }}>
      <Input
        value={k}
        disabled
        style={{ marginRight: "0.5rem", width: "120px" }}
      />
      {typeof v === "object" && v !== null ? (
        <>
          <Select
            onChange={(value) => handleChangeType(value)}
            value="object"
            style={{ marginRight: "0.5rem" }}
          >
            <option value="object">object</option>
            <option value="string">string</option>
            <option value="number">number</option>
            <option value="integer">integer</option>
            <option value="boolean">boolean</option>
            <option value="null">null</option>
          </Select>
          <Button onClick={handleDelete} className="icon">
  <DeleteOutlined />
</Button>
          <JsonEditor data={v} path={path} onChangeAtPath={onChangeAtPath} />
        </>
      ) : (
        <>
          <span style={{ marginRight: "0.5rem" }}>{v}</span>
          <Select
            onChange={(value) => handleChangeType(value)}
            value={v}
            style={{ marginRight: "0.5rem" }}
          >
            <option value="string">string</option>
            <option value="number">number</option>
            <option value="integer">integer</option>
            <option value="boolean">boolean</option>
            <option value="null">null</option>
            <option value="object">nested</option>
          </Select>
           <Button onClick={handleDelete} className="icon">
  <DeleteOutlined />
</Button>
        </>
      )}
    </div>
  );
};
