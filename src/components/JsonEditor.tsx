import React, { useState } from "react";
import { JsonKeyValue } from "./JsonKeyValue";
import { Input } from 'antd';
import { Button } from "antd";
export interface JsonEditorProps {
  data: any;
  path?: string[];
  onChangeAtPath: (
    path: string[],
    newValue: any | ((prev: any) => any)
  ) => void;
}

export const JsonEditor: React.FC<JsonEditorProps> = ({
  data,
  path = [],
  onChangeAtPath
}) => {
  const [newKey, setNewKey] = useState("");

  const handleAddKey = () => {
    if (!newKey.trim()) return;
    const newData = { ...data, [newKey]: "string" }; // default type
    onChangeAtPath(path, newData);
    setNewKey("");
  };

  return (
    <div style={{ marginLeft: "1rem" }}>
      {Object.entries(data).map(([key, value]) => (
        <JsonKeyValue
          key={key}
          k={key}
          v={value}
          path={[...path, key]}
          onChangeAtPath={onChangeAtPath}
        />
      ))}
      <div style={{ marginTop: "0.5rem" }}>
        <Input
          value={newKey}
          onChange={(e) => setNewKey(e.target.value)}
          placeholder="Enter key"
          style={{ marginRight: "0.5rem" }}
        />
        <Button onClick={handleAddKey}>+ Add Field</Button>
      </div>
    </div>
  );
};
