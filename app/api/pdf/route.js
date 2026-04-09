import { NextResponse } from "next/server";

export async function POST(req) {
  const { html } = await req.json();
  const response = await fetch("https://api.pdfshift.io/v3/convert/pdf", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Basic " + Buffer.from(process.env.PDF_SHIFT_API).toString("base64"),
    },
    body: JSON.stringify({
      source: `
      <html>
        <head>
          <script src="https://cdn.tailwindcss.com"></script>          <style>
            @page { size: A4; margin: 10mm; }
            html, body { 
              margin: 0; 
              padding: 0;
              height: auto;
              min-height: 0;
            }
            .content { padding: 20px; }
          </style>
        </head>
        <body>
          <div class="content">${html}</div>
        </body>
      </html>    `,
      format: "A4",
      use_print: true,
    }),
  });

  const pdf = await response.arrayBuffer();
  return new NextResponse(pdf, {
    headers: { "Content-Type": "application/pdf" },
  });
}
