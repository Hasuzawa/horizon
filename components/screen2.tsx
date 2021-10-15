import { motion, AnimatePresence, Variants } from "framer-motion"
import {useRouter, NextRouter} from "next/router"
import { useInView } from "react-intersection-observer";
import { useTranslation } from "next-i18next";


const Screen2 = (): JSX.Element => {
    const router: NextRouter = useRouter();
    const { t } = useTranslation("screen0");
    const { ref, inView, entry} = useInView({threshold: 0.7});
    
    return (
        <div className="w-screen h-screen bg-purple-300 scroll-snap-start">

        </div>
    )
}

export default Screen2;