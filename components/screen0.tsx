import { motion, AnimatePresence, Variants } from "framer-motion"
import {useRouter, NextRouter} from "next/router"
import { useInView } from "react-intersection-observer";
import { useTranslation } from "next-i18next";
import { useState, useEffect } from "react";

import styles from "~/styles/screen0.module.css";

const dx0 = 100;
const dy0 = 100;

interface Ratios {
    dw: number,
    dh: number,
}

const cloudVariant0:Variants = {
    initial: {

    },
    animate: (ratios: Ratios) => ({
        x: 0 + dx0 * ratios.dw,
        y: 0 + dy0 * ratios.dh,

        transition: {
            
        }
    }),
}

const Screen0 = (): JSX.Element => {
    const { ref, inView, entry} = useInView({threshold: 0.7});

    const [ screenX, setScreenX ] = useState<number>(0);
    const [ screenY, setScreenY ] = useState<number>(0);
    
    const trackMouse = (event: React.MouseEvent): void => {
        setScreenX(event.screenX);
        setScreenY(event.screenY);
    }

    const widthRatio = (): number => {      // returns -1 <= x <= 1
        let wRatio = 0;
        try {
            let halfWidth = window.innerWidth / 2;
            wRatio = (screenX - halfWidth) / halfWidth;
        } catch (error) {
            return 0;   //return 0 if divide by 0 or anything goes wrong
        }
        return wRatio;
    }

    const heightRatio = (): number => {
        let hRatio = 0;
        try {
            let halfHeight = window.innerHeight / 2;
            hRatio = (screenY - halfHeight) / halfHeight;
        } catch (error) {
            return 0;
        }
        return hRatio;
    }

    return (
        <div
            onMouseMove={event => trackMouse(event)}
            className={["w-screen h-screen bg-red- scroll-snap-start", styles.screen0].join(" ")}
        >
            <AnimatePresence>
                <motion.span
                    className="text-8xl fixed bottom-80 left-60"
                    variants={cloudVariant0}
                    custom={{dw: widthRatio(), dh: heightRatio()}}
                    animate="animate"
                >
                    ABC
                </motion.span>
            </AnimatePresence>
            <div className="fixed right-0 top-80 bg-yellow-300">
                <span>screenX: {screenX}</span>
                <span>screenY: {screenY}</span>
                {/* <span>window width: {window.innerWidth}</span> */}
                {/* <span>window height: {window.innerHeight}</span> */}
                <span>width ratio: {widthRatio()}</span>
                <span>height ratio: {heightRatio()}</span>
            </div>
            <h1>Weclome</h1>
        </div>
    )
}

export default Screen0;