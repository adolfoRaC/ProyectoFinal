import React from "react";
import { Avatar, Button, Card, CardBody, CardFooter, CardHeader, AvatarIcon, Divider } from "@nextui-org/react";

export const UserTwitterCard = () => {


  return (
    <Card shadow="none" className="max-w-[300px] border-none bg-transparent">
      <CardHeader className="justify-between">
        <div className="flex gap-3">
          <div className="flex flex-col items-start justify-center">
            <h4 className="text-small font-semibold leading-none text-default-600">Notificaciones</h4>
          </div>
        </div>
      </CardHeader>
      <Divider />
      <CardBody className="px-3 py-2" style={{ width: 300, height: 350 }}>
        <div className="flex gap-3 " style={{ background: '#E2E2E2', borderRadius: 15, marginBottom: 8, alignItems:'center'}}>
          <Avatar icon={<AvatarIcon />} classNames={{ base: "bg-gradient-to-br from-[#FFB457] to-[#FF705B]", icon: "text-black/80",}} />
          <div className="text-small pl-px text-default-500" style={{ marginTop: 7, width: 200, marginBottom:7 }}>
            <b>Venta:</b>Tiene una vent Lorem ipsusam facere excepturi!
          </div>
      
        </div>
        <div className="flex gap-3 " style={{ background: '#E2E2E2', borderRadius: 15, marginBottom: 8 }}>
          <Avatar icon={<AvatarIcon />} classNames={{ base: "bg-gradient-to-br from-[#FFB457] to-[#FF705B]", icon: "text-black/80",}} />
          <div className="text-small pl-px text-default-500" style={{ marginTop: 7 }}>
            Tiene una venta
          </div>
        </div>
        <div className="flex gap-3 " style={{ background: '#E2E2E2', borderRadius: 15, marginBottom: 8 }}>
          <Avatar icon={<AvatarIcon />} classNames={{ base: "bg-gradient-to-br from-[#FFB457] to-[#FF705B]", icon: "text-black/80",}} />
          <div className="text-small pl-px text-default-500" style={{ marginTop: 7 }}>
            Tiene una venta
          </div>
        </div>
        <div className="flex gap-3 " style={{ background: '#E2E2E2', borderRadius: 15, marginBottom: 8 }}>
          <Avatar icon={<AvatarIcon />} classNames={{ base: "bg-gradient-to-br from-[#FFB457] to-[#FF705B]", icon: "text-black/80",}} />
          <div className="text-small pl-px text-default-500" style={{ marginTop: 7 }}>
            Tiene una venta
          </div>
        </div>
        <div className="flex gap-3 " style={{ background: '#E2E2E2', borderRadius: 15, marginBottom: 8 }}>
          <Avatar icon={<AvatarIcon />} classNames={{ base: "bg-gradient-to-br from-[#FFB457] to-[#FF705B]", icon: "text-black/80",}} />
          <div className="text-small pl-px text-default-500" style={{ marginTop: 7 }}>
            Tiene una venta
          </div>
        </div>
        <div className="flex gap-3 " style={{ background: '#E2E2E2', borderRadius: 15, marginBottom: 8 }}>
          <Avatar icon={<AvatarIcon />} classNames={{ base: "bg-gradient-to-br from-[#FFB457] to-[#FF705B]", icon: "text-black/80",}} />
          <div className="text-small pl-px text-default-500" style={{ marginTop: 7 }}>
            Tiene una venta
          </div>
        </div>
        <div className="flex gap-3 " style={{ background: '#E2E2E2', borderRadius: 15, marginBottom: 8 }}>
          <Avatar icon={<AvatarIcon />} classNames={{ base: "bg-gradient-to-br from-[#FFB457] to-[#FF705B]", icon: "text-black/80",}} />
          <div className="text-small pl-px text-default-500" style={{ marginTop: 7 }}>
            Tiene una venta
          </div>
        </div>
        <div className="flex gap-3 " style={{ background: '#E2E2E2', borderRadius: 15, marginBottom: 8 }}>
          <Avatar icon={<AvatarIcon />} classNames={{ base: "bg-gradient-to-br from-[#FFB457] to-[#FF705B]", icon: "text-black/80",}} />
          <div className="text-small pl-px text-default-500" style={{ marginTop: 7 }}>
            Tiene una venta
          </div>
        </div>
        <div className="flex gap-3 " style={{ background: '#E2E2E2', borderRadius: 15, marginBottom: 8 }}>
          <Avatar icon={<AvatarIcon />} classNames={{ base: "bg-gradient-to-br from-[#FFB457] to-[#FF705B]", icon: "text-black/80",}} />
          <div className="text-small pl-px text-default-500" style={{ marginTop: 7 }}>
            Tiene una venta
          </div>
        </div>
        <div className="flex gap-3 " style={{ background: '#E2E2E2', borderRadius: 15, marginBottom: 8 }}>
          <Avatar icon={<AvatarIcon />} classNames={{ base: "bg-gradient-to-br from-[#FFB457] to-[#FF705B]", icon: "text-black/80",}} />
          <div className="text-small pl-px text-default-500" style={{ marginTop: 7 }}>
            Tiene una venta
          </div>
        </div>
      </CardBody>
      <CardFooter className="gap-3">

      </CardFooter>
    </Card>
  );
};
