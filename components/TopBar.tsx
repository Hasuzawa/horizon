
import { motion, AnimatePresence, Variants } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import {useRouter, NextRouter} from "next/router"

import { useTranslation } from "next-i18next";

import us_uk_flag from "~/public/icons/US_UK_flag.svg";
import de_flag from "~/public/icons/DE_flag.svg";
import fr_flag from "~/public/icons/FR_flag.svg";
import jp_flag from "~/public/icons/JP_flag.svg";

const topBarHeight = 80;

const flag_width = 45;
const flag_height = 30;

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
    const { t } = useTranslation("TopBar");
    const router: NextRouter = useRouter();

    return (
        <motion.div
            className="bg-green-300 w-full h-20 absolute z-10"
            id="topBar"
            variants={moveIn}
            initial="initial"
            animate={props.showBar ? "visible" : "hidden"}
        >
          <div className="bg-blue-300 flex justify-evenly">
            <div className="w-96 h-full bg-red-300 flex flex-row">
              <span>Locale</span>
              <div className="h-full flex">
                  <Link href="/" locale="en"><a><Image src={us_uk_flag.src} width={flag_width} height={flag_height} /></a></Link>
                  <Link href="/" locale="de"><a><Image src={de_flag.src} width={flag_width} height={flag_height} /></a></Link>
                  <Link href="/" locale="fr"><a><Image src={fr_flag.src} width={flag_width} height={flag_height} /></a></Link>
                  <Link href="/" locale="ja"><a><Image src={jp_flag.src} width={flag_width} height={flag_height} /></a></Link>
              </div>
            </div>
            <h1>current locale: {router.locale}</h1>
          </div>
        </motion.div>
    );
}

export default TopBar;
export { topBarHeight };