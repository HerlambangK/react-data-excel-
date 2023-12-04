import { readFile } from "fs/promises";
import * as xlsx from "xlsx";
import { NextResponse } from "next/server";
import path from "path";

export async function GET() {
  try {
    const filePath = path.resolve(
      "public/herlambang_url_modified_websites.xlsx"
    ); // Update with the correct path
    const jsonData: any = await readXlsxFile(filePath);
    const urls = jsonData.map((item: any) => {
      return {
        name: item && item["Nama"] !== undefined ? item["Nama"] : "",
        url:
          item && item["Nama Website"] !== undefined
            ? item["Nama Website"]
            : "",
      };
    });

    return NextResponse.json({ data: urls });
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

const readXlsxFile = async (filePath: string) => {
  try {
    const fileBuffer = await readFile(filePath);
    const workbook = xlsx.read(fileBuffer, { type: "buffer" });

    // Assuming there is only one sheet in the workbook
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];

    // Convert sheet data to JSON
    const jsonData = xlsx.utils.sheet_to_json(sheet);

    return jsonData;
  } catch (error) {
    throw error;
  }
};
