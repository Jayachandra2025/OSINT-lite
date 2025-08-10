"use client";
import React, { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ShiningText } from "@/components/ui/shining-text";
import { CircleAnimationsGrid } from "@/components/ui/cicle-animation-3";
import { TextLoop } from "@/components/ui/text-loop";
import { FaCheck, FaCheckCircle } from "react-icons/fa";
import { IconCloud } from "@/components/magicui/icon-cloud";
import Image from "next/image";

const slugs = [
  "telegram",
  "gmail",
  "pinterest",
  "maildotru",
  "googlemaps",
  "git",
  "github",
  "gitlab",
  "flutter",
  "android",
  "html5",
  "css3",
  "nodedotjs",
  "express",
  "nextdotjs",
  "prisma",
  "amazonaws",
  "postgresql",
  "firebase",
  "nginx",
  "vercel",
  "testinglibrary",
  "jest",
  "cypress",
  "docker",
  "git",
  "jira",
  "github",
  "gitlab",
  "visualstudiocode",
  "androidstudio",
  "sonarqube",
  "figma",
];

const icons = [
  "ai",
  "algorithm",
  "chrome",
  "cloud-download",
  "desktop",
  "gear",
  "globe-1",
  "gmail",
  "idea",
  "location",
  "lock-password",
  "person",
  "server",
  "sheild-broken",
  "shield-check",
  "shield-person",
  "shield-security",
  "telegram",
  "twitter",
  "wifi",
  "android",
  "facebook",
  "google",
  "html",
  "id-card",
];
const Scanning = () => {
  const searchParams = useSearchParams();
  const search = searchParams.get("search");
  const sessionId = searchParams.get("sessionId");
  const [loading, setLoading] = useState(true);
  const [scanStatus, setScanStatus] = useState("pending");
  const router = useRouter();

  const navigateToResults = () => {
    if (!loading) {
      router.push(`/results?search=${search}&sessionId=${sessionId}`);
    }
  };

  const fetchScanStatus = async () => {
    try {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sessionId: sessionId }),
      };

      const response = await fetch("/api/fetchScanStatus", options);
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        if (data.completed === true) {
          setLoading(false);
          setScanStatus("completed");
        }
      } else {
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // const images = slugs.map(
  //   (slug) => `https://cdn.simpleicons.org/${slug}/${slug}`
  // );

  const images = icons.map((icon) => `/icon/custom/${icon}.svg`);

  useEffect(() => {
    let intervalId;
    if (sessionId && scanStatus === "pending") {
      intervalId = setInterval(fetchScanStatus, 5000);
    } else if (scanStatus === "completed") {
      clearInterval(intervalId);
    }
    return () => clearInterval(intervalId);
  }, [sessionId, scanStatus]);

  return (
    <main className="bg-search">
      <div className="flex flex-col p-16 min-h-screen">
        <>
          {/* <ShiningText
            text={`Searching for: ${search}`}
            className="text-3xl font-semibold text-center"
            duration={5}
          /> */}
          <div className="w-full py-5 flex justify-center">
            {/* <CircleAnimationsGrid className="w-[300px] h-[300px] mx-auto" /> */}
            <IconCloud images={images} />
          </div>
          {/* <div className="w-full px-16">
              <TextLoop
                interval={4}
                transition={{ duration: 1 }}
                className="w-full"
              >
                {[
                  "How can I assist you today?",
                  "Generate a logo",
                  "Create a component",
                  "Draw a diagram",
                ].map((text) => (
                  <span key={text} className="block text-center w-full">
                    <ShiningText
                      text="Lorem Ipsum dbsbs sbvks vskjbvks vksab kjvaskaskj ak kajbvkjsabkajbv ksab vkjsabvkbvabkavjakva"
                      className="text-xl font-semibold text-center"
                      delay={0}
                    />
                  </span>
                ))}
              </TextLoop>
            </div> */}
          <ul className="flex flex-col gap-4  mx-auto ">
            <li>
              <ShiningText
                icon={
                  scanStatus === "pending" ? (
                    <Image
                      src="/img/loading-1.gif"
                      alt="search"
                      width={20}
                      height={20}
                    />
                  ) : (
                    <FaCheckCircle className="text-green-500 w-6 h-6" />
                  )
                }
                text={
                  scanStatus === "pending"
                    ? `Scanning for ${search}...`
                    : `Scanning completed`
                }
                className="text-xl font-semibold text-left"
                delay={0}
                duration={4}
              />
            </li>
          </ul>
          <div className="w-full flex justify-center py-10">
            <button
              className="bg-search-button text-white px-6 pt-2 pb-3 rounded-md bg-black disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
              onClick={() => navigateToResults()}
            >
              See Results
            </button>
          </div>
        </>
      </div>
    </main>
  );
};

const Page = () => {
  return (
    <Suspense>
      <Scanning />
    </Suspense>
  );
};

export default Page;
