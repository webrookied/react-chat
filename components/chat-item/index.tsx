import React, { FC } from "react";
import { Button, Input, Avatar, Space } from "antd";
import { UserOutlined } from "@ant-design/icons";
import cx from "./chat-item.module.scss";

type ItemType = {
  send_id?: string;
  accept_id?: string;
  message?: string;
};

interface ChatItemWrapperProps {
  item: ItemType;
}

export const ChatItemLeft: FC<ChatItemWrapperProps> = ({ item }) => {
  return (
    <section className={cx["chat-item-send"]}>
      <div className={cx["chat-list-item-left"]}>
        <Avatar size="large" icon={<UserOutlined />} />
      </div>
      <div className={cx["chat-list-item-right"]}>{item.message}</div>
    </section>
  );
};

export const ChatItemRight: FC<ChatItemWrapperProps> = ({ item }) => {
  return (
    <>
      <section className={cx["chat-item-accept"]}>
        <div className={cx["chat-list-item-left"]}>{item.message}</div>
        <div className={cx["chat-list-item-right"]}>
          <Avatar size="large" icon={<UserOutlined />} />
        </div>
      </section>
    </>
  );
};
