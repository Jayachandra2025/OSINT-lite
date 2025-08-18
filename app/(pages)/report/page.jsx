"use client";
import React, { Suspense, useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FaChartPie, FaGlobe } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { FaCode } from "react-icons/fa";
import BarChartComponent from "@/components/charts/results/BarChart";
import PieChartComponent from "@/components/charts/results/PieChart";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import DynamicTable from "@/components/DynamicTable";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

const mockData = [
  {
    label: "Bureau van Dijk",
    value: 150,
    percentage: 25,
    fill: "#4285f4",
    opacity: 1,
  },
  {
    label: "DemandScience by Pure Incubation",
    value: 120,
    percentage: 20,
    fill: "#5a78f0",
    opacity: 1,
  },
  {
    label: "AntiPublic",
    value: 90,
    percentage: 15,
    fill: "#7e57c2",
    opacity: 1,
  },
  {
    label: "Collections",
    value: 60,
    percentage: 10,
    fill: "#d81b60",
    opacity: 1,
  },
  {
    label: "Apollo",
    value: 90,
    percentage: 15,
    fill: "#e91e63",
    opacity: 1,
  },
  {
    label: "Other",
    value: 90,
    percentage: 15,
    fill: "#f06292",
    opacity: 1,
  },
];
const mockData2 = [
  {
    label: "Harmless",
    value: 50,
    percentage: 50,
    fill: "#32CD32", // Green
    opacity: 1,
  },
  {
    label: "Undetected / Unrated",
    value: 30,
    percentage: 30,
    fill: "#708090", // Slate Gray
    opacity: 1,
  },
  {
    label: "Suspicious",
    value: 15,
    percentage: 15,
    fill: "#FFA500", // Orange
    opacity: 1,
  },
  {
    label: "Malicious",
    value: 5,
    percentage: 5,
    fill: "#FF4500", // Red
    opacity: 1,
  },
];

const tableMockData = [
  {
    "Email Address": "Account 1",
    Password: "Password 1",
    "Password Hash": "Password 1 Hash",
    "Account Type": "Account Type",
    Address: "Address",
    "Date of Birth": "Date of Birth",
    "Phone Number": "Phone Number",
    "Date of Birth": "Date of Birth",
  },
  {
    "Email Address": "Account 1",
    Password: "Password 1",
    "Password Hash": "Password 1 Hash",
    "Account Type": "Account Type",
    Address: "Address",
    "Date of Birth": "Date of Birth",
    "Phone Number": "Phone Number",
    "Date of Birth": "Date of Birth",
  },
  {
    "Email Address": "Account 1",
    Password: "Password 1",
    "Password Hash": "Password 1 Hash",
    "Account Type": "Account Type",
    Address: "Address",
    "Date of Birth": "Date of Birth",
    "Phone Number": "Phone Number",
    "Date of Birth": "Date of Birth",
  },
  {
    "Email Address": "Account 1",
    Password: "Password 1",
    "Password Hash": "Password 1 Hash",
    "Account Type": "Account Type",
    Address: "Address",
    "Date of Birth": "Date of Birth",
    "Phone Number": "Phone Number",
    "Date of Birth": "Date of Birth",
  },
  {
    "Email Address": "Account 1",
    Password: "Password 1",
    "Password Hash": "Password 1 Hash",
    "Account Type": "Account Type",
    Address: "Address",
    "Date of Birth": "Date of Birth",
    "Phone Number": "Phone Number",
    "Date of Birth": "Date of Birth",
  },
  {
    "Email Address": "Account 1",
    Password: "Password 1",
    "Password Hash": "Password 1 Hash",
    "Account Type": "Account Type",
    Address: "Address",
    "Date of Birth": "Date of Birth",
    "Phone Number": "Phone Number",
    "Date of Birth": "Date of Birth",
  },
];

const tableMockData2 = [
  {
    Domain: "ewew.de",
    "IP Address": "135.181.46.104",
    "Name Servers": "root-dns.netcup.net",
  },
  {
    Domain: "ewec.de",
    "IP Address": "136.243.81.243",
    "Name Servers": "ns1.kv-gmbh.de",
  },
  {
    Domain: "ewee.de",
    "IP Address": "151.252.49.69",
    "Name Servers": "ns1.domainers.de",
  },
  {
    Domain: "eweo.de",
    "IP Address": "151.252.49.69",
    "Name Servers": "ns1.domainers.de",
  },
  {
    Domain: "ewem.de",
    "IP Address": "159.89.214.161",
    "Name Servers": "N/A",
  },
  {
    Domain: "ewer.de",
    "IP Address": "178.254.10.138",
    "Name Servers": "ns01.1blu.de",
  },
  {
    Domain: "ewek.de",
    "IP Address": "178.63.41.217",
    "Name Servers": "ns1.kv-gmbh.de",
  },
];

const tableMockData3 = [
  {
    Source: "Statvoo",
    Description:
      "A web analytics service providing traffic data and global website rankings.",
    Rank: "403,871",
  },
  {
    Source: "Alexa",
    Description:
      "A historical web traffic analysis tool, its data indicates a website's long-term popularity.",
    Rank: "403,871",
  },
  {
    Source: "Cisco Umbrella",
    Description:
      "A major DNS service provider with visibility into global internet requests, indicating real-world access frequency.",
    Rank: "476,479",
  },
];

const Results = () => {
  const [dashboard, setDashboard] = useState(null);
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("sessionId");
  const titleDomain = searchParams.get("search");
  const [tabValue, setTabValue] = useState("dashboard");

  const fetchDashboard = async () => {
    try {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sessionId: sessionId }),
      };
      const response = await fetch("/api/fetchDashboard", options);
      if (response.ok) {
        const data = await response.json();
        console.log(data.data);
        setDashboard(data.data);
      } else {
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (sessionId) {
      fetchDashboard();
    }
  }, [sessionId]);

  return (
    <main className="bg-results pdf-report">
      <div className="flex flex-col min-h-screen pb-16 pdf-page">
        <header className="flex flex-col justify-center items-center break-after-page min-h-[600px] gap-4">
          <Image
            src="/infosec_logos/infoseck2k-dark.svg"
            alt="logo"
            width={200}
            height={100}
            className=""
          />
          <h1 className="text-2xl font-bold text-center">
            OSINT Summary Report :{" "}
            <span className="text-blue-500">{titleDomain}</span>
          </h1>
          <p className="text-sm text-gray-500">
            Generated on:{" "}
            {new Date().toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </header>
        {dashboard ? (
          <>
            {" "}
            <section className="grid grid-cols-6 gap-4 ">
              <Card className="col-span-6 bg-white shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl font-bold">
                    {dashboard?.aiReport?.title}
                  </CardTitle>
                  <CardDescription className="text-base font-medium">
                    {dashboard?.aiReport?.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-3 gap-4 break-after-page">
                  {dashboard?.aiReport?.data.map((item, index) => (
                    <div
                      key={index}
                      className={`col-span-3 kpi-card ${
                        item.severity === "Critical"
                          ? "critical-risk"
                          : item.severity === "High"
                          ? "high-risk"
                          : item.severity === "Medium"
                          ? "medium-risk"
                          : "low-risk"
                      }`}
                    >
                      <h2 className="text-lg font-bold flex items-center gap-2 mb-2">
                        {item.title}:{" "}
                        <Badge
                          className={`${
                            item.severity === "Critical"
                              ? "bg-[#b1002c]/50 text-black"
                              : item.severity === "High"
                              ? "bg-[#e46533]/50 text-black"
                              : "bg-[#c77700]/50 text-black"
                          }`}
                        >
                          {item.severity}
                        </Badge>
                      </h2>
                      <p className="text-sm text-gray-800 font-medium">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </CardContent>
              </Card>
              {dashboard?.kpiCards?.map((item, index) => (
                <Card
                  key={index}
                  className="col-span-2 bg-white shadow-md cursor-pointer border border-slate-200"
                  //   onClick={() =>
                  //     item.title === "Spoofed Domains"
                  //       ? setTabValue("domain-intel")
                  //       : item.title === "Exposed Accounts"
                  //       ? setTabValue("exposed-accounts")
                  //       : item.title === "Exposed Subdomains"
                  //       ? setTabValue("technical")
                  //       : setTabValue("dashboard")
                  //   }
                >
                  <Link
                    href={`#${item.id}`}
                    className="flex flex-col gap-2 p-4 py-5"
                  >
                    <h3 className="text-xl font-bold">{item.title}</h3>
                    <h2 className="text-4xl font-extrabold">{item.value}</h2>
                    <p className="text-sm text-gray-500">{item.description}</p>
                  </Link>
                </Card>
              ))}
            </section>
            {dashboard?.data && (
              <section className="mt-4">
                <div className="grid grid-cols-2 gap-4 w-full ">
                  <Card className="col-span-2 md:col-span-2 lg:col-span-2 p-4 break-after-page">
                    <CardHeader className="">
                      <h3 className="text-xl font-bold">
                        {dashboard?.data?.dashboard?.spoofedDomainTypes?.header}
                      </h3>
                      <p className="text-base text-gray-500">
                        {
                          dashboard?.data?.dashboard?.spoofedDomainTypes
                            ?.description
                        }
                      </p>
                    </CardHeader>
                    <CardContent>
                      <BarChartComponent
                        title="Spofed Domain Types"
                        data={dashboard?.data?.dashboard?.spoofedDomainTypes?.data.map(
                          (item) => ({
                            label: item.Title,
                            value: item.Value,
                          })
                        )}
                        openSheet={() => {}}
                      />
                      <div className="mt-4">
                        <h4 className="text-lg font-semibold">
                          Common Impersonation Techniques Found:
                        </h4>
                        <ul className="list-none list-inside text-sm">
                          <li>
                            <strong>Addition/Omission:</strong> Adding or
                            removing a single letter, a common typo.
                          </li>
                          <li>
                            <strong>Homoglyph:</strong> Replacing characters
                            with visually similar ones (e.g., &apos;o&apos; with
                            &apos;0&apos;).
                          </li>
                          <li>
                            <strong>Insertion:</strong> Adding an extra
                            character to the name.
                          </li>
                          <li>
                            <strong>Replacement:</strong> Swapping one character
                            for another.
                          </li>
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="col-span-2 md:col-span-2 lg:col-span-2 p-4 break-after-page">
                    <CardHeader className="">
                      <h3 className="text-xl font-bold">
                        {
                          dashboard?.data?.dashboard?.topDataBreachSources
                            ?.header
                        }
                      </h3>
                      <p className="text-base text-gray-500">
                        {
                          dashboard?.data?.dashboard?.topDataBreachSources
                            ?.description
                        }
                      </p>
                    </CardHeader>
                    <CardContent>
                      <PieChartComponent
                        title="Breaches"
                        openSheet={() => {}}
                        data={dashboard?.data?.dashboard?.topDataBreachSources?.data.map(
                          (item) => ({
                            label: item.Title,
                            value: item.Value,
                          })
                        )}
                      />
                    </CardContent>
                  </Card>
                  <Card className="col-span-2 md:col-span-2 lg:col-span-2 p-4 break-after-page">
                    <CardHeader className="">
                      <h3 className="text-xl font-bold">
                        Domain URL Reputation
                      </h3>
                      <p className="text-base text-gray-500">
                        {
                          dashboard?.data?.dashboard?.domainReputationAnalysis
                            ?.description
                        }
                      </p>
                    </CardHeader>
                    <CardContent>
                      <PieChartComponent
                        title="Security Vendors"
                        data={dashboard?.data?.dashboard?.domainReputationAnalysis?.data.map(
                          (item) => ({
                            label: item.Title,
                            value: item.Value,
                          })
                        )}
                        openSheet={() => {}}
                      />
                    </CardContent>
                  </Card>
                </div>
                <div
                  className="grid grid-cols-2 gap-4 w-full landscape break-after-page"
                  id="exposedAccounts"
                >
                  <Card className="col-span-2 md:col-span-2 lg:col-span-2 p-4">
                    <CardHeader className="">
                      <h3 className="text-xl font-bold mb-2">
                        Sample of Exposed Accounts in Breaches
                      </h3>
                      <p className="text-base text-gray-500">
                        {
                          dashboard?.data?.exposedAccounts
                            ?.sampleExposedAccounts?.description
                        }
                      </p>
                    </CardHeader>
                    <CardContent className="scroll-x">
                      {/* <DynamicTable
                        data={
                          dashboard?.data?.exposedAccounts
                            ?.sampleExposedAccounts?.data
                        }
                      /> */}
                      <Table>
                        <TableHeader>
                          <TableRow className="text-[10px]">
                            <TableHead>Address</TableHead>
                            <TableHead>Company</TableHead>
                            <TableHead>Database Name</TableHead>
                            <TableHead>Dob</TableHead>
                            <TableHead>Email</TableHead>
                            {/* <TableHead>Hashed Password</TableHead> */}
                            <TableHead>Id</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Phone</TableHead>
                            <TableHead>Url</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {dashboard?.data?.exposedAccounts?.sampleExposedAccounts?.data?.map(
                            (item, index) => (
                              <TableRow key={index} className="text-[10px]">
                                <TableCell>{item["Address"] || "-"}</TableCell>
                                <TableCell>{item["Company"] || "-"}</TableCell>
                                <TableCell>
                                  {item["Database Name"] || "-"}
                                </TableCell>
                                <TableCell>{item["Dob"] || "-"}</TableCell>
                                <TableCell>{item["Email"] || "-"}</TableCell>
                                {/* <TableCell>
                                  {item["Hashed Password"] || "-"}
                                </TableCell> */}
                                <TableCell>{item["Id"] || "-"}</TableCell>
                                <TableCell>{item["Name"] || "-"}</TableCell>
                                <TableCell>{item["Phone"] || "-"}</TableCell>
                                <TableCell>{item["Url"] || "-"}</TableCell>
                              </TableRow>
                            )
                          )}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </div>
                <div
                  className="grid grid-cols-2 gap-4 w-full "
                  id="spoofedDomains"
                >
                  <Card className="col-span-2 md:col-span-2 lg:col-span-2 p-4 break-after-page">
                    <CardHeader className="">
                      <h3 className="text-xl font-bold mb-2">
                        Sample of Potentially Spoofed Domains
                      </h3>
                      <p className="text-base text-gray-500">
                        {
                          dashboard?.data?.domainIntel
                            ?.samplePotentiallySpoofedDomains?.description
                        }
                      </p>
                    </CardHeader>
                    <CardContent>
                      {/* <DynamicTable
                        data={
                          dashboard?.data?.domainIntel
                            ?.samplePotentiallySpoofedDomains?.data
                        }
                      /> */}
                      <Table className="w-full ">
                        <TableHeader>
                          <TableRow className="text-[11px]">
                            <TableHead>Dns A</TableHead>
                            <TableHead>Dns Aaaa</TableHead>
                            <TableHead>Dns Mx</TableHead>
                            <TableHead>Dns Ns</TableHead>
                            <TableHead>Domain</TableHead>
                            <TableHead>Fuzzer</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {dashboard?.data?.domainIntel?.samplePotentiallySpoofedDomains?.data.map(
                            (item, index) => (
                              <TableRow key={index} className="text-[11px]">
                                <TableCell>{item["Dns A"] || "-"}</TableCell>
                                <TableCell>{item["Dns Aaaa"] || "-"}</TableCell>
                                <TableCell>{item["Dns Mx"] || "-"}</TableCell>
                                <TableCell>{item["Dns Ns"] || "-"}</TableCell>
                                <TableCell>{item["Domain"]}</TableCell>
                                <TableCell>{item["Fuzzer"] || "-"}</TableCell>
                              </TableRow>
                            )
                          )}
                        </TableBody>
                      </Table>
                      {/* <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Title</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead>Rank</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {dashboard?.data?.domainIntel?.samplePotentiallySpoofedDomains?.data.map(
                            (item, index) => (
                              <TableRow key={index}>
                                <TableCell>{item.Title}</TableCell>
                                <TableCell>{item.Description}</TableCell>
                                <TableCell className="blur-sm pointer-events-none">
                                  
                                </TableCell>
                              </TableRow>
                            )
                          )}
                        </TableBody>
                      </Table> */}
                    </CardContent>
                  </Card>
                  <Card className="col-span-2 md:col-span-2 lg:col-span-2 p-4 break-after-page">
                    <CardHeader className="">
                      <h3 className="text-xl font-bold mb-2">
                        Domain Popularity & Reach
                      </h3>
                      <p className="text-base text-gray-500">
                        {
                          dashboard?.data?.domainIntel?.domainPopularityReach
                            ?.description
                        }
                      </p>
                    </CardHeader>
                    <CardContent>
                      {/* <DynamicTable
                            data={
                              dashboard?.data?.domainIntel
                                ?.domainPopularityReach?.data
                            }
                          /> */}
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Title</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead>Rank</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {dashboard?.data?.domainIntel?.domainPopularityReach?.data.map(
                            (item, index) => (
                              <TableRow key={index}>
                                <TableCell>{item.Title}</TableCell>
                                <TableCell>{item.Description}</TableCell>
                                <TableCell className="blur-[8px] pointer-events-none">
                                  #234,345
                                </TableCell>
                              </TableRow>
                            )
                          )}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </div>
                <div
                  className="grid grid-cols-2 gap-4 w-full break-after-page"
                  id="exposedSubdomains"
                >
                  <Card className="col-span-2 md:col-span-2 lg:col-span-2 p-4">
                    <CardHeader className="">
                      <h3 className="text-xl font-bold mb-2">
                        Sample of Exposed Subdomains
                      </h3>
                      <p className="text-base text-gray-500">
                        {
                          dashboard?.data?.technical?.sampleExposedSubdomains
                            ?.description
                        }
                      </p>
                    </CardHeader>
                    <CardContent>
                      <DynamicTable
                        data={
                          dashboard?.data?.technical?.sampleExposedSubdomains
                            ?.data
                        }
                      />
                    </CardContent>
                  </Card>
                </div>
              </section>
            )}
          </>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </main>
  );
};

const Page = () => {
  return (
    <Suspense>
      <Results />
    </Suspense>
  );
};

export default Page;
