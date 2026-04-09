import { templates } from "@/lib/exportRepeative/templates";
import Link from "next/link";

export async function generateMetadata({ params }) {
  const { template } = await params;
  return {
    title: `${template.charAt(0).toUpperCase()}${template.slice(1)}`,
    description: `Prview your ${template} template and choose what to create`
  };
}

export default async function TemplatePreview({ params }) {
  const { template } = await params;
  const Template = templates[template];

  if (!Template) return <div>Not found</div>;

  return (
    <div className="min-h-screen py-20 px-4 bg-gradient-to-b from-gray-100 to-gray-200">
      <div className="w-full md:w-3/4 lg:w-2/5 mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden ring-1 ring-gray-200">
          <Template />
        </div>

        <div className="flex justify-between items-center mt-5">
          <Link
            href="/templates"
            className="text-sm text-gray-500 hover:text-gray-800 transition"
          >
            ← Back
          </Link>
          <Link href={`/templates/${template}/use`}>
            <button className="bg-gray-900 text-white text-sm font-medium px-6 py-2.5 rounded-full hover:bg-gray-800 hover:scale-102 transition-all shadow-lg">
              ✎ Use Template
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
