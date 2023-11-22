import React from "react";
import { NotificationIcon } from "./NotificationIcon";
import { Popover, PopoverTrigger, PopoverContent, Badge, Button } from "@nextui-org/react";
import { UserTwitterCard } from "./UserTwitterCard";

export default function Notificacion() {
  return (
    <Popover placement="bottom">
      <PopoverTrigger>




        <Button
          style={{width:50, height:50}}
          radius="full"
          isIconOnly
          variant="light"
          >
          <Badge content="9" shape="circle" color="danger">
            <NotificationIcon size={30} />
          </Badge>
        </Button>
      


      </PopoverTrigger>
      <PopoverContent>
        <UserTwitterCard />
      </PopoverContent>
    </Popover>
  );
}
