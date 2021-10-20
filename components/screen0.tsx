import { motion, AnimatePresence, Variants, Transition } from "framer-motion"
import {useRouter, NextRouter} from "next/router"
import { useInView } from "react-intersection-observer";
import { useTranslation } from "next-i18next";
import { useState, useEffect, Suspense } from "react";

import styles from "~/styles/screen0.module.css";


// you might want to these cahnges relative to screen size
const dx0 = 100;
const dy0 = 100;

const dx1 = 50;
const dy1 = 50;

const dx2 = 25;
const dy2 = 25;

interface Ratios {
    dw: number,
    dh: number,
}

const instantaneous: Transition = {
    ease: "linear",
    duration: 0,
}

const cloudVariant0:Variants = {
    initial: {

    },
    animate: (ratios: Ratios) => ({
        x: 0 + dx0 * ratios.dw,
        y: 0 + dy0 * ratios.dh,

        transition: instantaneous
    }),
}

const cloudVariant1: Variants = {
    animate: (ratios: Ratios) => ({
        x: 0 + dx1 * ratios.dw,
        y: 0 + dy1 * ratios.dh,

        transition: instantaneous
    })
}

const cloudVariant2: Variants = {
    animate: (ratios: Ratios) => ({
        x: 0 + dx2 * ratios.dw,
        y: 0 + dy2 * ratios.dh,

        transition: instantaneous
    })
}

const flyIn: Variants = {
    initial: {
        x: "-100vw",
    },
    animate: {
        x: 0,
        transition: {
            duration: 2
        }
    },
    exit: {
        x: "100vw",
        transition: {
            duration: 2
        }
    }
}

const Screen0 = (): JSX.Element => {
    const { ref, inView, entry} = useInView({threshold: 0.7});

    const [ screenX, setScreenX ] = useState<number>(0);
    const [ screenY, setScreenY ] = useState<number>(0);

    const [ wRatio , setWRatio ] = useState<number>(0);
    const [ hRatio, setHRatio ] = useState<number>(0);
    
    const trackMouse = (event: React.MouseEvent): void => {
        setScreenX(event.screenX);
        setScreenY(event.screenY);
    }

    // useEffect(() => {
    //     let wRatio = 0;
    //     try {
    //         let halfWidth = window.innerWidth / 2;
    //         wRatio = (screenX - halfWidth) / halfWidth;
    //     } catch (error) {
    //         setWRatio(0);   //return 0 if divide by 0 or anything goes wrong
    //     }
    //     setWRatio(wRatio);
    // }, [screenX, window.innerWidth])

    // useEffect(() => {
    //     let hRatio = 0;
    //     try {
    //         let halfHeight = window.innerHeight / 2;
    //         hRatio = (screenY - halfHeight) / halfHeight;
    //     } catch (error) {
    //         setHRatio(0);
    //     }
    //     setHRatio(hRatio);
    // }, [screenY, window.innerHeight])

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

    const getRatios = (): Ratios => ({dw: widthRatio(), dh: heightRatio()});    //return a Ratio object

    // there is flashing re-render when scrolling back to this div when paper plane is about to disappear
    return (
        // <Suspense fallback={<div className={["screen", styles.screen0].join(" ")} />}>
        <div
            onMouseMove={event => trackMouse(event)}
            className={["screen flex justify-center items-center", styles.screen0].join(" ")}
            ref={ref}
        >
                <motion.span
                    className="text-8xl absolute bottom-80 left-60"
                    variants={cloudVariant0}
                    custom={getRatios()}
                    animate="animate"
                >
                    ABC
                </motion.span>
                <motion.span
                    className="text-4xl absolute right-40 top-80"
                    variants={cloudVariant1}
                    custom={getRatios()}
                    animate="animate"
                >
                    DEF
                </motion.span>
                <motion.span
                    className="text-2xl absolute left-80 top-20"
                    variants={cloudVariant2}
                    custom={getRatios()}
                    animate="animate"
                >
                    GHI
                </motion.span>
            <AnimatePresence>
                { inView &&
                    <motion.span
                    className="flex-none text-8xl"
                        variants={flyIn}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                    >
                        paper plane
                    </motion.span>
                }
            </AnimatePresence>
            {/* <div
                className="absolute right-0 top-80 bg-yellow-300 flex flex-col w-80 opacity-50"
                
            >
                <span>screenX: {screenX}</span>
                <span>screenY: {screenY}</span>
                <span>window width: {window.innerWidth}</span>
                <span>window height: {window.innerHeight}</span>
                <span>width ratio: {widthRatio()}</span>
                <span>height ratio: {heightRatio()}</span>
            </div> */}
        </div>
        /* </Suspense> */
    )
}

export default Screen0;