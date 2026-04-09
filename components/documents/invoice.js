"use client";
import { useState } from "react";

const Field = ({
  value,
  onChange,
  editable,
  className = "",
  type = "text",
}) => {
  if (!editable) return <span className={className}>{value}</span>;
  return (
    <input
      value={value}
      type={type}
      onChange={(e) => onChange(e.target.value)}
      className={`bg-transparent outline-none rounded px-1 -mx-1 border-b border-dashed border-transparent hover:border-gray-300 focus:border-indigo-400 transition w-full ${className}`}
    />
  );
};

export default function Invoice({ editable = false, initialData, onSave }) {
  const [data, setData] = useState(() => {
    if (initialData) {
      return {
        ...initialData,
        dueDate: initialData.dueDate?.split("T")[0] || "",
      };
    }
    return {
      companyName: "DocuMaker",
      address: "123 Business St, Karachi",
      invoiceNo: "INV-0042",
      billTo: "Acme Corp Ltd.",
      email: "accounts@acme.co",
      dueDate: new Date().toISOString().split("T")[0],
      items: [
        { desc: "Website Design", qty: "1", rate: "1,200", amount: "1,200" },
        { desc: "Development", qty: "8 hrs", rate: "120", amount: "960" },
        { desc: "Annual Hosting", qty: "1", rate: "80", amount: "80" },
      ],
      paymentNote: "Payment via bank transfer",
      total: "2,240",
      type: "invoice"
    };
  });

  const updateField = (field, value) => setData({ ...data, [field]: value });

  const updateItem = (index, field, value) => {
    const items = [...data.items];
    items[index][field] = value;

    if (field === "qty" || field === "rate") {
      const qty = parseFloat(items[index].qty) || 0;
      const rate = parseFloat(items[index].rate.replace(/[$,]/g, "")) || 0;
      items[index].amount = `${(qty * rate).toLocaleString()}`;
    }

    const total = items.reduce((acc, item) => {
      return acc + (parseFloat(item.amount.replace(/[$,]/g, "")) || 0);
    }, 0);

    setData({ ...data, items, total: `${total.toLocaleString()}` });
  };

  const removeItem = (index) => {
    const removedItem = data.items[index];

    const removedAmount =
      parseFloat(removedItem.amount.replace(/[₹,\s]/g, "")) || 0;

    const currentTotal = parseFloat(data.total.replace(/[₹,\s]/g, "")) || 0;

    const newTotal = currentTotal - removedAmount;

    setData({
      ...data,
      items: data.items.filter((_, i) => i !== index),
      total: `${newTotal.toLocaleString()}`,
    });
  };

  return (
    <div className=" font-sans text-gray-900 text-sm">
      <div className="px-5 pt-5 pb-4 border-b border-gray-100 flex flex-wrap justify-between gap-3">
        <div>
          <div className="text-xl font-bold tracking-tight">
            <Field
              value={data.companyName}
              onChange={(v) => updateField("companyName", v)}
              editable={editable}
            />
          </div>
          <div className="text-xs text-gray-400 mt-0.5">
            <Field
              value={data.address}
              onChange={(v) => updateField("address", v)}
              editable={editable}
            />
          </div>
        </div>
        <div className="sm:text-right">
          <div className="text-xs tracking-widest uppercase text-gray-400 mb-1">
            Invoice
          </div>
          <div className="text-lg font-bold">
            <Field
              value={data.invoiceNo}
              onChange={(v) => updateField("invoiceNo", v)}
              editable={editable}
            />
          </div>
        </div>
      </div>

      <div className="px-5 py-4 flex flex-wrap justify-between gap-4">
        <div>
          <div className="text-xs tracking-wider uppercase text-gray-400 mb-1">
            Bill to
          </div>
          <div className="text-sm font-semibold">
            <Field
              value={data.billTo}
              onChange={(v) => updateField("billTo", v)}
              editable={editable}
            />{" "}
          </div>
          <div className="text-xs text-gray-500 mt-0.5">
            <Field
              value={data.email}
              onChange={(v) => updateField("email", v)}
              editable={editable}
            />
          </div>
        </div>
        <div className="sm:text-right">
          <div className="text-xs tracking-wider uppercase text-gray-400 mb-1">
            Due
          </div>
          <div className="text-sm font-semibold">
            <Field
              value={data.dueDate}
              onChange={(v) => updateField("dueDate", v)}
              type="date"
              editable={editable}
            />
          </div>
        </div>
      </div>

      <div className="px-5">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr>
              {["Description", "Qty", "Rate", "Amount"].map((h) => (
                <th
                  key={h}
                  className={`text-xs tracking-wider uppercase text-gray-400 py-2 border-b border-gray-100 font-medium ${h === "Description" ? "text-left" : "text-right"}`}
                >
                  {h}
                </th>
              ))}
              {editable && <th className="w-8" />}
            </tr>
          </thead>
          <tbody>
            {data.items.map((item, i) => (
              <tr key={i} className="group">
                <td className="py-2 border-b border-gray-50 text-gray-600">
                  <Field
                    value={item.desc}
                    onChange={(v) => updateItem(i, "desc", v)}
                    editable={editable}
                  />
                </td>
                <td className="py-2 border-b border-gray-50 text-right text-gray-600">
                  <Field
                    value={item.qty}
                    onChange={(v) => updateItem(i, "qty", v)}
                    editable={editable}
                    className="text-right"
                  />
                </td>
                <td className="py-2 border-b border-gray-50 text-right text-gray-600">
                  <span className="flex items-center justify-end gap-0.5">
                    <Field
                      value={item.rate}
                      onChange={(v) => updateItem(i, "rate", v)}
                      editable={editable}
                      className="text-right w-16"
                    />
                  </span>
                </td>
                <td className="py-2 border-b border-gray-50 text-right font-semibold">
                  <span className="flex items-center justify-end gap-0.5">
                    <Field value={item.amount} className="text-right w-16" />
                  </span>
                </td>
                {editable && (
                  <td className="py-2 border-b border-gray-50 text-center">
                    <button
                      onClick={() => removeItem(i)}
                      className="sm:opacity-0 sm:group-hover:opacity-100 text-red-400 hover:text-red-600 transition"
                    >
                      ✕
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>

   
        {editable && (
          <button
            onClick={() =>
              setData({
                ...data,
                items: [
                  ...data.items,
                  { desc: "", qty: "", rate: "", amount: "" },
                ],
              })
            }
            className="mt-3 text-xs text-indigo-500 hover:text-indigo-700 font-medium"
          >
            + Add Item
          </button>
        )}
      </div>

      <div className="border-t border-dashed border-gray-200 mx-5 my-4" />
      <div className="px-5 pb-5 flex flex-wrap sm:justify-end items-center gap-4">
        <div className="text-xs text-gray-400 w-full flex-1">
          <Field
            value={data.paymentNote}
            onChange={(v) => updateField("paymentNote", v)}
            editable={editable}
          />
        </div>
        <div className="bg-gray-900 text-white rounded-lg px-4 py-3 text-right">
          <div className="text-xs tracking-wider uppercase text-white/50 mb-0.5">
            Total Due
          </div>
          <div className="text-2xl font-bold tracking-tight flex items-center justify-end gap-1">
            ₹
            <Field
              value={data.total}
              onChange={(v) => updateField("total", v)}
              editable={editable}
              className="text-white w-24"
            />
          </div>
        </div>
      </div>
      {editable && (
        <div className="px-5 pb-5">
          <button
            onClick={() => onSave?.(data)}
            className="w-full bg-indigo-500 text-white font-medium py-3 rounded-lg hover:bg-indigo-600 transition"
          >
            Save
          </button>
        </div>
      )}
    </div>
  );
}
