import { motion, AnimatePresence, Variants } from "framer-motion"
import {useRouter, NextRouter} from "next/router"
import { useInView } from "react-intersection-observer";
import { useTranslation } from "next-i18next";

const fadeIn: Variants = {
    hidden: {
        opacity: 0,
        x: -100,
        transition: {
            duration: 1
        }
    },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 1,
            staggerChildren: 0.5,
        }
    },
}

const Screen1 = (): JSX.Element => {
    const router: NextRouter = useRouter();
    const { t } = useTranslation("screen0");
    const { ref, inView, entry} = useInView({threshold: 0.7});

    return (
        <div
            className="w-screen h-screen bg-green-300 scroll-snap-start relative"
            ref={ref}
        >
            <AnimatePresence>
                { inView && <motion.div
                    className="absolute top-80 left-80"
                    variants={fadeIn}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                >
                    <motion.h1
                        className="text-8xl"
                        variants={fadeIn}
                    >
                        {t("header0")}
                    </motion.h1>
                    <motion.h1
                        className="text-8xl"
                        variants={fadeIn}
                    >
                        {t("header1")}
                    </motion.h1>
                    <motion.h1
                        className="text-8xl"
                        variants={fadeIn}
                    >
                        {t("header2")
                    }</motion.h1>
                </motion.div>
                }
            </AnimatePresence>
        </div>
    )
}

export default Screen1;