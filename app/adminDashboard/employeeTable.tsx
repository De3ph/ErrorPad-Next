"use client";
import { Card, Typography, Button } from "@/ui/index";
import { Employee } from "../types/Employee";
import { useEffect, useState } from "react";
import Link from "next/link";

const headerList = [
  "Picture",
  "Name",
  "Last Name",
  "Job",
  "Python Review",
  "TypeScript Review",
  "Email",
  "Role",
  "Details",
];

export default function EmployeeTable({ dataList = [{}] }: any) {
  return (
    <Card className="max-h-[46rem] w-[75vw] overflow-scroll">
      <table className="w-full min-w-max table-auto text-left overflow-scroll">
        <thead>
          <tr>
            {headerList.map((head: String, index: number) => (
              <th
                key={index}
                className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
              >
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {dataList.map((employee: Employee, index: number) => {
            const isLast = index === dataList.length - 1;
            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

            return (
              <tr key={employee?.id}>
                {employee.picLink ? (
                  <td className={classes}>
                    <img
                      className="h-16 w-16 rounded-full object-cover object-center"
                      src={employee.picLink}
                      alt="nature image"
                    />
                  </td>
                ) : (
                  <td className={classes}>
                    <img
                      className="h-12 w-12 rounded-full object-cover object-center"
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Windows_10_Default_Profile_Picture.svg/2048px-Windows_10_Default_Profile_Picture.svg.png"
                      alt="default image"
                    />
                  </td>
                )}

                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {employee.first_name}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {employee.last_name}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {employee.job}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {employee?.python_review || "-"}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {employee?.typescript_review || "-"}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {employee.email}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {employee.role}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    <Link href={"" + employee?.id}>
                      <Button size="sm">Details</Button>
                    </Link>
                  </Typography>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Card>
  );
}
