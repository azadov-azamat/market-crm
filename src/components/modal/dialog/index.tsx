import React, {ReactNode} from 'react';
import {Dialog, DialogBody} from "@material-tailwind/react";

interface DialogModalProps {
    title?: string;
    open: boolean;
    children: ReactNode;
    size?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
    toggle: React.MouseEventHandler<HTMLButtonElement>;
}

export default function DialogModal({children, open, toggle, size = 'xl'}: DialogModalProps) {
    return (
        <Dialog
            open={open}
            size={size}
            className={"flex"}
            handler={toggle}
            animate={{
                mount: {scale: 1, y: 0},
                unmount: {scale: 0.9, y: -100},
            }}
        >
            <DialogBody divider className={"w-full flex justify-center border-none"}>
                {children}
            </DialogBody>
        </Dialog>
    );
}