import React, { useEffect, useRef } from "react";
import { observer } from "mobx-react-lite";
import ListStore from "../stores/ListStore";
import { List, Spin } from "antd";
import ListItem from "./ListItem";
import styles from "./../styles/List.module.css";

const ListComponent: React.FC = observer(() => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleScroll = () => {
    if (containerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
      if (scrollHeight - scrollTop <= clientHeight * 2 && !ListStore.loading) {
        ListStore.fetchItems();
      }
    }
  };

  useEffect(() => {
    ListStore.fetchItems();
  }, []);

  return (
    <div role="list" ref={containerRef} onScroll={handleScroll} className={styles.listContainer}>
      <Spin spinning={ListStore.loading} tip="Loading...">
        <List
          itemLayout="horizontal"
          dataSource={ListStore.items}
          renderItem={(item) => (
            <ListItem
              key={item.id}
              item={item}
              onDelete={() => ListStore.deleteItem(item.id)}
              onEdit={(newName) => ListStore.editItem(item.id, newName)}
            />
          )}
        />
      </Spin>
    </div>
  );
});

export default ListComponent;