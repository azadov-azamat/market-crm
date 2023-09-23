import React, {ReactNode} from 'react';
import {Dialog, DialogBody} from "@material-tailwind/react";

interface DialogModalProps {
    title?: string;
    open: boolean;
    children: ReactNode;
    toggle: React.MouseEventHandler<HTMLButtonElement>;
}

export default function DialogModal({children, open, toggle}: DialogModalProps) {
    return (
        <Dialog
            open={open}
            size={"xl"}
            className={"flex md:hidden"}
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