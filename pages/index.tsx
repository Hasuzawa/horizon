import type { NextPage, GetStaticProps } from 'next'
import Head from 'next/head'

import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { useTranslation } from "next-i18next";

import { useRouter, NextRouter } from "next/router";
import Link from "next/link";

import { motion, AnimatePresence, Variants } from "framer-motion";
import { useInView } from "react-intersection-observer";

import TopBar, {topBarHeight} from "~/components/TopBar";
import Screen0 from "~/components/screen0";
import Screen1 from "~/components/screen1";
import Screen2 from "~/components/screen2";

import { useState, useEffect } from "react";



const Home: NextPage = () => {
  const { t } = useTranslation("firstPage");
  const router: NextRouter = useRouter();

  const { ref, inView, entry} = useInView({threshold: 0.7});  // threshold: 1.0 => all in view, threshold: 0.3 => 30% in view

  const [clientY, setClientY] = useState<number>(0);
  const trackMouse = (e: React.MouseEvent) => {
    setClientY(e.clientY);
  }

  const [showBar, setShowBar ] = useState<boolean>(false);


  useEffect(() => {
    setShowBar(clientY <= topBarHeight ? true : false);
  }, [clientY])

  // useEffect(() => {
  //   setShowBar(false);    // this only run the first time the component is loaded, since clientY is 0, showBar status
  // }, [])                  // will be true if this useEffect is not present

  

  // const keyboardEvents = (e: React.KeyboardEvent) => {
  //   console.log("key pressed");
  //   if (e.shiftKey){
  //     switch (e.key){
  //       case "ArrowUp": console.log("shift up"); break;
  //       case "ArrowDown": console.log("shift down"); break;
  //     }
  //   }
  // }

  return (
    <div
      className=""
      onMouseMove={event => trackMouse(event)}
    >
      <Head>
        <title>Horizon - Paper Journey</title>
        <meta name="description" content="A website with multiple locales and view-based animation" />

        <link rel="icon" href="/favicon.ico" />
      </Head>
      <TopBar showBar={showBar}/>
      <div className="fixed top-0 right-0 bg-yellow-300">
        <span>Screen 4 in view ? {inView.toString()}</span>
        <span>clienY is {clientY}</span>
      </div>

      <main className="flex-col scroll-snap-y-madatory overflow-y-scroll h-screen max-h-screen smooth-scroll-y"
        
      >

        <Screen0 />
        <Screen1 />
        <Screen2 />

        <div className="w-screen h-screen bg-indigo-700 scroll-snap-start" ref={ref}>

        </div>
        <div className="w-screen h-screen bg-pink-300 scroll-snap-start">

        </div>
      </main>

    </div>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...await serverSideTranslations(locale!, ["TopBar", "screen0", "screen1", "screen2", "screen3", "screen4"]),
  }
})

export default Home