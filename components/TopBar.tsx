
import { motion, AnimatePresence, Variants } from "framer-motion"
import Link from "next/link"
import {useRouter, NextRouter} from "next/router"

import { useTranslation } from "next-i18next";

const topBarHeight = 80;

const moveIn: Variants = {
  initial: {    // due to locale change and page load, if the bar is not visible when loaded, it will look bad
    y: 0
  },
  visible: {
    y: 0,
    transition: {
      duration: 0.3
    }
  },
  hidden: {
    y: -topBarHeight,
    transition: {
      duration: 0.3
    }
  }
}

interface TopBarProps {
    showBar: boolean
}

const TopBar = (props: TopBarProps) => {
    const { t } = useTranslation("firstPage");
    const router: NextRouter = useRouter();

    return (
        <motion.div
            className="bg-green-300 w-full h-20 absolute"
            id="topBar"
            variants={moveIn}
            initial="initial"
            animate={props.showBar ? "visible" : "hidden"}
        >
            <div className="bg-blue-300 flex justify-evenly">
            <Link href="/" locale="en"><a><button>To English locale</button></a></Link>
            <Link href="/" locale="de"><a><button>To German locale</button></a></Link>
            <Link href="/" locale="fr"><a><button>To French locale</button></a></Link>
            <Link href="/" locale="ja"><a><button>To Japanese locale</button></a></Link>

            <h1>change locale</h1>
            <h1>testing sentence: {t("testing")}</h1>
            <h1>current locale: {router.locale}</h1>
            </div>
        </motion.div>
    );
}

export default TopBar;
export { topBarHeight };